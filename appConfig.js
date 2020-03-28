var developmentDatabase = {
    postgres: {
    host: 'localhost',
    port: 5432,
    database: 'd69nmtsll7lp1t',
    user: 'ewjckmelvliahy',
    password: '40e86dafeebe4d01ba0eb87a5404107920e6625b747039da75889266dc80b4e7'
    }
    }
    
    var connectionString = "postgres://ewjckmelvliahy:40e86dafeebe4d01ba0eb87a5404107920e6625b747039da75889266dc80b4e7@ec2-3-229-210-93.compute-1.amazonaws.com:5432/d69nmtsll7lp1t";
    if (process.env.NODE_ENV == 'production') {
    //Production mode
    if (process.env.DATABASE_URL) {
    developmentDatabase =
    parseConnectionString(process.env.DATABASE_URL);
    } else {
    console.log("process.env.DATABASE_URL empty, connectionString.variable used");
    developmentDatabase = parseConnectionString(connectionString);
    }
    }else{
    //Development mode
    developmentDatabase = parseConnectionString(connectionString);
    }
    function parseConnectionString(connectionString) {
    if (connectionString) {
    var myRegexp = /(\w+):(\w+)@(.+):(\w+)\/(\w+)/g;
    var match = myRegexp.exec(connectionString);
    if (match.length == 6) {
    developmentDatabase.postgres.user = match[1];
    developmentDatabase.postgres.password = match[2];
    developmentDatabase.postgres.host = match[3];
    developmentDatabase.postgres.port = Number(match[4]);
    developmentDatabase.postgres.database = match[5];
    developmentDatabase.postgres.ssl = true;
    return developmentDatabase;
    }
    }
    console.log("connectionString cannot be parsed");
    return null;
    }
    module.exports = {
    hostname: "http://localhost",
    port: 5656,
    database: {
    postgres: developmentDatabase.postgres
    }
    }