import React, { useState } from "react";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";

dayjs.extend(relativeTime);

const AssayItem = ({ assay }) => {
  console.log(assay);

  const [zoom, setZoom] = useState(100);

  return (
    <div className="flex flex-col md:flex-row gap-3">
      <div className="relative">
        <iframe
          key={zoom}
          src={`${assay.pdfFile}#zoom=${zoom}`}
          className=" w-70 aspect-[3/4]    object-cover rounded-xl border border-zinc-400"
          zoom={2}
        ></iframe>
        <div className="flex gap-5 items-center absolute bottom-2 left-[50%] transform -translate-x-[50%]">
          <button
            onClick={() => setZoom((prev) => prev - 10)}
            className="size-10 bg-white/90 rounded-full text-2xl grid place-items-center hover:bg-white cursor-pointer transition duraion-300"
          >
            <span>-</span>
          </button>
          <span className="text-2xl p-2 rounded-full text-white bg-zinc-900/80">
            {zoom}
          </span>
          <button
            onClick={() => setZoom((prev) => prev + 10)}
            className="size-10 bg-white/90 rounded-full text-2xl grid place-items-center  hover:bg-white cursor-pointer transition duraion-300"
          >
            <span>+</span>
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div>
          <a
            href={assay.pdfFile}
            target="_blank"
            className="text-2xl tex-zinc-900 hover:text-zinc-400 transition duration-300"
          >
            {assay.description}
          </a>
          <p className="text-md text-zinc-600">
            from{" "}
            <span className="font-semibold text-zinc-600">
              {assay.writedBy.firstName} {assay.writedBy.lastName}
            </span>
          </p>
        </div>
        <div className="">
          <span className="text-zinc-400">
            You can reach the writer via{" "}
            <a
              className="text-blue-400"
              href={`mailto:${assay.writedBy.email}`}
            >
              {assay.writedBy.email}.
            </a>
          </span>

          <div className="mt-3">
            <p className="text-xl text-zinc-800">
              Category :{" "}
              <span className="font-semibold text-zinc-900">
                {assay.category}
              </span>
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          {assay.tags.map((item, key) => (
            <span className="px-2 py-1 bg-zinc-200 text-zinc-800 rounded-full">
              {item}
            </span>
          ))}
        </div>
        <div>
          <p className="text-md">
            Created{" "}
            <span className="font-semibold">
              {dayjs(assay.createdAt).fromNow()}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AssayItem;
