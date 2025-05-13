import multer from "multer";
import {v2 as cloudinary} from "cloudinary";
import {CloudinaryStorage} from "multer-storage-cloudinary";
import { multerSaveFilesOrg } from "multer-savefilesorg";

export const localUpload = multer({ dest: 'uploads' });

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

// export const remoteUpload = multer({
//     storage: multerSaveFilesOrg({
//         apiAccessToken: process.env.SAVEFILESORG_API_KEY,
//         relativePath: '/faivich-api/*'
//     })
// })

export const productImageUpload = multer({
    storage: multerSaveFilesOrg({
        apiAccessToken: process.env.SAVEFILESORG_API_KEY,
        relativePath: '/faivich-api/product-images/*'
    })
});

// export const productPicturesUpload = multer({
//     storage: multerSaveFilesOrg({
//         apiAccessToken: process.env.SAVEFILESORG_API_KEY,
//         relativePath: '/ecommerce-api/product-pictures/*'
//     })
// });

export const productPicturesUpload = multer({
    storage: new CloudinaryStorage({
        cloudinary,
        params: {
            folder: "/faivich-api/product-pictures"
        }
    })
});

export const profilePicturesUpload = multer({
    storage: new CloudinaryStorage({
        cloudinary,
        params: {
            folder: "/faivich-api/profile-pictures"
        }
    })
});

