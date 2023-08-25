const express = require('express');
const methodOverride = require('method-override')
const morgan = require('morgan')
const app = express();
const port = 8000;
const expressEjsLayouts = require('express-ejs-layouts')

const Pokemon = require('./models/pokemon.js')

app.use(morgan('tiny'))
app.set('view engine', 'ejs')
app.use(expressEjsLayouts)
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'));



// INDUCES 

// index
app.get('/pokemon', (req, res) => {
    res.render('index.ejs', {
        Pokemon
    })
})

// new
app.get('/pokemon/new', (req, res) => {
    res.render('new.ejs', {
        Pokemon
    })


})

// delete
app.delete('/pokemon/:index', (req, res) => {
    Pokemon.splice(req.params.index, 1)
    res.redirect('/pokemon')
})

// update
app.put('/pokemon/:index', (req, res) => {
    let firstPoke = Pokemon[req.params.index];
    firstPoke.name = req.body.name;
    firstPoke.stats.hp = req.body.hp;
    firstPoke.stats.attack = req.body.attack;
    firstPoke.stats.defense = req.body.defense;
    originalPoke.type = req.body.type.split(' ,  ')
    res.redirect('/pokemon')
})

// create
app.post('/pokemon', (req, res) => {
    let newPokemon = {};
    newPokemon.id = parseInt(Pokemon[Pokemon.length-1].id)+1
    newPokemon.name = req.body.name;
    newPokemon.stats = {}
    newPokemon.stats.hp = req.body.hp
    newPokemon.stats.attack = req.body.attack
    newPokemon.stats.defense = req.body.defense
    newPokemon.type = req.body.type.split(' ,  ')
    Pokemon.push(newPokemon)
    res.redirect('/pokemon')
})

// edit
app.get('/pokemon/:index/edit', (req, res) => {
    let pokemonId = req.params.index;
    res.render('edit.ejs', {
        pokemon: Pokemon[pokemonId],
        index: pokemonId
    })
})


// show
app.get('/pokemon/:index', (req, res) => {
    res.render('show.ejs', {
        poke: Pokemon[req.params.index]
    })
})




app.listen(port, () => {
    console.log("listening in on port: ", port)
})