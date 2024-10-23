import React, { useState } from "react";


import Header from "../components/Header";

import { FAQQuestionAnswer } from "../types/types";

import { faq_data } from "../assets/json/FAQ.json";

const FAQ: React.FC = () => {
  const [faq] = useState<FAQQuestionAnswer[]>(faq_data);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;

  const toggleAnswer = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleClick = (page: number) => {
    setCurrentPage(page);
    setActiveIndex(null); // Reset active index when changing page
  };

  const totalPages = Math.ceil(faq.length / itemsPerPage);
  const currentItems = faq.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <Header
        mute={false}
        handleMuteButton={(value: boolean) => {
          console.log(value)
        }}
      />
      <div className="mt-[1rem]">
        <div className="bg-black text-white p-8">
          <h1 className="text-4xl font-bold text-center mb-8 my-10">
            Frequently Asked Questions
          </h1>
          <div className="max-w-4xl mx-auto mt-10" id="faq-section">
            {currentItems.map((item, index) => (
              <div key={index} className="mb-6">
                <div
                  className={`cursor-pointer p-3 rounded-md bg-gray-800 text-white my-8`}
                  onClick={() => toggleAnswer(index)}
                >
                  <h2 className="text-xl font-semibold">{item.question}</h2>
                </div>
                {activeIndex === index && (
                  <div className="mt-2 p-3 bg-gray-900 text-white rounded-md">
                    <p className="text-lg tracking-wider">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
            <div
              className="flex justify-center space-x-2 mt-16"
              id="faq-pagination"
            >
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => handleClick(i + 1)}
                  className={`px-3 py-1 rounded-md ${
                    currentPage === i + 1
                      ? "bg-white text-black"
                      : "bg-gray-800 text-white"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FAQ;
