// kenalan
const API_URL = 'http://localhost:3000/api/matkul'

document.addEventListener('DOMContentLoaded',loadData)
async function loadData(){
    try{
        const response = await fetch(API_URL)
        const data = await response.json()
    
        const tbody = document.getElementById('tableBody')
        tbody.innerHTML=''
    
        data.forEach(mtk =>{
            const row = `
            <tr>
                <td>${mtk.id}</td>
                <td>${mtk.nama}</td>
                <td>${mtk.kode}</td>
                <td>${mtk.sks}</td>
                <td>${mtk.jadwal}</td>
                <td>${mtk.jam}</td>
                <td>
                    <button 
                    class="btn btn-sm btn-warning"
                    onclick="editData(${mtk.id},'${mtk.nama}','${mtk.kode}','${mtk.sks}','${mtk.jadwal}','${mtk.jam}')">
                        edit
                    </button>
                    
                    <button
                    class="btn btn-sm btn-danger"
                    onClick="deleteData(${mtk.id})">
                        hapus
                    </button>
                </td>
            </tr>
            `
            tbody.innerHTML += row
        })
    } catch (error){
        console.error('Error:', error)
        alert('Server tidak ditemukan')
    }
}

document.getElementById('formMatkul').addEventListener('submit', async function(e){
    e.preventDefault()

    const id = document.getElementById('matkulId').value
    const nama = document.getElementById('nama').value
    const kode = document.getElementById('kode').value
    const sks = document.getElementById('sks').value
    const jadwal = document.getElementById('jadwal').value
    const jam = document.getElementById('jam').value

    let url = API_URL
    let method = 'POST'
    if(id){
        url = `${API_URL}/${id}`
        method = 'PUT'
    }

    try {
        const response = await fetch(url,{
            method: method,
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({nama, kode, sks, jadwal, jam})
        })
        const result = await response.json()
        alert(alert.message || 'Operasi Berhasil')

        document.getElementById('formMatkul').reset()
        document.getElementById('matkulId').value = ''
        loadData()
    } catch (error) {
        console.error('Error:', error)
        alert('Terjadi kesalahan')
    }
})

window.editData = function(id, nama, kode, sks,jadwal, jam){
    document.getElementById('matkulId').value=id
    document.getElementById('nama').value=nama
    document.getElementById('kode').value=kode
    document.getElementById('sks').value=sks
    document.getElementById('jadwal').value=jadwal
    document.getElementById('jam').value=jam
    window.scrollTo(0,0)
}

window.deleteData = async function(id){
    if(confirm('Yakin ingin menghapus data ini?')){
        try {
            const response = await fetch(`${API_URL}/${id}`,{
                method: 'DELETE'
            })
            const result = await response.json()
            alert(result.message)
            loadData()
        } catch (error) {
            console.error('Error:', error)
            alert('Gagal Menghapus Data')
        }
    }
}