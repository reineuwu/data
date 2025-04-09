"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const resizer_1 = require("./resizer");
const fileUtils_1 = require("./utils/fileUtils");
async function main() {
    try {
        const args = process.argv.slice(2);
        if (args.length < 2) {
            console.error('Usage: node dist/index.js <path-to-image-or-directory> <target-width> [target-height]');
            console.error('If only width is provided, height will be calculated to maintain aspect ratio');
            console.error('To specify only height, use 0 for width: node dist/index.js <path> 0 <height>');
            process.exit(1);
        }
        const inputPath = args[0];
        const targetWidth = parseInt(args[1]) || 0;
        const targetHeight = args.length > 2 ? parseInt(args[2]) || 0 : 0;
        if (targetWidth === 0 && targetHeight === 0) {
            console.error('Error: At least one dimension (width or height) must be specified');
            process.exit(1);
        }
        if (await (0, fileUtils_1.isDirectory)(inputPath)) {
            console.log(`Resizing all images in directory: ${inputPath}`);
            await (0, resizer_1.resizeImagesInDirectory)(inputPath, targetWidth, targetHeight);
        }
        else {
            console.log(`Resizing image: ${inputPath}`);
            const outputPath = path_1.default.join(path_1.default.dirname(inputPath), `${path_1.default.basename(inputPath, path_1.default.extname(inputPath))}_resized${path_1.default.extname(inputPath)}`);
            await (0, resizer_1.resizeImage)(inputPath, outputPath, targetWidth, targetHeight);
        }
        console.log('Resize operation completed successfully');
    }
    catch (error) {
        console.error('Error:', error instanceof Error ? error.message : String(error));
        process.exit(1);
    }
}
main();
