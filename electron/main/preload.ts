import { contextBridge, ipcRenderer } from "electron";

import { INativeStorage } from "@common/@types/NativeStorage";
import { ITimeTrex } from "@common/@types/TimeTrex";

contextBridge.exposeInMainWorld("NativeStorage", {
    get: (key: string) => ipcRenderer.invoke("Storage:get", key),
    set: <T>(key: string, value: T) => ipcRenderer.invoke("Storage:set", key, value),
    delete: (key: string) => ipcRenderer.invoke("Storage:delete", key),
} satisfies INativeStorage);

contextBridge.exposeInMainWorld("TimeTrex", {
    punch: (credentials) => ipcRenderer.invoke("TimeTrex:punch", credentials),
} satisfies ITimeTrex);
