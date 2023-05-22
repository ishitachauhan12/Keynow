from fastapi import HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

import jwt
import json
from typing import Dict

import os

SECRET_KEY = os.environ.get('SECRET_KEY')

security = HTTPBearer()

def encode(adminAccess: bool = True) -> str:
    payload = {
        "adminAccess": adminAccess
    }
    return jwt.encode(payload, SECRET_KEY, algorithm="HS256")

def decode(code: str) -> Dict:
  return jwt.decode(code, SECRET_KEY, algorithms=["HS256"])

async def hasAccess(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        token = credentials.credentials
        payload = decode(token)
        if payload: return payload
        else: raise HTTPException(
            status_code=401,
            detail='Invalid token'
        )
    except:
        raise HTTPException(
            status_code=401,
            detail='Invalid token'
        )
