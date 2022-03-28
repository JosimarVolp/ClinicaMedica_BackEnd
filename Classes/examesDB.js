//Importa o módulo do MySQL
const mysql = require('mysql');

//Classe ExamesDB
class ExamesDB {

    //Função para conectar no banco de dados
    static connect() {

        //Cria a conexão com MySQL
        var connection = mysql.createConnection({

            host: 'localhost',
            user: 'root',
            password: 'B14sF0rt3s@',
            database: 'clinica_medica'
            
        });

        //Conecta ao Banco de Dados
        connection.connect();
        return connection;
    }

    //Retorna a lista de exames
    static getExames(callback) {

        //Conecta ao banco de dados
        let connection = ExamesDB.connect();

        //Cria uma consulta
        let sql = "select * from exames";
        let query = connection.query(sql, function(error, results, fields) {

            if(error) throw error;

            //Retorna os dados pela função de callback
            callback(results);
        });

        console.log(query.sql)
        
        //Fecha a conexão
        connection.end();
    }

    static getExamesPeloStatus(status, callback) {

        //Conecta ao banco de dados
        let connection = ExamesDB.connect();

        //Cria uma consulta
        let sql = "select * from exames where status = '" + status + "'";
        let query = connection.query(sql, function(error, results, fiels) {

            if(error) throw error;

            //Retorna os dados pela função callback
            callback(results)
        });

        console.log(query.sql);

        //Fecha a conexão
        connection.end();
    }

    static getExamePeloID(id, callback) {

        let connection = ExamesDB.connect();

        //Cria uma consulta
        let sql = "select * from exames where id = ?";

        let query = connection.query(sql, id, function(error, results, fiels) {

            if(error) throw error;

            if(results.length == 0) {

                console.log("Nenhum exame foi encontrado");
                return
            }
            //Encontrou o exame
            let exame = results[0];

            //Retorna o exame pela função de callback
            callback(exame);            
        });

        console.log(query.sql);

        //Fecha a conexão
        connection.end();
    }

    //Salva um exame no banco de dados
    //Recebe o JSON com dados do exame como parâmetro
    static save(exame, callback) {

        //Conecta o banco de dados
        let connection = ExamesDB.connect();

        //Insere o exame
        let sql = "insert into exames set ? ";
        let query = connection.query(sql, exame, function(error, results, fields) {

            if(error) throw error;

            //Atualiza o objeto carro do parâmetro com o "id" inserido
            exame.id = results.insertId;

            //Retorna o carro pela função de callback
            callback(exame)
        });

        console.log(query.sql);

        //Fecha a conexão
        connection.end();
    }

    //Atualiza um exame no banco de dados
    static update(exame, callback) {

        //Conecta ao banco de dados
        let connection = ExamesDB.connect();

        //SQL para atualizar o exame
        let sql = "update exames set ? where id = ? ";

        //Id do exame a atualizar
        let id = exame.id;

        let query = connection.query(sql, [exame, id], function( error, results, fields ) {

            if(error) throw error;

            callback(exame);
        });

        console.log(query.sql);

        //Fecha a conexão
        connection.end();
    }

    //Deleta um exame do banco de dados
    static delete(exame, callback) {

        //Conecta ao banco de dados
        let connection = ExamesDB.connect();

        //SQL para deletar o exame
        let sql = "delete from exames where id = ?";

        //Id do exame para deletar
        let id = exame.id;

        let query = connection.query(sql, id, function(error, results, fiels) {

            if(error) throw error;

            callback(exame);
        });

        console.log(query.sql);

        //Fecha a conexão
        connection.end();
    }

    //Deleta um exame por ID
    static deletePeloID(id, callback) {

        //Conecta ao banco
        let connection = ExamesDB.connect();

        //SQL para deletar o exame
        let sql = "delete from exames where id = ?";

        let query = connection.query(sql, id, function(error, results, fields) {

            if(error) throw error;
            callback(results.affectedRows);
        });

        console.log(query.sql);

        //Fecha a conexão
        connection.end();
    }
}

module.exports = ExamesDB;