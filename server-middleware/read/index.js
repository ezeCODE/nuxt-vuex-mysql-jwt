const bodyParser = require('body-parser')
const app = require('express')()
app.use(bodyParser.json())
import { connection } from "../../plugins/mysql/connect";


app.get('/read', (req, res) => {

    const sql = 'select * from profiles'

    connection.query(sql, (error, results) => {
        // res.send("profile created")
        if (results.length > 0) {

            res.json(results)
        } else {
            res.send("no reultados")
        }

    })




})


module.exports = app