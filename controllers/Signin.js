const handleSignin = (postg, bcrypt) => (req, res) => {

	const {email, password} = req.body;
	if(!email || !password){
    	return res.status(400).json('incorrect form submission');
    }
	postg('login')
	.select('email','hash')
	.where('email','=',email)
	.then(data =>{
		const isValid = bcrypt.compareSync(password, data[0].hash);
		if(isValid){
                 postg('users')
                 .select('*')
                 .where('email','=',email)
                 .then(user =>{
                 	res.json(user[0])
                 })
                 .catch(err=> {
                 	  res.status(400).json('unable to get user')
                 	   })
		}else{
			res.status(400).json('wrong credentials')
		}
	})
	.catch(erer=>{
		res.status(400).json('wrong credentials')
	})
   
};

module.exports= {
   handleSignin
}