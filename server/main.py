from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from dependencies import validate_api_key, create_db_and_table
from routers import root
from routers import users

app = FastAPI(dependencies=[Depends(validate_api_key)])


app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)
app.include_router(root.router)
app.include_router(users.router)


@app.on_event('startup')
def on_startup():
    create_db_and_table()
