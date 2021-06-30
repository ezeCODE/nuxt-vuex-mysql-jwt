const bodyParser = require('body-parser')
const app = require('express')()
app.use(bodyParser.json())
import { connection } from "../../plugins/mysql/connect";


app.get('/readProfiles20', (req, res) => {

    // jwt.sign({ user }, 'secretKey', (err, token) => {

    //     res.json({ token })

    // })

    const sql = 'select * from profiles limit 20'

    connection.query(sql, (error, results) => {
        // res.send("profile created")
        if (results.length > 0) {

            res.json(results)
        } else {
            res.send("no reultados")
        }

    })




})

// jwt.sign({ user }, 'secretKey', (err, token) => {

//     res.json({ token })

// })


module.exports = app