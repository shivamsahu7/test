var jwt = require('jsonwebtoken');

module.exports = async (req,res,next)=>{
    try{
        const temp = req.headers.authorization
        const token = temp.split(" ")[1]
        const data = jwt.verify(token,process.env.JWT_SECRET_KEY)
        if(data){
            req.userId = data.userId
            next()
        }else{
            return res.status(401).json({
                status:false,
                error:req.__('UNAUTHORIZE')
            })
        }
    }catch(err){
        console.log(err)
        return res.status(401).json({
            status:false,
            error:req.__('UNAUTHORIZE')
        })
    }
}