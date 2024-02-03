from api.db.dao.user_dao import UserDAO
from api.db.models.user_model import UserModel
from api.schemas.user import UserInfo
from api.dependencies.auth import with_authenticate
from api.static import static
from api.settings import settings
from fastapi import APIRouter, Depends, Response
from fastapi.responses import JSONResponse

router = APIRouter()


@router.post("/")
async def create_user(
    user_dao: UserDAO = Depends(),
) -> Response:
    new_user = await user_dao.create_user()

    access_token = user_dao.generate_access_token(new_user)
    refresh_token = user_dao.generate_refresh_token(new_user)

    response = JSONResponse(
        {
            "access_token": access_token,
            "refresh_token": refresh_token,
        }
    )
    response.set_cookie(
        key="access_token",
        value=access_token,
        max_age=int(static.ACCESS_TOKEN_EXPIRE_TIME.total_seconds()),
        secure=settings.is_production,
        domain=settings.domain,
        samesite="strict",
        httponly=True,
    )
    response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        max_age=int(static.REFRESH_TOKEN_EXPIRE_TIME.total_seconds()),
        secure=settings.is_production,
        domain=settings.domain,
        samesite="strict",
        httponly=True,
    )

    return response


@router.get("/me", response_model=UserInfo)
def users_me(
    user: UserModel = Depends(with_authenticate),
) -> Response:
    return user
