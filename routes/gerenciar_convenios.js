let express = require('express');

const router = express.Router();

const ConveniosDB = require("../Classes/conveniosDB");

//GET em /gerenciar_convenios

router.get( '/gerenciar_convenios', function( req, res ) {

    ConveniosDB.getConvenios( function( convenios ) {

        res.json( convenios );
    });
});

//GET em /gerenciar_convenios/id

router.get( '/gerenciar_convenios/:id(\\d+)', function( req, res ) {

    let id = req.params.id;

    ConveniosDB.getConvenioPeloID( id, function( convenio ) {

        res.json( convenio );
    });
});

//DELETE em /gerenciar_convenios/id

router.delete( '/gerenciar_convenios/:id(\\d+)', function( req, res ) {

    let id = req.params.id;

    ConveniosDB.deletePeloID( id, function( affectedRows ) {

        res.json( { msg: "O convênio foi deletado." });
    });
});

//GET em /gerenciar_convenios/status

router.get( '/gerenciar_convenios/:status', function( req, res ) {

    let status = req.params.status;

    ConveniosDB.getConveniosPeloStatus( status, function( convenios ) {

        res.json( convenios );
    });
});

//POST em /gerenciar_convenios

router.post( '/gerenciar_convenios', function( req, res ) {

    let convenio = req.body;

    ConveniosDB.save( convenio, function( convenio ) {

        res.json( convenio );
    });
});

router.put( '/gerenciar_convenios', function( req, res ) {

    let convenio = req.body;

    ConveniosDB.update( convenio, function( convenio ) {

        res.json( { msg: "O convênio foi atualizado" } );

    });

});

module.exports = router;