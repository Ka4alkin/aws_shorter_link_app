export const createHttpResponse = (statusCode: number, body: Record<string, unknown>, headers = defaultHeaders()) => {
    return {
        statusCode,
        headers,
        body: JSON.stringify(body),
    };
};

export const defaultHeaders = () => {
    return {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Methods": "OPTIONS,GET,POST,PUT,DELETE",
        "Access-Control-Allow-Headers": "Content-Type",
    };
};
