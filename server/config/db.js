const mysql = require('mysql2')
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    connectionLimit:10,
    database: process.env.DB_NAME,
    port: 3306
}).promise()


// const connectDb = async () =>{
//     await db.connect((err) =>{
//         if(err){
//             console.log("Connection Error",err.stack);
//             return;
//         }
//         console.log("Connected to DB")
//     })
// }

db.connect(
    (error)=>{
        if(!!error){
            console.log('error')
        }else{
            console.log("connected")
        }
    }
)


module.exports = {db}