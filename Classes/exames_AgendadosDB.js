//Importa o módulo MySQL
const mysql = require('mysql');

//Classe Exames_Agendados
class ExamesAgendadosDB {

    static connect() {

        var connection = mysql.createConnection({

            host: 'us-cdbr-east-05.cleardb.net',
            user: 'b196e9e78fe490',
            password: '417a59e0',
            database: 'heroku_26a281f19358685'
            
        });

        connection.connect();
        return connection;
    }

    static getExamesAgendados( callback ) {

        //Conecta ao DB
        let connection = ExamesAgendadosDB.connect();

        //SQL para retornar a busca
        let sql = "select exames_agendados.id as id, loginCliente.nome as cliente, exames.nome as exame, loginFuncionario.nome as funcionario, exames_agendados.data, exames_agendados.hora from exames_agendados inner join logins as loginCLiente on exames_agendados.cliente = loginCliente.cpf inner join exames on exames_agendados.exame = exames.id inner join logins as loginFuncionario on exames_agendados.funcionario = loginFuncionario.cpf";

        let query = connection.query( sql, function( error, results, fields ) {

            if( error ) throw error;

            //Retorna resultado na função callback
            callback(results);
        });

        console.log(query.sql);

        connection.end();
    }

    static getExamesAgendadosPeloID( id, callback ) {

        //Conecta ao DB
        let connection = ExamesAgendadosDB.connect();

        let sql = "select * from exames_agendados where id = ? ";

        let query = connection.query( sql, id, function( error, results, fields ) {

            if( error ) throw error;

            if( results.length == 0 ) {

                console.log( "Exame Agendado não encontrado." );
                return;
            }

            let exame_agendado = results[0];

            callback( exame_agendado );
        });

        console.log( query.sql );

        //Encerra a conexão
        connection.end();
    }

    static getExamesAgendadosPeloExame( exame, callback ) {

        //Conecta ao DB
        let connection = ExamesAgendadosDB.connect();

        let sql = "select loginCliente.nome as cliente, exames.nome as exame, loginFuncionario.nome as funcionario, exames_agendados.data, exames_agendados.hora from exames_agendados inner join logins as loginCliente on exames_agendados.cliente = loginCliente.cpf inner join exames on exames_agendados.exame = exames.id inner join logins as loginFuncionario on exames_agendados.funcionario = loginFuncionario.cpf where exame = " + exame + "";

        let query = connection.query( sql, function( error, results, fields ) {

            if( error ) throw error;

            if( results.length == 0 ) {

                console.log("O exame pesquisado ainda não foi agendado");
                return;
            }

            callback( results );
        });

        console.log( query.sql );

        //Encerra a conexão
        connection.end();
    }

    static getExamesAgendadosPeloFuncionario( funcionario, callback ) {

        //Conecta ao DB
        let connection = ExamesAgendadosDB.connect();

        let sql = "select exames_agendados.id, loginCLiente.nome as cliente, exames.nome as exame, loginFuncionario.nome as funcionario, exames_agendados.data, exames_agendados.hora from exames_agendados inner join logins as loginCliente on exames_agendados.cliente = loginCLiente.cpf inner join exames on exames_agendados.exame = exames.id inner join logins as loginFuncionario on exames_agendados.funcionario = loginFuncionario.cpf where funcionario = '" + funcionario + "'";

        let query = connection.query( sql, function( error, results, fiels ) {

            if( error ) throw error;

            if( results.length == 0 ) {

                console.log( "Não existe nenhum exame agendado para esse funcionário" );
                return;
            }

            callback( results );
        });

        console.log( query.sql );

        //Encerra a conexão
        connection.end();
    }

    static getExamesAgendadosPeloCliente( cliente, callback ) {

        //Conecta ao DB
        let connection = ExamesAgendadosDB.connect();

        //SQL para consultar os exames agendados pelo cliente;
        let sql = "select exames_agendados.id, loginCliente.nome as cliente, exames.nome as exame, loginFuncionario.nome as funcionario, exames_agendados.data, exames_agendados.hora from exames_agendados inner join logins as loginCLiente on exames_agendados.cliente = loginCliente.cpf inner join exames on exames_agendados.exame = exames.id inner join logins as loginFuncionario on exames_agendados.funcionario = loginFuncionario.cpf where exames_agendados.cliente = '" + cliente + "'";

        let query = connection.query( sql, function( error, results, fields ) {

            if( error ) throw error;

            if( results.length == 0 ) {

                console.log( "Esse paciente não tem nenhum exame agendado");
                return;                
            }
            
            callback( results );
        });

        console.log( query.sql );

        //Encerra a conexão
        connection.end();
    }

    static getExamesAgendadosPelaData( data, callback ) {

        //Conecta ao DB
        let connection = ExamesAgendadosDB.connect();

        //SQL para consultar os exames agendados pela data
        let sql = "select loginCliente.nome as cliente, exames.nome as exame, loginFuncionario.nome as funcionario, exames_agendados.data, exames_agendados.hora from exames_agendados inner join logins as loginCliente on exames_agendados.cliente = loginCliente.cpf inner join exames on exames_agendados.exame = exames.id inner join logins as loginFuncionario on exames_agendados.funcionario = loginFuncionario.cpf where exames_agendados.data = '" + data + "'";

        let query = connection.query( sql, function( error, results, fields ) {

            if( error ) throw error;

            if( results.length == 0 ) {

                console.log( "Não existem exames agendados nesta data.");
            }

            callback( results );
        });

        console.log( query.sql );

        //Encerra a conexão
        connection.end();
    }

    static save( exame_agendado, callback) {

        //Conecta ao DB
        let connection = ExamesAgendadosDB.connect();

        let sql = " insert into exames_agendados set ? ";

        let query = connection.query( sql, exame_agendado, function( error, results, fields ) {

            if( error ) throw error;

            exame_agendado.id = results.insertId;

            callback( exame_agendado );
        });

        console.log( query.sql );

        //Encerra a conexão
        connection.end();
    }

    static update( exame_agendado, callback ) {

        //Conecta ao DB
        let connection = ExamesAgendadosDB.connect();

        let sql = " update exames_agendados set ? where id = ? ";

        let id = exame_agendado.id;

        let query = connection.query( sql, [exame_agendado, id], function( error, results, fields ) {

            if( error ) throw error;

            if( results.length == 0 ) {

                console.log( "O exame agendado que você quer atualizar não existe." );
                return;
            }

            callback( exame_agendado );
        });

        console.log( query.sql );

        //Encerra a conexão
        connection.end();        
    }

    static delete( exame_agendado, callback ) {

        //Conecta ao DB
        let connection = ExamesAgendadosDB.connect();

        let id = exame_agendado.id;

        ExamesAgendadosDB.getExamesAgendadosPeloID( id, function( exame_agendado) {
            
        });

        let sql = "delete from exames_agendados where id = ? ";

        let query = connection.query( sql, id, function( error, results, fields ) {

            if( error ) throw error;

            callback( exame_agendado );
        });

        console.log( query.sql );

        //Encerra a conexão
        connection.end();
    }

    static deletePeloID( id, callback ) {

        //Conecta ao DB
        let connection = ExamesAgendadosDB.connect();

        ExamesAgendadosDB.getExamesAgendadosPeloID( id, function( exame_agendado) {
            
        });

        let sql = " delete from exames_agendados where id = ? ";

        let query = connection.query( sql, id, function( error, results, fields ) {

            if( error ) throw error;

            callback( results.affectedRows );
        });

        console.log( query.sql );

        //Encerra a conexão
        connection.end();

    }
}

module.exports = ExamesAgendadosDB;