const bodyParser = require('body-parser')
const app = require('express')()
app.use(bodyParser.json())
import { connection } from "../../plugins/mysql/connect";


app.get('/readProfiles20', (req, res) => {

    const sql = 'select * from profiles limit 20'

    connection.query(sql, (error, results) => {
        res.json(results)

    })



})



module.exports = app