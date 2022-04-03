let express = require('express');

const router = express.Router();

const ExamesDB = require('../Classes/examesDB');

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

//GET

//Rota para exames
router.get( '/gerenciar_exames_e_procedimentos', function( req, res ) {

    ExamesDB.getExames( function(exames) {

        res.json( exames );
    });
});

// Rota para exames pelo ID
router.get( '/gerenciar_exames_e_procedimentos/:id(\\d+)', function( req, res ) {

    let id = req.params.id;
    ExamesDB.getExamePeloID( id, function( exame ) {

        res.json( exame );
    });
});

router.delete( '/gerenciar_exames_e_procedimentos/:id(\\d+)', function( req, res ) {

    let id = req.params.id;

    ExamesDB.deletePeloID( id, function( affectedRows ) {

        res.json( { msg: 'Exame deletado com sucesso' } )
    });

});

//Rota para exames pelo status
router.get( '/gerenciar_exames_e_procedimentos/:status', function( req, res ) {

    let status = req.params.status;
    ExamesDB.getExamesPeloStatus( status, function( exames ) {

        res.json( exames );
    });
});

router.post( '/gerenciar_exames_e_procedimentos', function( req, res ) {

    let exame = req.body;
    ExamesDB.save( exame, function( exame ){ 

        res.json( exame );
    });
});

router.put( '/gerenciar_exames_e_procedimentos', function( req, res ) {

    let exame = req.body;
    ExamesDB.update( exame, function( exame ) {

        res.json( exame );
    });
});

module.exports = router;