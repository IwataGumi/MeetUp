from pydantic import BaseModel


class RefreshToken(BaseModel):
    refresh_token: str


class AccessToken(BaseModel):
    access_token: str


class CredentialsTokens(RefreshToken, AccessToken):
    pass
