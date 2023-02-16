require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.connect(process.env.CONNECTIONSTRING).then(()=> {console.log('Conectado a base de dados');
app.emit('pronto')}).catch(err => console.log(err));

const session = require('express-session');
const mongoStore = require('connect-mongo');
const flashMessage = require('connect-flash');


const routes = require('./routes');
const path = require('path');
const helmet = require('helmet');
const csrf = require('csurf');
const {meuMiddleware, checkCsrfToken, csrfMiddleware} = require('./src/middlewares/middleware');

app.use(helmet());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.resolve(__dirname, 'public')));


const sessionOptions = session({
  secret: 'secret',
 // store: new mongoStore({mongooseConnection: mongoose.connection}),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
    secure: false },
    store: mongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING})
});


app.use(sessionOptions);
app.use(flashMessage());





app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use(csrf());


app.use(meuMiddleware);
app.use(checkCsrfToken);
app.use(csrfMiddleware);
app.use(routes);

app.on('pronto', () => {
  app.listen(3000, () => {
    console.log('Acessar http://localhost:3000');
    console.log('Servidor executando na porta 3000');
  });
});
