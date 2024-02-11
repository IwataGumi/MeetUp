import enum
from pathlib import Path
from tempfile import gettempdir
from typing import List, Literal

from pydantic_settings import BaseSettings, SettingsConfigDict
from yarl import URL

TEMP_DIR = Path(gettempdir())


EnvironmentType = Literal["dev", "prod"]


class LogLevel(str, enum.Enum):  # noqa: WPS600
    """Possible log levels."""

    NOTSET = "NOTSET"
    DEBUG = "DEBUG"
    INFO = "INFO"
    WARNING = "WARNING"
    ERROR = "ERROR"
    FATAL = "FATAL"


class Settings(BaseSettings):
    """
    Application settings.

    These parameters can be configured
    with environment variables.
    """

    domain: str = "localhost"
    host: str = "127.0.0.1"
    port: int = 8000
    web_uri: str = "http://localhost:3000/"

    origins: List[str] = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://web:3000",
    ]

    # quantity of workers for uvicorn
    workers_count: int = 1
    # Enable uvicorn reloading
    reload: bool = False

    # Current environment
    environment: EnvironmentType = "dev"

    log_level: LogLevel = LogLevel.DEBUG
    # Variables for the database
    db_host: str = "localhost"
    db_port: int = 5432
    db_user: str = "api"
    db_pass: str = "api"
    db_base: str = "api"
    db_echo: bool = False

    # token credentials
    token_algorithm: str = "HS512"
    token_secret_key: str = "app_some_secret_key"

    @property
    def is_production(self) -> bool:
        return self.environment != "dev"

    @property
    def db_url(self) -> URL:
        """
        Assemble database URL from settings.

        :return: database URL.
        """
        return URL.build(
            scheme="postgresql+asyncpg",
            host=self.db_host,
            port=self.db_port,
            user=self.db_user,
            password=self.db_pass,
            path=f"/{self.db_base}",
        )

    model_config = SettingsConfigDict(
        env_file=".env",
        env_prefix="API_",
        env_file_encoding="utf-8",
    )


settings = Settings()
