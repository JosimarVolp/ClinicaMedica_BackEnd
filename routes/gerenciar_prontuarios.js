let express = require('express');

const router = express.Router();

const ProntuariosDB = require('../Classes/prontuariosDB');

//Rota para retornar especialidades
router.get( '/gerenciar_prontuarios', function( req, res ) {

    ProntuariosDB.getProntuarios( function( prontuarios ) {
    
        res.json( prontuarios );
    });
});

//Rota para retornar especialidade pelo ID
router.get( '/gerenciar_prontuarios/:cpf', function( req, res ) { 

    let cpf = req.params.cpf;
    ProntuariosDB.getProntuarioPeloCPF( cpf, function( prontuario ) {

        res.json( prontuario );
    });
});

router.post('/gerenciar_prontuarios', function( req, res ) {

    let prontuario = req.body;

    ProntuariosDB.save( prontuario, function( prontuario ) {

        res.json( prontuario );
    });
});

router.put('/gerenciar_prontuarios', function( req, res ) {

    let prontuario = req.body;

    ProntuariosDB.update( prontuario, function ( prontuario ) {

        res.json( prontuario)
    }); 
});

module.exports = router;