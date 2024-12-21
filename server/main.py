from contextlib import asynccontextmanager
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from dependencies import validate_api_key, create_db_and_table
from routers import root
from routers import users

@asynccontextmanager
async def lifespan(_: FastAPI):
    create_db_and_table()
    yield
    

app = FastAPI(dependencies=[Depends(validate_api_key)], lifespan=lifespan)


app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)
app.include_router(root.router)
app.include_router(users.router)  
