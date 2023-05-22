from fastapi import Depends, APIRouter

from app.utils.jwtHandler import hasAccess

from ..views.user.controller import userRouter
from ..views.platform.controller import platformRouter
from ..views.employee.controller import employeeRouter
from ..views.audit.controller import auditRouter

router = APIRouter()

router.include_router(
    userRouter,
    tags=["Auth"],
    prefix='/user',
)

router.include_router(
    platformRouter,
    prefix='/platform',
    tags=["Platforms"],
    dependencies=[Depends(hasAccess)],
)

router.include_router(
    employeeRouter,
    prefix='/employee',
    tags=["Employee data"],
    dependencies=[Depends(hasAccess)],
)

router.include_router(
    auditRouter,
    prefix='/audit',
    tags=["Audit"],
    dependencies=[Depends(hasAccess)]
)
