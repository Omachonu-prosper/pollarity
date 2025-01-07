import asyncio
from fastapi import APIRouter, Depends, status, HTTPException
from fastapi.responses import StreamingResponse
from sqlmodel import Session, select
from dependencies import *
from models import PollCreate, Poll, PollPublic, Option, OptionPublic, User, Vote

router = APIRouter(
    tags=['polls']
)


@router.post('/poll/new', status_code=status.HTTP_201_CREATED)
async def create_poll(
        poll: PollCreate,
        session: Session = Depends(get_session),
        user: User = Depends(verify_access_token)
    ) -> SuccessResponse:
    db_poll = Poll(title=poll.title, user_id=user.id, ref=generate_poll_ref(), created_at=timestamp())
    session.add(db_poll)
    session.commit()
    session.refresh(db_poll)
    for option in poll.options:
        option = Option(choice=option, poll_id=db_poll.id)
        session.add(option)
    session.commit()
    return SuccessResponse(
        message='poll created successfully',
        data={
            'poll_ref': db_poll.ref
        }
    )


@router.get('/poll/{ref}', status_code=status.HTTP_200_OK)
async def get_poll(
        ref: str,
        session: Session = Depends(get_session)
    ) -> SuccessResponse:
    query = select(Poll).where(Poll.ref == ref)
    result = session.exec(query)
    poll = result.first()
    if not poll:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail='poll not found'
        )
    poll_public = PollPublic.model_validate(poll)
    poll_ = poll_public.model_dump()
    poll_['options'] = []
    poll_['total_chosen'] = 0
    for option in poll.options_:
        option = OptionPublic.model_validate(option)
        poll_['options'].append(option)
        poll_['total_chosen'] += option.chosen
    return SuccessResponse(
        message='poll fetched successfully',
        data={
            'poll': poll_
        }
    )


@router.get('/poll/{ref}/live', status_code=status.HTTP_200_OK)
async def get_live_poll(
        ref: str,
        session: Session = Depends(get_session)
    ) -> StreamingResponse:
    query = select(Poll).where(Poll.ref == ref)
    poll = session.exec(query).first()
    if not poll:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail='poll not found'
        )
    if not poll.is_open:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail='poll has been closed'
        )
    async def stream_live_poll():
        session_id = generate_session_id()
        poll_conns = poll_connections.get(ref, None)
        if poll_conns:
            poll_conns[session_id] = asyncio.Queue()
        else:
            print('setting')
            poll_connections[ref] = {
                session_id: asyncio.Queue()
            }
        while True:
            try:
                vote = await poll_connections[ref][session_id].get()
                yield f"event: vote\ndata: {vote}\n\n"
            except Exception as e:
                return
    return StreamingResponse(stream_live_poll(), media_type='text/event-stream')


@router.post('/poll/{ref}/vote', status_code=status.HTTP_200_OK)
async def poll_vote(
        ref: str,
        vote: Vote,
        session: Session = Depends(get_session)
    ) -> SuccessResponse:
    query = select(Poll).where(Poll.ref == ref)
    poll = session.exec(query).first()
    if not poll:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail='poll not found'
        )
    if not poll.is_open:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail='poll has been closed'
        )
    query = select(Option).where(Option.id == vote.option_id).where(Option.poll_id == poll.id)
    option = session.exec(query).first()
    if not option:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail='poll and option mismatch'
        )
    option.chosen += 1
    session.add(option)
    session.commit()
    conns = poll_connections.get(ref, {})
    for value in conns.values():
        # We send the option that was chosen (voted for) so the client can update accordingly
        await value.put({'oid': vote.option_id})
    return SuccessResponse(message='vote recorded')


@router.post('/poll/{ref}/close', status_code=status.HTTP_200_OK)
async def close_poll(
        ref: str,
        session: Session = Depends(get_session)
    ) -> SuccessResponse:
    query = select(Poll).where(Poll.ref == ref)
    poll = session.exec(query).first()
    if not poll:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail='poll not found'
        )
    poll.is_open = False
    session.add(poll)
    session.commit()
    return SuccessResponse(message='closed poll successfully')

