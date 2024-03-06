 const handleProfileGet = (postg) => (req, res) => {
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

const handleProfileUpdate = (postg) => (req, res) => {
  const {id} = req.params;
  const {name, email, age} = req.body.formInput;
  postg('users')
  .where({id})
  .update({name, email, age})
  .then(response => {
	if(response) {
		postg('login')
		.where({id})
		.update({email})
		.then(response => {
		  if(response) {
			  res.json('success');
		  }else {
			  res.status(400).json('unable to update user')
		  }
		})
		.catch(err => {
		  res.status(400).json('error updating user')
		})
	}else {
		res.status(400).json('unable to update user')
	}
  })
  .catch(err => {
	res.status(400).json('error updating user')
  })
}
module.exports= {
	handleProfileGet,
	handleProfileUpdate,
}