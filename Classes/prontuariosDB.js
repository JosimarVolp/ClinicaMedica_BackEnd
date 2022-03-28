//Importa módulo MySQL
const mysql = require( 'mysql' );

//Classe Prontuários
class ProntuariosDB {

    static connect() {

        var connection = mysql.createConnection( {

            host: 'localhost',
            user: 'root',
            password: 'B14sF0rt3s@',
            database: 'clinica_medica'
            
        } );

        connection.connect();
        return connection;
    }

    static getProntuarios( callback ) {

        //Conecta ao DB
        let connection = ProntuariosDB.connect();

        //SQL para retornar dados
        let sql = "select * from prontuarios inner join logins on prontuarios.cpf = logins.cpf"

        let query = connection.query( sql, function( error, results, fields ) {

            if( error ) throw error;

            //Retorna o resultado na função callback
            callback( results );
        } );

        console.log( query.sql );

        //Fecha a conexão
        connection.end();
    }

    static getProntuarioPeloCPF( cpf, callback ) {

        //Conecta ao DB
        let connection = ProntuariosDB.connect();

        let sql = "select * from prontuarios where cpf = '" + cpf + "'";

        let query = connection.query( sql, cpf, function( error, results, fields ) {

            if( error ) throw error;

            if(results.length == 0 ){

                console.log( "Prontuário não encontrado" );
                return;
            }

            let prontuario = results[0];

            callback( prontuario );
        });

        console.log(query.sql);

        //Encerra a conexão
        connection.end();
    }

    static save( prontuario, callback ) {

        //Conecta ao DB
        let connection = ProntuariosDB.connect();

        let sql = "insert into prontuarios set ? ";

        let query = connection.query( sql, prontuario, function( error, results, fields ) {

            if( error ) throw error;

            callback( prontuario );
        });

        console.log( query.sql );

        //Encerra a conexão
        connection.end();
    }

    static update( prontuario, callback ) {

        //Conecta ao DB
        let connection = ProntuariosDB.connect();

        let cpf = prontuario.cpf;

        let sql = "update prontuarios set ? where cpf = '" + cpf + "'";

        let query = connection.query( sql, [prontuario, cpf], function( error, results, fields ) {

            if( error ) throw error;

            callback( prontuario );

        });

        console.log(query.sql);

        //Encerra a conexão
        connection.end();
    }

    static delete( prontuario, callback) {

        //Conecta ao DB
        let connection = ProntuariosDB.connect();

        let cpf = prontuario.cpf;
        
        let sql = "delete from prontuarios where cpf = '" + cpf + "'";

        let query = connection.query( sql, prontuario, function( error, results, fields ) {

            if( error ) throw error;

            callback( prontuario );
        });

        console.log(query.sql);        

        //Encerra a conexão
        connection.end();
    }

    static deletePeloCPF( cpf, callback) {

        //Conecta ao DB
        let connection = ProntuariosDB.connect();

        let sql = "delete from prontuarios where cpf = '" + cpf + "'";

        let query = connection.query( sql, cpf, function( error, results, fields ) {

            if( error ) throw error;

            callback( results.affectedRows );
        });

        console.log( query.sql );

        //Encerra a conexão
        connection.end();
    }

}

module.exports = ProntuariosDB;