const { Pool } = require('pg')
const pool = new Pool({
  user: 'eric',
  host: 'localhost',
  database: 'products',
  port: 5432
})

pool.connect()
.then(() => {
  console.log('Connected to postgres')
})
.catch((err) => {
  console.log(err)
})

module.exports = pool;

//process.env
//aditional parameters

//focus on getting right data in correct shape
// then optimize
// stress testing

