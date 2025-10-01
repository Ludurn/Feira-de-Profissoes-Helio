const {Client} = require('pg')
const express = require('express')
const cors = require('cors')
const multer = require('multer')
const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier')
const { query } = require('express-validator')

const app = express()
const port = 3000

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

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

function registerUser(con, name, email, callback) {
    const query = 'INSERT INTO user_table (user_name, user_email) VALUES ($1, $2) RETURNING user_id'
    
    con.query(query, [name, email], (err, result) => {
        if (err) return callback(err)
        callback(null, result.rows[0].user_id)
    })
}

function uploadToCloudinary(file_buffer, options, callback) {
    const uploadStream = cloudinary.uploader.upload_stream(
        options,
        (error, result) => {
            callback(error, result)
        }
    )
    streamifier.createReadStream(file_buffer).pipe(uploadStream)
}

function registerImage(con, user_id, image_url, public_id, callback) {
    const query2 = 'INSERT INTO image_table (user_id, image_url, public_id) VALUES ($1, $2, $3)'

    con.query(query2, [user_id, image_url, public_id], callback)
}

app.post('/sendData', upload.single('files'), (req, res) => {
    const { name, email } = req.body ?? {}
    const file = req.file

    if (!name) return res.send('EMPTY NAME')

    if (!email) return res.send('EMPTY EMAIL')

    if (!file) return res.send('NO FILE')

    const file_type = file.mimetype
    const allowed_types = ['image/jpeg', 'image/png', 'image/webp']

    if (!allowed_types.includes(file_type)) {
        return res.send('NO FILE TYPE')
    }

    registerUser(con, name, email, (err, user_id) => {
        if (err) return res.send(err)
        
        const file_name = file.originalname
        const file_buffer = file.buffer

        uploadToCloudinary(file_buffer, { folder: 'user_image', public_id: file_name }, (err, cloudinaryRes) => {
            if (err) return res.send('Upload Failed')

            const image_url = cloudinaryRes.secure_url
            const public_id = cloudinaryRes.public_id

            registerImage(con, user_id, image_url, public_id, (err2) => {
                if (err2) return res.send(err2)

                res.send('SUCCESS')
            })
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

    const query = 'SELECT image_url FROM image_table WHERE user_id = $1'

    con.query(query, [token], (err, result) => {
        if (err) {
            res.send('ERROR')
        } else if (result.rowCount <= 0) {
            res.send('NULL')
        } else {
            const image_url = result.rows[0]
            res.send(image_url)
        }
    })
})

app.listen(port)
