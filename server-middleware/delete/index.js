const bodyParser = require('body-parser')
const app = require('express')()
import checkingToken from "../../middleware/token";
const jwt = require('jsonwebtoken')
app.use(bodyParser.json())
import { connection } from "../../plugins/mysql/connect";

app.post('/delete', checkingToken, (req, res) => {

    const sql = `delete from profiles where email = "${req.body.email}" and id = ${req.body.id} `

    connection.query(sql, (error) => {})

    jwt.verify(req.token, 'secretKey', (error, authData) => {

        if (error) {
            res.statusCode(403)

        } else {

            connection.query(sql, (error, results) => {

                res.json(results)

            })


        }
    })

})



module.exports = app