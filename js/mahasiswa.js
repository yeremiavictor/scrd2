// kenalan
const API_URL = 'http://localhost:3000/api/mahasiswa'

document.addEventListener('DOMContentLoaded',loadData)
async function loadData(){
    try{
        const response = await fetch(API_URL)
        const data = await response.json()
    
        const tbody = document.getElementById('tableBody')
        tbody.innerHTML=''
    
        data.forEach(mhs =>{
            const row = `
            <tr>
                <td>${mhs.id}</td>
                <td>${mhs.nama}</td>
                <td>${mhs.nim}</td>
                <td>${mhs.fakultas}</td>
                <td>
                    <button 
                    class="btn btn-sm btn-warning"
                    onclick="editData(${mhs.id},'${mhs.nama}','${mhs.nim}','${mhs.fakultas}')">
                        edit
                    </button>
                    
                    <button
                    class="btn btn-sm btn-danger"
                    onClick="deleteData(${mhs.id})">
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

document.getElementById('formMahasiswa').addEventListener('submit', async function(e){
    e.preventDefault()

    const id = document.getElementById('mahasiswaId').value
    const nama = document.getElementById('nama').value
    const nim = document.getElementById('nim').value
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
            body: JSON.stringify({nama, nim, fakultas})
        })
        const result = await response.json()
        alert(alert.message || 'Operasi Berhasil')

        document.getElementById('formMahasiswa').reset()
        document.getElementById('mahasiswaId').value = ''
        loadData()
    } catch (error) {
        console.error('Error:', error)
        alert('Terjadi kesalahan')
    }
})

window.editData = function(id, nama, nim, fakultas){
    document.getElementById('mahasiswaId').value=id
    document.getElementById('nama').value=nama
    document.getElementById('nim').value=nim
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