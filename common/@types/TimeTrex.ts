import { ICredentials } from "@common/@types/credentials";

export type IPunch = (
    credentials: ICredentials
) => Promise<{ success: true; data: string } | { success: false; error: string }>;

export type IGetTodayPunches = (
    credentials: ICredentials
) => Promise<{ success: true; data: string[] } | { success: false; error: string }>;

export type IValidateCredentials = (
    credentials: ICredentials
) => Promise<{ success: true } | { success: false; error: string }>;

export interface ITimeTrex {
    punch: IPunch;
    getTodayPunches: IGetTodayPunches;
    validateCredentials: IValidateCredentials;
}
