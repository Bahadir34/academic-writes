import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { FaRegFilePdf } from "react-icons/fa6";
import api from "../../configs/apiConfig";
import { GlobalContext } from "../../store";
import { useNavigate } from "react-router-dom";

// todo : addAssay Hazirlanacak
const AddAssay = () => {
  const { user } = useContext(GlobalContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?._id) return navigate("/");
  }, [user]);

  const [fileName, setFileName] = useState("");

  const [errorRequiredField, setErrorRequiredField] = useState(false);

  const handleSaveAssay = (e) => {
    e.preventDefault();

    const data = {
      pdfFile: e.target?.[0]?.files[0],
      category: e.target?.[1]?.value,
      subCategory: e.target?.[3]?.value,
      tags: e.target?.[4]?.value,
      description: e.target?.[2].value,
    };

    console.log(data);

    if (
      !(
        !!data.pdfFile &&
        !!data.category &&
        !!data.subCategory &&
        !!data.tags &&
        !!data.description
      )
    ) {
      setErrorRequiredField(true);
      return console.log("Zorunlu alanlari doldurun!");
    }

    try {
      api
        .post("/save-assay", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        })
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
    } catch (error) {}
    console.dir(e.target);
  };

  const handleUploadFile = (e) => {
    console.dir(e.target.files[0].name);
    setFileName(e.target.files[0].name);
  };

  return (
    <div className=" flex items-center justify-center my-auto">
      <div className="flex flex-col items-center justify-center p-2 sm:p-10 border border-zinc-400 rounded-xl m-3">
        <h1 className="text-4xl font-light tracking-normal text-center">
          Wellcome to{" "}
          <span className="font-serif text-5xl bg-zinc-600/20 text-zinc-600 p-2 rounded-xl text-wider">
            ACADEMIC'S
          </span>
        </h1>
        <p className="mt-3 text-md tracking-wide text-zinc-400">
          Log in to access over 582K assays!
        </p>

        {errorRequiredField ? (
          <p className="text-red-400 text-center">
            Please fill whole input areas!
          </p>
        ) : (
          <div className="h-[24px]"></div>
        )}

        <form
          onSubmit={handleSaveAssay}
          className="mt-5 flex flex-col items-center justify-center gap-3 w-full md:w-[70%]"
        >
          <label
            htmlFor="pdf"
            className="w-full gird place-items-center py-10   border border-zinc-400 rounded-xl text-zinc-400 hover:text-zinc-800 transition duration-300 cursor-pointer relative"
          >
            <FaRegFilePdf className="size-10  " />
            {fileName && (
              <p className="text-center   absolute bottom-2">{fileName}</p>
            )}
          </label>
          <input
            type="file"
            id="pdf"
            className="hidden"
            onChange={handleUploadFile}
          />

          <select
            name="category"
            id="category"
            className="px-4 py-2 border border-zinc-400 rounded-xl w-full outline-none"
          >
            <option value="">Select</option>
            <option value="Math">Math</option>
            <option value="Literature">Literature</option>
            <option value="Biology">Biology</option>
            <option value="Physic">Physic</option>
            <option value="Chemistry">Chemistry</option>
            <option value="Philosophy">Philosophy</option>
            <option value="Religion">Religion</option>
            <option value="History">History</option>
            <option value="Geography">Geography</option>
            <option value="Software">Software</option>
          </select>
          <textarea
            name=""
            id=""
            placeholder="Description"
            className="px-4 py-2 border border-zinc-400 rounded-xl w-full outline-none"
          ></textarea>
          <input
            type="text"
            placeholder="Subcategory"
            className="px-4 py-2 border border-zinc-400 rounded-xl w-full outline-none"
          />
          <input
            type="text"
            placeholder="Tags (seperate with ',')"
            className="px-4 py-2 border border-zinc-400 rounded-xl w-full outline-none"
          />

          <button
            type="submit"
            className="w-full px-4 py-2 bg-zinc-600 text-zinc-50 rounded-xl hover:bg-zinc-900 hover:text-white cursor-pointer transition duration-300"
          >
            Publish
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAssay;
