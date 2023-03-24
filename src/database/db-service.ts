import * as SQLite from 'expo-sqlite';
import { Platform } from 'react-native';
import { BUDGET_ADD_DEFAULTS, BUDGET_COUNT, BUDGET_CREATE_TABLE, ITEM_CREATE_TABLE } from './db-constants';

function initializeDatabase() {
    if (Platform.OS === "web") {
        return {
            transaction: () => {
                return {
                    executeSql: () => { },
                };
            },
        } as unknown as SQLite.Database;
    }
  
    const db = SQLite.openDatabase("db.db");
    db.transaction(tx => {
        tx.executeSql(BUDGET_CREATE_TABLE, [], (tx, res) => {
            tx.executeSql(BUDGET_COUNT, [], (tx, res) => {
                if (res.rows.item(0)["count"] === 0) {
                    tx.executeSql(BUDGET_ADD_DEFAULTS, [], (tx, res) => {
                    }, (tx, err) => {
                        console.error(err);
                        return true;
                    });
                }
            })
        }, (tx, err) => {
            console.error(err);
            return true;
        });
        tx.executeSql(ITEM_CREATE_TABLE, [], (tx, res) => {
        }, (tx, err) => {
            console.error(err);
            return true;
        });
    });
    return db;
}

export const db = initializeDatabase();
