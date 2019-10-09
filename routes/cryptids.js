const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/', function(req, res) {
  var cryptids = fs.readFileSync('./cryptids.json');
  var cryptidData = JSON.parse(cryptids);
  res.render('cryptids/index', {cryptids: cryptidData});
});

router.get('/new', function(req,res){
  res.render('cryptids/new')
});

router.post('/', function(req,res){
  var cryptids = fs.readFileSync('./cryptids.json');
  var cryptidData = JSON.parse(cryptids);
  cryptidData.push(req.body);
  fs.writeFileSync('./cryptids.json', JSON.stringify(cryptidData))
  res.redirect('/cryptids')
})

router.get('/edit/:id', function(req, res){
  var index = parseInt(req.params.id)
  var cryptids = fs.readFileSync('./cryptids.json');
  var cryptidData = JSON.parse(cryptids)
  res.render('cryptids/edit', {cryptid: cryptidData[index], cryptidIndex: index})
});

router.put('/:id', function(req,res){
  var index = parseInt(req.params.id);
  var cryptids = fs.readFileSync('./cryptids.json');
  var cryptidData = JSON.parse(cryptids);
  cryptidData[index] = req.body;
  fs.writeFileSync('./cryptids.json', JSON.stringify(cryptidData));
  res.redirect(`/cryptids/${index}`)
});

router.delete('/:id', function(req,res){
  var cryptids = fs.readFileSync('./cryptids.json');
  var cryptidData = JSON.parse(cryptids);
  cryptidData.splice(req.params.id, 1)
  fs.writeFileSync('./cryptids.json', JSON.stringify(cryptidData));
  res.redirect('/cryptids')
});

router.get('/:id', function(req,res){
  var index = parseInt(req.params.id);
  var cryptid = fs.readFileSync('./cryptids.json');
  var cryptidData = JSON.parse(cryptid);
  res.render('cryptids/show', {cryptid: cryptidData[index], index});
});

module.exports = router;