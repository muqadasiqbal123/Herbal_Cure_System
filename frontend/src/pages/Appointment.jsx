import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import RelatedHerbalists from '../Components/RelatedHerbalists'
import { toast } from 'react-toastify'
import axios from 'axios'

const Appointment = () => {

    const {herbID} = useParams()
    const {herbalists, currencysymbol, backendUrl, token, getHerbalistsData} =useContext(AppContext)
    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'] 

    const navigate = useNavigate()

     const [herbInfo, setHerbInfo] = useState(null)
     const [herbSlots, setHerbSlots] =useState([])
     const [slotIndex, setSlotIndex] =useState(0)
     const [slotTime, setSlotTime] =useState('')

    const fetchHerbInfo = async () =>{
        const herbInfo = herbalists.find(herb => herb._id === herbID)
        setHerbInfo(herbInfo)
    }
    console.log(fetchHerbInfo); 

    const getAvailableSlots = async () =>{
        setHerbSlots([])

        // getting current Date
        let today = new Date()

        for(let i = 0 ; i < 7 ; i++){
            // getting date with index
            let currentDate = new Date(today)
            currentDate.setDate(today.getDate() + i)

            // setting end time of the date with index
            let endTime =  new Date()
            endTime.setDate(today.getDate() + i)
            endTime.setHours(21, 0, 0, 0)

            // setting hours
            if(today.getDate() === currentDate.getDate()){
                currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
                currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
            } else{
                currentDate. setHours(10)
                currentDate.setMinutes(0)
            }

             let timeSlots = []

            while(currentDate < endTime){
                let formattedTime =  currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'})
                // if the time slot is booked in specific time and date then its hide
                let day = currentDate.getDate()
                let month = currentDate.getMonth() + 1
                let year = currentDate.getFullYear()

                const slotDate = day +"_" + month +"_" + year
                const slotTime = formattedTime

                const isSlotAvailable = herbInfo.slots_booked[slotDate] && herbInfo.slots_booked[slotDate].includes(slotTime) ? false : true
                if (isSlotAvailable) {
                   // add slot to array
                timeSlots.push({
                    datetime: new Date(currentDate),
                    time: formattedTime
                })  
                }

                //  Increment current time by 30 minutes
                currentDate.setMinutes(currentDate.getMinutes() + 30)
            }

            setHerbSlots(prev => ([...prev, timeSlots]))
        }
    }

    // create arrow func with the name book appt
    const bookAppointment = async () => {

        if (!token) {
            toast.warn('Login to book appointment')
            return navigate('/login')
        }

        try {
            
            const date = herbSlots[slotIndex][0].datetime
            // destructure the date we will store date, month, year in different variable
            let day = date.getDate()
            let month = date.getMonth()+1
            let year = date.getFullYear()

            const slotDate = day +"_" + month +"_" + year
           
            // Api call to book the appointment
            
 const { data } = await axios.post(backendUrl + '/api/user/book-appointment', {herbID, slotDate, slotTime }, {headers:{token}})
            if (data.success) {
                toast.success(data.message)
                getHerbalistsData()
                navigate('/my-appointments')
            } else {

                toast.error(data.message)

            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }

    }

    useEffect(()=>{
        fetchHerbInfo()
    },[herbalists,herbID]) 

    useEffect(()=>{
    getAvailableSlots()
    },[herbInfo])

    useEffect(()=>{
    console.log(herbSlots)
    },[herbSlots])

  return herbInfo && (
    <div>
        {/* ------------Herbalists Detail---------- */}
        <div className='flex flex-col sm:flex-row gap-4'>
            <div>
                <img className='bg-primary w-full sm:max-w-72 rounded-lg' src={herbInfo.image} alt="herbInfo Image"/>
            </div>

        <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
                {/* --------Herb Info: name, degree, experience------- */}
                <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>
                    {herbInfo.name} 
                    <img className='w-5' src={assets.verified_icon} alt="Verified Icon" />
                    </p>
                    <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
                        <p>{herbInfo.degree} - {herbInfo.speciality}</p>
                        <button className='py-0.5 px-2 border text-xs rounded-full'>{herbInfo.experience}</button>
                    </div>
                    {/* ------ Herbalists About ------- */}
                    <div>
                        <p className='flex items-center gap-1  text-sm font-medium text-gray-900 mt-3'>
                        About<img src={assets.info_icon} alt=" Info Icon" /> </p>
                        <p className='text-sm text-gray-500 max-w-[700px] mt-1'>{herbInfo.about}</p>
                    </div>
                    <p className='text-gray-500 font-medium mt-4'>
                        Appointment fee: <span className='text-gray-600'>{currencysymbol}{herbInfo.fees}</span>
                    </p>
            </div>
        </div>
        {/* ------Booking slots--------- */}
        <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
           <p>Booking slots</p>  
           <div className='flex gap-3 items-center w-full  mt-4'>
            {
                herbSlots.length && herbSlots.map((item,index)=>(
             <div onClick={()=> setSlotIndex(index)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-primary text-white' : 'border border-gray-200'}`} key={index}>
                     <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                     <p>{item[0] && item[0].datetime.getDate()}</p>
                    </div>
                ))
            }
           </div>
           <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4' >
            { herbSlots.length && herbSlots[slotIndex].map((item,index)=>(
                <p onClick={()=>setSlotTime(item.time)} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-primary text-white': 'text-gray-400 border border-gray-300'}`} key={index}>
                    {item.time.toLowerCase()}
                </p>
            ))}
           </div>
           <button onClick={bookAppointment} className='bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6'>Book an Appointment</button>

        </div>
        {/* ----------Listing Related Herbalists----------- */}
        <RelatedHerbalists herbID={herbID} speciality={herbInfo.speciality}/>

    </div>
  )
}

export default Appointment