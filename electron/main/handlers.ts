import { ipcMain } from "electron";

import { NativeStorageHandlers, TimeTrexHandlers } from "../@types/handlers";
import { getTodayPunches, punch } from "../puppeteer";
import Storage from "../store";

export const setNativeStorageHandlers = () => {
    ipcMain.handle(NativeStorageHandlers.get, (_e, key) => Storage.get(key));
    ipcMain.handle(NativeStorageHandlers.set, (_e, key, value) => Storage.set(key, value));
    ipcMain.handle(NativeStorageHandlers.delete, (_e, key) => Storage.delete(key));
};

export const setTimeTrexHandlers = () => {
    ipcMain.handle(TimeTrexHandlers.punch, (_e, credentials) => punch(credentials));
    ipcMain.handle(TimeTrexHandlers.getTodayPunches, (_e, credentials) => getTodayPunches(credentials));
};
