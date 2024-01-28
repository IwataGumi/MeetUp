from pydantic import BaseModel


class JWTRefreshToken(BaseModel):
    """DTO for when response JWT token."""

    refresh_token: str | None
