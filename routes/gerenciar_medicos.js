let express = require('express');

const router = express.Router();

const MedicosDB = require('../Classes/medicosDB');

//GET em /gerenciar_medicos

router.get('/gerenciar_medicos', function (req, res) {

    MedicosDB.getMedicos( function( medicos ) {

        res.json(medicos);
    });

});

//GET em /gerenciar_medicos/cpf

router.get('/gerenciar_medicos/:cpf', function (req, res) {

    let cpf = req.params.cpf;

    MedicosDB.getMedicoPeloCPF( cpf, function( medico ) {

        res.json( medico );
    });
});

//GET em /gerenciar_medicos/cpf

router.get('/gerenciar_medicos/especialidades/:especialidade(\\d+)', function (req, res) {

    let especialidade = req.params.especialidade;

    MedicosDB.getMedicosPelaEspecialidade( especialidade, function( medicos ) {

        res.json( medicos );
    });
});

//DELETE em /gerenciar_medicos/cpf

router.delete('/gerenciar_medicos/:cpf', function (req, res) {

    let cpf = req.params.cpf;

    MedicosDB.deleteMedicoPeloCPF( cpf, function( affectedRows ) {

        res.json( { msg: "Médico deletado com sucesso" } );
    });
});

//POST em /gerenciar_medicos

router.post('/gerenciar_medicos', function( req, res ) {

    let medico = req.body;

    MedicosDB.save( medico, function( medico ) {

        res.json( medico );
    });
});

//PUT em /gerenciar_medicos

router.put('/gerenciar_medicos', function( req, res ) {


    let medico = req.body;

    MedicosDB.update( medico, function( medico ) {

        res.json( { msg: "Médico atualziado com sucesso" } );
    })
});

module.exports = router;