import { ICaptchaOptions } from "./options";
import { sampleSize } from "lodash";

export function randomInt(min: number, max: number) {
    return Math.round(min + Math.random() * (max - min));
}

export function stripCharsFromString(string: string, chars: string) {
    return string.split("").filter((char) => chars.indexOf(char) === -1);
}

export function greyColour(min: number, max: number) {
    min = min || 1;
    max = max || 9;

    const int = randomInt(min, max).toString(16);

    return `#${int}${int}${int}`;
}

export function randomColour() {
    return `#${sampleSize("23456789", 3).join("")}`;
}

export function captchaText(options?: ICaptchaOptions) {
    const size = options.size ?? 6;
    const ignoreChars = options.ignoreChars ?? "";
    let i = -1;
    let out = "";
    let chars =
        options.charPreset ??
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    if (ignoreChars) {
        chars = stripCharsFromString(chars, ignoreChars) as any;
    }

    const len = chars.length - 1;

    while (++i < size) {
        out += chars[randomInt(0, len)];
    }

    return out;
}
