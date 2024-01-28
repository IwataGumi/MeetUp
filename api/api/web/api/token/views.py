from pprint import pformat
from api.settings import settings
from api.db.dao.user_dao import UserDAO
from api.static import static
from api.web.api.token.schema import JWTRefreshToken
from fastapi import APIRouter, Cookie, Depends, HTTPException, Response, status
from fastapi.responses import JSONResponse
from loguru import logger
from api.libs import jwt_token

router = APIRouter()
logger = logger.bind(Task="Token")

@router.post("/token/refresh")
async def generate_token(
    token_dto: JWTRefreshToken,
    cookie_refresh_token: str = Cookie(default=None),
    user_dao: UserDAO = Depends(),
) -> Response:
    if cookie_refresh_token is None and token_dto.refresh_token is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Not found session_id in the request.",
        )

    refresh_token = ''

    if cookie_refresh_token is not None:
        refresh_token = cookie_refresh_token
    elif token_dto.refresh_token is not None:
        refresh_token = token_dto.refresh_token

    if jwt_token.is_valid(refresh_token):
        user_info = jwt_token.decode_token(refresh_token)

        if user_info is None:
            # NORMALY NO WAY!
            error_message = [
                'Failed to decode valid refresh_token.',
                pformat(user_info)
            ]
            logger.critical("\n".join(error_message))
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Internal Server Error."
            )

        user = await user_dao.get_user(refresh_token.user_id)

        if user is None:
            error_message = [
                'Not found user to generate new access_token.',
                pformat(user_info),
            ]
            logger.critical("\n".join(error_message))
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Internal Server Error."
            )

        new_access_token = user_dao.generate_access_token(user)
        response = JSONResponse({"access_token": new_access_token})
        response.set_cookie(
            key="access_token",
            value=new_access_token,
            max_age=int(static.ACCESS_TOKEN_EXPIRE_TIME.total_seconds()),
            secure=settings.is_production,
            domain=settings.domain,
            samesite="strict",
            httponly=True
        )
