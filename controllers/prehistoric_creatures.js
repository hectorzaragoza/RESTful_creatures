const express = require('express')
const router = express.Router()
const fs = require('fs')

//INDEX Show route for all prehistoric creatures
router.get('/', (req, res) => {
    let prehistoric = fs.readFileSync('./prehistoric_creatures.json')
    let preData = JSON.parse(prehistoric)

    let nameFilter = req.query.nameFilter
    if (nameFilter) {
        preData = preData.filter((dino) => {
            return dino.type.toLowerCase() === nameFilter.toLowerCase()
        })
    }
    res.render('./prehistoric_creatures/preHome.ejs', {preData})
})

//NEW Prehistoric ROUTE FROM preNew.ejs Dont use event listeners because that is for front end. We are in back end land now.
router.get('/new', (req, res) => {
    res.render('./prehistoric_creatures/preNew.ejs')
})

//GET UPDATE FORM
router.get('/edit/:idx', (req, res) => {
    let prehistoric = fs.readFileSync('./prehistoric_creatures.json')
    let preData = JSON.parse(prehistoric)
    res.render('prehistoric_creatures/preEdit.ejs', {dinoID: req.params.idx, dino: preData[req.params.idx]})
})

//UPDATE A Prehistoric Dino FORM
router.put('/:idx', (req, res) => {
    let prehistoric = fs.readFileSync('./prehistoric_creatures.json')
    let preData = JSON.parse(prehistoric)
    //Reassign type and image Urls of the Dino to be edited
    preData[req.params.idx].type = req.body.type
    preData[req.params.idx].img_url = req.body.img_url
    //Save to the prehistoric_creatures json file using fs.writeFileSync
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(preData))
    //Redirect to base prehistoric_creatures page
    res.redirect('/prehistoric_creatures')

})

//Show Route for prehistoric_creatures.json
router.get('/:idx', (req, res) => {
    let prehistoric = fs.readFileSync('./prehistoric_creatures.json')
    let preData = JSON.parse(prehistoric)
    let preIndex = req.params.idx
    res.render('./prehistoric_creatures/preShow.ejs', {preDino: preData[preIndex]})
})

//POST A NEW DINO //will use fs to write to the our pseudo database
router.post('/', (req, res) => {
    //Read in the prehistoric Dino Data
    let prehistoric = fs.readFileSync('./prehistoric_creatures.json')
    let preData = JSON.parse(prehistoric)
    //Add new Dino to dinoData
    preData.push(req.body)
    //save updated dinoData to json, adds new dino to dinosaurs.json
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(preData))
    //every route needs a redirect to GET /dinosaurs (index)
    res.redirect('/prehistoric_creatures')
})

router.delete('/:idx', (req, res) => {
     //Read in the prehistoric Dino Data
    let prehistoric = fs.readFileSync('./prehistoric_creatures.json')
    let preData = JSON.parse(prehistoric)
    //remove the deleted dinosaur from the dinosaurs array
    preData.splice(req.params.idx, 1)
    //save new dino array to json file
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(preData))
    res.redirect('/prehistoric_creatures')
})

module.exports = router