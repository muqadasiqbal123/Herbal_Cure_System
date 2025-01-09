import jwt from 'jsonwebtoken'

// User Authentification Middleware
const authUser = async (req,res,next) =>{
  try {

    const{token} = req.headers
    if(!token){
         return res.json({success:false,message:'Not Authorized Login Again'})
    }

    const token_decode = jwt.verify(token, process.env.JWT_SECRET)
    //we will get userid from token and added in req body  
    req.body.userId = token_decode.id

     next()

    
  } catch (error) {
    console.log(error)
        res.json({success:false,message:error.message})
  }

}

export default authUser;