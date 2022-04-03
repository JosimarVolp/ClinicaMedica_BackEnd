const cors = require('cors');

let express = require( 'express' );

let app = express();

let bodyParser = require( 'body-parser' );

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



// Configura para ler dados do POST por form-urlencoded e application/json
app.use( bodyParser.urlencoded( { extended: false } ) );
app.use( bodyParser.json() );
app.use(cors(corsOptions));


//Configura uma rota na raiz
app.get( '/', function( req, res ) {

    res.send( "API Clínica Médica" );    
});

//Rotas
app.use('/api', require('./routes/gerenciar_especialidades'));
app.use('/api', require('./routes/gerenciar_exames_e_procedimentos'));
app.use('/api', require('./routes/gerenciar_cargos'));
app.use('/api', require('./routes/gerenciar_convenios'));
app.use('/api', require('./routes/cadastrar_logins'));
app.use('/api', require('./routes/gerenciar_clientes'));
app.use('/api', require('./routes/gerenciar_enderecos'));
app.use('/api', require('./routes/gerenciar_medicos'));
app.use('/api', require('./routes/gerenciar_funcionarios'));
app.use('/api', require('./routes/gerenciar_consultas'));
app.use('/api', require('./routes/gerenciar_exames_e_procedimentos_agendados'));


const host =  "localhost"; //server.address().address;
const port = process.env.PORT || 4000; //server.address().port;


// Inicializa o servidor
app.listen(port, function() {    
    
    console.log( "Servidor iniciado em http://%s:%s", host, port );

});

