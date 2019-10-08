const express = require('express');
const router = express.Router();
const fs = require('fs');
//root of dinosaurs
router.get('/', function(req,res){
    //read contents into dinos variable
    var dinos = fs.readFileSync('./dinosaurs.json')
    //turn it back into a json??? or readable
    var dinoData = JSON.parse(dinos)
    res.json(dinoData)
});

module.exports = router;