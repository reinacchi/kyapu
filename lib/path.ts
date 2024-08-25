import assert from "assert";

/**
 * idk what this does lolol
 * @param cmd Command
 */
function rndPathCmd(cmd: any) {
    const r = Math.random() * 0.2 - 0.1;

    switch (cmd.type) {
        case "M":
        case "L":
            cmd.x += r;
            cmd.y += r;
            break;
        case "Q":
        case "C":
            cmd.x += r;
            cmd.y += r;
            cmd.x1 += r;
            cmd.y1 += r;
            break;
        default:
            break;
    }

    return cmd;
}

export default function (text: string, options: any) {
    const ch = text[0];
    assert(ch, "expect a string");

    const fontSize = options.fontSize;
    const fontScale = fontSize / options.font.unitsPerEm;

    const glyph = options.font.charToGlyph(ch);
    const width = glyph.advanceWidth ? glyph.advanceWidth * fontScale : 0;
    const left = options.x - width / 2;

    const height = (options.ascender + options.descender) * fontScale;
    const top = options.y + height / 2;
    const path = glyph.getPath(left, top, fontSize);
    // Randomize path commands
    path.commands.forEach(rndPathCmd);

    const pathData = path.toPathData();

    return pathData;
}
