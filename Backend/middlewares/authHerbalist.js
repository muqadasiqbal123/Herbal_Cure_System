import jwt from 'jsonwebtoken'

// Herbalist Authentification Middleware
const authHerbalist = async (req,res,next) =>{
  try {

    const{dtoken} = req.headers
    if(!dtoken){
         return res.json({success:false,message:'Not Authorized Login Again'})
    }

    const token_decode = jwt.verify(dtoken, process.env.JWT_SECRET)
    //we will get herbalist id from token and add it to both req.body and req directly  
    req.body.herbID = token_decode.id
    req.herbalistId = token_decode.id  // Add herbalistId to req object directly

     next()

    
  } catch (error) {
    console.log(error)
        res.json({success:false,message:error.message})
  }

}

export default authHerbalist;