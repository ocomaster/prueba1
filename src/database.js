const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/notes-db-app',{
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useNewUrlParser: true

})
    .then(db => console.log('Conectado a la base de datos.'))
    .catch(err => console.error(`DB Connection Error: ${err.message}`));
    