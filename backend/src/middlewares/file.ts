import { Request, Express } from 'express'
import multer, { FileFilterCallback } from 'multer'
import { join, extname } from 'path'
import { existsSync, mkdirSync } from 'fs'
import uniqueSlug from 'unique-slug'

type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error: Error | null, filename: string) => void

export const initializeUploadDirectory = () => {
    const uploadPath = join(
        __dirname,
        process.env.UPLOAD_PATH_TEMP
            ? `../public/${process.env.UPLOAD_PATH_TEMP}`
            : '../public'
    );
    
    if (!existsSync(uploadPath)) {
        mkdirSync(uploadPath, { recursive: true });
    }
    
    return uploadPath;
};

// create temp directory on app start
const uploadPath = initializeUploadDirectory();

const storage = multer.diskStorage({
    destination: (
        _req: Request,
        _file: Express.Multer.File,
        cb: DestinationCallback
    ) => {
        cb(
            null,
            uploadPath
        )
    },

    filename: (
        _req: Request,
        file: Express.Multer.File,
        cb: FileNameCallback
    ) => {
        const fileExt = extname(file.originalname)
        const fileName = `${uniqueSlug()}${fileExt}`
        cb(null, fileName)
    },
})

const types = [
    'image/png',
    'image/jpg',
    'image/jpeg',
    'image/gif',
    'image/svg+xml',
]

const fileFilter = (
    _req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
) => {
    if (!types.includes(file.mimetype)) {
        return cb(null, false)
    }

    return cb(null, true)
}

export default multer({ storage, fileFilter })
