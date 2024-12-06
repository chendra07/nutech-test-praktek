/* eslint-disable @typescript-eslint/no-unused-vars */
import * as fs from "fs";
import * as path from "path";
import { rimrafSync } from "rimraf";

export async function writeFile(
  fileBuffer: Buffer,
  savePath: string,
  fileName: string
) {
  const writePath = path.join(process.cwd(), savePath);
  try {
    await fs.promises.mkdir(writePath, { recursive: true });
    await fs.promises.writeFile(path.join(writePath, fileName), fileBuffer);

    return path.join(writePath.replace(process.cwd(), ""), fileName);
  } catch (error) {
    if (fs.existsSync(savePath)) {
      fs.rmSync(path.join(writePath, fileName), {
        recursive: true,
      });
    }
    throw new Error("R/W operation Failed");
  }
}

export async function readFile(savedPath: string) {
  try {
    return await fs.promises.readFile(path.join(process.cwd(), savedPath));
  } catch (error) {
    throw new Error("R/W operation Failed");
  }
}

export async function deleteFile(savedPath: string) {
  try {
    const pathFile = path.join(process.cwd(), savedPath);
    if (!fs.existsSync(pathFile)) {
      throw new Error();
    }

    fs.rmSync(pathFile, { recursive: true, force: true });
  } catch (error) {
    throw new Error("R/W operation Failed");
  }
}

export function cutAndPaste(
  oldPath: string,
  newPath: string,
  fileName: string
) {
  try {
    const sourcePath = path.join(process.cwd(), oldPath, fileName);
    const pastePath = path.join(process.cwd(), newPath);
    const pastePathWithFile = path.join(pastePath, fileName);

    if (!fs.existsSync(pastePath)) {
      fs.mkdirSync(pastePath, { recursive: true });
    }

    fs.renameSync(sourcePath, pastePathWithFile);

    return pastePathWithFile.replace(process.cwd(), "");
  } catch (error) {
    throw new Error("R/W operation Failed");
  }
}

export async function deleteFoldersRecursively(inputPath: string) {
  const directoryPath = path.join(process.cwd(), inputPath);

  return rimrafSync(directoryPath);
}
