const {Client} = require('pg')
const express = require('express')
const cors = require('cors')
const multer = require('multer')

const app = express()
const port = 3000

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const upload = multer({
    storage: multer.memoryStorage()
})

const con = new Client ({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

con.connect().then(() => {console.log('connected')})

app.post('/sendData', upload.single('files'), (req, res) => {
    const { name, email } = req.body ?? {}

    if (!name || !email) {
        return res.send('EMPTY')
    }

    const query = 'INSERT INTO user_table (user_name, user_email) VALUES ($1, $2) RETURNING user_id'

    con.query(query, [name, email], (err, result) => {
        if (err) {
            return res.send(err)
        }

        const user_id = result.rows[0].user_id

        const query2 = 'INSERT INTO image_table (user_id, image_data) VALUES ($1, $2)'

        con.query(query2, [user_id, req.file.buffer], (err, result) => {
            if (err) {
                return res.send(err)
            }
            res.send('SUCCESS')
        })
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

app.get('/getImage/:token', (req, res) => {
    const token = req.params.token

    const query = 'SELECT image_data FROM image_table WHERE user_id = $1'

    con.query(query, [token], (err, result) => {
        if (err) {
            res.send('ERROR')
        } else if (result.rowCount <= 0) {
            res.send('NULL')
        } else {
            const file = result.rows[0]

            res.setHeader('Content-Type', 'image/png')
            res.setHeader('Content-Disposition', 'attachment; filename="image.png"')
            res.send(file.image_data)
        }
    })
})

app.listen(port)
