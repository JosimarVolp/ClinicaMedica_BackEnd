// Importa as classes que comunicam com o Banco de Dados



//const ConsultasDB = require('./Classes/consultasDB');
//const ProntuariosDB = require( './Classes/prontuariosDB' );
//const ComorbidadesDB = require( './Classes/comorbidadesDB' );
//const Paciente_ComorbidadesDB = require( './Classes/paciente_ComorbidadesDB' );
//const MedicamentosDB = require( './Classes/medicamentosDB' );
//const Paciente_MedicamentosDB = require( './Classes/paciente_MedicamentosDB' );
//const Consulta_MedicamentosDB = require( './Classes/consulta_MedicamentosDB' );
//const ExamesAgendadosDB = require( './Classes/exames_AgendadosDB' );

const cors = require('cors');

let express = require( 'express' );

let app = express();

let bodyParser = require( 'body-parser' );

// Configura para ler dados do POST por form-urlencoded e application/json
app.use( bodyParser.urlencoded( { extended: false } ) );
app.use( bodyParser.json() );
app.use(cors());


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

