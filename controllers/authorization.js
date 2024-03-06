const redisClient  = require ('./RedisCilent');

const requireAuth = async (req, res, next) => {
    const {authorization} = req.headers;
    const {id} = req.params;
    if(!authorization) {
         return res.status(400).json('Unauthorized');
    }
    const userId = await redisClient.get(authorization);
	if(!userId || userId !== id) {
	  return res.status(400).json('Unauthorized');
	}
    return next();
};

module.exports = {
    requireAuth,
}