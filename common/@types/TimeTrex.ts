import { ICredentials } from "@common/@types/credentials";

export type IPunch = (credentials: ICredentials) => Promise<{
    success: boolean;
}>;

export type IGetTodayPunches = (credentials: ICredentials) => Promise<{
    success: boolean;
    data: string[];
}>;

export interface ITimeTrex {
    punch: IPunch;
    getTodayPunches: IGetTodayPunches;
}
