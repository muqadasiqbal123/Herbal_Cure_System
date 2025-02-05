import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ViewCategories = () => {
  // const {diseases} = useParams()
  // const [filter, setFilter] = useState([])
  // const navigate = useNavigate()

  // const applyFilter = () =>{
  //   setFilter(filter)
  // }

  // useEffect(()=>{
  // applyFilter()
  // },[diseases])

  return (
    <div className="container mx-auto p-4">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-4">Find a Herbalist by Disease</h1>
      <p className="text-gray-600 mb-6">
        You can find a Herbalist most reliable and verified doctor in Pakistan
        on InstaCare.Pk. You can now book a service offered by a doctor at
        affordable prices. You can find a service, view online booking details,
        reviews, fee, address, and other information. Below are the available
        specialties.
      </p>

      {/* Search Box */}
      <div className="mb-6">
        <input
          type="search"
          name="searchbx"
          id="searchbx"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Type here to search any Diseases"
          autoComplete="off"
        />
      </div>

      {/* Diseases */}
      <div className="diseases space-y-8">
        <div className="disease-item">
          {/* Section Title */}
          <h2 className="text-2xl font-semibold mb-4">Skin Disorder</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* disease 1 */}
            <div className="disease">
              <a href="/view-categories/Acne">
                <div className="box-general flex items-center justify-between p-4 border rounded-lg hover:shadow-md hover:bg-primary hover:text-white text-gray-800 ">
                  <label>Acne</label>
                </div>
              </a>
            </div>

            {/* Disease 2 */}
            <div className="disease">
              <a href="/view-categories/Pimple">
                <div className="box-general flex items-center justify-between p-4 border rounded-lg hover:shadow-md hover:bg-primary hover:text-white text-gray-800 ">
                  <label>Pimple</label>
                  {/* <span className="text-indigo-500 material-icons">chevron_right</span> */}
                </div>
              </a>
            </div>

            {/* Disease 3 */}
            <div className="disease">
              <a href="/view-categories/Melasma">
                <div className="box-general flex items-center justify-between p-4 border rounded-lg hover:shadow-md hover:bg-primary hover:text-white text-gray-800 ">
                  <label>Melasma</label>
                </div>
              </a>
            </div>
            {/* Disease 4 */}
            <div className="disease">
              <a href="/view-categories/Eczema">
                <div className="box-general flex items-center justify-between p-4 border rounded-lg hover:shadow-md hover:bg-primary hover:text-white text-gray-800 ">
                  <label>Eczema</label>
                </div>
              </a>
            </div>
            {/* disease 5 */}
            <div className="disease">
              <a href="/view-categories/Hyper-Pigmentation">
                <div className="box-general flex items-center justify-between p-4 border rounded-lg hover:shadow-md hover:bg-primary hover:text-white text-gray-800 ">
                  <label>Hyper-Pigmentation</label>
                </div>
              </a>
            </div>
            {/* disease 6 */}
            <div className="disease">
              <a href="/view-categories/Dry Skin">
                <div className="box-general flex items-center justify-between p-4 border rounded-lg hover:shadow-md hover:bg-primary hover:text-white text-gray-800 ">
                  <label>Dry Skin</label>
                </div>
              </a>
            </div>
            {/* disease 7 */}
            <div className="disease">
              <a href="/view-categories/Psoriasis">
                <div className="box-general flex items-center justify-between p-4 border rounded-lg hover:shadow-md hover:bg-primary hover:text-white text-gray-800 ">
                  <label>Psoriasis</label>
                </div>
              </a>
            </div>
            {/* disease 8*/}
            <div className="disease">
              <a href="/view-categories/Lupus">
                <div className="box-general flex items-center justify-between p-4 border rounded-lg hover:shadow-md hover:bg-primary hover:text-white text-gray-800 ">
                  <label>Lupus</label>
                </div>
              </a>
            </div>
            {/* disease 9 */}
            <div className="disease">
              <a href="/view-categories/Sunstroke ">
                <div className="box-general flex items-center justify-between p-4 border rounded-lg hover:shadow-md hover:bg-primary hover:text-white text-gray-800 ">
                  <label>Sunstroke </label>
                </div>
              </a>
            </div>
            {/* disease 10 */}
            <div className="disease">
              <a href="/view-categories/Rosacea ">
                <div className="box-general flex items-center justify-between p-4 border rounded-lg hover:shadow-md hover:bg-primary hover:text-white text-gray-800 ">
                  <label>Rosacea</label>
                </div>
              </a>
            </div>
            {/* disease 10 */}
            <div className="disease">
              <a href="/view-categories/Shingles">
                <div className="box-general flex items-center justify-between p-4 border rounded-lg hover:shadow-md hover:bg-primary hover:text-white text-gray-800 ">
                  <label>Shingles </label>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* -----------Hair Issue--------- */}
        <div className="disease-item">
          {/* Section Title */}
          <h2 className="text-2xl font-semibold mb-4">Hair Issue</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Disease 1 */}
            <div className="disease">
              <a href="/view-categories/Alopecia">
                <div className="box-general flex items-center justify-between p-4 border rounded-lg hover:shadow-md hover:bg-primary hover:text-white text-gray-800">
                  <label>Alopecia</label>
                </div>
              </a>
            </div>

            {/* Disease 2 */}
            <div className="disease">
              <a href="/view-categories/Dandruff">
                <div className="box-general flex items-center justify-between p-4 border rounded-lg hover:shadow-md hover:bg-primary hover:text-white text-gray-800">
                  <label>Dandruff</label>
                  {/* <span className="text-indigo-500 material-icons">chevron_right</span> */}
                </div>
              </a>
            </div>

            {/* Disease 2 */}
            <div className="disease">
              <a href="/ViewCategories/Premature-Graying">
                <div className="box-general flex items-center justify-between p-4 border rounded-lg hover:shadow-md hover:bg-primary hover:text-white text-gray-800">
                  <label>Premature-Graying</label>
                  {/* <span className="text-indigo-500 material-icons">chevron_right</span> */}
                </div>
              </a>
            </div>

            {/* Disease 3 */}
            <div className="disease">
              <a href="/view-categories/Scalp Infection">
                <div className="box-general flex items-center justify-between p-4 border rounded-lg hover:shadow-md hover:bg-primary hover:text-white text-gray-800">
                  <label>Scalp Infection</label>
                </div>
              </a>
            </div>
            {/* Disease 4 */}
            <div className="disease">
              <a href="/view-categories/Hair Thining">
                <div className="box-general flex items-center justify-between p-4 border rounded-lg hover:shadow-md hover:bg-primary hover:text-white text-gray-800">
                  <label>Hair Thining</label>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* -----------Digestive Problem------------ */}

        <div className="disease-item">
          {/* Section Title */}
          <h2 className="text-2xl font-semibold mb-4">Digestive Problem</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* disease 5 */}
            <div className="disease">
              <a href="/view-categories/Indigestion">
                <div className="box-general flex items-center justify-between p-4 border rounded-lg hover:shadow-md hover:bg-primary hover:text-white text-gray-800 ">
                  <label>Indigestion</label>
                </div>
              </a>
            </div>
            {/* disease 6 */}
            <div className="disease">
              <a href="/view-categories/Constipation">
                <div className="box-general flex items-center justify-between p-4 border rounded-lg hover:shadow-md hover:bg-primary hover:text-white text-gray-800 ">
                  <label>Constipation</label>
                </div>
              </a>
            </div>
            {/* disease 7 */}
            <div className="disease">
              <a href="/view-categories/Diarrhea">
                <div className="box-general flex items-center justify-between p-4 border rounded-lg hover:shadow-md hover:bg-primary hover:text-white text-gray-800 ">
                  <label>Diarrhea</label>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* -----------Neurological Issue------------ */}

        <div className="disease-item">
          {/* Section Title */}
          <h2 className="text-2xl font-semibold mb-4">Neurological Issue</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* disease 5 */}
            <div className="disease">
              <a href="/view-categories/ Anxiety Disorder">
                <div className="box-general flex items-center justify-between p-4 border rounded-lg hover:shadow-md hover:bg-primary hover:text-white text-gray-800 ">
                  <label>Anxiety Disorder</label>
                </div>
              </a>
            </div>
            {/* disease 6 */}
            <div className="disease">
              <a href="/view-categories/ Stress Disorder">
                <div className="box-general flex items-center justify-between p-4 border rounded-lg hover:shadow-md hover:bg-primary hover:text-white text-gray-800 ">
                  <label>Stress Disorder</label>
                </div>
              </a>
            </div>
            {/* disease 7 */}
            <div className="disease">
              <a href="/view-categories/ Insomnia">
                <div className="box-general flex items-center justify-between p-4 border rounded-lg hover:shadow-md hover:bg-primary hover:text-white text-gray-800 ">
                  <label>Insomnia</label>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* -----------Weight Management------------ */}

        <div className="disease-item">
          {/* Section Title */}
          <h2 className="text-2xl font-semibold mb-4">Weight Management</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* disease 7 */}
            <div className="disease">
              <a href="/view-categories/Obesity">
                <div className="box-general flex items-center justify-between p-4 border rounded-lg hover:shadow-md hover:bg-primary hover:text-white text-gray-800 ">
                  <label>Obesity</label>
                </div>
              </a>
            </div>
            <div className="disease">
              <a href="/view-categories/Weight loss Support">
                <div className="box-general flex items-center justify-between p-4 border rounded-lg hover:shadow-md hover:bg-primary hover:text-white text-gray-800 ">
                  <label>Weight loss Support</label>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* -----------ENT Disorder------------ */}

        <div className="disease-item">
          {/* Section Title */}
          <h2 className="text-2xl font-semibold mb-4">ENT Disorder</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* disease 7 */}
            <div className="disease">
              <a href="/view-categories/Ear Infection">
                <div className="box-general flex items-center justify-between p-4 border rounded-lg hover:shadow-md hover:bg-primary hover:text-white text-gray-800 ">
                  <label>Ear Infection</label>
                </div>
              </a>
            </div>
            <div className="disease">
              <a href="/ViewCategories/Influenza">
                <div className="box-general flex items-center justify-between p-4 border rounded-lg hover:shadow-md hover:bg-primary hover:text-white text-gray-800 ">
                  <label>Influenza</label>
                </div>
              </a>
            </div>
            <div className="disease">
              <a href="/ViewCategories/Dysphagia">
                <div className="box-general flex items-center justify-between p-4 border rounded-lg hover:shadow-md hover:bg-primary hover:text-white text-gray-800 ">
                  <label>Dysphagia</label>
                </div>
              </a>
            </div>
            <div className="disease">
              <a href="/view-categories/Sore Throat">
                <div className="box-general flex items-center justify-between p-4 border rounded-lg hover:shadow-md hover:bg-primary hover:text-white text-gray-800 ">
                  <label>Sore Throat</label>
                </div>
              </a>
            </div>

            <div className="disease">
              <a href="/view-categories/Diphtheria">
                <div className="box-general flex items-center justify-between p-4 border rounded-lg hover:shadow-md hover:bg-primary hover:text-white text-gray-800 ">
                  <label>Diphtheria</label>
                </div>
              </a>
            </div>

            <div className="disease">
              <a href="/view-categories/Sinus Infection">
                <div className="box-general flex items-center justify-between p-4 border rounded-lg hover:shadow-md hover:bg-primary hover:text-white text-gray-800 ">
                  <label>Sinus Infection</label>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* -----------General Health Issues------------ */}

        <div className="disease-item">
          {/* Section Title */}
          <h2 className="text-2xl font-semibold mb-4">General Health Issues</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* disease 7 */}
            <div className="disease">
              <a href="/view-categories/Weak Immunity">
                <div className="box-general flex items-center justify-between p-4 border rounded-lg hover:shadow-md hover:bg-primary hover:text-white text-gray-800 ">
                  <label>Weak Immunity</label>
                </div>
              </a>
            </div>
            <div className="disease">
              <a href="/view-categories/Fatigue">
                <div className="box-general flex items-center justify-between p-4 border rounded-lg hover:shadow-md hover:bg-primary hover:text-white text-gray-800 ">
                  <label>Fatigue</label>
                </div>
              </a>
            </div>

            <div className="disease">
              <a href="/ViewCategories/High Blood Pressure">
                <div className="box-general flex items-center justify-between p-4 border rounded-lg hover:shadow-md hover:bg-primary hover:text-white text-gray-800 ">
                  <label>High Blood Pressure</label>
                </div>
              </a>
            </div>

            <div className="disease">
              <a href="/view-categories/Hormonal-Imbalance">
                <div className="box-general flex items-center justify-between p-4 border rounded-lg hover:shadow-md hover:bg-primary hover:text-white text-gray-800 ">
                  <label>Hormonal-Imbalance</label>
                </div>
              </a>
            </div>

            <div className="disease">
              <a href="/view-categories/Menstrual-Irregularities">
                <div className="box-general flex items-center justify-between p-4 border rounded-lg hover:shadow-md hover:bg-primary hover:text-white text-gray-800 ">
                  <label>Menstrual-Irregularities</label>
                </div>
              </a>
            </div>


            
          </div>
        </div>






      </div>
    </div>

    // <div>
    //      <p className='text-gray-600'>Herbalists commonly treat a variety of health conditions using natural remedies derived from plants, herbs, and other organic materials. Below is a list of some of the most common diseases and conditions that can be treated by herbalists.</p>
    //      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
    //       <div className='sm:grid grid-flow-col flex-row gap-9 text-sm text-gray-600' >
    //         <p onClick={()=> navigate('Skin Disorders')} className= {`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer`} >Skin Disorders</p>
    //         <p onClick={()=>navigate('Hair Issues')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer h-[9vh]`}>Hair Issues</p>
    //         <p  onClick={()=>navigate('Digestive Problems')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer`} >Digestive Problems</p>
    //         <p  onClick={()=>navigate('Weight Management')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer`}>Weight Management</p>
    //         <p  onClick={()=>navigate('Teeth Problem')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer`}>Teeth Problem</p>
    //         <p  onClick={()=>navigate('Stress Disorder')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer`}>Stress Disorder</p>
    //       </div>
    //       <div>
    //         {
    //           filter.map(setFilter)
    //         }
    //       </div>
    //      </div>
    // </div>
  );
};

export default ViewCategories;
