let express = require('express');

const router = express.Router();

const FuncionariosDB = require('../Classes/funcionariosDB');

//GET em /gerenciar_funcionarios

router.get('/gerenciar_funcionarios', function (req, res) {

    FuncionariosDB.getFuncionarios( function( funcionarios ) {

        res.json( funcionarios );
    });
});



//GET em /gerenciar_funcionarios/exame_que_realiza

router.get('/gerenciar_funcionarios/:exame_que_realiza(\\d+)', function( req, res ) {

    let exame_que_realiza = req.params.exame_que_realiza;

    FuncionariosDB.getFuncionariosPeloExameQueRealiza( exame_que_realiza, function( funcionarios ) {
    
        res.json( funcionarios );
    });
})

router.get('/gerenciar_funcionarios/:cpf', function (req, res) {

    let cpf = req.params.cpf;

    FuncionariosDB.getFuncionarioPeloCPF( cpf, function( funcionario ) {

        res.json( funcionario );
    });

});

//GET em /gerenciar_funcionarios/cpf



//DELETE em /gerenciar_funcionarios/cpf

router.delete('/gerenciar_funcionarios/:cpf', function (req, res) {

    let cpf = req.params.cpf;

    FuncionariosDB.deleteFuncionarioPeloCPF( cpf, function( affectedRows ) {

        res.json({ msg: "O funcionário foi deletado." });
    });
});

//POST em /gerenciar_funcionarios

router.post('/gerenciar_funcionarios', function (req, res) {

    let funcionario = req.body;

    FuncionariosDB.save( funcionario, function ( funcionario ) {

        res.json( funcionario );
    });
});

//PUT em /gerenciar_funcionarios

router.put('/gerenciar_funcionarios', function (req, res) {

    let funcionario = req.body;

    FuncionariosDB.update( funcionario, function ( funcionario ) {

        res.json({ msg: "Funcionário atualizado com sucesso." });
    });

});

module.exports = router;