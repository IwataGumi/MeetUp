import datetime
from zoneinfo import ZoneInfo


class Static:
    """Set the Static variables here."""
    ACCESS_TOKEN_EXPIRE_TIME = datetime.timedelta(hours=48)
    TIME_ZONE = ZoneInfo("Asia/Tokyo")

static = Static()
