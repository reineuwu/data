import path from 'path';
import sharp from 'sharp';
import { getImageFilesInDirectory } from './utils/fileUtils';

/**
 * Resize an image while maintaining aspect ratio if only one dimension is provided
 * @param inputPath Path to the input image
 * @param outputPath Path where the resized image will be saved
 * @param targetWidth Target width (0 to calculate based on height)
 * @param targetHeight Target height (0 to calculate based on width)
 */
export async function resizeImage(
  inputPath: string,
  outputPath: string,
  targetWidth: number,
  targetHeight: number
): Promise<void> {
  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    
    if (!metadata.width || !metadata.height) {
      throw new Error(`Could not determine dimensions for image: ${inputPath}`);
    }
    
    let resizeOptions: sharp.ResizeOptions = {};
    
    if (targetWidth > 0 && targetHeight > 0) {
      // Both dimensions specified
      resizeOptions = { width: targetWidth, height: targetHeight };
    } else if (targetWidth > 0) {
      // Only width specified, calculate height to maintain aspect ratio
      const aspectRatio = metadata.width / metadata.height;
      resizeOptions = { 
        width: targetWidth, 
        height: Math.round(targetWidth / aspectRatio) 
      };
    } else {
      // Only height specified, calculate width to maintain aspect ratio
      const aspectRatio = metadata.width / metadata.height;
      resizeOptions = { 
        width: Math.round(targetHeight * aspectRatio), 
        height: targetHeight 
      };
    }
    
    await image.resize(resizeOptions).toFile(outputPath);
    console.log(`Resized image saved to: ${outputPath}`);
  } catch (error: unknown) {
    throw new Error(`Failed to resize image ${inputPath}: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * Resize all images in a directory
 * @param directoryPath Path to the directory containing images
 * @param targetWidth Target width (0 to calculate based on height)
 * @param targetHeight Target height (0 to calculate based on width)
 */
export async function resizeImagesInDirectory(
  directoryPath: string,
  targetWidth: number,
  targetHeight: number
): Promise<void> {
  try {
    const imageFiles = await getImageFilesInDirectory(directoryPath);
    
    if (imageFiles.length === 0) {
      console.log(`No image files found in directory: ${directoryPath}`);
      return;
    }
    
    console.log(`Found ${imageFiles.length} image files to resize`);
    
    // Create a resized subdirectory if it doesn't exist
    const resizedDir = path.join(directoryPath, 'resized');
    
    for (const imageFile of imageFiles) {
      const inputPath = path.join(directoryPath, imageFile);
      const outputPath = path.join(
        resizedDir,
        imageFile
      );
      
      await resizeImage(inputPath, outputPath, targetWidth, targetHeight);
    }
  } catch (error: unknown) {
    throw new Error(`Failed to resize images in directory ${directoryPath}: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export default { resizeImage, resizeImagesInDirectory };