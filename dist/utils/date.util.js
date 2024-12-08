"use strict";
/**
 * Adds a specified amount of time to a given date.
 *
 * @param {string} [input='0s'] - A string representing the amount of time to add.
 *                                The format should be a number followed by a unit:
 *                                - 'd' for days,
 *                                - 'h' for hours,
 *                                - 'm' for minutes,
 *                                - 's' for seconds.
 *
 * For example, '5d' to add 5 days, '-3h' to subtract 3 hours.
 *
 * @param {Date} [date=new Date()] - The date to which the time will be added. Defaults to the current date and time if not provided.
 * @returns {Date} - The new date with the added time.
 * @throws {Error} - Throws an error if the input format is invalid or if an invalid time unit is provided.
 *
 * @example
 * // Add 2 days to the current date
 * const newDate = addTimeToDate('2d');
 *
 * @example
 * // Subtract 3 hours from a specific date
 * const specificDate = new Date('2024-09-14T09:43:17');
 * const newDate = addTimeToDate('-3h', specificDate);
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.addTimeToDate = addTimeToDate;
exports.parseDuration = parseDuration;
exports.dateToUnix = dateToUnix;
exports.unixToDate = unixToDate;
function addTimeToDate(input = "0s", date = new Date()) {
    const regex = /^(-?\d+)([dhms])$/;
    const match = input.match(regex);
    if (!match) {
        throw new Error("Invalid input format");
    }
    const value = parseInt(match[1], 10);
    const unit = match[2];
    switch (unit) {
        case "d":
            date.setDate(date.getDate() + value);
            break;
        case "h":
            date.setHours(date.getHours() + value);
            break;
        case "m":
            date.setMinutes(date.getMinutes() + value);
            break;
        case "s":
            date.setSeconds(date.getSeconds() + value);
            break;
        default:
            throw new Error("Invalid time unit");
    }
    return date;
}
function parseDuration(input = "0s") {
    const regex = /^(-?\d+)([dhms])$/;
    const match = input.match(regex);
    if (!match) {
        throw new Error("Invalid duration format");
    }
    const value = parseInt(match[1], 10);
    const unit = match[2];
    switch (unit) {
        case "d":
            return value * 24 * 60 * 60 * 1000; // Hari ke milidetik
        case "h":
            return value * 60 * 60 * 1000; // Jam ke milidetik
        case "m":
            return value * 60 * 1000; // Menit ke milidetik
        case "s":
            return value * 1000; // Detik ke milidetik
        default:
            throw new Error("Invalid duration unit");
    }
}
function dateToUnix(input = Date.now()) {
    return Math.floor(input / 1000);
}
function unixToDate(input = Date.now()) {
    return new Date(input * 1000);
}
