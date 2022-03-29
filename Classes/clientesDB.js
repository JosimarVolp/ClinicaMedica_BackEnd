//Importa módulo MySQL
const mysql = require ('mysql');

class ClientesDB {

    //Função para conexão ao DB
    static connect() {

        var connection = mysql.createConnection({

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

    static getClientes(callback) {

        let connection = ClientesDB.connect();

        //SQL da consulta
        let sql = "select * from clientes inner join logins on clientes.cpf = logins.cpf";
        let query = connection.query(sql, function(error, results, fields) { 

            if(error) throw error;

            callback(results);
        });

        console.log(query.sql);

        //Fecha a conexão
        connection.end();
    }

    static getClientePeloCPF( cpf, callback ) {

        //Conecta ao DB
        let connection = ClientesDB.connect();

        //SQL para consultar os clientes pelo CPF
        let sql = "select * from clientes where clientes.cpf = '" + cpf + "'";

        let query = connection.query( sql, cpf, function( error, results, fields ) {

            if( error ) throw error;

            if(results.length == 0) {

                console.log("Cliente não encontrado");
                callback( 0);
                return;
            }

            let cliente = results[0];

            callback( cliente );
        });

        console.log(query.sql);

        connection.end();
    }

    static save(cliente, callback) {

        //Conecta ao DB
        let connection = ClientesDB.connect();

        //SQL para adicionar um cliente ao DB
        let sql = "insert into clientes set ? " ;

        let query = connection.query( sql, cliente, function( error, results, fields ) {

            if( error ) throw error;

            //Retorna o cliente pela função de callback
            callback( cliente );
        });

        console.log(query.sql);

        //Fecha a conexão
        connection.end();
    }

    static update( cliente, callback) {

        let connection = ClientesDB.connect();

        let cpf = cliente.cpf;

        let sql  ="update clientes set ? where cpf = '" + cpf + "'";

        let query = connection.query( sql, [cliente, cpf], function( error, results, fields) {

            if( error ) throw error;

            callback( cliente );
        });

        console.log(query.sql);

        connection.end();
    }

    static delete( cliente, callback ) {

        let connection = ClientesDB.connect();

        let cpf = cliente.cpf;

        let sql = "delete from clientes where cpf = '" + cpf + "'";

        let query = connection.query( sql, cpf, function( error, results, fields ) {

            if( error ) throw error;

            callback( cliente );
        });

        console.log( query.sql );

        connection.end();
    }

    static deletePeloCPF( cpf, callback ) {

        //Conecta ao DB
        let connection = ClientesDB.connect();

        let sql = "delete from clientes where cpf = '" + cpf + "'";

        let query = connection.query( sql, cpf, function( error, results, fields ) {

            if( error ) throw error;

            callback( results.affectedRows );
        });

        console.log( query.sql );

        //Encerra a conexão
        connection.end();
    }

}

module.exports = ClientesDB