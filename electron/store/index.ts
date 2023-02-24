import { safeStorage } from "electron";
import Store from "electron-store";

const store = new Store<Record<string, string>>({
    name: "timetrex-desktop",
    watch: true,
    encryptionKey: "this_only_obfuscates",
});

const Storage = {
    set(key: string, value: string) {
        const buffer = safeStorage.encryptString(JSON.stringify(value));
        store.set(key, buffer.toString("latin1"));
    },

    delete(key: string) {
        store.delete(key);
    },

    get(key: string) {
        const value = store.get(key);

        if (!value) return undefined;

        const buffer = Buffer.from(value, "latin1");

        return JSON.parse(safeStorage.decryptString(buffer));
    },
};

export default Storage;
