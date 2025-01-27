const multer = require('multer');


module.exports = (
    multer({
        storage: multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, '../src/Uploads')
            },
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now();
                cb(null, `${uniqueSuffix}-${file.originalname}`);
              },
        }),
        fileFilter: (req, file,cb) => {
            const extensaoImg = ['image/png', 'img/jpg', 'img/jpeg'].find(formatoaceito => formatoaceito === file.mimetype);

            if(extensaoImg) {
                return cb(null, true)
            }

            return  cb(null, false)
        }
    })
)