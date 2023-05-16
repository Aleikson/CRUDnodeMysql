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
    const postId = req.body.id;
    const postValues = {
        title: req.body.title,
        content: req.body.content
    };

    if (postId) {
        Post.update(postValues, { where: { id: postId } }).then(function () {
            res.redirect('/');
        }).catch(function (err) {
            res.send('ERROR WHILE UPDATING POST: ' + err);
        });
    } else {
        Post.create(postValues).then(function () {
            res.redirect('/');
        }).catch(function (err) {
            res.send('ERROR WHILE CREATING POST: ' + err);
        });
    }
});

app.get('/delete/:id', function (req, res) {
    Post.destroy({ where: { 'id': req.params.id } }).then(function () {
        res.redirect('/')
    }).catch(function (error) {
        res.send('ERROR WHILE WAS DELETING')
    })
})

app.get('/edit/:id', function (req, res) {
    const postId = req.params.id;
    Post.findByPk(postId).then(function (post) {
        res.render('forms', { post: post });
    }).catch(function (error) {
        res.send('ERROR WHILE RETRIEVING POST');
    });
});

app.listen(8080, function () {
    console.log('Running')
});