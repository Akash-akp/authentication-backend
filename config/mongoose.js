const mongoose = require('mongoose');

async function main(){
    mongoose.connect('mongodb://localhost:27017/auth');
}

main().catch((err)=>console.log("error in connecting databs"));

db = mongoose.connection;

db.on('error',(err)=>console.log("Database Error"));

db.once('open',()=>{console.log("Server is connected to database")});

module.exports = db;