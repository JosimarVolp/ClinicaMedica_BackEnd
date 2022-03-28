let express = require('express');

const router = express.Router();

const ClientesDB = require("../Classes/clientesDB");

//GET em /gerenciar_clientes

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



