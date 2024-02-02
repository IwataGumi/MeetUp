import { NextRequest, NextResponse } from 'next/server';
import { AccessTokenType, CredentialsType, RefreshTokenType } from './@types/axios';
import { boolean } from 'yup';

const refreshAccessToken = async (refreshToken: RefreshTokenType): Promise<undefined | AccessTokenType> => {
  const token = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/token/refresh`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      refresh_token: refreshToken,
    }),
  }).then(res => res.ok ? res : undefined);

  if (token !== undefined) {
    const tokenData = await token.json();
    return tokenData.access_token;
  }
  return undefined;
}

const confirmAccessToken = async (accessToken: AccessTokenType): Promise<boolean> => {
  const isSucceeded = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/me`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  }).then(async res => res.ok);

  return isSucceeded
}

const createNewUser = async (): Promise<CredentialsType | undefined> => {
  const credentials = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      "Content-Type": "application/json"
    }
  }).then(res => res.ok ? res : undefined);

  if (credentials !== undefined) {
    const credentialsData = await credentials.json();
    return credentialsData as CredentialsType
  }
  return undefined;
}

const whenNotAuthenticated = async (request: NextRequest ,response: NextResponse): Promise<NextResponse> => {
  const credentials = await createNewUser()
  if (credentials !== undefined) {
    console.log(credentials)
    response.cookies.set({
      name: 'refresh_token',
      value: credentials.refresh_token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      domain: request.nextUrl.domainLocale?.domain,
    });
  }
  return response
}


const middleware = async (request: NextRequest) => {
  const response = await NextResponse.next();

  const refreshToken: RefreshTokenType | undefined = request.cookies.get("refresh_token")?.value;
  let accessToken: RefreshTokenType | undefined = request.cookies.get("access_token")?.value;

  const isAuthenticated = async () => {
    if (accessToken !== undefined && await confirmAccessToken(accessToken)) {
      return true;
    }

    if (refreshToken !== undefined) {
      accessToken = await refreshAccessToken(refreshToken);

      if (accessToken !== undefined && await confirmAccessToken(accessToken)) {
        response.cookies.set({
          name: 'access_token',
          value: accessToken,
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          domain: request.nextUrl.domainLocale?.domain,
        });
        return response
      }
    }
    return false;
  }

  if (!(await isAuthenticated())) {
    return await whenNotAuthenticated(request, response)
  }

  return response
}

export const config = {
  matcher: ['/((?!api|_next/static|favicon.ico).*)',],
};

export default middleware;