const expres = require('express')
const router = expres.Router();

module.exports = (db) => {
    // Read Data
    router.get('/matkul', (req,res)=>{
        const sql = 'SELECT * FROM matkul'
        db.query(sql, (error,results) => {
            if(error) return res.status(500).json({error: error.message})
            res.json(results)
        })
    })

    //Create
    router.post('/matkul', (req,res) =>{
        const {nama, kode,  sks, jadwal, jam} = req.body
        const sql = 'INSERT INTO matkul(nama, kode, sks, jadwal, jam) VALUES(?,?,?,?,?)'

        db.query(sql, [nama, kode, sks, jadwal, jam], (error, results)=>{
            if(error) return res.status(500).json({error: error.message})
            res.json({message: 'Data berhasil ditambah', id:results.insertId})
        })
    })

    //Update
    router.put('/matkul/:id',(req,res)=>{
        const {id} = req.params
        const {nama, kode, sks, jadwal, jam} = req.body
        const sql = 'UPDATE matkul SET nama=?, kode=?, sks=? , jadwal=? , jam=? WHERE id=?'

        db.query(sql, [nama, kode, sks, jadwal, jam, id], (error,results)=>{
            if(error) return res.status(500).json({error: error.message})
            res.json({message: 'Data berhasil di update'})
        })
    })

    //Delete
    router.delete('/matkul/:id',(req,res)=>{
        const {id} = req.params
        const sql = 'DELETE FROM matkul WHERE id = ?'

        db.query(sql, [id], (error,results)=>{
            if(error) return res.status(500).json({error: error.message})
            res.json({message: 'Data berhasil di hapus'})
        })
    })
    return router
}