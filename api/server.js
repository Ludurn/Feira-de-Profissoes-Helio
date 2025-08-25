const {Client} = require('pg')
const express = require('express')
const cors = require('cors')

const app = express()
const port = 3000

app.use(cors())
app.use(express.urlencoded({ extended: true }))

const con = new Client ({
    host: 'localhost',
    user: 'postgres',
    port: 5432,
    password: 'tetris',
    database: 'imagedb'
})

con.connect().then(() => {console.log('connected')})

app.post('/sendData', (req, res) => {
    const { name, email } = req.body ?? {}

    if (!name || !email) {
        return res.send('EMPTY')
    }

    const query = 'INSERT INTO user_table (user_name, user_email) VALUES ($1, $2)';

    con.query(query, [name, email], (err, result) => {
        if (err) {
            return res.send('ERROR')
        }
        res.send('SUCCESS')
    })
})

app.get('/getData/:token', (req, res) => {
    const token = req.params.token

    const query = 'SELECT * FROM user_table WHERE user_id = $1'

    con.query(query, [token], (err, result) => {
        if (err) {
            res.send('ERROR')
        } else if (result.rowCount <= 0) {
            res.send('NULL')
        } else {
            res.send(result.rows[0])
        }
    })
})

app.listen(port)