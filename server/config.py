import os
from dotenv import load_dotenv

load_dotenv(override=True)

class Config:
    API_KEY = os.getenv('API_KEY')
    SECRET_KEY = os.getenv('SECRET_KEY')
    JWT_ALGORITHM = 'HS256'
    ACCESS_TOKEN_EXPIRE_MINS = 60
    DB_URL=os.getenv('DB_URL')
