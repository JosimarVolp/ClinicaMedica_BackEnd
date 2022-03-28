let express = require('express');

const router = express.Router();

const EnderecosDB = require("../Classes/enderecosDB");

//GET em /gerenciar_enderecos

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