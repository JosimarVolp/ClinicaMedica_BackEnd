let express = require("express");

const router = express.Router();

const MedicamentosDB = require("../Classes/medicamentosDB")

//GET em /gerenciar_medicamentos

router.get( "/gerenciar_medicamentos", function( req, res ) {

    MedicamentosDB.getMedicamentos( function( medicamentos ) {

        res.json( medicamentos );
    });
}); 

//GET em /gerenciar_medicamentos/id

router.get( "/gerenciar_medicamentos/:id(\\d+)", function( req, res ) {

    let id = req.params.id;

    MedicamentosDB.getMedicamentoPeloID( id, function( medicamento ) {

        res.json( medicamento );
    });
});

//DELETE em /gerenciar_medicamentos/id

router.delete("/gerenciar_medicamentos/:id(\\d+)", function( req, res) {

    let id = req.params.id;

    MedicamentosDB.deletePeloID(id, function( affectedRows ) {

        res.json( { msg: "O medicamento foi deletado com sucesso" })
        
    } )
});

//POST em /gerenciar_medicamentos

router.post( "/gerenciar_medicamentos", function( req, res ) {

    let medicamento = req.body;

    MedicamentosDB.save( medicamento, function( medicamento ) {

        res.json( medicamento );
    });
});

//PUT em /gerenciar_medicamentos

router.put("/gerenciar_medicamentos", function( req, res ) {

    let medicamento = req.body;

    MedicamentosDB.update( medicamento, function( medicamento ) {

        res.json( { msg: "O medicamento foi atualizado" } );
    });
});

module.exports = router;