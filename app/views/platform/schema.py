from pydantic import BaseModel, Field

class platformSchema(BaseModel):
    vendor: str = Field(...,example='bitbucket')
