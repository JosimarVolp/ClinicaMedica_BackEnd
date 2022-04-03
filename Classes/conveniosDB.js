const mysql = require('mysql');

class ConveniosDB {

    static connect() {

        var connection = mysql.createConnection({

            host: 'us-cdbr-east-05.cleardb.net',
            user: 'b196e9e78fe490',
            password: '417a59e0',
            database: 'heroku_26a281f19358685'
            
        });
        
        connection.connect();
        return connection;
    };

    static getConvenios(callback) {

        //Conecta ao DB
        let connection = ConveniosDB.connect();

        //Cria uma consulta
        let sql = "select * from convenios";
        let query = connection.query(sql, function(error, results, fields) {

            if(error) throw error;

            callback(results);
        });

        console.log(query.sql);

        //Fecha coneção
        connection.end();
    }

    static getConveniosPeloStatus(status, callback) {

        //Conecta ao DB
        let connection = ConveniosDB.connect();

        //Cria consulta
        let sql = "select * from convenios where status = '" + status + "'";
        let query = connection.query(sql, function(error, results, fields) {

            if(error) throw error;

            callback(results);
        });

        console.log(query.sql);

        //Fecha conexão
        connection.end();
    }

    static getConvenioPeloID(id, callback) {

        //Conecta ao DB
        let connection = ConveniosDB.connect();

        //Cria uma consulta
        let sql = "select * from convenios where id = ? ";
        let query = connection.query(sql, id, function(error, results, fields) {

            if(error) throw error;

            if(results.length == 0) {

                console.log("Nenhum convênio encontrado");
                return;
            }

            //Encontra o convênio

            let convenio = results[0];

            callback(convenio);
        });

        console.log(query.sql);

        //Fecha a conexão
        connection.end();
    }

    static save(convenio, callback) {

        //Conecta ao DB
        let connection = ConveniosDB.connect();

        //Insere o carro
        let sql = "insert into convenios set ? ";
        let query = connection.query(sql, convenio, function(error, results, fields) {

            if(error) throw error;

            //Atualiza o objeto convênio do parâmetro com o id inserido
            convenio.id = results.insertId;

            //Retorna o convênio pela função de callback
            callback(convenio);
        });

        console.log(query.sql);
    
        //Fecha a conexão
        connection.end();
    }

    static update( convenio, callback ) {

        //Conecta ao DB
        let connection = ConveniosDB.connect();

        //SQL para atualizar o convênio
        let sql = "update convenios set ? where id = ? ";

        //ID do convênio para atualizar
        let id = convenio.id;

        let query = connection.query( sql, [convenio, id], function( error, results, fields ) {

            if( error ) throw error;

            callback( convenio );
        });

        console.log( query.sql );

        //Fecha a conexão
        connection.end();
    }

    static delete(convenio, callback) {

        //Conecta ao DB
        let connection = ConveniosDB.connect();

        //SQL para deletar o convênio
        let sql = "delete from convenios where id = ? ";

        //ID do convênio a ser deletado
        let id = convenio.id;

        let query = connection.query(sql, id, function(error, results, fields) {

            if(error) throw error;

            callback(convenio);
        });

        console.log(query.sql);

        //Fecha conexão
        connection.end();
    }

    static deletePeloID(id, callback) {

        //Conecta ao DB
        let connection = ConveniosDB.connect();

        //SQL para deletar
        let sql = "delete from convenios where id = ? ";
        let query = connection.query(sql, id, function(error, results, fields) {

            if(error) throw error;
            callback(results.affectedRows);
        });

        console.log(query.sql);

        //Fecha a conexão
        connection.end();
    }
};

module.exports = ConveniosDB;