let express = require('express');

const router = express.Router();

const upload_image = require('../middleware/uploadImage');

router.post('/upload_image', upload_image.single('imagem') ,async function( req, res ) {

    

    return res.json({
        erro: false,
        mensagem:"Imagem enviada com sucesso!"
    })
});

module.exports = router;