from pydantic import BaseModel, Field

class userSchema(BaseModel):
    email: str = Field(...,example='user@keynow.live')
    password: str = Field(...,example='password')
