from typing import Optional
from api.db.dependencies import get_db_session
from api.db.models.user_model import UserModel

from fastapi import Cookie, Depends, Header, HTTPException, status
from starlette.requests import HTTPConnection
from jose import ExpiredSignatureError, JWTError, jwt
from sqlalchemy.ext.asyncio import AsyncSession

from api.db.dao.user_dao import UserDAO
from api.settings import settings


async def with_authenticate(
    user_dao: UserDAO = Depends(),
    access_token: str = Cookie(default=None),
    authorization: Optional[str] = Header(default=None),
) -> UserModel:
    if authorization is None and access_token is None:
        HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authorization credentials is missing.",
            headers={"WWW-Authenticate": 'Bearer error="invalid_request"'},
        )

    if authorization is not None:
        jwt_token = authorization.rsplit(maxsplit=1)[-1]
    elif access_token is not None:
        jwt_token = access_token
    else:
        raise HTTPException(
            status_code=401,
            detail="Token has expired.",
            headers={"WWW-Authenticate": 'Bearer error="invalid_token"'},
        )

    try:
        payload = jwt.decode(
            jwt_token, settings.token_secret_key, algorithms=[settings.token_algorithm]
        )
    except ExpiredSignatureError:
        raise HTTPException(
            status_code=401,
            detail="Token has expired.",
            headers={"WWW-Authenticate": 'Bearer error="invalid_token"'},
        )
    except JWTError:
        raise HTTPException(
            status_code=401,
            detail="Invalid token.",
            headers={"WWW-Authenticate": 'Bearer error="invalid_token"'},
        )

    user = await user_dao.get_user(payload["user_id"])

    if user is not None:
        return user

    raise HTTPException(
        status_code=404,
        detail="Not found user.",
        headers={"WWW-Authenticate": 'Bearer error="not_found_user"'},
    )


async def ws_with_autheticate(
    connection: HTTPConnection,
    db_session: AsyncSession = Depends(get_db_session),
):
    jwt_token = connection.cookies.get("access_token", None)

    if jwt_token is None:
        return None

    try:
        payload = jwt.decode(
            jwt_token, settings.token_secret_key, algorithms=[settings.token_algorithm]
        )
    except:
        return None

    user_dao = UserDAO(db_session)
    user = await user_dao.get_user(payload["user_id"])

    if user is not None:
        return user

    return None
