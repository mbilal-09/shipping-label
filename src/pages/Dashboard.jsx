import { useRef, useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "flowbite";
import CSVReader from "react-csv-reader";
import { usePDF } from "react-to-pdf";
import MainDocument from "./MainDocument";
import CheckAuth from "../Components/AuthCheck";

function Dashboard() {
  const { navigate } = useNavigate();
  const auth = getAuth();
  const [csvData, setCsvData] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [cvsFileName, setCvsFileName] = useState("");

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
      console.log("User logout!");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const csvReaderRef = useRef(null);
  const handleLabelClick = () => {
    csvReaderRef.current?.click();
  };

  return (
    <CheckAuth>
      <nav className="w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 max-w-full lg:w-[80%] sm:w-[85%] w-full mx-auto">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center justify-start rtl:justify-end">
              <a href="/" className="flex ms-2 md:me-24">
                <p className="self-center text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 text-xl font-bold sm:text-2xl whitespace-nowrap">
                  Shipping Label Creation
                </p>
              </a>
            </div>
            <div className="flex items-center">
              <div className="flex items-center">
                <button
                  onClick={handleLogout}
                  className="bg-red-50 text-red-600 rounded-lg py-2 px-6 hover:bg-red-600 hover:text-white transition-all border border-red-600"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className="mt-8 flex flex-col justify-center w-full max-w-full lg:w-[80%] sm:w-[85%] lg:px-3 sm:px-0 px-4 mx-auto">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-36 rounded-xl hover:bg-gray-200 transition-all border-2 border-gray-300 hover:border-gray-400 border-dashed cursor-pointer"
        >
          <CSVReader
            cssclassName="mx-auto m-0 p-0"
            onFileLoaded={(data, fileInfo) => {
              data.shift();
              setCsvData(data);
              let name = fileInfo.name.replace(".csv", "");
              setCvsFileName(name);
            }}
          />
        </label>
        <div>
          {csvData?.length > 0 && csvData && (
            <>
              <div className="my-4 sm:w-[20%]">
                <label
                  htmlFor="countries"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Select an option
                </label>
                <select
                  id="countries"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={handleSelectChange}
                  value={selectedOption}
                >
                  <option value="" disabled>
                    Choose an option
                  </option>
                  <option value="UPS 2ND DAY AIR">UPS 2ND DAY AIR</option>
                  <option value="UPS NEXT DAY AIR">UPS NEXT DAY AIR</option>
                  <option value="UPS Ground">UPS Ground</option>
                </select>
              </div>
            </>
          )}
        </div>
      </div>
      {selectedOption && (
        <MainDocument
          csvData={csvData}
          cvsFileName={cvsFileName}
          selectedOption={selectedOption}
        />
      )}
    </CheckAuth>
  );
}

export default Dashboard;
