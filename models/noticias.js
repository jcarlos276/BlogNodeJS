var mongoose = require('mongoose'),
Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;

mongoose.connect('mongodb://localhost/blog');

var noticia_schema = new Schema({
            titulo: String,
            descripcion: String,
            categoria: String,
            fecha: String,
            comentarios: [
                {
                    autor: String,
                    mensaje: String,
                    fecha: String
                }
            ]
});

news_model = mongoose.model('noticias', noticia_schema, 'noticias');

module.exports = {
    show: function(req, res) {
        var i = 0;
        if (req.query._id == null) {
            news_model.find({}, function(err, items) {
                if(!err) {
                    i = i + 1;
                    // res.send(items);
                    res.render("news", {data: items})
                } else {
                    return console.log(err);
                }
            });
        } else {
            news_model.findOne({_id: req.query._id}, function(err, item) {
                if (!err) {
                    // res.send(items);
                    res.render("detail", {data: item})
                } else {
                    return console.log(err);
                }
            })
        }
        
    }, 
    create: function(req, res) {
        console.log(req);
        var item = {
            titulo: req.body.titulo,//req.query.titulo,
            descripcion: req.body.descripcion,//req.query.descripcion,
            categoria: req.body.categoria,//req.query.categoria,
            fecha: req.body.fecha//req.query.fecha
        };
        console.log(req.titulo);
        var nuevaNoticia = new news_model(item).save();
        //res.send(nuevaNoticia);
        res.redirect('/')
    },
    edit: function (req,res) {
        news_model.findOne({_id: req.query._id}, function(err, item) {
            if (!err) {
                // res.send(items);
                res.render("update", {data: item})
            } else {
                return console.log(err);
            }
        })
    },
    update: function(req, res) {
        news_model.findOne({ _id: req.body._id }, function(err, noticia){
            noticia.titulo = req.body.titulo;//req.query.titulo;
            noticia.descripcion = req.body.descripcion;//req.query.descripcion;
            noticia.categoria = req.body.categoria;//req.query.categoria;
            noticia.fecha = req.body.fecha;//req.query.fecha;
            noticia.save();
            res.redirect('/');
            //res.send(noticia);
        })
    },
    delete: function(req, res) {
        news_model.findOne({ _id: req.query._id }, function(err, noticia) {
            noticia.remove();
            res.redirect('/');
            console.log('Si borró');
            //res.send({status:true});
        })
    },
    comment: function(req, res) {

        news_model.findOne({_id: req.query._id}, function(err, items) {
            if (!err) {
                res.render('comments', {data: items});
            } else {
                return console.log(err);
            }
        })
    },
    saveComment: function(req, res) {
        news_model.findOne({_id: req.body._id}, function(err, noticia){
            comentario = {
                    autor: req.body.autor,
                    mensaje: req.body.mensaje,
                    fecha: req.body.fecha
            };
            noticia.comentarios.push(comentario);
            noticia.save();
            res.redirect('/')
        })
    }
 };