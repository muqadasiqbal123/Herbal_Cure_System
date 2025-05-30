import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import data from "../data/data.json";

const DiseaseDetailPage = () => {
  const { disease } = useParams();
  const [diseaseDetail, setDiseaseDetails] = useState(null);
  console.log(disease, "disease");
  const [herbalists, setHerbalists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  // Fetch disease details and category
  useEffect(() => {
    const res = data.filter(
      (d) => d.name.toLowerCase() === disease.toLowerCase()
    );
    if (res.length) {
      setDiseaseDetails(res[0]);
      fetchHerbalists(res[0].category);
    }
  }, [disease]);

  // Fetch matching herbalists
  const fetchHerbalists = async (category) => {
    try {
      const response = await fetch("http://localhost:4000/api/herbalist/list");
      if (!response.ok) throw new Error("Failed to fetch herbalists");

      const herbalistData = await response.json();
      console.log(herbalistData?.herbalists, "data");
      const filteredHerbalists = herbalistData?.herbalists.filter((herbalist) =>
        herbalist.speciality?.includes(category)
      );

      console.log(filteredHerbalists, "filtered herbalists");

      setHerbalists(filteredHerbalists);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

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
            <p className="mb-2">{factor?.description}</p>
          </>
        ))}

        <h2 className="text-xl font-semibold mb-2">Treatment</h2>
        <ul className="list-disc pl-6 mb-4">
          {diseaseDetail?.treatment.map((treatment) => (
            <li>{treatment}</li>
          ))}
        </ul>
      </div>
      {/* ----------Frequently Asked Question--------- */}
      <div className="mt-5">
        <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
      </div>
      <div className="mt-5 bg-white p-6 shadow-md rounded-lg">
        {diseaseDetail?.faqs.map((faq) => (
          <div className="mb-4">
            <h3 className="text-lg font-semibold">{faq?.question}</h3>
            <p>{faq.answer}</p>
          </div>
        ))}
      </div>
      {/*-------------------herbalists list----------------------- */}
      <div className="mt-5 "></div>

      {/* Recommended Herbalists Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Recommended Herbalists</h2>

        {loading && (
          <div className="text-center py-4">
            <p>Loading recommended herbalists...</p>
          </div>
        )}

        {error && (
          <div className="text-red-500 py-4">
            <p>Error: {error}</p>
          </div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {herbalists.length > 0 ? (
              herbalists.map((herbalist) => (
                <div
                  key={herbalist._id}
                  className=" flex items-center gap-4 border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="h-20 w-20 rounded-full overflow-hidden">
                    <img
                      className="w-full h-full object-cover"
                      src={herbalist?.image}
                      alt="Dr. Rajesh Kumar"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{herbalist.name}</h3>
                    <p className="text-gray-600">{herbalist.specialization}</p>
                    <p className="text-sm text-gray-500 mt-2">
                      {herbalist.experience} experience
                    </p>
                    <div className="mt-4 bg-blue-500 hover:bg-blue-600 rounded-xl py-2 px-4 cursor-pointer">
                      <a
                        href={`/appointment/${herbalist._id}`}
                        className="text-white"
                      >
                        Book appointment
                      </a>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="col-span-3 text-center text-gray-500">
                No herbalists found for {disease}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DiseaseDetailPage;
