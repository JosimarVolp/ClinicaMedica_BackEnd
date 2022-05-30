const multer = require('multer');

module.exports = ( multer({

    storage: multer.diskStorage({

        destination: function (req, file, cb) {

            cb(null, './public/images/');

        },
        filename: function (req, file, cb) {
                
                cb(null, file.originalname);
    
        }

    }),
})

)