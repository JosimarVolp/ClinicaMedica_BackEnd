//Importa módulo MySQL
const mysql = require( 'mysql' );

//Classe Consultas
class ConsultasDB {

    static connect() {

        var connection = mysql.createConnection( {

            host: 'us-cdbr-east-05.cleardb.net',
            user: 'b196e9e78fe490',
            password: '417a59e0',
            database: 'heroku_26a281f19358685'
            /*host: 'localhost',
            user: 'root',
            password: 'B14sF0rt3s@',
            database: 'clinica_medica'*/
            
        } );

        connection.connect();
        return connection;
    }

    static getConsultas( callback ) {

        let connection = ConsultasDB.connect();

        let sql = "select consultas.id, loginPaciente.nome as paciente, especialidades.nome as especialidade, loginMedico.nome as medico, consultas.data, consultas.hora from consultas inner join logins as loginPaciente on consultas.paciente = loginPaciente.cpf inner join especialidades on consultas.especialidade = especialidades.id inner join logins as loginMedico on consultas.medico = loginMedico.cpf";

        let query = connection.query( sql, function( error, results, fields) {

            if(error) throw error;

            callback( results );
        } );

        console.log(query.sql);

        connection.end();
    }

    static getConsultaPeloID( id, callback ) {

        //Conecta ao DB
        let connection = ConsultasDB.connect();

        let sql = "select * from consultas where id = ?";

        let query = connection.query( sql, id, function( error, results, fields ) {

            if( error ) throw error;

            if( results.length == 0 ) {

                console.log("Consulta não encontrada");
                return;
            }

            let consulta = results[0];

            callback( consulta );
        });

        console.log( query.sql );

        //Encerra a conexão
        connection.end();
    }

    static getConsultasPeloMedico( medico, callback ) {

        //Conecta ao DB
        let connection = ConsultasDB.connect();

        let sql = "select consultas.id, loginPaciente.nome as paciente, especialidades.nome as especialidade, loginMedico.nome as medico, consultas.data, consultas.hora from consultas inner join logins as loginPaciente on consultas.paciente = loginPaciente.cpf inner join especialidades on consultas.especialidade = especialidades.id inner join logins as loginMedico on consultas.medico = loginMedico.cpf where consultas.medico = '" + medico + "'";

        let query = connection.query( sql, function( error, results, fields ) {

            if( error ) throw error;

            if( results.length == 0 ) {

                console.log( "Esse médico não tem nenhuma consulta agendada.");
                return;
            }

            callback( results );
        });

        console.log( query.sql );

        //Encerra a conexão
        connection.end();
    }

    static getConsultasPeloPaciente( paciente, callback) {

        //Conecta ao DB
        let connection = ConsultasDB.connect();

        let sql = "select consultas.id, loginPaciente.nome as paciente, especialidades.nome as especialidade, loginMedico.nome as medico, consultas.data, consultas.hora from consultas inner join logins as loginPaciente on consultas.paciente = loginPaciente.cpf inner join especialidades on consultas.especialidade = especialidades.id inner join logins as loginMedico on consultas.medico = loginMedico.cpf where consultas.paciente = '" + paciente + "'";

        let query = connection.query( sql, function( error, results, fields ) {

            if( error ) throw error;

            if( results.length == 0 ) {

                console.log( "Esse paciente não tem consultas agendadas");
                return;
            }

            callback( results );
        });

        console.log( query, sql );

        //Encerra a conexão
        connection.end();
    }

    static getConsultasPelaEspecialidade( especialidade, callback ) {

        //Conecta ao DB
        let connection = ConsultasDB.connect();

        let sql = "select loginPaciente.nome as paciente, loginMedico.nome as medico, consultas.data, consultas.hora from consultas inner join logins as loginPaciente on consultas.paciente = loginPaciente.cpf inner join logins as loginMedico on consultas.medico = loginMedico.cpf where consultas.especialidade = " + especialidade + "";

        let query = connection.query( sql, function( error, results, fields ) {

            if( error ) throw error;

            if( results.length == 0 ) {

                console.log( "Nenhuma consulta agendada para essa especialidade" );
                return;
            }
            callback( results );
        });

        console.log( query.sql );

        //Encerra a conexão
        connection.end();
    }

    static getConsultasPelaData( data, callback ) {

        //Conecta ao DB
        let connection = ConsultasDB.connect();

        let sql = "select consultas.id, loginPaciente.nome as paciente, especialidades.nome as especialidade, loginMedico.nome as medico, consultas.data, consultas.hora from consultas inner join logins as loginPaciente on consultas.paciente = loginPaciente.cpf inner join especialidades on consultas.especialidade = especialidades.id inner join logins as loginMedico on consultas.medico = loginMedico.cpf where consultas.data = '" + data + "'";

        let query = connection.query( sql, function( error, results, fields ) {

            if( error ) throw error;

            if( results.length == 0 ) {

                console.log( "Nenhuma consulta agendada para essa data" );
                return;
            }
            callback( results );
        });

        console.log( query.sql );

        //Encerra a conexão
        connection.end();
    }

    static getHorariosPelaData( data, callback ) {

        //Conecta ao DB
        let connection = ConsultasDB.connect();

        let sql = "select hora from consultas where data = '" + data + "' AND funcionario = '" + funcionario + "'"; 

        let query = connection.query( sql, function( error, results, fields ) {

            if( error ) throw error;

            if( results.length == 0 ) {

                console.log( "Nenhum horario agendado para esta data" );
                return;
            }
            callback( results );
        });

        console.log( query.sql );

        //Encerra a conexão
        connection.end();
    }

    static save( consulta, callback ) {

        //Conecta ao DB
        let connection = ConsultasDB.connect();

        let sql = "insert into consultas set ? ";

        let query = connection.query( sql, consulta, function( error, results, fields ) {

            if( error ) throw error;

            consulta.id = results.insertId;

            callback( consulta );
        });

        console.log( query.sql );

        //Encerra a conexão
        connection.end();
    }

    static update( consulta, callback ) {

        //Conecta ao DB
        let connection = ConsultasDB.connect();

        let sql = "update consultas set ? where id = ? ";

        let id = consulta.id;

        let query = connection.query( sql, [consulta, id], function( error, results, fields ){

            if( error ) throw error;

            callback( consulta );
        });

        console.log( query.sql );

        //Encerra a conexão
        connection.end();
    }

    static delete( consulta, callback ) {

        //Conecta ao DB
        let connection = ConsultasDB.connect();

        let id = consulta.id;

        let sql = " delete from consultas where id = ? ";

        let query = connection.query( sql, id, function( error, results, fields ) {

            if( error ) throw error;

            callback( consulta );
        });

        console.log( query.sql );

        //Encerra a conexão
        connection.end();
    }

    static deletePeloID( id, callback ) {

        //Conecta ao DB
        let connection = ConsultasDB.connect();

        let sql = "delete from consultas where id = ? ";

        let query = connection.query( sql, id, function( error, results, fields) {

            if( error ) throw error;

            callback( results.affectedRows );
        });

        console.log( query.sql );

        //Encerra a conexão
        connection.end();
    }
 
    
}

module.exports = ConsultasDB;