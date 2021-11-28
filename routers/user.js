const { request,response } = require("express")
const express = require("express")
const app = express()
const md5 = require("md5")

//membaca request bertipe json
app.use(express.json())

//memanggil model index
const models = require("../models/index")


//memanggil model users
const users = models.users

//endpoint get all users
app.get("/",async (request,response)=>{
    let dataUsers = await users.findAll()

    return response.json(dataUsers)
})

//endpoint add new users
app.post("/", (request,response)=>{
    let newUsers = {
        nama: request.body.nama,
        username: request.body.username,
        password: md5(request.body.password),
        role: request.body.role
    }

    users.create(newUsers)
    .then(result =>{
        response.json({
            message:`Data Users berhasil ditambahkan!`
        })
    })
    .catch(error =>{
        response.json({
            message: error.message
        })
    })
})

//endpoint update paket
app.put("/:id_user", (request,response)=>{
    //menampung data yang akan diubah
    let data ={
        nama: request.body.nama,
        username: request.body.username,
        role: request.body.role
    }
    
    if (request.body.password){
        data.password = md5(request.body.password)
    }

    let parameter = {
        id_user: request.params.id_user
    }
    
    //proses update
    users.update(data,{where: parameter})
    .then(result => {
        return response.json({
            message: `Data Paket berhasil diubah!`,
            data:result
        })
    })
    .catch(error =>{
        return response.json({
            message: error.message
        })
    })
})

//endpoint delete users
app.delete("/:id_user", (request,response)=>{
    let parameter = {
        id_user: request.params.id_user
    }
    users.destroy({where: parameter})
    .then(result => {
        return response.json({
            message: `Data berhasil dihapus`,
            data: result
        })
    })
    .catch(error => {
        return response.json({
            message: error.message
        })
    })  
})

module.exports = app
