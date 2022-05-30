let express = require('express');

const router = express.Router();

const paciente_ComorbidadesDB = require('../Classes/paciente_ComorbidadesDB');

router.get( '/gerenciar_pacienteComorbidades/:cpf', function( req, res ) {

    let cpf = req.params.cpf;

    paciente_ComorbidadesDB.getPaciente_ComorbidadesPeloCPF( cpf, function( pacienteComorbidade ) {

    

        res.json( pacienteComorbidade );
    });
});


//POST em gerenciar_consultas

router.post('/gerenciar_pacienteComorbidades', function(req, res) {

    let pacienteComorbidade = req.body;

    paciente_ComorbidadesDB.save( pacienteComorbidade, function( pacienteComorbidade ) {

        res.json( pacienteComorbidade );
    });

});

router.put( '/gerenciar_pacienteComorbidades', function( req, res ) {

    let pacienteComorbidade = req.body;

    paciente_ComorbidadesDB.update( pacienteComorbidade, function( pacienteComorbidade ) {

        res.json( { msg: "Cliente atualizado com sucesso" } );
    });
});



module.exports = router;