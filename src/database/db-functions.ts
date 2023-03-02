import { db } from "./db-service";

export function runQuery<T>(query: string): Promise<T[]> {
    const promise = new Promise<T[]>(async (resolve, _) => {
        db.transaction(tx => {
            tx.executeSql(query, [], (tx, res) => {
                resolve(res.rows._array);
            }, (tx, err) => {
                console.error(err);
                return true;
            });
        });
    });
    return promise;
}