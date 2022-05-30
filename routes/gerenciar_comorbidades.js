let express = require("express");

const router = express.Router();

const ComorbidadesDB = require("../Classes/comorbidadesDB")

//GET em /gerenciar_comorbidades

router.get( "/gerenciar_comorbidades", function( req, res ) {

    ComorbidadesDB.getComorbidades( function( comorbidades ) {

        res.json( comorbidades );
    });
}); 

//GET em /gerenciar_comorbidades/id

router.get( "/gerenciar_comorbidades/:id(\\d+)", function( req, res ) {

    let id = req.params.id;

    ComorbidadesDB.getComorbidadePeloID( id, function(comorbidade) {

        res.json( comorbidade );
    });
});

//DELETE em /gerenciar_comorbidades/id

router.delete("/gerenciar_comorbidades/:id(\\d+)", function( req, res) {

    let id = req.params.id;

    ComorbidadesDB.deletePeloID(id, function( affectedRows ) {

        res.json( { msg: "A comorbidade foi deletada com sucesso" })
        
    } )
});

//POST em /gerenciar_comorbidades

router.post( "/gerenciar_comorbidades", function( req, res ) {

    let comorbidade = req.body;

    ComorbidadesDB.save( comorbidade, function( comorbidade ) {

        res.json( comorbidade );
    });
});

//PUT em /gerenciar_cargos

router.put("/gerenciar_comorbidades", function( req, res ) {

    let comorbidade = req.body;

    ComorbidadesDB.update( comorbidade, function( comorbidade ) {

        res.json( { msg: "A comorbidade foi atualizada" } );
    });
});

module.exports = router;