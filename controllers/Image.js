const Clarifai = require('clarifai') ;

const app = new Clarifai.App({
 apiKey: 'bed924f5eb4c4dc186f93b5c330a3f2c'
});


const handleApiCall =  () => (req, res)=> {
    app.models
        .predict(
          {
            id: 'face-detection',
            name: 'face-detection',
            version: '6dc7e46bc9124c5c8824be4822abe105',
            type: 'visual-detector',
          }, req.body.input)
        .then(data => res.json(data))


}

const handleImage = (postg) => (req, res) =>{
	const {id} = req.body;
	postg('users')
  .where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries=>{
			 	res.json(entries[0])
          	})		    
  .catch(err=>{
  	res.status(400).json("unable to get the entries")
  })

};

module.exports= {
  handleImage,
  handleApiCall
};