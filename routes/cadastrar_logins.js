let express = require('express');

const router = express.Router();

const LoginsDB = require('../Classes/loginsDB');

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



router.post('/cadastrar_login', function( req, res ) {

    let login = req.body;

    LoginsDB.save( login, function( login ) {

        res.json( login );

    });
});

router.get( '/gerenciar_logins', function( req, res ) {

    LoginsDB.getLogins( function( logins ) {

        res.json( logins );
    });
}); 

router.get( '/gerenciar_logins/perfil/:perfil', function( req, res ) {

    let perfil = req.params.perfil;

    LoginsDB.getLoginsPeloPerfil( perfil, function( logins ) {

        res.json( logins );
    });
});

router.get( '/gerenciar_logins/:cpf', function( req, res ) {

    let cpf = req.params.cpf;

    LoginsDB.getLoginPeloCPF( cpf, function( login ) {

        res.json( login );
    });
});

router.put( '/gerenciar_logins', function( req, res ) {

    let login = req.body;

    LoginsDB.update( login, function( logins ) {

        res.json( login );
    });
});

module.exports = router;