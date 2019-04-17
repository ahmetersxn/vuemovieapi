const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = localStorage.getItem('token')
    if(token){
        jwt.verify(token, "deneme", (err, decoded) => {
            if (err){
                alert("Data oldu")
            }else{
                req.decode = decoded;
                alert("Data olduamdı")
                next();
            }
        });
    }else{
        alert("token yok")
    }
};
