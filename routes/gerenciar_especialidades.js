
let express = require('express');

const router = express.Router();

const EspecialidadesDB = require('../Classes/especialidadesDB');

//Rota para retornar especialidades

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