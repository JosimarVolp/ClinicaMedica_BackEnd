//Importa o módulo MySQL
const mysql = require( 'mysql' );

class Consulta_MedicamentosDB {

    static connect() {

        var connection = mysql.createConnection( {

            host: 'us-cdbr-east-05.cleardb.net',
            user: 'b196e9e78fe490',
            password: '417a59e0',
            database: 'heroku_26a281f19358685'
            
        });

        connection.connect();
        return connection;

    }

    static getConsulta_Medicamentos( callback ) {

        //Conecta ao DB
        let connection = Consulta_MedicamentosDB.connect();

        //SQL para retornar a consulta
        let sql = "select consulta_medicamentos.id_consulta as consulta, medicamentos.nome as medicamento from consulta_medicamentos inner join medicamentos on consulta_medicamentos.id_medicamento = medicamentos.id";

        let query = connection.query( sql, function( error, results, fields ) {

            if( error ) throw error;

            callback( results );
        });

        console.log(query.sql);

        connection.end();
    }

    static getConsulta_MedicamentosPelaConsulta( id_consulta, callback ) {

        //Conecta ao DB
        let connection = Consulta_MedicamentosDB.connect();

        let sql = "select * from consulta_medicamentos inner join medicamentos on medicamentos.id = consulta_medicamentos.id_medicamento where id_consulta = ? ";

        let query = connection.query( sql, id_consulta, function( error, results, fields ) {

            if( error ) throw error;

            callback(results);
        });

        console.log(query.sql);

        connection.end();
        //Encerra a conexão
    }

    static save( consulta_medicamento, callback ) {

        //Conecta ao DB
        let connection = Consulta_MedicamentosDB.connect();

        let sql = "insert into consulta_medicamentos set ?";

        let query = connection.query( sql, consulta_medicamento, function( error, results, fields) {

            if( error ) throw error;

            callback( consulta_medicamento );
        });

        console.log(query.sql);

        //Encerra a conexão
        connection.end();
    }

    static update( consulta_medicamento, callback ) { //ACHO QUE NÃO TEM JEITO

        //Conecta ao DB
        let connection = Consulta_MedicamentosDB.connect();

        let sql = "update consulta_medicamentos set ? where id_consulta = ? AND id_medicamento = ?";

        let id_consulta = consulta_medicamento.id_consulta;
        let id_medicamento = consulta_medicamento.id_medicamento;

        let query = connection.query( sql, [consulta_medicamento, id_consulta, id_medicamento], function( error, results, fields ) {

            if( error ) throw error;

            callback( consulta_medicamento );
        });

        console.log(query.sql);

        //Encerra a conexão
        connection.end();
    }

    static delete( consulta_medicamento, callback ) { //TEM DE ANALIZAR ESSE

        let connection = Consulta_MedicamentosDB.connect();

        let sql = "delete from consulta_medicamentos where id_consulta = ? AND id_medicamento = ?";

        let id_consulta = consulta_medicamento.id_consulta;
        let id_medicamento = consulta_medicamento.id_medicamento;

        let query = connection.query( sql, consulta_medicamento, function( error, results, fields ) {

            if( error ) throw error;

            callback( consulta_medicamento );
        });

        console.log(query.sql);

        //Encerra a conexão
        connection.end();
    }


}

module.exports = Consulta_MedicamentosDB;