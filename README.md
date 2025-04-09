# Image Resizer Tool

This project is a Node.js application that provides a tool for resizing images to a specified resolution. It allows users to resize individual images or batch process all images in a directory.

## Features

- Resize a single image to a specified resolution.
- Batch resize all images in a directory to a common resolution.
- Maintain aspect ratio by specifying only width or height.
- Utility functions for reading and writing image files.

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/yourusername/image-resizer.git
   ```

2. Navigate to the project directory:

   ```
   cd image-resizer
   ```

3. Install the dependencies:

   ```
   npm install
   ```

## Usage

To use the image resizer tool, you can run the following command in your terminal:

```
node dist/index.js <path-to-image-or-directory> <target-width> [target-height]
```

If you provide only the width, the height will be calculated automatically to maintain the aspect ratio. Similarly, if you want to specify only the height, use 0 for width:

```
node dist/index.js <path-to-image-or-directory> 0 <target-height>
```

### Examples

To resize a single image by width (maintain aspect ratio):

```
node dist/index.js ./images/photo.jpg 800
```

To resize a single image by height (maintain aspect ratio):

```
node dist/index.js ./images/photo.jpg 0 600
```

To resize a single image with specific dimensions:

```
node dist/index.js ./images/photo.jpg 800 600
```

To resize all images in a directory by width:

```
node dist/index.js ./images 800
```

## Development

This project is built with TypeScript. To compile the TypeScript files, run:

```
npm run build
```

To run the application in development mode, use:

```
npm run start
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.