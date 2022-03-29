// Importa módulo mysql
const mysql = require( 'mysql' );

//Classe Paciente_MedicamentosDB
class Paciente_MedicamentosDB {

    //Função que cria conexão com o DB
    static connect() {

        var connection = mysql.createConnection( {

            host: 'us-cdbr-east-05.cleardb.net',
            user: 'b7ef2893f6d649',
            password: 'fbc13551',
            database: 'heroku_7b57421e08276ee'
            /*host: 'localhost',
            user: 'root',
            password: 'B14sF0rt3s@',
            database: 'clinica_medica'*/
            
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
}

module.exports = Paciente_MedicamentosDB;