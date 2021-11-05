const express = require('express')
const router = express.Router()
const fs = require('fs')

//INDEX ROUTElists all dinosaurs
router.get('/', (req, res) => {
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    

    let nameFilter = req.query.nameFilter
    if(nameFilter) {
        dinoData = dinoData.filter((dino) => {
            return dino.name.toLowerCase() === nameFilter.toLowerCase()
        })
    }
    res.render('./dinosaurs/index.ejs', {dinoData})
})

//NEW ROUTE FROM new.ejs Dont use event listeners because that is for front end. We are in back end land now.
router.get('/new', (req, res) => {
    res.render('./dinosaurs/new.ejs')
})

//GET UPDATE FORM
router.get('/edit/:idx', (req, res) => {
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    res.render('dinosaurs/edit.ejs', {dinoID: req.params.idx, dino: dinoData[req.params.idx]})
})

//Update a Dino
router.put('/:idx', (req, res) => {
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)

    //Re-assign the name and type fields of the Dino to be edited
    dinoData[req.params.idx].name = req.body.name
    dinoData[req.params.idx].type = req.body.type

    //save the edited dinosaurs to the json file
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))
    //redirect
    res.redirect('/dinosaurs')
})

//SHOW ROute
router.get('/:idx', (req, res) => {
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    //get array index from url parameter
    let dinoIndex = req.params.idx
    // console.log(dinoIndex)
    // console.log(dinoData[dinoIndex])
    res.render('./dinosaurs/show.ejs', {myDino: dinoData[dinoIndex]})
})

//POST A NEW DINO //will use fs to write to the our pseudo database
router.post('/', (req, res) => {
    //Read in the Dino Data
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    //Add new Dino to dinoData
    dinoData.push(req.body)
    //save updated dinoData to json, adds new dino to dinosaurs.json
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))
    //every route needs a redirect to GET /dinosaurs (index)
    res.redirect('./dinosaurs')
})

router.delete('/:idx', (req, res) => {
    //Read in the Dino Data
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    //remove the deleted dinosaur from the dinosaurs array
    dinoData.splice(req.params.idx, 1)
    //save new dino array to json file
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))
    res.redirect('/dinosaurs')
})

module.exports = router