let express = require("express");

const router = express.Router();

const CargosDB = require("../Classes/cargosDB")

//GET em /gerenciar_cargos

router.get( "/gerenciar_cargos", function( req, res ) {

    CargosDB.getCargos( function( cargos ) {

        res.json( cargos );
    });
}); 

//GET em /gerenciar_cargos/id

router.get( "/gerenciar_cargos/:id(\\d+)", function( req, res ) {

    let id = req.params.id;

    CargosDB.getCargoPeloID( id, function(cargo) {

        res.json( cargo );
    });
});

//DELETE em /gerenciar_cargos/id

router.delete("/gerenciar_cargos/:id(\\d+)", function( req, res) {

    let id = req.params.id;

    CargosDB.deletePeloID(id, function( affectedRows ) {

        res.json( { msg: "O cargo foi deletado com sucesso" })
        
    } )
});

//GET em /gerenciar_cargos/status

router.get("/gerenciar_cargos/:status", function( req, res ) {

    let status = req.params.status;

    CargosDB.getCargosPeloStatus( status, function( cargos ) {

        res.json( cargos );
    });
});

//POST em /gerenciar_cargos

router.post( "/gerenciar_cargos", function( req, res ) {

    let cargo = req.body;

    CargosDB.save( cargo, function( cargo ) {

        res.json( cargo );
    });
});

//PUT em /gerenciar_cargos

router.put("/gerenciar_cargos", function( req, res ) {

    let cargo = req.body;

    CargosDB.update( cargo, function( cargo ) {

        res.json( { msg: "O cargo foi atualizado" } );
    });
});

module.exports = router;