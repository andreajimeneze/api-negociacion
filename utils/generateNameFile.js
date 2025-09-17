import fs from "fs";
import path from "path";

export function generateNameFile(filenameOriginal, filenameActual, slugSanitizado, folderName) {
  const ext = path.extname(filenameOriginal);
  const newFilename = `${slugSanitizado}${ext}`;
  const oldFilePath = path.join("public", "images", folderName, filenameActual);
  const newFilePath = path.join("public", "images", folderName, newFilename);

  fs.renameSync(oldFilePath, newFilePath);

  return `images/${folderName}/${newFilename}`;
}
