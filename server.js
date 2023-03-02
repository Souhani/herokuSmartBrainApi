const  express = require('express');
const bcrypt = require ('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const Register = require('./controllers/Register');
const Signin = require('./controllers/Signin');
const Profile = require('./controllers/Profile');
const Image = require('./controllers/Image')

const app = express();

const postg = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    port : 5432,
    user : 'postgres',
    password : 'Kakaka',
    database : 'smart-brain'
  }
});

app.use(cors());
app.use(express.json())


app.get('/',(req,res)=>{ res.json()});

app.post('/signin', Signin.handleSignin(postg, bcrypt));

app.post('/register', Register.handleRegister(postg, bcrypt));

app.get('/profile/:id', Profile.handleProfileGet(postg))

app.put('/image', Image.handleImage(postg))

app.put('/imageUrl', Image.handleApiCall())

const PORT = process.env.PORT;


app.listen(3000, ()=>{

	console.log(`its working on localhost: ${ PORT }`)
})