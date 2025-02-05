import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import data from "../data/data.json";

const DiseaseDetailPage = () => {
  const { disease } = useParams();
  const [diseaseDetail, setDiseaseDetails] = useState(null);
  console.log(disease, "disease");
  useEffect(() => {
    // console.log(data,"data");
    const res = data.filter(
      (d) => d.name.toLowerCase() === disease.toLowerCase()
    );
    // console.log(res,"response");
    if (res.length) {
      setDiseaseDetails(res[0]);
    }
  }, [data]);

  console.log(diseaseDetail, "details");

  return (
    <div className="container mx-auto p-4">
      {/* -------------Search Bar-------------- */}
      <div className="container mx-auto py-4">
        <div className="relative w-full">
          <input
            type="search"
            name="searchbx"
            id="searchbx"
            className="w-full p-3 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search for herbalists, specialties, diseases"
            autoComplete="off"
          />
          <button className="absolute right-2 top-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            Search
          </button>
        </div>
      </div>
      {/* ------------------route to home and view-category page-------------- */}
      <div className="mb-6">
        <ul className="flex space-x-4 text-blue-500">
          <li>
            <a href="/">Home/</a>
          </li>
          <li>
            <a href="/view-categories">view-categories/</a>
          </li>
          {/* <li>Acne</li> */}
          <li>{diseaseDetail?.name}</li>
        </ul>
      </div>
      <div className="bg-white py-6 shadow-md rounded-lg">
        <h1 className="text-2xl font-bold mb-4">
          {diseaseDetail?.name} - Introduction, Symptoms, Causes, Treatment
        </h1>
        <h2 className="text-xl font-semibold mb-2">
          Introduction - {diseaseDetail?.name}
        </h2>
        <p className="mb-4">{diseaseDetail?.introduction}</p>
        <p className="mb-4">{diseaseDetail?.subline}</p>
        <h2 className="text-xl font-semibold mb-2">Symptoms</h2>
        <p className="mb-4">{diseaseDetail?.symptoms?.des}</p>
        <ul className="list-disc pl-6 mb-4">
          {diseaseDetail?.symptoms?.points.map((sym) => (
            <li>{sym}</li>
          ))}
          {/* <li>Open clogged pores - blackheads</li>
          <li>Papules - small red tender bumps</li>
          <li>Pimples - pustules filled with pus</li>
          <li>Nodules - large solid pus-filled lumps under the skin</li>
          <li>Cystic lesions - painful lumps filled with pus under the skin</li> */}
        </ul>
        <h2 className="text-xl font-semibold mb-2">Risk Factors</h2>
        <ul className="list-disc pl-6 mb-4">
          {diseaseDetail?.risk_factors.map((fac) => (
            <li>{fac}</li>
          ))}
        </ul>
        <h2 className="text-xl font-semibold mb-2">
          Things That May Worsen {diseaseDetail?.name}
        </h2>
        {diseaseDetail?.worse_factors.map((factor) => (
          <>
            <h3 className="text-lg font-medium">{factor?.point}</h3>
            <p className="mb-2">
              {factor?.description}
            </p>
          </>
        ))}
        {/* <h3 className="text-lg font-medium">Hormonal Change</h3>
        <p className="mb-2">
          Androgens surge in boys and girls at puberty, which eventually leads
          to increased sebum production, may cause acne. Therefore, it is common
          in teenagers. Furthermore, in women it may also occur due to
          contraceptive use or pregnancy as they alter the hormone levels.
        </p>
        <h3 className="text-lg font-medium">Diet</h3>
        <p className="mb-2">
          Processed foods and high-fat diets can contribute to worsening acne.
        </p>
        <h3 className="text-lg font-medium">Medicines</h3>
        <p className="mb-2">
          Certain medications like corticosteroids, lithium, or hormonal drugs
          can worsen or exacerbate acne.
        </p> */}
        <h2 className="text-xl font-semibold mb-2">Treatment</h2>
        <ul className="list-disc pl-6 mb-4">
            {diseaseDetail?.treatment.map((treatment)=>(
          <li>
            {treatment}
          </li>

            ))}
          {/* <li>
            Tea Tree Oil - Mix with carrier oil and apply for antibacterial
            benefits.
          </li>
          <li>
            Honey and Cinnamon Mask - Apply as an antimicrobial treatment.
          </li>
          <li>Green Tea - Use as a toner to reduce sebum production.</li> */}
        </ul>
      </div>
      {/* ----------Frequently Asked Question--------- */}
      <div className="mt-5">
        <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
      </div>
      <div className="mt-5 bg-white p-6 shadow-md rounded-lg">
        {diseaseDetail?.faqs.map((faq)=>(
        <div className="mb-4">
          <h3 className="text-lg font-semibold">
            {faq?.question}
          </h3>
          <p>{faq.answer}</p>
        </div>

        ))}
        {/* <div className="mb-4">
          <h3 className="text-lg font-semibold">
            What is the main cause of acne?
          </h3>
          <p>
            The main cause of acne is a surge in hormones called androgens...
          </p>
        </div> */}
        {/* <div className="mb-4">
          <h3 className="text-lg font-semibold">How do I remove acne?</h3>
          <p>
            There are several ways to remove acne, depending on its severity...
          </p>
        </div> */}
      </div>
      {/*-------------------Doctors list----------------------- */}
      <div className="mt-5 ">
        <h2 className="text-2xl font-bold mb-4">Doctor for {diseaseDetail?.name}</h2>
      </div>
      <div className="flex flex-wrap mt-5 gap-5 bg-white p-6 shadow-md rounded-lg">
        {/* -------------1st Doctor------- */}
          {diseaseDetail?.herbalists_recommended.map((rec)=>(
        <div className="border p-4 rounded-lg w-[450px] shadow-md">
            <div className="flex items-center gap-4">
            {/* Doctor Image */}
            <div className="h-20 w-20 rounded-full overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src="https://media.istockphoto.com/id/1442556244/photo/portrait-of-young-beautiful-woman-with-perfect-smooth-skin-isolated-over-white-background.jpg?s=612x612&w=0&k=20&c=4S7HufG4HDXznwuxFdliWndEAcWGKGvgqC45Ig0Zqog="
                alt="Dr. Rajesh Kumar"
              />
            </div>
            {/* Doctor Info */}
            <div>
              <p className="font-bold text-lg">{rec.name}</p>
              <p className="text-gray-600">{rec.designation}</p>
              <p className="text-gray-500">{rec.exp} </p>
            </div>

            {/* Appointment Button */}
            <button className="ml-auto bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl">
              Book Appointment
            </button>
          </div>
          </div>
          ))}
        {/* ----------------End first Doctor----------------- */}

        {/* -------------2nd Doctor------- */}
       

       
      </div>
    </div>
  );
};

export default DiseaseDetailPage;
