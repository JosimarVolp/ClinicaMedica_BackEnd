let express = require('express');

const router = express.Router();

const Exames_AgendadosDB = require('../Classes/exames_AgendadosDB')

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

//GET em /gerenciar_exames_e_procedimentos_agendados

router.get('/gerenciar_exames_e_procedimentos_agendados', function (req, res) {

    Exames_AgendadosDB.getExamesAgendados( function( exames_agendados ) {

        res.json( exames_agendados );
    });

});

//GET em /gerenciar_exames_e_procedimentos_agendados/id

router.get('/gerenciar_exames_e_procedimentos_agendados/:id(\\d+)', function(req, res) {

    let id = req.params.id;

    Exames_AgendadosDB.getExamesAgendadosPeloID( id, function( exame_agendado ) {

        res.json( exame_agendado );
    });
});

//GET em /gerenciar_exames_e_procedimentos_agendados/cliente/id

router.get('/gerenciar_exames_e_procedimentos_agendados/cliente/:cpf', function(req, res) {

    let cpf = req.params.cpf;

    Exames_AgendadosDB.getExamesAgendadosPeloCliente( cpf, function( exames_agendados ) {

        res.json( exames_agendados );
    });
});

//GET em /gerenciar_exames_e_procedimentos_agendados/funcionario/cpf

router.get('/gerenciar_exames_e_procedimentos_agendados/funcionario/:cpf', function(req, res) {

    let cpf = req.params.cpf;

    Exames_AgendadosDB.getExamesAgendadosPeloFuncionario( cpf, function( exames_agendados ) {

        res.json( exames_agendados );
    });
});

//DELETE em /gerenciar_exames_e_procedimentos_agendados/id

router.delete('/gerenciar_exames_e_procedimentos_agendados/:id(\\d+)', function(req, res) {

    let id = req.params.id;

    Exames_AgendadosDB.deletePeloID( id, function( affectedRows ) {

        res.json( { msg: "O exame foi desmarcado." } );
    });
});

//POST em /gerenciar_exames_e_procedimentos_agendados

router.post('/gerenciar_exames_e_procedimentos_agendados', function(req, res) {

    let exame = req.body;

    Exames_AgendadosDB.save( exame, function( exame ) {

        res.json( exame );
    });

});

//PUT em /gerenciar_exames_e_procedimentos_agendados

router.put('/gerenciar_exames_e_procedimentos_agendados', function ( req, res ) {

    let exame = req.body;

    Exames_AgendadosDB.update( exame, function(exame) {

        res.json( { msg: "O exame / procedimento agendado foi modificado" } );        
    });
});

module.exports = router;