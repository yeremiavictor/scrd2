// kenalan
const API_URL = 'http://localhost:3000/api/dosen'

document.addEventListener('DOMContentLoaded',loadData)
async function loadData(){
    try{
        const response = await fetch(API_URL)
        const data = await response.json()
    
        const tbody = document.getElementById('tableBody')
        tbody.innerHTML=''
    
        data.forEach(dos =>{
            const row = `
            <tr>
                <td>${dos.id}</td>
                <td>${dos.nama}</td>
                <td>${dos.nidn}</td>
                <td>${dos.prodi}</td>
                <td>${dos.fakultas}</td>
                <td>
                    <button 
                    class="btn btn-sm btn-warning"
                    onclick="editData(${dos.id},'${dos.nama}','${dos.nidn}','${dos.prodi}','${dos.fakultas}')">
                        edit
                    </button>
                    
                    <button
                    class="btn btn-sm btn-danger"
                    onClick="deleteData(${dos.id})">
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

document.getElementById('formDosen').addEventListener('submit', async function(e){
    e.preventDefault()

    const id = document.getElementById('dosenId').value
    const nama = document.getElementById('nama').value
    const nidn = document.getElementById('nidn').value
    const prodi = document.getElementById('prodi').value
    const fakultas = document.getElementById('fakultas').value

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
            body: JSON.stringify({nama, nidn, prodi, fakultas})
        })
        const result = await response.json()
        alert(alert.message || 'Operasi Berhasil')

        document.getElementById('formDosen').reset()
        document.getElementById('dosenId').value = ''
        loadData()
    } catch (error) {
        console.error('Error:', error)
        alert('Terjadi kesalahan')
    }
})

window.editData = function(id, nama, nidn, prodi, fakultas){
    document.getElementById('dosenId').value=id
    document.getElementById('nama').value=nama
    document.getElementById('nidn').value=nidn
    document.getElementById('prodi').value=prodi
    document.getElementById('fakultas').value=fakultas
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