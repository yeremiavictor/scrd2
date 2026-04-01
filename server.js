const express = require('express')
const mysql = require('mysql2')
const cors = require('cors')
const bodyParser = require('body-parser')
const mahasiswaRoutes = require('./routes/mahasiswa')
const dosenRoutes = require('./routes/dosen')
const matkulRoutes = require('./routes/matkul')

const app = express()
const port = 3000;

//middleware untuk  izin akses dari frontend
app.use(cors())
app.use(bodyParser.json()) //agar bisa membaca JS

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rootroot',
    database: 'victorcrudjs' //sesuaikan nama db Anda
})

db.connect((error)=>{
    if(error){
        console.error('Gagal koneksi ke DB',error)
        return;
    }
    console.log('Terhubung ke mysql')
})

//ROUTES Mahasiswa
app.use('/api/',mahasiswaRoutes(db))
app.use('/api/',dosenRoutes(db))
app.use('/api/',matkulRoutes(db))
//

// jalankan server
app.listen(port,()=> {
    console.log(`Server berjalan di http://localhost:${port}`)
})