export type AccessTokenType = string;
export type RefreshTokenType = string;

export type CredentialsType = {
  access_token: AccessTokenType,
  refresh_token: RefreshTokenType,
};

export type RoomUserType = {
  id: string,
  created_at: Moment,
  updated_at: Moment,
}