let express = require('express');

const router = express.Router();

const EnderecosDB = require("../Classes/enderecosDB");

//GET em /gerenciar_enderecos

const cors = require('cors');

let app = express();

var corsOptions = {

    origin: 'https://clinicamedicapucmg.herokuapp.com',
    optionsSuccessStatus: 200
}

app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', 'https://clinicamedicapucmg.herokuapp.com');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
});

app.use(cors(corsOptions));

router.get( '/gerenciar_enderecos', function( req, res ) {

    EnderecosDB.getEnderecos(function( enderecos ) {

        res.json( enderecos );

    });

});

//GET em /gerenciar_enderecos/id

router.get( '/gerenciar_enderecos/:id(\\d+)', function( req, res ) {

    let id = req.params.id;

    EnderecosDB.getEnderecosPeloID( id, function( endereco ) {

        res.json( endereco );

    });

});

//POST em /gerenciar_enderecos

router.post( '/gerenciar_enderecos', function( req, res ) {

    let endereco = req.body;

    EnderecosDB.save( endereco, function( endereco ) {
    
        res.json( endereco );
    });

});

module.exports = router;