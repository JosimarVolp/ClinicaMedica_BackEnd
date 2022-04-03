let express = require('express');

const router = express.Router();

const ConveniosDB = require("../Classes/conveniosDB");

//GET em /gerenciar_convenios

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