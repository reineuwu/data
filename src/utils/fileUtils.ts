import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

/**
 * Check if a path is a directory
 * @param directoryPath Path to check
 * @returns True if the path is a directory, false otherwise
 */
export async function isDirectory(directoryPath: string): Promise<boolean> {
  try {
    const stats = await fs.stat(directoryPath);
    return stats.isDirectory();
  } catch (error: unknown) {
    throw new Error(`Error checking directory: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * Get all image files in a directory
 * @param directoryPath Path to the directory
 * @returns Array of image file names
 */
export async function getImageFilesInDirectory(directoryPath: string): Promise<string[]> {
  try {
    // Create a resized subdirectory if it doesn't exist
    const resizedDir = path.join(directoryPath, 'resized');
    try {
      await fs.mkdir(resizedDir);
    } catch (error: unknown) {
      // Ignore if directory already exists
      if (error instanceof Error && 'code' in error && error.code !== 'EEXIST') {
        throw error;
      }
    }
    
    const files = await fs.readdir(directoryPath);
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.tiff', '.bmp'];
    
    return files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return imageExtensions.includes(ext);
    });
  } catch (error: unknown) {
    throw new Error(`Error reading directory: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export const readImageFiles = async (directory: string): Promise<string[]> => {
    const files = await fs.readdir(directory);
    return files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file)).map(file => path.join(directory, file));
};

export const writeImageFile = async (filePath: string, data: Buffer): Promise<void> => {
    await fs.writeFile(filePath, data);
};