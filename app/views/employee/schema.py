from pydantic import BaseModel, Field

class employeeSchema(BaseModel):
    email: str = Field(...,example='some.email@keynow.live')
    department: str = Field(...,example='tech')
    fullName: str = Field(...,example='Some name')
    eid: str = Field(...,example='TECH1')
