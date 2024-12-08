"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeFile = writeFile;
exports.readFile = readFile;
exports.deleteFile = deleteFile;
exports.cutAndPaste = cutAndPaste;
exports.deleteFoldersRecursively = deleteFoldersRecursively;
/* eslint-disable @typescript-eslint/no-unused-vars */
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const rimraf_1 = require("rimraf");
async function writeFile(fileBuffer, savePath, fileName) {
    const writePath = path.join(process.cwd(), savePath);
    try {
        await fs.promises.mkdir(writePath, { recursive: true });
        await fs.promises.writeFile(path.join(writePath, fileName), fileBuffer);
        return path.join(writePath.replace(process.cwd(), ""), fileName);
    }
    catch (error) {
        if (fs.existsSync(savePath)) {
            fs.rmSync(path.join(writePath, fileName), {
                recursive: true,
            });
        }
        throw new Error("R/W operation Failed");
    }
}
async function readFile(savedPath) {
    try {
        return await fs.promises.readFile(path.join(process.cwd(), savedPath));
    }
    catch (error) {
        throw new Error("R/W operation Failed");
    }
}
async function deleteFile(savedPath) {
    try {
        const pathFile = path.join(process.cwd(), savedPath);
        if (!fs.existsSync(pathFile)) {
            throw new Error("no file detected");
        }
        fs.rmSync(pathFile, { recursive: true, force: true });
    }
    catch (error) {
        throw new Error("R/W operation Failed");
    }
}
function cutAndPaste(oldPath, newPath, fileName) {
    try {
        const sourcePath = path.join(process.cwd(), oldPath, fileName);
        const pastePath = path.join(process.cwd(), newPath);
        const pastePathWithFile = path.join(pastePath, fileName);
        if (!fs.existsSync(pastePath)) {
            fs.mkdirSync(pastePath, { recursive: true });
        }
        fs.renameSync(sourcePath, pastePathWithFile);
        return pastePathWithFile.replace(process.cwd(), "");
    }
    catch (error) {
        throw new Error("R/W operation Failed");
    }
}
async function deleteFoldersRecursively(inputPath) {
    const directoryPath = path.join(process.cwd(), inputPath);
    return (0, rimraf_1.rimrafSync)(directoryPath);
}
