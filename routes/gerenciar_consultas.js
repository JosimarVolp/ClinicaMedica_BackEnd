let express = require('express');

const router = express.Router();

const ConsultasDB = require('../Classes/consultasDB');

//GET em /gerenciar_consultas

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

router.get('/gerenciar_consultas', function (req, res) {

    ConsultasDB.getConsultas( function( consultas ) {

        res.json( consultas );
    }); 
});

//GET em /gerenciar_consultas/id

router.get('/gerenciar_consultas/:id(\\d+)', function (req, res) {

    let id = req.params.id;

    ConsultasDB.getConsultaPeloID( id, function ( consulta ) {

        res.json( consulta );
    });
});

//DELETE em /gerenciar_consultas/id

router.delete('/gerenciar_consultas/:id(\\d+)', function (req, res) {

    let id = req.params.id;

    ConsultasDB.deletePeloID( id, function( affectedRows ) {

        res.json( { msg: "Consulta deletada com sucesso." } );
    });

});

//GET em /gerenciar_consultas/cliente/cpf

router.get('/gerenciar_consultas/paciente/:cpf', function ( req, res ) {

    let cpf = req.params.cpf;

    ConsultasDB.getConsultasPeloPaciente(cpf, function ( consultas ) {

        res.json( consultas );
    });
});

//GET em /gerenciar_consultas/medico/cpf/

router.get('/gerenciar_consultas/medico/:cpf', function ( req, res ) {

    let cpf = req.params.cpf;

    ConsultasDB.getConsultasPeloMedico(cpf, function( consultas ) {

        res.json( consultas );
    });

});




//POST em gerenciar_consultas

router.post('/gerenciar_consultas', function(req, res) {

    let consulta = req.body;

    ConsultasDB.save( consulta, function( consulta ) {

        res.json( consulta );
    });

});

//PUT em /gerenciar_consultas

router.put('/gerenciar_consultas', function( req, res ) {

    let consulta = req.body;

    ConsultasDB.update( consulta, function( consulta ) {

        res.json( { msg: "Consulta atualizada com sucesso." } );
    });

});

module.exports = router;