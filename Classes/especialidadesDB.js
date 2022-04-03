//Importar o módulo mysql
const mysql = require('mysql');

//Cria a classe EspecialidadesDB
class EspecialidadesDB {

    //Função para conectar ao banco de dados
    static connect() {

        //Cria a conexão com mysql
        var connection = mysql.createConnection({

            host: 'us-cdbr-east-05.cleardb.net',
            user: 'b196e9e78fe490',
            password: '417a59e0',
            database: 'heroku_26a281f19358685'
            /*host: 'localhost',
            user: 'root',
            password: 'B14sF0rt3s@',
            database: 'clinica_medica'*/
            
        });

        //Conecta ao banco de dados
        connection.connect();
        return connection;
    };

    static getEspecialidades(callback) {

        //Conecta ao banco de dados
        let connection = EspecialidadesDB.connect();

        //Cria um consulta
        let sql = "select * from especialidades";
        let query = connection.query(sql, function(error, results, fields) {

            if(error) throw error;

            //Retorna os dados pela função de callback
            callback(results);
        });

        console.log(query.sql);

        //Fecha a conexão
        connection.end();
    }

    static getEspecialidadesPeloStatus(status, callback) {

        //Conecta ao banco de dados
        let connection = EspecialidadesDB.connect();

        //Cria a consulta
        let sql = "select * from especialidades where status = '" + status + "'";
        let query = connection.query( sql, status, function( error, results, fiels ) {

            if( error ) throw error;

            //Retorna os dados pela função de callback
            callback( results );
        });

        console.log(query.sql);

        //Fecha a conexão
        connection.end();
    }

    static getEspecialidadePeloID( id, callback ) {

        //Conecta ao DB
        let connection = EspecialidadesDB.connect();

        //Crio a conulta
        let sql = "select * from especialidades where id = ? ";
        let query = connection.query( sql, id, function( error, results, fiels ) {

            if(error) throw error;

            if(results.length == 0) {

                console.log("Nenhuma especialidade encontrada");
                return;
            }
            //Encontrou a especialidade
            let especialidade = results[0];

            //Retorna a especialidade pela função de callback
            callback( especialidade );
        });

        console.log(query.sql);

        //Fecha a conexão
        connection.end();
    }

    static save(especialidade, callback) {

        //Conecta ao banco de dados
        let connection = EspecialidadesDB.connect();

        //Insere o carro
        let sql = "insert into especialidades set ? ";
        let query = connection.query(sql, especialidade, function(error, results, fields) {

            if(error) throw error;

            //Atualiza o objeto especialidade do parâmetro com o id inserido
            especialidade.id = results.insertId;

            //Retorna o carro pela função de callbak
            callback(especialidade);
        });

        console.log(query.sql);

        //Fecha a conexão
        connection.end();
    }

    static update( especialidade, callback ) {

        //Conecta ao Banco de Dados
        let connection = EspecialidadesDB.connect();

        //SQL para atualizar a especialidade
        let sql = "update especialidades set ? where id = ? ";

        //Id da especialidade para atualizar
        let id = especialidade.id;
        let query = connection.query( sql, [especialidade, id], function( error, results, fields ) {

            if( error ) throw error;

            callback( especialidade );
        });

        console.log(query.sql);

        //Fecha a conexão
        connection.end();        
    }

    static delete(especialidade, callback) {

        //Conecta ao banco de dados
        let connection = EspecialidadesDB.connect();

        //SQL para deletar o carro
        let sql = "delete from especialidades where id = ?";

        //ID da especialidade a ser deletada
        let id = especialidade.id;
        let query = connection.query(sql, id, function(error, results,fields) {

            if(error) throw error;
            callback(especialidade);
        });

        console.log(query.sql);

        //Fecha a conexão
        connection.end();
    }

    static deletePeloID(id, callback) {

        //Conecta ao banco de dados
        let connection = EspecialidadesDB.connect();

        //SQL para deletar o carro
        let sql = "delete from especialidades where id = ?";
        let query = connection.query(sql, id, function(error, results, fields) {

            if(error) throw error;
            callback(results.affectedRows)
        });
        console.log(query.sql);

        //Fecha a conexão
        connection.end();
    }
}

module.exports = EspecialidadesDB;
