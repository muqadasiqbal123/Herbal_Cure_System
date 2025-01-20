import jwt from 'jsonwebtoken'

// Herbalist Authentification Middleware
const authHerbalist = async (req,res,next) =>{
  try {

    const{dtoken} = req.headers
    if(!dtoken){
         return res.json({success:false,message:'Not Authorized Login Again'})
    }

    const token_decode = jwt.verify(dtoken, process.env.JWT_SECRET)
    //we will get userid from token and added in req body  
    req.body.herbID = token_decode.id

     next()

    
  } catch (error) {
    console.log(error)
        res.json({success:false,message:error.message})
  }

}

export default authHerbalist;