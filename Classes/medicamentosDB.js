//Importa o módulo mysql
const mysql = require('mysql');

//Classe Medicamentos
class MedicamentosDB {

    //Função para conectar ao DB
    static connect() {

        //Cria a conexão ocm MySQL
        var connection = mysql.createConnection({

            host: 'localhost',
            user: 'root',
            password: 'B14sF0rt3s@',
            database: 'clinica_medica'
            
        });

        //Conecta ao DB
        connection.connect();
        return connection;
    };

    static getMedicamentos(callback) {

        //Conecta ao DB
        let connection = MedicamentosDB.connect();

        //SQL para a consulta
        let sql = "select * from medicamentos";
        let query = connection.query(sql, function(error, results, fields) {

            if(error) throw error;
            //Retorna os dados pela função de callback
            callback(results);
        });
        
        console.log(query.sql);
        
        ///Encerra a conexão
        connection.end();
    }

    static getMedicamentoPeloID( id, callback ) {

        //Conecta ao DB
        let connection = MedicamentosDB.connect();

        let sql = "select * from medicamentos where id = ? ";

        let query = connection.query( sql, id, function( error, results, fields ) {

            if( error ) throw error;

            if( results.length == 0 ) {

                console.log( "Medicamento não encontrado" );
                return;
            }

            let medicamento = results[0];

            callback( medicamento );
        });

        console.log( query.sql );

        //Fecha conexão
        connection.end();
    }

    static save( medicamento, callback ) {

        //Conecta ao DB
        let connection = MedicamentosDB.connect();

        // SQL para inserir no DB
        let sql = "insert into medicamentos set ? ";

        let query = connection.query( sql, medicamento, function( error, results, fields) {

            if( error ) throw error;

            //Atualiza o objeto medicamento do parâmetro com o id inserido
            medicamento.id = results.insertId;

            //Retorna o medicamento pela função de callback
            callback(medicamento);
        });

        console.log(query.sql);

        //Fecha a conexão
        connection.end();
    }

    static update( medicamento, callback ) {

        //Conecta ao DB
        let connection = MedicamentosDB.connect();

        //SQL para atualizar o medicamento
        let sql = "update medicamentos set ? where id = ? ";

        let id = medicamento.id;

        let query = connection.query( sql, [medicamento, id], function( error, results, fields ) {

            if( error ) throw error;

            callback( medicamento );
        });

        console.log( query.sql );

        //Fecha o DB
        connection.end();
    }

    static delete( medicamento, callback ) {

        //Conecta ao DB
        let connection = MedicamentosDB.connect();

        let sql = "delete from medicamentos where id = ? ";

        let id = medicamento.id;

        let query = connection.query( sql, id, function( error, results, fields ) {

            if( error ) throw error;

            callback( medicamento );
        });

        console.log(query.sql);

        //Fecha a conexão
        connection.end();
    }

    static deletePeloID( id, callback ) {

        //Conecta ao DB
        let connection = MedicamentosDB.connect();

        let sql = "delete from medicamentos where id = ? ";

        let query = connection.query( sql, id, function( error, results, fields ) {

            if( error ) throw error;

            callback( results.affectedRows );
        });

        console.log( query.sql );

        //Fecha conexão
        connection.end();
    }
}

module.exports = MedicamentosDB;