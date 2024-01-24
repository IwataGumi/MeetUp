from typing import TYPE_CHECKING, Optional
from api.chemas.user import UserInfo

from fastapi import Cookie, Depends, Header, HTTPException, status
from jose import ExpiredSignatureError, JWTError, jwt

from api.db.dao.user_dao import UserDAO
from api.settings import settings


async def with_authenticate(
    user_dao: UserDAO = Depends(),
    authorization: Optional[str] = Header(default=None),
):
    if authorization is None:
        HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authorization credentials is missing.",
            headers={"WWW-Authenticate": 'Bearer error="invalid_request"'},
        )

    if authorization is not None:
        jwt_token = authorization.rsplit(maxsplit=1)[-1]
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
        authenticated_user = UserInfo.model_validate(user, from_attributes=True)
        return authenticated_user

    raise HTTPException(
        status_code=404,
        detail="Not found user.",
        headers={"WWW-Authenticate": 'Bearer error="not_found_user"'},
    )