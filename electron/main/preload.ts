import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("NativeStorage", {
    get: (key: string) => ipcRenderer.invoke("Storage:get", key),
    set: (key: string, value: string) =>
        ipcRenderer.invoke("Storage:set", key, value),
    delete: (key: string) => ipcRenderer.invoke("Storage:delete", key),
});
