import herbalistModel from "../models/herbalistmodel.js"



const changeAvailability = async (req,res) => {

    try {

        const {herbId} = req.body

        const herbData = await herbalistModel.findById(herbId)
        await herbalistModel.findByIdAndUpdate(herbId,{available: !herbData.available})
        res.json({success:true, message: 'Availability Changed'})
  
    } catch (error) {
        console.log(error)
      res.json({success:false,message:error.message})
    }


}
export {changeAvailability}