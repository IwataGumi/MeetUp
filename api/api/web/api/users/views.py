from api.chemas.user import UserInfo
from api.dependencies.auth import with_authenticate
from fastapi import APIRouter, Depends

router = APIRouter()

@router.get('/me')
def users_me(
    user: UserInfo = Depends(with_authenticate),
) -> UserInfo:
    return user
