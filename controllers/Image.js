const Clarifai = require('clarifai') ;

const app = new Clarifai.App({
 apiKey: process.env.CLARIFAIKEY
});


const handleApiCall =  () =>async  (req, res)=> {
    let allData = {
      face_detection: {},
      face_sentiment: {}
    }
    await app.models
        .predict(
          {
            id: 'face-detection',
            name: 'face-detection',
            version: '6dc7e46bc9124c5c8824be4822abe105',
            type: 'visual-detector',
          }, req.body.input)
        .then(data => allData.face_detection = data);

     await app.models
        .predict(
          {
            id: 'face-sentiment-recognition',
            name: 'face-sentiment',
            version: 'a5d7776f0c064a41b48c3ce039049f65',
            type: 'visual-detector',
          }, req.body.input)
        .then(data => allData.face_sentiment = data)
        return res.json(allData)
};

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