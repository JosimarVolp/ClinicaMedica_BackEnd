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

        let sql = "select paciente_comorbidades.cpf as cpf, paciente_comorbidades.comorbidade as comorbidade, comorbidades.nome as nome from paciente_comorbidades inner join comorbidades on comorbidades.id = paciente_comorbidades.comorbidade where paciente_comorbidades.cpf = '" + cpf + "'";

        let query = connection.query( sql, cpf, function( error, results, fields ) {

            if( error ) throw error;

            if(results.length == 0) {

                console.log(" O paciente não tem comorbidade");
                return;
            }

            let pacienteComorbidade = results[0];

            callback( pacienteComorbidade );
        });

        console.log(query.sql);

        //Encerra a conexão
        connection.end();
    }

    static save( paciente_comorbidade, callback ) {

        //Conecta ao DB
        let connection = Paciente_ComorbidadesDB.connect();

        let sql = "insert into paciente_comorbidades set ?";

        let query = connection.query( sql, paciente_comorbidade, function( error, results, fields) {

            if( error ) throw error;

            callback( paciente_comorbidade );
        });

        console.log(query.sql);

        //Encerra a conexão
        connection.end();
    }

    static update( paciente_comorbidade, callback) {

        let connection = Paciente_ComorbidadesDB.connect();

        let cpf = paciente_comorbidade.cpf;

        let sql  ="update paciente_comorbidades set ? where cpf = '" + cpf + "'";

        let query = connection.query( sql, [paciente_comorbidade, cpf], function( error, results, fields) {

            if( error ) throw error;

            callback( paciente_comorbidade );
        });

        console.log(query.sql);

        connection.end();
    }
}

module.exports = Paciente_ComorbidadesDB;