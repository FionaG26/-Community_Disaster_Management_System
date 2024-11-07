// src/loggingService.js

const log = async (level, message, extraData = {}) => {
    const logEntry = {
        level,
        message,
        extraData,
        timestamp: new Date().toISOString(),
    };

    try {
        await fetch('/api/logs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(logEntry),
        });
    } catch (error) {
        console.error("Failed to send log:", error);
    }
};

const logInfo = (message, extraData) => log('info', message, extraData);
const logError = (message, extraData) => log('error', message, extraData);
const logWarning = (message, extraData) => log('warning', message, extraData);

export default {
    logInfo,
    logError,
    logWarning,
};
