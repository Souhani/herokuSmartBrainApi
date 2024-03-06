const handleSessions = require("./handleSessions");

const signoutAuthentication = (req, res) => {
    const { authorization } = req.headers;
    if(authorization) {
    //remove the token from redis db
        return handleSessions.destroySessions(authorization)
            .then(response => {
                if(response.success) {
                    return res.json(response)
                }
            })
            .catch( err => {
                return res.status(400).json('error  signing out')
            })
      
    }
    res.status(400).json('error signing out')
};

module.exports = {
    signoutAuthentication,
};