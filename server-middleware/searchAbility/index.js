const bodyParser = require('body-parser')
const app = require('express')()
import checkingToken from "../../middleware/token";
const jwt = require('jsonwebtoken')
app.use(bodyParser.json())
import { connection } from "../../plugins/mysql/connect";



app.post('/searchAbility', checkingToken, (req, res) => {

    const sql = `select id, email, fullname, age, skills from profiles where skills like "%${req.body.search}%"`
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