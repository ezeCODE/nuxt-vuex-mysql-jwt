const bodyParser = require('body-parser')
const app = require('express')()
app.use(bodyParser.json())
import { connection } from "../../plugins/mysql/connect";

app.post('/delete/:id', (req, res) => {

    const sql = `delete from profiles where id = "${req.params.id}" `

    connection.query(sql, (error) => {})

    res.json({
        params: req.params.id
    })

})



module.exports = app