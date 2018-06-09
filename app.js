var express = require('express'),
app = express()
bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
noticias = require('./models/noticias');

app.use(bodyParser.json());
app.set('view engine', 'jade');

app.get('/login', function(req, res) {
	res.render('login');
});

app.get('/table', function(req, res) {
	res.render('table');
});

app.get('/', noticias.show);
app.get('/news_listar', noticias.show);
app.get('/news_detail', noticias.show);
app.get('/crear', function (req, res) {
	res.render('create');
});
app.post('/news_crear', noticias.create);
app.get('/editar', noticias.edit);
app.post('/new/news_update', noticias.update);
app.post('/new/news_remove', noticias.delete);
app.get('/comments', noticias.comment);
app.post('/comment', noticias.saveComment);

app.listen(8080, function() {
	console.log("Servidor inicializado");
});