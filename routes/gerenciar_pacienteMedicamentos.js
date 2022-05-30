let express = require('express');

const router = express.Router();

const paciente_MedicamentosDB = require('../Classes/paciente_MedicamentosDB');

router.get( '/gerenciar_pacienteMedicamentos/:cpf', function( req, res ) {

    let cpf = req.params.cpf;

    paciente_MedicamentosDB.getPaciente_MedicamentosPeloCPF( cpf, function( pacienteMedicamento ) {

        res.json( pacienteMedicamento );
    });
});

//POST em gerenciar_consultas

router.post('/gerenciar_pacienteMedicamentos', function(req, res) {

    let pacienteMedicamento = req.body;

    paciente_MedicamentosDB.save( pacienteMedicamento, function( pacienteMedicamento ) {

        res.json( pacienteMedicamento );
    });

});

router.put( '/gerenciar_pacienteMedicamentos', function( req, res ) {

    let pacienteMedicamento = req.body;

    paciente_MedicamentosDB.update( pacienteMedicamento, function( pacienteMedicamento ) {

        res.json( { msg: "Medicamento atualizado com sucesso" } );
    });
});



module.exports = router;