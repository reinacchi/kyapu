import { join } from "path";
import { loadSync } from "opentype.js";

export interface ICaptchaOptions {
    background?: string;
    charPreset?: string;
    colour?: boolean;
    fontSize?: number;
    height?: number;
    ignoreChars?: string;
    inverse?: boolean;
    noise?: number;
    size?: number;
    width?: number;
}

const preset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const fontPath = join(__dirname, "../Comismsh.ttf");
const font = loadSync(fontPath);
const ascender = font.ascender;
const descender = font.descender;

const options = {
    ascender,
    background: "#42B893",
    charPreset: preset,
    colour: true,
    descender,
    font,
    fontSize: Math.floor(50 * 0.9),
    height: 50,
    ignoreChars: "",
    noise: 6,
    size: 6,
    width: 150,
};

const loadFont = (filePath: string) => {
    const font = loadSync(filePath);
    options.font = font;
    options.ascender = font.ascender;
    options.descender = font.descender;
};

export { options, loadFont };
