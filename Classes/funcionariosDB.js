//Importa o módulo mysql
const mysql = require('mysql');

//Classe Funcionários
class FuncionariosDB {

    //Função para conectar no DB
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

    static getFuncionarios(callback) {

        //Conecta com o DB
        let connection = FuncionariosDB.connect();

        //SQL para a consulta
        let sql = "select * from funcionarios inner join logins on funcionarios.cpf = logins.cpf";

        let query = connection.query(sql, function(error, results, fields) {

            if(error) throw error;
            //Retorna os dados pela função de callback
            callback(results);
        });

        console.log(query.sql);

        //Fecha a conexão
        connection.end();
    }

    //Vai buscar os funcionários de acordo com a especialidade que atendem
    /*static getFuncionariosPelaEspecialidade( especialidade, callback ) {

        //Conecta ao DB
        let connection = FuncionariosDB.connect();

        let sql = "select * from funcionarios where especialidade = ?"

        let query = connection.query( sql, especialidade, function( error, results, fields ) {

            if( error ) throw error;

            callback( results );
        });

        console.log( query.sql );

        connection.end();
    };*/

    static getFuncionariosPeloCargo(cargo, callback) {

        //Conecta ao DB
        let connection = FuncionariosDB.connect();

        let sql = "select * from funcionarios where cargo = ?"

        let query = connection.query( sql, cargo, function( error, results, fields ) {

            if( error ) throw error;

            callback( results );
        });

        console.log(query.sql);

        //Encerra o DB
        connection.end();
    }

    static getFuncionariosPeloExameQueRealiza(exame_que_realiza, callback) {

        //Conecta ao DB
        let connection = FuncionariosDB.connect();

        let sql = " select * from funcionarios inner join logins on funcionarios.cpf = logins.cpf where funcionarios.exame_que_realiza = ? ";

        let query = connection.query( sql, exame_que_realiza, function( error, results, fields ) {

            if( error ) throw error;

            callback(results);
        });

        console.log(query.sql);

        //Encerra a conexão
        connection.end();
    }

    static getFuncionarioPeloCPF(cpf, callback) {

        //Conecta ao DB
        let connection = FuncionariosDB.connect();

        let sql = "select * from funcionarios where cpf = '" + cpf + "'";

        let query = connection.query( sql, cpf, function( error, results, fields ) {

            if( error ) throw error;

            if(results.length == 0 ) {

                console.log("Funcionário não encontrado");
                return;
            }

            let funcionario = results[0];

            callback( funcionario )
            
        });

        console.log(query.sql);

        //Encerra a conexão
        connection.end();
    }

    static save(funcionario, callback) {

        //Conecta ao DB
        let connection = FuncionariosDB.connect();

        let sql = "insert into funcionarios set ? ";

        let query = connection.query( sql, funcionario, function( error, results, fields ) {

            if( error ) throw error;

            callback( funcionario );
        });

        console.log(query.sql);

        //Encerra a conexão
        connection.end();
    }

    static update(funcionario, callbak) {

        //Conecta ao DB
        let connection = FuncionariosDB.connect();

        let cpf = funcionario.cpf;

        let sql = "update funcionarios set ? where cpf = '" + cpf + "'";

        let query = connection.query( sql, [funcionario, cpf], function( error, results, fields ) {

            if( error ) throw error;

            callbak( funcionario );
        });

        console.log(query.sql);

        //Encerra o DB
        connection.end();
    }

    static delete(funcionario, callback) {

        //Conecta ao DB
        let connection = FuncionariosDB.connect();

        let cpf = funcionario.cpf;
        
        let sql = "delete from funcionarios where cpf = '" + cpf + "'";

        let query = connection.query( sql, funcionario, function( error, results, fields ) {

            if( error ) throw error;

            callback( funcionario );
        });

        console.log(query.sql);

        //Encerra a conexão
        connection.end();
    }

    static deletePeloCPF(cpf, callback) {

        //Conecta ao DB
        let connection = FuncionariosDB.connect();

        let sql = "delete from funcionarios where cpf = '" + cpf + "'";

        let query = connection.query( sql, cpf, function( error, results, fields ) {

            if( error ) throw error;

            callback( results.affectedRows );
        });

        console.log(query.sql);

        //Encerra a conexão
        connection.end();
    }
}

module.exports = FuncionariosDB;