import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { FaUsers } from "react-icons/fa6";
import { PiNewspaperFill } from "react-icons/pi";
import { SiReadme } from "react-icons/si";
import millify from "millify";

const Hero = ({ userCount, assayAnalise }) => {
  console.log();
  return (
    <section className=" flex max-lg:flex-col-reverse w-full min-h-[calc(100vh-82px)] gap-1 max-md:gap-10 p-1 sm:p-3 md:p-5 lg:p-7 xl:p-10   ">
      <div className="flex-1 flex items-start max-lg:items-center flex-col justify-center md:p-2 lg:p-5 xl:p-7">
        <h1 className="text-4xl max-lg:text-xl">
          Downloadable 582 million Assays in{" "}
        </h1>
        <span className="font-serif tracking-wider font-bold text-zinc-600 text-7xl max-lg:text-4xl">
          ACADEMIC'S
        </span>
        <p className="mt-10 max-md:mt-5 text-xl max-md:text-sm px-2 py-2 bg-zinc-100 rounded-xl">
          You want to be a part of{" "}
          <span className="font-serif text-2xl   max-md:text-xl text-zinc-600">
            ACADEMIC'S?
          </span>
        </p>

        <div className="flex items-center gap-2 mt-5">
          <span>
            <FaArrowRightLong className="size-9 max-md:size-6 text-zinc-600" />
          </span>
          <Link
            to={"/register"}
            className="px-4 py-2 text-zinc-100 bg-zinc-900 border border-zinc-900 rounded-xl text-2xl max-md:text-sm font-extralight tracking-wider hover:opacity-80 cursor-pointer transition duration-300"
          >
            Join Us Here
          </Link>
        </div>

        <div className="flex mt-3 lg:mt-10 items-center justify-center mx-auto border border-zinc-300 rounded-xl  ">
          <div className="flex flex-col items-center justify-center border-r border-zinc-300 p-2 md:p-5  min-w-[100px] md:min-w-[120px]">
            <FaUsers className="size-5 md:size-6 lg:size-7 xl:size-10 text-blue-400" />
            <span className="text-sm md:text-md text-zinc-400">Users</span>
            <h3 className="mt-3 text-md md:text-2xl font-bold">
              {millify(userCount)}
            </h3>
          </div>
          <div className="flex flex-col items-center justify-center  border-r border-zinc-300 p-2 md:p-5 min-w-[100px] md:min-w-[120px]">
            <PiNewspaperFill className="size-5 md:size-6 lg:size-7 xl:size-10 text-orange-400" />
            <span className="text-sm md:text-md text-zinc-400">Assays</span>
            <h3 className="mt-3 text-md md:text-2xl font-bold">
              {millify(Object.values(assayAnalise).reduce((a, b) => a + b, 0))}
            </h3>
          </div>
          <div className="flex flex-col items-center justify-center p-2 md:p-5  min-w-[100px] md:min-w-[120px]">
            <SiReadme className="size-5 md:size-6 lg:size-7 xl:size-10 text-red-400" />
            <span className="text-sm md:text-md text-zinc-400">
              Daily Reads
            </span>
            <h3 className="mt-3 text-md md:text-2xl font-bold">
              {millify(1809)}
            </h3>
          </div>
        </div>
        <div></div>
      </div>
      <div
        className="
    flex-1 
    w-full 
    min-h-[300px]
    bg-cover 
    bg-center 
    rounded-xl 
    max-lg:h-[200px] 
    max-lg:mt-5
  "
        style={{ backgroundImage: "url('/hero-bg.jpeg')" }}
      ></div>
    </section>
  );
};

export default Hero;
