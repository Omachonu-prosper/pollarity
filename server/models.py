from pydantic import BaseModel
from sqlmodel import Field, SQLModel, Relationship

class UserBase(SQLModel):
    email: str = Field(index=True, unique=True)


class User(UserBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    password: str = Field()
    username: str = Field(index=True, unique=True)
    polls: list['Poll'] = Relationship(back_populates='user')


class UserPublic(UserBase):
    username: str = Field(index=True)


class UserCreate(UserBase):
    username: str = Field(index=True)
    password: str


class UserAuthenticate(UserBase):
    password: str


class PollBase(SQLModel):
    title: str = Field()


class Poll(PollBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    created_at: str = Field()
    is_open: bool = Field(default=True)
    is_anonymous: bool = Field(default=True)
    ref: str = Field(index=True)
    user_id: int | None = Field(foreign_key='user.id')
    user: User = Relationship(back_populates='polls')
    options_: list['Option'] = Relationship(back_populates='poll')


class PollCreate(PollBase):
    options: list[str] 


class PollPublic(PollBase):
    created_at: str
    is_anonymous: bool
    user_id: int
    is_open: bool
    ref: str


class OptionBase(SQLModel):
    choice: str = Field()
    chosen: int = Field(default=0)
    id: int | None = Field(default=None, primary_key=True)


class Option(OptionBase, table=True):
    poll_id: int | None = Field(foreign_key='poll.id')
    poll: Poll = Relationship(back_populates='options_')


class OptionPublic(OptionBase):
    pass


class Vote(BaseModel):
    option_id: int | None
