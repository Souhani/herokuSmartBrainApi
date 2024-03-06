const  express = require('express');
const bcrypt = require ('bcrypt-nodejs');
const cors = require('cors');
const morgan = require('morgan')
const knex = require('knex');
require('dotenv').config();
const redisClient = require("./controllers/RedisCilent");
const Register = require('./controllers/Register');
const Signin = require('./controllers/Signin');
const Signout = require('./controllers/Signout');
const Profile = require('./controllers/Profile');
const Image = require('./controllers/Image');
const auth = require('./controllers/authorization');

// connect to postg database
const postg = knex({
  client: 'pg',
  connection: process.env.POSTGRES_URI
});
// connect to redis database
(async () => await redisClient.connect())()
//express app
const app = express();
//midddlewares
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
//endpoints
app.get('/',(req,res)=>{ res.json("its wroking")});
app.post('/signin', Signin.signinAuthentication(postg, bcrypt));
app.get('/signout', (req,res) => Signout.signoutAuthentication(req, res));
app.post('/register', Register.registerAuthentication(postg, bcrypt));
app.get('/profile/:id', auth.requireAuth, Profile.handleProfileGet(postg));
app.post('/profile/:id', auth.requireAuth, Profile.handleProfileUpdate(postg));
app.put('/image/:id', auth.requireAuth, Image.handleImage(postg));
app.put('/imageUrl/:id', auth.requireAuth, Image.handleApiCall());

const PORT = process.env.PORT;
app.listen(PORT, ()=>{
	console.log(`its working on localhost: ${PORT}`)
})