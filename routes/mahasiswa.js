const expres = require('express')
const router = expres.Router();

module.exports = (db) => {
    // Read Data
    router.get('/mahasiswa', (req,res)=>{
        const sql = 'SELECT * FROM mahasiswa'
        db.query(sql, (error,results) => {
            if(error) return res.status(500).json({error: error.message})
            res.json(results)
        })
    })

    //Create
    router.post('/mahasiswa', (req,res) =>{
        const {nama, nim, fakultas} = req.body
        const sql = 'INSERT INTO mahasiswa(nama, nim, fakultas) VALUES(?,?,?)'

        db.query(sql, [nama, nim, fakultas], (error, results)=>{
            if(error) return res.status(500).json({error: error.message})
            res.json({message: 'Data berhasil ditambah', id:results.insertId})
        })
    })

    //Update
    router.put('/mahasiswa/:id',(req,res)=>{
        const {id} = req.params
        const {nama, nim, fakultas} = req.body
        const sql = 'UPDATE mahasiswa SET nama=?, nim=?, fakultas=? WHERE id=?'

        db.query(sql, [nama, nim, fakultas, id], (error,results)=>{
            if(error) return res.status(500).json({error: error.message})
            res.json({message: 'Data berhasil di update'})
        })
    })

    //Delete
    router.delete('/mahasiswa/:id',(req,res)=>{
        const {id} = req.params
        const sql = 'DELETE FROM mahasiswa WHERE id = ?'

        db.query(sql, [id], (error,results)=>{
            if(error) return res.status(500).json({error: error.message})
            res.json({message: 'Data berhasil di hapus'})
        })
    })
    return router
}