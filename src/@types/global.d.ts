import { ITimeTrex } from "@common/@types/TimeTrex";
import { INativeStorage } from "@common/@types/NativeStorage";

declare global {
    const TimeTrex: ITimeTrex;
    const NativeStorage: INativeStorage;
}
