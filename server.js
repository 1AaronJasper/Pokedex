const express = require('express')
const morgan = require('morgan')
const methodOverride = require('method-override')
const app = express()
const PORT = 6000
let Pokemon = require('./models/pokemon.js')
const expressEjsLayouts = require('express-ejs-layouts')

//MIDDLEWARE
app.use(morgan('tiny'))
app.set('view engine', 'ejs')
app.use(expressEjsLayouts)
app.use(methodOverride('_method'))
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

//index
app.get("/pokemon", (req, res) => {
    res.render('index.ejs', { Pokemon });
    });

// new

app.get("/pokemon/new", (req, res) => {
    res.render("new.ejs")
});

// DELETE
app.delete("/pokemon/:index", (req, res)=>{
    Pokemon.splice(req.params.index, 1)
    res.redirect("/pokemon")
});

//UPDATE
app.put("/pokemon/:index", (req, res)=>{
    let thePoke=Pokemon[req.params.index]
    thePoke.name = req.body.name
    thePoke.stats.hp = req.body.hp
    thePoke.stats.attack = req.body.attack
    thePoke.stats.defense = req.body.defense
    thePoke.type = req.body.type.split(', ')
    res.redirect("/pokemon")
})
//CREATE
app.post("/pokemon", (req, res)=>{
    let newPokie = {}
    newPokie.id = parseInt(Pokemon[Pokemon.length-1].id)+1
    newPokie.name = req.body.name
    newPokie.stats = {}
    newPokie.stats.hp = req.body.hp
    newPokie.stats.attack = req.body.attack
    newPokie.stats.defense = req.body.defense
    newPokie.type = req.body.type.split(', ')
    Pokemon.push(newPokie)
    res.redirect("/pokemon")
});

//EDIT
app.get("/pokemon/:index/edit", (req, res)=>{
    let pokeId = req.params.index
    res.render('pokemon/edit.ejs', {
        poke: Pokemon[pokeId],
        index: pokeId
    })
});

//SHOW
app.get("/pokemon/:index", (req, res)=>{
    res.render("pokemon/show.ejs", {
        poke: Pokemon[req.params.index]
    })
});


app.listen(PORT, () => console.log(`can't dock on this port ${PORT}`));