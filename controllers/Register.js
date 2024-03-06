const handleSessions  = require('./handleSessions');

const handleUserRegisterInfo = (postg, bcrypt, email, password, name) => {
    if(!email || !name || !password){
		return Promise.reject('incorrect form submission');
    };
    const hash = bcrypt.hashSync(password);
	return postg.transaction(trx =>{
		  trx.insert({
				email: email,
				hash: hash
			})
		  .into('login')
		  .returning('email')
		  .then(loginEmail=>{
		        return trx('users')
				       .returning('*')
					   .insert({
					   	email: loginEmail[0].email,
					   	name: name,
					    joined: new Date()
					})
					   .then(user =>{
						return Promise.resolve(user[0])
					   })

			})
		  .then(trx.commit)
		  .catch(trx.rollback)

   })    
   .catch(err => {
	return Promise.reject("unable to register")
})

   
};

const registerAuthentication = (postg, bcrypt) => (req, res) => {
	//save user data
	const {email, password, name} = req.body;
	handleUserRegisterInfo(postg, bcrypt, email, password, name)
	.then(user => {
	//create user session
		return user.id && user.email ? 
		handleSessions.createSessions(user) : 
		Promise.reject('unable to register')
	})
	.then(session => {
	//send session to the user
		return res.json(session)
		})
	.catch(err => res.status(400).json("unable to register"))
}

module.exports = {
	registerAuthentication,
};