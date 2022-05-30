// Importa módulo mysql
const mysql = require( 'mysql' );

//Classe Paciente_MedicamentosDB
class Paciente_MedicamentosDB {

    //Função que cria conexão com o DB
    static connect() {

        var connection = mysql.createConnection( {

            host: 'us-cdbr-east-05.cleardb.net',
            user: 'b196e9e78fe490',
            password: '417a59e0',
            database: 'heroku_26a281f19358685'
            
        });

        connection.connect();
        return connection;
    }

    static getPaciente_Medicamentos( callback ) {

        //Conecta ao DB
        let connection = Paciente_MedicamentosDB.connect();

        //SQL para realizar a consulta
        let sql = "select logins.nome as paciente, medicamentos.nome as medicamento from paciente_medicamentos inner join logins on paciente_medicamentos.cpf = logins.cpf inner join medicamentos on paciente_medicamentos.id_medicamento = medicamentos.id";

        let query = connection.query( sql, function( error, results, fields ) {

            if( error ) throw error;

            callback( results );
        });

        console.log(query.sql);

        connection.end();


    }

    static getPaciente_MedicamentosPeloCPF( cpf, callback ) {

        //Conecta ao DB
        let connection = Paciente_MedicamentosDB.connect();

        let sql = "select paciente_medicamentos.cpf as cpf, paciente_medicamentos.id_medicamento, medicamentos.nome as nome from paciente_medicamentos inner join medicamentos on medicamentos.id = paciente_medicamentos.id_medicamento where paciente_medicamentos.cpf = '" + cpf + "'";

        let query = connection.query( sql, cpf, function( error, results, fields ) {

            if( error ) throw error;

            if(results.length == 0) {

                console.log(" O paciente não usa medicamento");
                return;
            }

            let pacienteMedicamento = results[0]

            callback( pacienteMedicamento );
        });

        console.log(query.sql);

        //Encerra a conexão
        connection.end();
    }

    static save( paciente_medicamento, callback ) {

        //Conecta ao DB
        let connection = Paciente_MedicamentosDB.connect();

        let sql = "insert into paciente_medicamentos set ?";

        let query = connection.query( sql, paciente_medicamento, function( error, results, fields) {

            if( error ) throw error;

            callback( paciente_medicamento );
        });

        console.log(query.sql);

        //Encerra a conexão
        connection.end();
    }

    static update( paciente_medicamento, callback) {

        let connection = Paciente_MedicamentosDB.connect();
    
        let cpf = paciente_medicamento.cpf;
    
        let sql  ="update paciente_medicamentos set ? where cpf = '" + cpf + "'";
    
        let query = connection.query( sql, [paciente_medicamento, cpf], function( error, results, fields) {
    
            if( error ) throw error;
    
            callback( paciente_medicamento );
        });
    
        console.log(query.sql);
    
        connection.end();
    }
}



module.exports = Paciente_MedicamentosDB;