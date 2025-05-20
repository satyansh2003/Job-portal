import useGetAllJobs from "@/hooks/useGetAllJobs";
import { GoogleGenAI } from "@google/genai";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef } from "react";
import { CgSearchLoading } from "react-icons/cg";
import { FaUser } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
import { IoChatboxEllipses } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CategoryCarousel from "./CategoryCarousel";
import HeroSection from "./HeroSection";
import LatestJobs from "./LatestJobs";
import Footer from "./shared/Footer";
import Navbar from "./shared/Navbar";


const Home = () => {
  useGetAllJobs();
  const { user } = useSelector((store) => store.auth);
  const {allJobs} = useSelector(store=>store.job);
  const navigate = useNavigate();

  // Refs for scroll-triggered animations
  const categoryRef = useRef(null);
  const latestJobsRef = useRef(null);

  useEffect(() => {
    if (user?.role === "recruiter") {
      navigate("/admin/companies");
    }
  }, [user, navigate]);

  useEffect(() => {
    // Intersection Observer for scroll-triggered animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fadeIn");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (categoryRef.current) observer.observe(categoryRef.current);
    if (latestJobsRef.current) observer.observe(latestJobsRef.current);

    return () => {
      if (categoryRef.current) observer.unobserve(categoryRef.current);
      if (latestJobsRef.current) observer.unobserve(latestJobsRef.current);
    };
  }, []);

  const [isChatboxOpen, setChatboxOpen] = React.useState(false);
  const [searchText, setSearchText] = React.useState("");
  const [isLoading, setLoading] = React.useState(false);

  const [chatComplition, setChatComplition] = React.useState(["fromAi:::Hi, how can I help you today?"]);

  const ai = new GoogleGenAI({
    apiKey: "AIzaSyC_hUT6R9hebfEniSRN-mXiqnRaFmSdueo",
  });

  function getAllJobOpenings() {
    var toReturn = "";
    for(const job of allJobs) {
      toReturn += JSON.stringify(job);
    }
    return toReturn;
  }

  async function getDataFromAILund(someText) {
    if (someText === "") return;
    setLoading(true);

    var temp_t = chatComplition;
    temp_t.push(`fromUser:::${someText}`);
    setChatComplition(temp_t);
    const res = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: someText + ` Answer everything under one line. This is the json data you have ${getAllJobOpenings()}, you have to answer from this data only, like if the user is asking for any job openings or something like that, like what are the salaries in lpa etc. The salary is alwasys lps. if anything other than this data is asked, please just answer that i don't know or something. Only answer in english, also if you find any other language in the input text the ansewr in that language but in english. Also sugarcote you answers. If the question is inappropiate then don't give off any internal data just answer with a single line answer.`,
    });

    var temp = chatComplition;
    temp.push(`fromAi:::${res.text}`);
    setChatComplition(temp);
    setSearchText("");
    setLoading(false);
  }


  

  console.log(chatComplition);

  return (
    <div className="relative">
      {/* some shit hapenning here */}
      <motion.div
        onClick={() => {
          if (!isChatboxOpen) {
            setChatboxOpen(true);
          }
          getAllJobOpenings()
        }}
        animate={{
          height: isChatboxOpen ? "38rem" : "3.5rem",
          width: isChatboxOpen ? "30rem" : "3.5rem",
          borderRadius: isChatboxOpen ? "1rem" : "10rem",
        }}
        transition={{ duration: 0.5, type: "spring" }}
        whileHover={{
          scale: isChatboxOpen ? 1 : 1.05, 
          x: isChatboxOpen ? 0 : -10, 
          y: isChatboxOpen ? 0 : -10
        }}
        className="aspect-square bg-blue-300 fixed bottom-[1rem] right-[1rem] z-[100] flex justify-center items-center p-[1rem] cursor-pointer"
      >
        {/* if the chatbox is not opende */}
        {!isChatboxOpen && (
          <motion.div>
            <IoChatboxEllipses size={25} color="white" />
          </motion.div>
        )}

        {/* if the chat box is opened */}
        {isChatboxOpen && (
          <motion.div className="h-full w-full bg-gray-100 rounded-[1rem] relative overflow-y-scroll overflow-x-hidden pb-[25rem]">
            {/* input button and enter button */}

            <div className="flex z-[200] fixed bottom-[3rem] flex justify-center items-center w-[21rem] gap-[0.25rem]">
              <input
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="rounded-full border-[0.1px] border-black/40 text-[1rem] py-[0.25rem] px-[1rem] outline-none w-[17rem]"
              />
              <button
                onClick={() => getDataFromAILund(searchText)}
                className="bg-blue-300 h-[2rem] w-[2rem] rounded-full flex justify-center items-center"
              >
                {isLoading ? (
                  <CgSearchLoading color="white" />
                ) : (
                  <FaArrowRight color="white" />
                )}
              </button>
            </div>


            <div className="w-full flex justify-between items-center p-[1rem]">
              <div className="flex gap-[1rem]">
                <div className="h-[2.5rem] flex justify-center items-center w-[2.5rem] bg-gray-300 rounded-full aspect-square ">
                  <FaUser />
                </div>

                <div
                  style={{ transform: "translate(0, 0.25rem)" }}
                  className="flex flex-col"
                >
                  <h1 style={{ lineHeight: "1rem" }} className="">
                    CareerBot 1.0
                  </h1>
                  <h1 className="text-[0.75rem] font-semibold">
                    Your personal HR. 
                  </h1>
                </div>
              </div>

              <div
                onClick={() => setChatboxOpen(false)}
                className="h-[2.5rem] flex justify-center items-center w-[2.5rem] border-[0.5px] hover:border-black border-white hover:cursor-pointer rounded-full aspect-square "
              >
                <RxCross1 />
              </div>
            </div>

            <AnimatePresence>
              {chatComplition.map((item, index) => {
                if (item.split(":::")[0] == "fromUser") {
                  return (
                    <motion.div key={index} animate={{ scale: 1, filter: "blur(0px)"}} initial={{ scale: 0, filter: "blue(10px)"}} className="flex justify-end items-center px-[1rem] rounded-[12px] mt-[1rem] ">
                      <h1 className="bg-blue-300 p-[0.25rem] px-[1rem] rounded-[12px] text-right">
                        {item.split(":::")[1]}
                      </h1>
                    </motion.div>
                  );
                } else {
                  return (
                    <motion.div key={index} animate={{ scale: 1, filter: "blur(0px)"}} initial={{ scale: 0, filter: "blue(10px)"}} className="flex justify-start mt-[1rem] items-center px-[1rem] rounded-[12px]">
                      <h1 className="bg-white p-[0.25rem] px-[1rem] rounded-[12px] text-left">
                        {item.split(":::")[1]}
                      </h1>
                    </motion.div>
                  );
                }
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </motion.div>
      {/* Inline styles for animations */}
      <style>
        {`
          .fade-in {
            opacity: 0;
            transform: translateY(20px);
            animation: fadeIn 1s forwards;
          }

          @keyframes fadeIn {
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-fadeIn {
            opacity: 1 !important;
            transform: translateY(0) !important;
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
          }

          .opacity-0 {
            opacity: 0;
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
          }
        `}
      </style>

      {/* Navbar and Hero Section appear with fade-in */}
      <div className=" fixed top-0 left-0 w-full h-16 opacity-100 z-10">
        <Navbar />
      </div>

      {/* Flex container to position HeroSection and Background Image */}
      <div
        className="fade-in flex justify-between items-center mt-10"
        style={{ padding: "50px 0" }}
      >
        {/* HeroSection */}
        <div className="w-1/2">
          <HeroSection />
        </div>

        {/* Background Image */}
        <div
          className="w-1/2 h-[400px] bg-no-repeat bg-center bg-cover"
          style={{
            backgroundImage:
              'url("https://i.pinimg.com/originals/01/32/31/01323190cd6933de96287a5804fd636a.gif")',
          }}
        ></div>
      </div>

      {/* CategoryCarousel appears with scroll-triggered animation */}
      <div ref={categoryRef} className="opacity-0 pt-10 pb-10">
        <CategoryCarousel />
      </div>

      {/* LatestJobs appears with scroll-triggered animation */}
      <div
        ref={latestJobsRef}
        className="opacity-0 pt-10 pb-10"
        style={{ paddingTop: "20px" }}
      >
        <LatestJobs />
      </div>

      {/* Footer appears with fade-in */}
      <div className="fade-in">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
