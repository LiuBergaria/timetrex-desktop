import { contextBridge, ipcRenderer } from "electron";

import { INativeStorage } from "@common/@types/NativeStorage";
import { ITimeTrex } from "@common/@types/TimeTrex";

// Unfortunately I couldn't find a way to build the preload script
// separately to bundle it into one file only.
// That's why we can't import other files here

contextBridge.exposeInMainWorld("NativeStorage", {
    get: (key: string) => ipcRenderer.invoke("Storage:get", key),
    set: <T>(key: string, value: T) => ipcRenderer.invoke("Storage:set", key, value),
    delete: (key: string) => ipcRenderer.invoke("Storage:delete", key),
} satisfies INativeStorage);

contextBridge.exposeInMainWorld("TimeTrex", {
    punch: (credentials) => ipcRenderer.invoke("TimeTrex:punch", credentials),
    getTodayPunches: (credentials) => ipcRenderer.invoke("TimeTrex:getTodayPunches", credentials),
    validateCredentials: (credentials) => ipcRenderer.invoke("TimeTrex:validateCredentials", credentials),
} satisfies ITimeTrex);
