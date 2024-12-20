from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from dependencies import validate_api_key
from routers import root 

app = FastAPI(dependencies=[Depends(validate_api_key)])


app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)
app.include_router(root.router)
