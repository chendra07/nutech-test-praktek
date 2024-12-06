/* eslint-disable @typescript-eslint/no-unused-vars */
//add more types here if you need to support another file type
const acceptedMimeTypes = [
  'text/csv', // CSV
  'application/pdf', // PDF
  'application/zip', // ZIP archive
  'application/x-zip-compressed', // ZIP archive (windows)
  'image/jpeg', // JPEG images
  'image/jpg', // JPG images
  'image/png', // PNG images
  'image/webp',
  'image/.jpeg', // JPEG images (flutter)
  'image/.jpg', // JPG images (flutter)
  'image/.png', // PNG images (flutter)
  'image/.webp',
  'video/mp4', // MP4 video
] as const;

export type FileType = (typeof acceptedMimeTypes)[number];

export function isFileMimeValid(
  file: Express.Multer.File,
  acceptedExtension: FileType[],
) {
  const fileType = file.mimetype;

  if (acceptedExtension.includes(fileType as any)) {
    return true;
  }

  return false;
}
