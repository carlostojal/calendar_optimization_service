import { DayPeriod } from './DayPeriod';

export class Utils {

    static getDayPeriod(date: Date): DayPeriod {

        const hours = date.getHours();

        if (hours >= 8 && hours < 13) {
            return DayPeriod.MORNING;
        } else if (hours >= 14 && hours < 20) {
            return DayPeriod.AFTERNOON;
        } else if (hours >= 21 && hours < 24) {
            return DayPeriod.EVENING;
        } else {
            return DayPeriod.OFF_WORK;
        }
    }

    static getDateStr(date: Date): string {
        return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    }
}