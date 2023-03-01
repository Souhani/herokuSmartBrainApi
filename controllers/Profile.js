 const handleProfileGet = (postg) => (req, res) =>{
	const {id} = req.params;

	 postg.select('*').from('users').where({
	 	id: id
	 }).then(user=>{
	 	if(user.length){
	 		res.json(user[0]);
	 	}else{
	 		res.status(400).json('not found');
	 	}
	 	
	 }).catch(err => res.status(400).json('error getting user'))

	
};


module.exports= {
	handleProfileGet
}