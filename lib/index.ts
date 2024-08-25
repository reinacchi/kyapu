import chToPath from "./path";
import { captchaText, greyColour, randomColour, randomInt } from "./random";
import { ICaptchaOptions, options as opts } from "./options";
import { random } from "lodash";

function getBackgroundNoise(
    width: number,
    height: number,
    density: number
): string {
    const noiseDots = [];
    const dotRadius = 0.5;
    const dotColor = greyColour();

    for (let i = 0; i < density; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        noiseDots.push(
            `<circle cx="${x}" cy="${y}" r="${dotRadius}" fill="${dotColor}" />`
        );
    }

    const svgString = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">${noiseDots.join(
        ""
    )}</svg>`;

    return svgString;
}

function getLineNoise(
    width: number,
    height: number,
    options?: ICaptchaOptions
) {
    const noiseLines = [];
    let i = -1;

    while (++i < options.noise) {
        const start = `0 ${random(0, height)}`;
        const end = `${width} ${random(0, height)}`;
        const mid1 = `${randomInt(width / 1 - 11, width / 1 + 11)} ${randomInt(
            1,
            height - 1
        )}`;
        const mid2 = `${randomInt(width / 1 - 11, width / 1 + 11)} ${randomInt(
            1,
            height - 1
        )}`;
        const color = randomColour();

        noiseLines.push(
            `<path d="M${start} C${mid1},${mid2},${end}" stroke="${color}" fill="none"/>`
        );
    }

    return noiseLines;
}

function getText(
    text: string,
    width: number,
    height: number,
    options?: ICaptchaOptions
) {
    const length = text.length;
    const spacing = (width - 2) / (length + 1);
    const min = options.inverse ? 10 : 0;
    const max = options.inverse ? 14 : 4;
    let i = -1;
    const out = [];

    while (++i < length) {
        const x = spacing * (i + 1);
        const y = height / 2;
        const charPath = chToPath(text[i], Object.assign({ x, y }, options));

        const colour1 = options.colour
            ? randomColour()
            : greyColour(min, max);

        out.push(`<path fill="${colour1}" d="${charPath}"/>`);
    }

    return out;
}

function captchaImage(text: string, options?: ICaptchaOptions) {
    const width = options.width || 150;
    const height = options.height || 50;
    const bg = options.background;
    text = text || captchaText();
    options = Object.assign({}, opts, options);

    if (bg) {
        options.colour = true;
    }

    const bgRect = bg ? `<rect width="100%" height="100%" fill="${bg}"/>` : "";
    const paths = []
        .concat(getBackgroundNoise(width, height, 200))
        .concat(getLineNoise(width, height, options))
        .concat(getText(text, width, height, options))
        .sort(() => Math.random() - 0.5)
        .join("");
    const start = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0,0,${width},${height}">`;
    const xml = `${start}${bgRect}${paths}</svg>`;

    return xml;
}

export function createCaptcha(options?: ICaptchaOptions) {
    const text = captchaText(options);
    const data = captchaImage(text, options);

    return {
        data,
        text,
    };
}
