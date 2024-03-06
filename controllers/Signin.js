const handleSessions  = require('./handleSessions');

const handleUserSigninInfo = (postg, bcrypt, email, password) => {
	if(!email || !password){
    	return Promise.reject('incorrect form submission');
    }
	return postg('login')
	.select('email','hash')
	.where('email','=',email)
	.then(data =>{
		const isValid = bcrypt.compareSync(password, data[0].hash);
		if(isValid){
           return postg('users')
                 .select('*')
                 .where('email','=',email)
                 .then(user => user[0] )
                 .catch(err=> Promise.reject('unable to get user'))
		}else{
			return Promise.reject('wrong credentials1')
		}
	})
	 .catch(erer=> Promise.reject('wrong credentials2'))
   
};
const signinAuthentication = (postg, bcrypt) => (req,res) => {
	const {email, password} = req.body;
	const {authorization} = req.headers;
	authorization ? handleSessions.getAuthTokenId(req,res) :
	handleUserSigninInfo( postg, bcrypt, email, password)
	.then(user => user.id && user.email ? handleSessions.createSessions(user) : Promise.reject(user))
	.then(session => res.json(session))
	.catch(err => res.status(400).json("unable to get user"));
}
module.exports= {
  signinAuthentication,
}