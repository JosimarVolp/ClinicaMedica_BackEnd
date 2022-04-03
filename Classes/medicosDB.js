//Importa módulo MySQL
const mysql = require('mysql');

//Classe Médicos
class MedicosDB {

    static connect() {

        var connection = mysql.createConnection( {

            host: 'us-cdbr-east-05.cleardb.net',
            user: 'b196e9e78fe490',
            password: '417a59e0',
            database: 'heroku_26a281f19358685'
            
        } );

        connection.connect();
        return connection;
    }

    static getMedicos( callback ) {

        //Conecta ao DB
        let connection = MedicosDB.connect();

        //SQL para a consulta
        let sql = "select * from medicos inner join logins on medicos.cpf = logins.cpf";
        let query = connection.query(sql, function(error, results, fields) {

            if(error) throw error;

            //Retorna o resultado na função de Callback
            callback(results);
        } );

        console.log(query.sql);

        //Fecha a conexão
        connection.end();
    }

    static getMedicoPeloCPF( cpf, callback) {

        //Conecta ao DB
        let connection = MedicosDB.connect();

        let sql = "select * from medicos where cpf = '" + cpf + "'";

        let query = connection.query( sql, cpf, function( error, results, fields ) {

            if( error ) throw error;

            if( results.length == 0 ) {

                console.log( "O médico não foi encontrado ");
                return;
            }

            let medico = results[0];

            callback( medico );
        } );

        console.log( query.sql );

        //Encerra a conexão
        connection.end();        
    }

    //Seleciona médicos pela especialidade

    static getMedicosPelaEspecialidade( especialidade, callback) {

        //Conecta ao DB
        let connection = MedicosDB.connect();

        let sql = "select medicos.cpf as cpf, logins.nome as nome from medicos inner join logins on medicos.cpf = logins.cpf where especialidade = ?";

        let query = connection.query( sql, especialidade, function( error, results, fields ) {

            if( error ) throw error;

            if( results.length == 0 ) {

                console.log( "Nenhum médico foi encontrado para a especialidade." );
                return;
            }

            callback( results );
        } );

        console.log( query.sql );

        //Encerra a conexão
        connection.end();        
    }

    static save( medico, callback ) {

        //Conecta ao DB
        let connection = MedicosDB.connect();

        let sql = "insert into medicos set ? ";

        let query = connection.query( sql, medico, function( error, results, fields ) {

            if( error ) throw error;

            callback( medico );
        });

        console.log(query.sql);

        //Encerra a conexão
        connection.end();

    }

    static update( medico, callback ) {

        //Conecta ao DB
        let connection = MedicosDB.connect();

        let cpf = medico.cpf;

        let sql = "update medicos set ? where cpf = '" + cpf + "'";

        let query = connection.query( sql, [medico, cpf], function( error, results, fields ) {

            if( error ) throw error;

            callback( medico );
        });

        console.log( query.sql );

        //Encerra a conexão
        connection.end();
    }

    static delete( medico, callback ) {

        //Conecta ao DB
        let connection = MedicosDB.connect();

        let cpf = medico.cpf;

        let sql = "delete from medicos where cpf = '" + cpf + "'";

        let query = connection.query( sql, cpf, function( error, results, fields ) {

            if( error ) throw error;

            callback( medico );
        });

        console.log(query.sql);

        //Encerra a conexão
        connection.end();        
    }

    static deletePeloCPF( cpf, callback ) {

        //conecta ao DB
        let connection = MedicosDB.connect();

        let sql = "delete from medicos where cpf = '" + cpf + "'";

        let query = connection.query( sql, cpf, function( error, results, fields ) {

            if( error ) throw error;

            callback( results.affectedRows);
        });

        console.log( query.sql );

        //Encerra a conexão
        connection.end();
    }
}

module.exports = MedicosDB;