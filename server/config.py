import os
from dotenv import load_dotenv

load_dotenv(override=True)

class Config:
    API_KEY = os.getenv('API_KEY')
