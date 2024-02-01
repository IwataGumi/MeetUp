from api.db.models.user_model import UserModel
from api.schemas.user import UserInfo
from api.dependencies.auth import with_authenticate
from fastapi import APIRouter, Depends, Response

router = APIRouter()

@router.get('/me', response_model=UserInfo)
def users_me(
    user: UserModel = Depends(with_authenticate),
) -> Response:
    return user
