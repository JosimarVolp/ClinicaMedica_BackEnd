let express = require('express');

const router = express.Router();

const Exames_AgendadosDB = require('../Classes/exames_AgendadosDB')

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

//GET em /gerenciar_exames_e_procedimentos_agendados/status/status

router.get('/gerenciar_exames_e_procedimentos_agendados/status/:status', function(req, res) {

    let status = req.params.status;

    Exames_AgendadosDB.getExamesAgendadosPeloStatus( status, function( exames_agendados ) {

        res.json( exames_agendados );
    });
});

router.get('/gerenciar_exames_e_procedimentos_agendados/status/cliente/:cpf', function(req, res) {

    let cpf = req.params.cpf;

    Exames_AgendadosDB.getExamesRealizadosPorCliente( cpf, function( exames_agendados ) {

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