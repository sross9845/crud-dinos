const express = require('express');
const router = express.Router();
const fs = require('fs');
//root of dinosaurs
router.get('/', function(req,res){
    //read contents into dinos variable
    var dinos = fs.readFileSync('./dinosaurs.json')
    //turn it back into a json??? or readable
    var dinoData = JSON.parse(dinos)
    res.render('dinosaurs/index', {dinos: dinoData});
});

router.post('/', function(req,res){
    var dinos = fs.readFileSync('./dinosaurs.json');
    var dinoData = JSON.parse(dinos);
    dinoData.push(req.body);
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData));
    res.redirect('/dinosaurs')
});

router.get('/new', function(req,res){
    res.render('dinosaurs/new')
});

router.get('/edit/:id', function(req, res){
    var index = parseInt(req.params.id)
    var dinos = fs.readFileSync('./dinosaurs.json');
    var dinoData = JSON.parse(dinos)
    res.render('dinosaurs/edit', {dino: dinoData[index], dinoIndex: index})
});

router.put('/:id', function(req,res){
    var index = parseInt(req.params.id);
    var dinos = fs.readFileSync('./dinosaurs.json');
    var dinoData = JSON.parse(dinos);
    dinoData[index] = req.body;
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData));
    res.redirect(`/dinosaurs/${index}`)
});

router.delete('/:id', function(req,res){
    var dinos = fs.readFileSync('./dinosaurs.json');
    var dinoData = JSON.parse(dinos);
    dinoData.splice(req.params.id, 1)
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData));
    res.redirect('/dinosaurs')
});

router.get('/:id', function(req,res){
    var index = parseInt(req.params.id);
    var dinos = fs.readFileSync('./dinosaurs.json');
    var dinoData = JSON.parse(dinos);
    res.render('dinosaurs/show', {dino: dinoData[index]});
});

module.exports = router;