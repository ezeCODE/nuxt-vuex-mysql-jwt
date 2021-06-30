const bodyParser = require('body-parser')
const app = require('express')()
app.use(bodyParser.json())
import { connection } from "../../plugins/mysql/connect";

app.post('/update/:email', (req, res) => {

    res.json({
        body: req.body.skills,
        params: req.params.email
    })

    const sql = `update profiles set skills = "${req.body.skills}" where email = "${req.params.email}"`
    connection.query(sql, (error) => {})

})

module.exports = app