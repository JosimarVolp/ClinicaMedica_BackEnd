let express = require('express');

const router = express.Router();

const consulta_MedicamentosDB = require('../Classes/consulta_MedicamentosDB');

//GET em /gerenciar_consultas/id

router.get('/gerenciar_consultaMedicamentos/:id_consulta(\\d+)', function (req, res) {

    let id_consulta = req.params.id_consulta;

    consulta_MedicamentosDB.getConsulta_MedicamentosPelaConsulta( id_consulta, function ( consultaMedicamento ) {

        res.json( consultaMedicamento );
    });
});



//DELETE em /gerenciar_consultas/id

router.delete('/gerenciar_consultas/:id(\\d+)', function (req, res) {

    let id = req.params.id;

    ConsultasDB.deletePeloID( id, function( affectedRows ) {

        res.json( { msg: "Consulta deletada com sucesso." } );
    });

});

//POST em gerenciar_consultas

router.post('/gerenciar_consultaMedicamentos', function(req, res) {

    let consultaMedicamento = req.body;

    consulta_MedicamentosDB.save( consultaMedicamento, function( consultaMedicamento ) {

        res.json( consultaMedicamento );
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