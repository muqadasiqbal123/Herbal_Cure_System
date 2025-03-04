import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ViewCategories = () => {
  // const {diseases} = useParams()
  // const [filter, setFilter] = useState([])
  // const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState("");
  // const applyFilter = () =>{
  //   setFilter(filter)
  // }

  // useEffect(()=>{
  // applyFilter()
  // },[diseases])

  // Create array of all diseases
  const diseases = [
    { name: "Acne", category: "Skin Disorder" },
    { name: "Pimple", category: "Skin Disorder" },
    { name: "Melasma", category: "Skin Disorder" },
    { name: "Eczema", category: "Skin Disorder" },
    { name: "Hyper-Pigmentation", category: "Skin Disorder" },
    { name: "Dermatomyositis", category: "Skin Disorder" },
    { name: "Psoriasis", category: "Skin Disorder" },
    { name: "Lupus", category: "Skin Disorder" },
    { name: "Sunstroke", category: "Skin Disorder" },
    { name: "Rosacea", category: "Skin Disorder" },
    { name: "Shingles", category: "Skin Disorder" },
    // Add more diseases from other categories...
    { name: "Alopecia", category: "Hair Issue" },
    { name: "Dandruff", category: "Hair Issue" },
    { name: "Premature-Graying", category: "Hair Issue" },
    { name: "Scalp-Infection", category: "Hair Issue" },
    { name: "Hair-Thining", category: "Hair Issue" },
    { name: "Baldness", category: "Hair Issue" },
    // Digestive Problem
    { name: "Indigestion", category: "Digestive Problem" },
    { name: "Constipation", category: "Digestive Problem" },
    { name: "Diarrhea", category: "Digestive Problem" },
    // Neurological Issue
    { name: "Anxiety-Disorder", category: "Neurological Issue" },
    { name: "Stress-Disorder", category: "Neurological Issue" },
    { name: "Insomnia", category: "Neurological Issue" },
    // Weight Management
    { name: "Obesity", category: "Weight Management" },
    { name: "WeightlossSupport", category: "Weight Management" },
    // ENT Disorder
    { name: "EarInfection", category: "ENT Disorder" },
    { name: "Influenza", category: "ENT Disorder" },
    { name: "Dysphagia", category: "ENT Disorder" },
    { name: "SoreThroat", category: "ENT Disorder" },
    { name: "Diphtheria", category: "ENT Disorder" },
    // General Health Issues
    { name: "WeakImmunity", category: "General Health Issues" },
    { name: "Fatigue", category: "General Health Issues" },
    { name: "Viral-Fever", category: "General Health Issues" },
    { name: "Whooping-Cough", category: "General Health Issues" },
    { name: "Typhoid", category: "General Health Issues" },
    { name: "Back-Pain", category: "General Health Issues" },
    { name: "Pneumonia", category: "General Health Issues" },
    { name: "Chicken-Pox", category: "General Health Issues" },
    { name: "Malaria", category: "General Health Issues" },
    { name: "Cholera", category: "General Health Issues" },
    { name: "Dengue-Fever", category: "General Health Issues" },
    { name: "Khasra", category: "General Health Issues" },
    { name: "Polio", category: "General Health Issues" },
    // Nephrologist
    { name: "High-Blood-Pressure", category: "Nephrologist" },
    { name: "Kidney-Infection", category: "Nephrologist" },
    { name: "Nephritis", category: "Nephrologist" },
    // Gynecologist
    { name: "Hormonal-Imbalance", category: "Gynecologist" },
    { name: "Menstrual-Irregularities", category: "Gynecologist" },
    { name: "Ovarian-Cancer", category: "Gynecologist" },
    // ...add all other diseases with their categories
  ];

  // Filter diseases based on search query
  const filteredDiseases = diseases.filter(disease =>
    disease.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Group filtered diseases by category
  const groupedDiseases = filteredDiseases.reduce((acc, disease) => {
    if (!acc[disease.category]) {
      acc[disease.category] = [];
    }
    acc[disease.category].push(disease);
    return acc;
  }, {});

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
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Diseases */}
      <div className="diseases space-y-8">
        {Object.entries(groupedDiseases).map(([category, diseases]) => (
          diseases.length > 0 && (
            <div className="disease-item" key={category}>
              <h2 className="text-2xl font-semibold mb-4">{category}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {diseases.map((disease) => (
                  <div className="disease" key={disease.name}>
                    <a href={`/view-categories/${disease.name}`}>
                      <div className="box-general flex items-center justify-between p-4 border rounded-lg hover:shadow-md hover:bg-primary hover:text-white text-gray-800">
                        <label>{disease.name}</label>
                      </div>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )
        ))}
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
