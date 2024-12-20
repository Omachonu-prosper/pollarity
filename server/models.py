from sqlmodel import Field, SQLModel, table

class UserBase(SQLModel):
    email: str = Field(index=True)


class User(UserBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    password: str = Field()
    username: str = Field(index=True)


class UserPublic(UserBase):
    username: str = Field(index=True)
    id: int


class UserCreate(UserBase):
    username: str = Field(index=True)
    password: str


class UserAuthenticate(UserBase):
    password: str


