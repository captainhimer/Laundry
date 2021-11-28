const { request,response } = require("express")
const express = require("express")
const app = express()

//membaca request dari body dengan tipe json
app.use(express.json())

//panggil model index
const models = require("../models/index")

//panggil model paket
const paket = models.paket

//endpoint get all paket
app.get("/", async (request,response)=>{
    let dataPaket = await paket.findAll()

    return response.json(dataPaket)
})

//endpoint add new paket
app.post("/", (request, response)=>{
    let newPaket = {
        jenis_paket : request.body.jenis_paket,
        harga : request.body.harga
    }

    paket.create(newPaket)
    .then(result =>{
        response.json({
            message:`Data Paket berhasil ditambahkan!`
        })
    })
    .catch(error =>{
        response.json({
            message: error.message
        })
    })
})

//endpoint update paket
app.put("/:id_paket", (request,response)=>{
    //menampung data yang akan diubah
    let data ={
        jenis_paket: request.body.jenis_paket,
        harga: request.body.harga,
    }

    let parameter = {
        id_paket: request.params.id_paket
    }
    
    //proses update
    paket.update(data,{where: parameter})
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

//endpoint delete paket
app.delete("/", (request,response)=>{
    let deletePaket = {
        id_paket: request.body.id_paket
    }

    paket.destroy({where:deletePaket})
    .then(result => {
        response.json({
            message:`Data berhasil dihapus!`
        })
    })
    .catch(error =>{
        response.json({
            message:error.message
        })
    })
})

module.exports = app
