var jwt = require('jsonwebtoken');
const redisClient = require("./RedisCilent");

const getAuthTokenId = async (req,res) => {
	const {authorization} = req.headers;
    const id = await redisClient.get(authorization);
	if(id) {
		return res.json({id})
	} else {
		return res.status(400).json("Unauthorized")
	}
}
const signTokenWithJWT = (email) => {
	const jwtPayload = {email};
	return jwt.sign(jwtPayload, process.env.JWT, { expiresIn: "2 days"});
}
const setTokenInRedis = async (key,value) => {
        return await redisClient.set(key, value);
}
const deleteTokenFromRedis = async (key) => {
	return await redisClient.del(key);
}
const createSessions = (user) => {
	const { email, id } = user;
	const token = signTokenWithJWT(email);
	return  setTokenInRedis(token, id)
	       .then((res) => {
            if(res === 'OK') { 
                return { success: true, userId: id, token: token } 
            };
            return { success: false }
        })
		   .catch(err =>{ return err})
}

const destroySessions = (token) => {
   return deleteTokenFromRedis(token)
          .then((res) => {
            if(res) {
				return {success: true};
			}
			return {success: false};
		  })
		  .catch(err => {
			return {
				success: false,
				error: err
			}
		  })
}
module.exports = {
    createSessions,
	destroySessions,
    getAuthTokenId
}