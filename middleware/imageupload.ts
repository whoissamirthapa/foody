import { Request } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { promisify } from "util";

const storage = multer.diskStorage({
    destination: (req: Request, file, cb) => {
        cb(null, "./public/uploads/images");
    },
    filename: (req: Request, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, `${uniqueSuffix}-${file.originalname}`);
    },
});

const fileFilter = (
    req: Request,
    file: any,
    cb: (arg0: any, arg1: any) => void
) => {
    const fileTypes = /jpeg|jpg|png|gif/;

    //check mimetype
    const mimetype = fileTypes.test(file.mimetype);

    // check extention
    const extname = fileTypes.test(
        path.extname(file.originalname).toLocaleLowerCase()
    );

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        return cb("Error: Images Only!(i.e. jpeg,jpg,png,gif)", false);
    }
};

//2MB
const maxFileSize = 2097152;

const upload = multer({
    storage,
    limits: { fileSize: maxFileSize },
    fileFilter,
});

export const unlinkAsync = promisify(fs.unlink);

export default upload;
