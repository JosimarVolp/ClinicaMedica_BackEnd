//Importa módulo MySQl
const mysql = require('mysql');

//Classe Paciente_ComorbidadesDB
class Paciente_ComorbidadesDB {

    static connect() {

        var connection = mysql.createConnection( {

            host: 'us-cdbr-east-05.cleardb.net',
            user: 'b196e9e78fe490',
            password: '417a59e0',
            database: 'heroku_26a281f19358685'
            /*host: 'localhost',
            user: 'root',
            password: 'B14sF0rt3s@',
            database: 'clinica_medica'*/
            
        });

        connection.connect();
        return connection;
    }

    static getPaciente_Comorbidades( callback ) {

        //Conecta ao DB
        let connection = Paciente_ComorbidadesDB.connect();

        //SQL para retornar a consulta
        let sql = "select logins.nome as paciente, comorbidades.nome as comorbidade from paciente_comorbidades inner join logins on paciente_comorbidades.cpf = logins.cpf inner join comorbidades on paciente_comorbidades.comorbidade = comorbidades.id"

        let query = connection.query( sql, function( error, results, fields ) {

            if( error ) throw error;

            callback( results );
        });

        console.log(query.sql);

        connection.end();
    }

    static getPaciente_ComorbidadesPeloCPF( cpf, callback ) {

        //Conecta ao DB
        let connection = Paciente_ComorbidadesDB.connect();

        let sql = "select logins.nome as paciente, logins.cpf as cpf, comorbidade.nome as comorbidade from paciente_comorbidades inner join logins on paciente_comorbidades.cpf = logins.cpf inner join comorbidades on paciente_comorbidades.comorbidade = comorbidades.id where paciente_comorbidades.cpf = '" + cpf + "'";

        let query = connection.query( sql, cpf, function( error, results, fields ) {

            if( error ) throw error;

            if(results.length == 0) {

                console.log(" O paciente não tem comorbidade");
                return;
            }

            callback( results );
        });

        console.log(query.sql);

        //Encerra a conexão
        connection.end();
    }
}

module.exports = Paciente_ComorbidadesDB;