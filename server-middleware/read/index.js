const bodyParser = require('body-parser')
const app = require('express')()
const jwt = require('jsonwebtoken')
import checkingToken from "../../middleware/token";
app.use(bodyParser.json())
import { connection } from "../../plugins/mysql/connect";


app.get('/read', checkingToken, (req, res) => {

    const sql = 'select * from profiles'

    jwt.verify(req.token, 'secretKey', (error, authData) => {

        if (error) {
            res.statusCode(403)

        } else {

            jwt.verify(req.token, 'secretKey', (error, authData) => {

                if (error) {
                    res.statusCode(403)

                } else {

                    connection.query(sql, (error, result) => {
                        res.send(result)

                    })


                }
            })
        }
    })
})



module.exports = app