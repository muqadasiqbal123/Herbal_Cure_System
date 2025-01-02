import multer from 'multer';

const storage = multer.diskStorage({
    filename: function(req, file, callback){
        callback(null, file.originalname)
    }
})

const upload = multer({storage: storage})

export default upload;













// import multer from "multer";
// import path from "path";

// // Configure multer storage
// const storage = multer.diskStorage({
//     destination: (_req, _file, cb) => {
//         cb(null, "uploads/");
//     },
//     filename: (_req, file, cb) => {
//         cb(null, Date.now() + path.extname(file.originalname));
//     }
// });

// // File filter to only allow images
// const fileFilter = (_req, file, cb) => {
//     if (file.mimetype.startsWith("image/")) {
//         cb(null, true);
//     } else {
//         cb(new Error("Not an image! Please upload only images."), false);
//     }
// };

// // Initialize multer upload
// const upload = multer({
//     storage: storage,
//     fileFilter: fileFilter
//     // limits: {
//     //     fileSize: 5 * 1024 * 1024 // 5MB max file size
//     // }
// });

// export default upload;