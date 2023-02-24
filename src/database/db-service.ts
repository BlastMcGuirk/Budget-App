import * as SQLite from 'expo-sqlite';
import { useEffect, useState } from 'react';
import {
    CREATE_TABLE as BUDGET_CREATE_TABLE
} from './db-table-budget';
import { 
    CREATE_TABLE as ITEM_CREATE_TABLE
} from './db-table-item';

const createTables = async (db: SQLite.WebSQLDatabase) => {
    // Create table if it doesn't exist
    const query = BUDGET_CREATE_TABLE + ITEM_CREATE_TABLE;
    db.transaction(tx => {
        tx.executeSql(query);
    });
}

export const useDatabase = () => {
    const [db, _] = useState(SQLite.openDatabase('budget-app.db'));

    useEffect(() => {
        createTables(db);
    }, [db]);

    function exec<T>(query: string, callback: (data: SQLite.SQLResultSetRowList) => T) {
        var myData: SQLite.SQLResultSetRowList = {
            _array: [],
            item: (_) => null,
            length: 0
        };
        db.transaction(tx => {
            tx.executeSql(
                query,
                [],
                (_, { rows }) => {myData = rows}, 
                (_, error) => { console.error(error.message); return true; });
        });
        return callback(myData);
    };

    return { exec };
}