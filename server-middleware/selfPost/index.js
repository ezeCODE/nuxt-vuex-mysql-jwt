const bodyParser = require('body-parser')
const app = require('express')()
app.use(bodyParser.json())
import { connection } from "../../plugins/mysql/connect";


app.post('/selfPost', (req, res) => {

    const sql = `select * from profiles where email = "${req.body.email}" `
    connection.query(sql, (error, results) => {
        res.json(results)
            //  res.json(results)
            //  res.json(results)
            // if (results.length > 0) {
            // } else {
            //     res.send("no reultados")
            // }

    })

})


module.exports = app