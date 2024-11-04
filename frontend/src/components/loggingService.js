import axios from 'axios';

const logToBackend = (level, message, extraData = {}) => {
    axios.post('/api/logs', {
        level,
        message,
        extraData,
        timestamp: new Date().toISOString(),
    }).catch(error => {
        console.error("Failed to send log to backend", error);
    });
};

const logInfo = (message, extraData) => logToBackend('info', message, extraData);
const logError = (message, extraData) => logToBackend('error', message, extraData);

export default { logInfo, logError };
