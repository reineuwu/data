"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeImageFile = exports.readImageFiles = void 0;
exports.isDirectory = isDirectory;
exports.getImageFilesInDirectory = getImageFilesInDirectory;
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
/**
 * Check if a path is a directory
 * @param directoryPath Path to check
 * @returns True if the path is a directory, false otherwise
 */
async function isDirectory(directoryPath) {
    try {
        const stats = await promises_1.default.stat(directoryPath);
        return stats.isDirectory();
    }
    catch (error) {
        throw new Error(`Error checking directory: ${error instanceof Error ? error.message : String(error)}`);
    }
}
/**
 * Get all image files in a directory
 * @param directoryPath Path to the directory
 * @returns Array of image file names
 */
async function getImageFilesInDirectory(directoryPath) {
    try {
        // Create a resized subdirectory if it doesn't exist
        const resizedDir = path_1.default.join(directoryPath, 'resized');
        try {
            await promises_1.default.mkdir(resizedDir);
        }
        catch (error) {
            // Ignore if directory already exists
            if (error instanceof Error && 'code' in error && error.code !== 'EEXIST') {
                throw error;
            }
        }
        const files = await promises_1.default.readdir(directoryPath);
        const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.tiff', '.bmp'];
        return files.filter(file => {
            const ext = path_1.default.extname(file).toLowerCase();
            return imageExtensions.includes(ext);
        });
    }
    catch (error) {
        throw new Error(`Error reading directory: ${error instanceof Error ? error.message : String(error)}`);
    }
}
const readImageFiles = async (directory) => {
    const files = await promises_1.default.readdir(directory);
    return files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file)).map(file => path_1.default.join(directory, file));
};
exports.readImageFiles = readImageFiles;
const writeImageFile = async (filePath, data) => {
    await promises_1.default.writeFile(filePath, data);
};
exports.writeImageFile = writeImageFile;
