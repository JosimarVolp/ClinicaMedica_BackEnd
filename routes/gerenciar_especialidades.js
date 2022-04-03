let express = require('express');

const router = express.Router();

const EspecialidadesDB = require('../Classes/especialidadesDB');

//Rota para retornar especialidades
router.get( '/gerenciar_especialidades', function( req, res ) {

    EspecialidadesDB.getEspecialidades( function( especialidades ) {
    
        res.json( especialidades );
    });
});

//Rota para retornar especialidade pelo ID
router.get( '/gerenciar_especialidades/:id(\\d+)', function( req, res ) { 

    let id = req.params.id;
    EspecialidadesDB.getEspecialidadePeloID( id, function( especialidade ) {

        res.json( especialidade );
    });
});

router.delete( '/gerenciar_especialidades/:id(\\d+)', function( req, res ) {

    let id = req.params.id;

    EspecialidadesDB.deletePeloID( id, function ( affectedRows ) {

        res.json( { msg: "A especialidade foi deletada com sucesso" } );
    });
});

//Rota para retornar especialidades pelo status
router.get( '/gerenciar_especialidades/:status', function(req, res) { 

    let status =  req.params.status;
    EspecialidadesDB.getEspecialidadesPeloStatus( status, function(especialidades) {

        res.json( especialidades );
    });
});

router.post('/gerenciar_especialidades', function( req, res ) {

    let especialidade = req.body;

    EspecialidadesDB.save( especialidade, function( especialidade ) {

        res.json( especialidade );
    });
});

router.put('/gerenciar_especialidades', function( req, res ) {

    let especialidade = req.body;

    EspecialidadesDB.update( especialidade, function ( especialidade ) {

        res.json( especialidade)
    }); 
});

module.exports = router;