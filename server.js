const express = require('express');
const cors = require('cors')
const path = require('path');
const socket = require('socket.io');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const bulletinsRoutes = require('./routes/bulletins.routes');
const authRoutes = require('./routes/auth.routes');

const server = app.listen(process.env.PORT || 8000, () => { console.log('Server is running...') });
const io = socket(server);
const db = mongoose.connection;

//Sockets
io.on('connection', (socket) => {
  console.log('New Socket!');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
})

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '/client/build')));
app.use(express.static(path.join(__dirname, '/public')));
app.use(session({
  secret: process.env.SESSION_SECRET,
  cookie: { secure: process.env.NODE_ENV == 'production'},
  store: MongoStore.create({mongoUrl: process.env.MONGODB_URI,}),
  resave: false,
  saveUninitialized: false
}));

app.use('/api', bulletinsRoutes);
app.use('/api/auth', authRoutes);

//Database connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })

db.once('open', () => {
  console.log('Connected to the database');
});

db.on('error', err => console.log('Error ' + err));

app.use((req, res) => {
  res.status(404).json({message: 'Not found...'});
})