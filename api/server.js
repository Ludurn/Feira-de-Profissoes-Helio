const express = require('express')
const cors = require('cors')
const multer = require('multer')
const supabase = require('./config/supabase')
const cloudinary = require('./config/cloudinary')
const streamifier = require('streamifier')
const { query } = require('express-validator')

const PORT = process.env.PORT || 3000
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/webp']

const app = express()
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const upload = multer({
  storage: multer.memoryStorage()
})

function registerUser(name, email, callback) {
  supabase
    .from('user_table')
    .insert({ user_name: name, user_email: email })
    .select('user_id')
    .single()
    .then(({ data, error }) => {
      if (error) return callback(error)
      callback(null, data.user_id)
    })
}

function registerImage(user_id, image_url, public_id, callback) {
  supabase
    .from('image_table')
    .insert({ user_id, image_url, public_id })
    .then(({ error }) => callback(error))
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



app.post('/sendData', upload.single('files'), (req, res) => {
  const { name, email } = req.body ?? {}
  const file = req.file

  if (!name) return res.send('EMPTY NAME')

  if (!email) return res.send('EMPTY EMAIL')

  if (!file) return res.send('NO FILE')

  const file_type = file.mimetype

  if (!ALLOWED_FILE_TYPES.includes(file_type)) {
    return res.send('NO FILE TYPE')
  }

  registerUser(name, email, (err, user_id) => {
    if (err) return res.send(err.message)

    const file_name = file.originalname
    const file_buffer = file.buffer

    uploadToCloudinary(file_buffer, { folder: 'user_image', public_id: file_name }, (err, cloudinaryRes) => {
      if (err) return res.send('Upload Failed')

      const image_url = cloudinaryRes.secure_url
      const public_id = cloudinaryRes.public_id

      registerImage(user_id, image_url, public_id, (err2) => {
        if (err2) return res.send(err2.message)

        res.send('SUCCESS')
      })
    })
  })
})

app.get('/getData/:token', (req, res) => {
  const token = req.params.token

  supabase
    .from('user_table')
    .select('*')
    .eq('user_id', token)
    .single()
    .then(({ data, error }) => {
      if (error) return res.send('ERROR')
      if (!data) return res.send('NULL')
      res.json(data)
    })
})

app.get('/getImages/', (req, res) => {

  supabase
    .from('image_table')
    .select('image_url')
    .then(({ data, error }) => {
      if (error) return res.send('ERROR')
      if (!data) return res.send('NULL')
      res.json(data)
    })
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
