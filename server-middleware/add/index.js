const bodyParser = require('body-parser')
const app = require('express')()
app.use(bodyParser.json())
import { connection } from "../../plugins/mysql/connect";

app.post('/add', (req, res) => {

    res.json({
        req: req.body
    })
    const sql = `insert into profiles (email, fullName, age, skills) values 
    ("${req.body.email}",  "${req.body.fullName}", "${parseInt(req.body.age)}", "${req.body.skills}" )`

    connection.query(sql, (error) => {
        // res.send("profile created")

    })



})

module.exports = app