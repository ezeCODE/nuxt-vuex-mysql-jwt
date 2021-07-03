const bodyParser = require('body-parser')
const app = require('express')()
import checkingToken from "../../middleware/token";
const jwt = require('jsonwebtoken')
app.use(bodyParser.json())
import { connection } from "../../plugins/mysql/connect";

app.post('/add', checkingToken, (req, res) => {


    const sql = `insert into profiles (email, fullName, age, skills) values 
    ("${req.body.email}",  "${req.body.fullName}", "${parseInt(req.body.age)}", "${req.body.skills}" )`

    jwt.verify(req.token, 'secretKey', (error, authData) => {

        if (error) {
            res.statusCode(403)

        } else {

            connection.query(sql, (error) => {

                res.send("profile created")

            })


        }
    })







})

module.exports = app