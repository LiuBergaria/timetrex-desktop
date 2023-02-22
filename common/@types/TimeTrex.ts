import { ICredentials } from "@common/@types/credentials";

export interface IPunchResponse {
    success: boolean;
}

export type IPunch = (credentials: ICredentials) => Promise<IPunchResponse>;
export type IGetTodayPunches = (credentials: ICredentials) => Promise<void>;

export interface ITimeTrex {
    punch: IPunch;
    getTodayPunches: IGetTodayPunches;
}
