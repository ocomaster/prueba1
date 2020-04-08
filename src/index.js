const express = require('express');
const path  = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session')
const mongoose = require('mongoose');
//inicializaciones
const app = express();
require('./database');

//settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname,'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

//middlewares
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true
}));

// variables globales

//rutas
app.use(require('./routes/index'));
app.use(require('./routes/notes'));
app.use(require('./routes/users'));

//en espera

//static files
app.use(express.static(path.join(__dirname, 'public')));

//El servidor esta escuchando
app.listen(app.get('port'), () => {
    console.log(`servidor corriendo en el puerto ${('port')}`);

    
});