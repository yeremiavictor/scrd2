const expres = require('express')
const router = expres.Router();

module.exports = (db) => {
    // Read Data
    router.get('/dosen', (req,res)=>{
        const sql = 'SELECT * FROM dosen'
        db.query(sql, (error,results) => {
            if(error) return res.status(500).json({error: error.message})
            res.json(results)
        })
    })

    //Create
    router.post('/dosen', (req,res) =>{
        const {nama, nidn, prodi,fakultas} = req.body
        const sql = 'INSERT INTO dosen(nama, nidn, prodi,fakultas) VALUES(?,?,?,?)'

        db.query(sql, [nama, nidn, prodi, fakultas], (error, results)=>{
            if(error) return res.status(500).json({error: error.message})
            res.json({message: 'Data berhasil ditambah', id:results.insertId})
        })
    })

    //Update
    router.put('/dosen/:id',(req,res)=>{
        const {id} = req.params
        const {nama, nidn, prodi, fakultas} = req.body
        const sql = 'UPDATE dosen SET nama=?, nidn=?, prodi=?, fakultas=? WHERE id=?'

        db.query(sql, [nama, nidn, prodi, fakultas, id], (error,results)=>{
            if(error) return res.status(500).json({error: error.message})
            res.json({message: 'Data berhasil di update'})
        })
    })

    //Delete
    router.delete('/dosen/:id',(req,res)=>{
        const {id} = req.params
        const sql = 'DELETE FROM dosen WHERE id = ?'

        db.query(sql, [id], (error,results)=>{
            if(error) return res.status(500).json({error: error.message})
            res.json({message: 'Data berhasil di hapus'})
        })
    })
    return router
}