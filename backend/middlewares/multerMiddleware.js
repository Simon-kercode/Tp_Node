const multer = require('multer');

// Middleware définissant la destination des images uploadées et leur nom
exports.multerMiddleware = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "frontend/public/uploads/productsImages/");
    },
    filename: function (req, file, cb) {
        const fileName = file.originalname
        cb(null, fileName);
    }
});