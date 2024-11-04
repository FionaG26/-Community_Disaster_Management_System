import logging
import sys
from config import Config
from pythonjsonlogger import jsonlogger

log_handler = logging.StreamHandler(sys.stdout)
formatter = jsonlogger.JsonFormatter('%(asctime)s %(levelname)s %(name)s %(message)s')
log_handler.setFormatter(formatter)

logger = logging.getLogger("cdms")
logger.setLevel(Config.LOG_LEVEL)
logger.addHandler(log_handler)
