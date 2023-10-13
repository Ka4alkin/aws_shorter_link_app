export const generateDynamoDBQueryParams = (tableName: string, key: Record<string, unknown>) => {
    return {
        TableName: tableName,
        Key: key,
    };
};
