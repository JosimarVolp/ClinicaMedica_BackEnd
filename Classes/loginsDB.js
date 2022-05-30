//Importa o módulo mysql
const mysql = require('mysql');

//Classe LoginDB
class LoginsDB {

    //Função para conectar ao banco de dados
    static connect() {

        var connection = mysql.createConnection({

            host: 'us-cdbr-east-05.cleardb.net',
            user: 'b196e9e78fe490',
            password: '417a59e0',
            database: 'heroku_26a281f19358685'
            
        });
        //Conecta ao banco de dados
        connection.connect();
        return connection;
    }

    static getLogins(callback) {

        //Conecta ao banco
        let connection = LoginsDB.connect();

        //SQL para consulta
        let sql = "select * from logins";
        let query = connection.query(sql, function(error, results, fields) {

            if (error) throw error;

            callback(results);
        });
        
        console.log(query.sql);
        
        // Fecha a conexão
        connection.end();
    }

    static getLoginPeloCPF(cpf, callback) {

        //Conecta ao banco de dados
        let connection = LoginsDB.connect();

        //SQL para consultar
        let sql = "select * from logins where cpf = '" + cpf + "'";
        let query = connection.query(sql, cpf, function(error, results, fields) {

            if(error) throw error;

            //Não achou o login com o CPF procurado
            if(results.length == 0) {

                console.log("Nenhum login encontrado");
                return;
            }
            
            let login = results[0];

            callback( login );
        });

        console.log(query.sql);

        //Fecha a conexão
        connection.end();
    }

    static getLoginsPeloPerfil(perfil, callback) {

        //Conecta ao banco de dados
        let connection = LoginsDB.connect();

        //SQL para consulta
        let sql = "select * from logins where perfil = '" + perfil + "'";
        let query = connection.query(sql, perfil, function(error, results, fields) {

            if(error) throw error;
            callback(results);
        });

        console.log(query.sql);

        //Fecha a conexão com o DB
        connection.end();
    }

    static save(login, callback) {

        //Conecta ao DB
        let connection = LoginsDB.connect();

        //Consulta SQL
        let sql = "insert into logins set ? ";
        let query = connection.query(sql, login, function(error, results, fields) {

            if(error) throw error;

            //Retorna o login pela função de callback
            callback( login );
        });

        console.log( query.sql );

        //Fecha a conexão com o DB
        connection.end();
    }

    static update( login, callback ) {

        //Conecta ao DB
        let connection = LoginsDB.connect();

        //id do login a ser atualizado
        let cpf = login.cpf;

        //SQL para atualizar os dados
        let sql = "update logins set ? where cpf = '" + cpf +  "'";

        let query = connection.query(sql, [login, cpf], function(error, results, fields) {

            if(error) throw error;
            callback(login);
        });

        console.log(query.sql);

        //Fecha a conexão
        connection.end();
    }

    static delete( login, callback ) {

        //Conecta ao DB
        let connection = LoginsDB.connect();

        //CPF do login a ser deletado
        let cpf = login.cpf;
        
        //SQL para deletar
        let sql = "delete from logins where cpf = '" + cpf + "'";

        let query = connection.query(sql, cpf, function(error, results, fields) {

            if(error) throw error;

            callback(login);
        });
        console.log(query.sql);

        //Fecha a conexão com o DB
        connection.end();
    }

    static deletePeloCPF(cpf, callback) {

        //Conecta ao DB
        let connection = LoginsDB.connect();

        

        //SQL para deletar
        let sql = "delete from logins where cpf = '" + cpf + "'";

        let query = connection.query(sql, cpf, function(error, results, fields) {

            if(error) throw error;

            callback(results.affectedRows);
        });

        console.log(query.sql);

        //Fecha a conexão
        connection.end();
    }
}

module.exports = LoginsDB;