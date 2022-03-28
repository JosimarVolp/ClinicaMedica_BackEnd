//Importa o módulo mysql
const mysql = require('mysql');

//Classe CargosDB
class CargosDB {

    //Função para se conectar ao DB
    static connect() {

        //Cria a conexão com o MySQL
        var connection = mysql.createConnection({

            host: 'localhost',
            user: 'root',
            password: 'B14sF0rt3s@',
            database: 'clinica_medica'
            
        });

        //Conecta no DB
        connection.connect();
        return connection;
    }

    

    static getCargos( callback ) {

        //Conecta ao DB
        let connection = CargosDB.connect();

        //SQL para consultar
        let sql = "select * from cargos";
        let query = connection.query(sql, function(error, results, fields) {

            if(error) throw error;

            //Retorna os dados pela função de callback
            callback(results);
        });

        console.log(query.sql);

        //Fecha a conexão
        connection.end();
    }

    static getCargosPeloStatus( status, callback ) {

        //Conecta ao DB
        let connection = CargosDB.connect();

        //SQL para retornar a consulta
        let sql = "select * from cargos where status = '" + status + "'";

        let query = connection.query( sql, status, function( error, results, fields ) {

            if( error ) throw error;

            callback( results );
        });

        console.log(query.sql);

        connection.end();
    }

    static getCargoPeloID( id, callback ) {

        //Conecta ao DB
        let connection = CargosDB.connect();

        //SQL para rretornar pelo ID
        let sql = "select * from cargos where id = ? ";

        let query = connection.query( sql, id, function( error, results, fields ) {

            if( error ) throw error;

            if( results.length == 0 ) {

                console.log("Cargo não encontrado");
                return;
            }

            let cargo = results[0];

            callback( cargo );            
        });

        console.log(query.sql);

        connection.end();
    }

    static save( cargo, callback ) {

        //Conecta ao DB
        let connection = CargosDB.connect();

        //SQL para adicionar cargo ao DB
        let sql = "insert into cargos set ? ";

        let query = connection.query( sql, cargo, function( error, results, fields) {

            if(error) throw error;

            //Atualiza o objeto cargo do parâmetro com o ID inserido
            cargo.id = results.insertId;

            let novoId = results

            //Retorna o cargo pela função de callback
            callback(cargo);
        });

        console.log(query.sql);

        //Fecha a conexão
        connection.end();
    }

    static update( cargo, callback ) {

        //Conecta ao DB
        let connection = CargosDB.connect();

        //SQL para atualizar o cargo
        let sql = "update cargos set ? where id = ? ";

        //ID do cargo para atualizar
        let id = cargo.id;

        let query = connection.query( sql, [cargo, id], function( error, results, fields ) {

            if( error ) throw error;

            callback( cargo );
        });

        console.log(query.sql);

        connection.end();    
    }

    static delete( cargo, callback ) {

        //Conecta ao DB
        let connection = CargosDB.connect();

        //SQL para deletar
        let sql = "delete from cargos where id = ? ";

        //ID do carro para deletar
        let id = cargo.id;

        let query = connection.query( sql, id, function( error, results, fields ) {

            if( error ) throw error;

            callback( cargo );
        });

        console.log( query.sql );

        //Fecha a conexão
        connection.end();
    }

    static deletePeloID( id, callback ) {

        //Conecta ao DB
        let connection = CargosDB.connect();

        //SQL para deletar 
        let sql = "delete from cargos where id = ? ";

        let query = connection.query( sql, id, function( error, results, fields) {

            if( error ) throw error;

            callback(results.affectedRows);
        });

        console.log(query, sql);
        connection.end();
    }
};

module.exports = CargosDB;