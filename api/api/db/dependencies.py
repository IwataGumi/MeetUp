from typing import AsyncGenerator

from sqlalchemy.ext.asyncio import AsyncSession
from starlette.requests import Request, HTTPConnection


async def get_db_session(
    connection: HTTPConnection,
) -> AsyncGenerator[AsyncSession, None]:
    """
    Create and get database session.

    :param connection: current request.
    :yield: database session.
    """
    session: AsyncSession = connection.app.state.db_session_factory()

    try:  # noqa: WPS501
        yield session
    finally:
        await session.commit()
        await session.close()
