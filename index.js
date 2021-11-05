//import express
const express = require('express')
//create instance of express app
const app = express()
//Middleware import
const ejslayouts = require('express-ejs-layouts')
//Middleware 
app.set('view engine', 'ejs')
app.use(ejslayouts)
//Import the index.ejs from your views/dinosaurs folders, filesystem module (core module so no need to intsall)
const fs = require('fs')
//body-parsers middleware
//Makes req.body work
//takes the form data and attaches it to body as a JS object
app.use(express.urlencoded({extended: false}))
//method-override is a node packague that allows us to catch incoming requests to the back-end and change the method from 
//POST to DELETE or PUT
//By Default: method-override only overrides POST methods.
const methodOverride = require('method-override')
//Configure Middleaware (make sureits above any other middleware code that uses the request method)
app.use(methodOverride('_method'))
//Set up the router connection with the controllers
//This will include the URL Pattern from here in your Routes in your Controller Files! So you can take this URL pattern away from the Url Patterns
//in the controller files!
app.use('/dinosaurs', require('./controllers/dinosaurs.js'))
app.use('/prehistoric_creatures', require('./controllers/prehistoric_creatures.js'))

//Set up home route
app.get('/', (req, res) => {
    res.render('home.ejs')
})

//listen on port 8000
app.listen(8000, () => {
    console.log('I\'m listening on Port 8000')
})