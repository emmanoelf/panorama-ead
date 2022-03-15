interface IDateProvider {
    addDays(days: number): Date;
    addHours(hours: number): Date;
    isResetPasswordTimeExpired(start_date: Date, end_date: Date): boolean;
    dateNow(): Date;
}

export { IDateProvider };
