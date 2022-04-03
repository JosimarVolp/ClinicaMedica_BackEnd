let express = require('express');

const router = express.Router();

const ClientesDB = require("../Classes/clientesDB");

//GET em /gerenciar_clientes

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

router.get('/gerenciar_clientes', function( req, res ) {

    ClientesDB.getClientes( function( clientes )  {

        res.json( clientes );
    });
});

//GET em /gerenciar_clientes/cpf

router.get( '/gerenciar_clientes/:cpf', function( req, res ) {

    let cpf = req.params.cpf;

    ClientesDB.getClientePeloCPF( cpf, function( cliente ) {

    

        res.json( cliente );
    });
});

//POST em /gerenciar_clientes

router.post( '/gerenciar_clientes', function( req, res ) {

    let cliente = req.body;

    ClientesDB.save( cliente, function( cliente ) {

        res.json( cliente );
    });
});

//PUT em /gerenciar_clientes

router.put( '/gerenciar_clientes', function( req, res ) {

    let cliente = req.body;

    ClientesDB.update( cliente, function( cliente ) {

        res.json( { msg: "Cliente atualizado com sucesso" } );
    });
});

//DELETE em /gerenciar_clientes/cpf

router.delete( '/gerenciar_clientes/:cpf', function( req, res) {

    let cpf = req.params.cpf;

    ClientesDB.deletePeloCPF( cpf, function( affectedRows) {

        res.json( { msg: "Cliente deletado com sucesso" } );
    });
});

module.exports = router;



