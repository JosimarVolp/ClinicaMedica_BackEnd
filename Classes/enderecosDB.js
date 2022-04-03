//Importa módulo mysql
const mysql = require('mysql');

//Classe Endereços
class EnderecosDB {

    //Função para conectar ao DB
    static connect() {

        //Cria uma conexão com o MySQL
        var connection = mysql.createConnection({

            host: 'us-cdbr-east-05.cleardb.net',
            user: 'b196e9e78fe490',
            password: '417a59e0',
            database: 'heroku_26a281f19358685'
            
        });
        //Conecta ao DB
        connection.connect();
        return connection;
    }

    static getEnderecos(callback) {

        //Conecta ao DB
        let connection = EnderecosDB.connect();

        //Consulta SQL
        let sql = "select * from enderecos";

        let query = connection.query( sql, function(error, results, fields ) {

            if( error ) throw error;

            callback( results );
        });

        console.log( query.sql );

        //Fecha conexão 
        connection.end();
    }

    static getEnderecosPorCidade(cidade, callback) {


    }

    static getEnderecosPeloID(id, callback) {

        //Conecta ao DB
        let connection = EnderecosDB.connect();

        let sql = "select * from enderecos where id = ? ";

        let query = connection.query( sql, id, function( error, results, fields ) {

            if( error ) throw error;

            if( results.length == 0 ) {

                console.log("Endereço não encontrado");
                return;
            }

            let endereco = results[0];

            callback( endereco );
        });

        console.log(query.sql);
        
        //Fecha o DB
        connection.end();


    }

    static save(endereco, callback) {

        //Conecta ao DB
        let connection = EnderecosDB.connect();

        let sql = "insert into enderecos set ? ";

        let query = connection.query( sql, endereco, function( error, results, fields ) {

            if( error ) throw error;

            //Atualiza o objeto endereco do parâmetro com o id inserido
            endereco.id = results.insertId;

            callback(endereco);
        });

        console.log(query.sql);
        
        //Fecha a conexão
        connection.end();
    }

    static update(endereco, callback) {

        //Conecta ao DB
        let connection = EnderecosDB.connect();

        //SQL para inserir endereço no DB
        let sql = "update enderecos set ? where id = ? ";

        let id = endereco.id;

        let query = connection.query( sql, [endereco, id], function( error, results, fields ) {

            if( error ) throw error;

            callback( endereco );
        });

        console.log( query.sql );
        
        //Fecha conexão
        connection.end();
    }

    static delete(endereco, callback) {

        //Conecta ao DB
        let connection = EnderecosDB.connect();

        let sql = "delete from enderecos where id = ? ";

        let id = endereco.id;

        let query = connection.query( sql, id, function( error, results, fields ) {

            if( error ) throw error;

            callback( endereco );
        });

        console.log( query.sql );

        //Encerra a conexão
        connection.end();
    }

    static deletePeloID( id, callback ) {

        //Conecta ao DB
        let connection = EnderecosDB.connect();

        let sql = "delete from enderecos where id = ? ";

        let query = connection.query( sql, id, function( error, results, fields ) {

            if( error ) throw error;

            callback( results.affectedRows );
        });

        console.log( query.sql );

        //Encerra a conexão
        connection.end();
    }


};

module.exports = EnderecosDB;