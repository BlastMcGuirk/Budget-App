export const db = {
    transaction: jest.fn().mockImplementation(() => {
        return {
            executeSql: jest.fn().mockImplementation(() => {
                jest.fn();
            })
        };
    })
}