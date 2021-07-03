const bodyParser = require('body-parser')
const app = require('express')()
import checkingToken from "../../middleware/token";
const jwt = require('jsonwebtoken')
app.use(bodyParser.json())
import { connection } from "../../plugins/mysql/connect";

app.post('/update', checkingToken, (req, res) => {


    const sql = `update profiles set skills = "${req.body.skills}" where email = "${req.body.email}"`
    jwt.verify(req.token, 'secretKey', (error, authData) => {

        if (error) {
            res.statusCode(403)

        } else {
            connection.query(sql, (error) => {
                res.sendStatus(201)

            })

        }
    })


})

module.exports = app