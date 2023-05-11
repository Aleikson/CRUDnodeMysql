const express = require('express');
const app = express();
const handle = require('express-handlebars')
const bodyParser = require('body-parser');
const Post = require('./models/Post')

app.engine('handlebars', handle.engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.get('/', function (req, res) {
    Post.findAll().then(function (posts) {
        console.log(Post)
        res.render('home', { posts: posts })
    })
})

app.get('/form', function (req, res) {
    res.render('forms')
})

app.post('/form', function (req, res) {
    Post.create({
        tittle: req.body.tittle,
        content: req.body.tittle
    }).then(function () {
        res.redirect('/')
    }).catch(function (err) {
        res.send('NOT RUNNIN ' + err)
    })
})

app.get('/delete/:id', function (req, res) {
    Post.destroy({ where: { 'id': req.params.id } }).then(function () {
        res.redirect('/')
    }).catch(function (error) {
        res.send('ERROR WHILE WAS DELETING')
    })
})

app.listen(8080, function () {
    console.log('Running')
});