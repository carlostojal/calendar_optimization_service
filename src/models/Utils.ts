import { DayPeriod } from './DayPeriod';

export class Utils {

    static getDayPeriod(date: Date): DayPeriod {

        const hours = date.getHours();

        if (hours >= 8 && hours < 13) {
            return DayPeriod.MORNING;
        } else if (hours >= 14 && hours < 20) {
            return DayPeriod.AFTERNOON;
        } else {
            return DayPeriod.OFF_WORK;
        }
    }

    static getDateFromDayPeriod(dayPeriod: DayPeriod, date: Date): Date {
        let newDate = new Date(date);
        switch (dayPeriod) {
            case DayPeriod.MORNING:
                newDate.setHours(8);
                newDate.setMinutes(0);
                break;
            case DayPeriod.AFTERNOON:
                newDate.setHours(14);
                newDate.setMinutes(0);
                break;
            case DayPeriod.OFF_WORK:
                newDate.setHours(20);
                newDate.setMinutes(0);
                break;
        }

        return newDate;
    }

    static getDateFromBlockIndex(blockIndex: number, date: Date): Date {
        let newDate = new Date(date);
        newDate.setHours(Math.floor(blockIndex / 2));
        newDate.setMinutes((blockIndex % 2) * 30);
        return newDate;
    }

    static getDayPeriodFromBlockIndex(blockIndex: number, date: Date): DayPeriod {
        return this.getDayPeriod(this.getDateFromBlockIndex(blockIndex, date));
    }

    static getBlockIndex(date: Date): number {
        return date.getHours() * 2 + Math.floor(date.getMinutes() / 30);
    }

    static getDateStr(date: Date): string {
        return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    }
}