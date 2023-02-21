export type ISet = <T>(key: string, value: T) => Promise<void>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type IGet = <T = any>(key: string) => Promise<T | undefined>;

export type IDelete = (key: string) => Promise<void>;

export interface INativeStorage {
    set: ISet;
    get: IGet;
    delete: IDelete;
}
