import { FaRegMap } from "react-icons/fa6";
import { FaRegNewspaper } from "react-icons/fa";
import { MdOutlinePublish } from "react-icons/md";

const HowItWorks = () => {
  return (
    <div className="mt-20 text-center p-5 lg:p-10">
      <h1 className="text-3xl">
        Join us and be a part of{" "}
        <span className="text-4xl font-serif text-zinc-600">ACADEMIC'S</span>
      </h1>

      <section className="grid grid-cols-1 md:grid-cols-2    lg:grid-cols-3 gap-5 mt-10">
        <div className="flex flex-col items-center justify-center gap-5 p-10 md:p-12 bg-blue-950 text-zinc-200  ">
          <FaRegMap className="size-13" />
          <h2 className="text-4xl">Track your impact</h2>
          <p className="text-xl">
            Share your work with other academics, grow your audience and track
            your impact on your field with our robust analytics
          </p>
        </div>
        <div className="flex flex-col items-center justify-center gap-5 p-10 md:p-12 bg-blue-950 text-zinc-200">
          <FaRegNewspaper className="size-13" />
          <h2 className="text-4xl">Discover new research</h2>
          <p className="text-xl">
            Get access to millions of research papers and stay informed with the
            important topics around the world
          </p>
        </div>
        <div className="flex  flex-col items-center justify-center gap-5 p-10 md:p-12 bg-blue-950 text-zinc-200">
          <MdOutlinePublish className="size-12" />
          <h2 className="text-4xl">Publish your work</h2>
          <p className="text-xl">
            Publish your research with fast and rigorous service through
            Academia.edu Journals. Get instant worldwide dissemination of your
            work
          </p>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
