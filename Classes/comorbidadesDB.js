//Importa o módulo MySQL
const mysql = require('mysql');

class ComorbidadesDB {

    //Função para conectar ao DB
    static connect() {
        
        //Cria a conexão com o MySQL
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

        //Conecta ao DB
        connection.connect();
        return connection;
    }

    static getComorbidades(callback) {

        //Conecta ao DB
        let connection = ComorbidadesDB.connect();

        //SQL para consulta
        let sql = "select * from comorbidades";
        let query = connection.query(sql, function(error, results, fields) {

            if(error) throw error;

            //Retorna os dados pela função de callback
            callback(results);
        });

        console.log(query.sql);

        //Fecha a conexão
        connection.end();
    }

    static getComorbidadePeloID(id, callback) {

        //Conecta ao DB
        let connection = ComorbidadesDB.connect();

        //SQL para consultar pelo ID
        let sql = "select * from comorbidades where id = ? ";

        let query = connection.query( sql, id, function( error, results, fiels) {

            if( error ) throw error;

            if( results.length == 0 ) {

                console.log("A comorbidade não foi encontrada");
                return;
            }

            let comorbidade = results[0];

            callback( comorbidade );            
        });

        console.log(query.sql);
      
        connection.end();
    }

    static save( comorbidade, callback ) {

        let connection = ComorbidadesDB.connect();

        let sql = "insert into comorbidades set ? ";

        let query = connection.query( sql, comorbidade, function( error, results, fields) {

            if( error ) throw error;

            //Atualiza o objeto comorbidade do parâmetro com o id inserido
            comorbidade.id = results.insertId;

            callback(comorbidade);
        });

        console.log(query.sql);

        connection.end();
    }

    static update( comorbidade, callback ) {

        let connection = ComorbidadesDB.connect();

        let sql = "update comorbidades set ? where id = ? ";

        //ID da comorbidade para atualizar
        let id = comorbidade.id;

        let query = connection.query( sql, [comorbidade, id], function( error, results, fields ) {

            if(error) throw error;

            callback( comorbidade );
        });

        console.log(query.sql);

        connection.end();
    }

    static delete( comorbidade, callback ) {

        let connection = ComorbidadesDB.connect();

        let sql = "delete from comorbidades where id = ? ";

        let id = comorbidade.id;
        
        let query = connection.query( sql, id, function( error, results, fields) {

            if( error ) throw error;

            callback( comorbidade );
        });

        //console.log( query.sql );

        connection.end();
    }

    static deletePeloID( id, callback ) {

        let connection = ComorbidadesDB.connect();

        let sql = "delete from comorbidades where id = ? ";

        let query = connection.query( sql, id, function( error, results, fields ) {

            if( error ) throw error;

            callback( results.affectedRows );
        }); 

        console.log( query.sql );
        connection.end();
    }

}

module.exports = ComorbidadesDB;