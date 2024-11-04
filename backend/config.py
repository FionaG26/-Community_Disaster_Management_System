import os

class Config:
    LOG_LEVEL = os.getenv("LOG_LEVEL", "INFO")
    LOG_GROUP = os.getenv("LOG_GROUP", "cdms-log-group")
    REGION = os.getenv("AWS_REGION", "us-west-2")
