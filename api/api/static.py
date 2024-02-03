import datetime
from zoneinfo import ZoneInfo


class Static:
    """Set the Static variables here."""

    ACCESS_TOKEN_EXPIRE_TIME = datetime.timedelta(minutes=15)
    # TODO: Refresh_tokenを無期限化する
    REFRESH_TOKEN_EXPIRE_TIME = datetime.timedelta(days=900)
    TIME_ZONE = ZoneInfo("Asia/Tokyo")


static = Static()
