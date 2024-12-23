from fastapi import APIRouter, Depends, status, HTTPException
from sqlmodel import Session, select
from dependencies import SuccessResponse, get_session, verify_access_token
from models import PollCreate, Poll, PollPublic, Option, OptionPublic, User

router = APIRouter(
    tags=['polls']
)


@router.post('/poll/new', status_code=status.HTTP_201_CREATED)
def create_poll(
        poll: PollCreate,
        session: Session = Depends(get_session),
        user: User = Depends(verify_access_token)
    ) -> SuccessResponse:
    db_poll = Poll(title=poll.title, user_id=user.id)
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


@router.get('/poll/{ref}')
def get_poll(
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

