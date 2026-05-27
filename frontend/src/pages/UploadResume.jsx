import { useState } from "react";

import API from "../services/api";

function UploadResume() {

  const [file, setFile] = useState(null);

  const [loading, setLoading] = useState(false);

  const [uploadedUrl, setUploadedUrl] = useState("");

  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (e) => {

    setFile(e.target.files[0]);

  };

  const handleUpload = async () => {

    if (!file) {

      return alert("Please select a file");

    }

    try {

      setLoading(true);
      setUploadProgress(0);

      const formData = new FormData();

      formData.append("resume", file);

      const response = await API.post(

        "/resume/upload",

        formData,

        {

          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },

          onUploadProgress: (progressEvent) => {

            const percentCompleted = Math.round(

              (progressEvent.loaded * 100) /
              progressEvent.total

            );

            setUploadProgress(percentCompleted);

          },

        }

      );

      alert(response.data.message);

      setUploadedUrl(response.data.fileUrl);
      setUploadProgress(100);

      console.log(response.data);

    } catch (error) {

      console.log(error);

      alert("Upload Failed");

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">

      <div className="bg-gray-900 p-10 rounded-3xl shadow-2xl w-full max-w-2xl border border-gray-800">

        <h1 className="text-5xl font-bold text-blue-400 text-center mb-4">
          Upload Resume
        </h1>

        <p className="text-gray-300 text-center mb-8 text-lg">
          Upload your resume securely to Azure Blob Storage
        </p>

        {/* Upload Box */}
        <div className="border-2 border-dashed border-gray-700 rounded-2xl p-10 text-center">

          <input
            type="file"
            onChange={handleFileChange}
            className="mb-6 text-white"
          />

          {file && (
            <p className="text-green-400">
              Selected File: {file.name}
            </p>
          )}

        </div>

        {/* Progress Bar */}

{loading && (

  <div className="mt-6">

    <div className="flex justify-between mb-2">

      <span className="text-gray-300">
        Uploading...
      </span>

      <span className="text-blue-400 font-semibold">
        {uploadProgress}%
      </span>

    </div>

    <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden">

      <div
        className="bg-blue-500 h-4 transition-all duration-300"
        style={{
          width: `${uploadProgress}%`,
        }}
      ></div>

    </div>

  </div>

)}

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          disabled={loading}
          className="w-full mt-8 bg-blue-500 hover:bg-blue-600 transition py-4 rounded-2xl text-white font-semibold text-xl"
        >

          {loading ? "Uploading..." : "Upload Resume"}

        </button>

        {/* Uploaded URL */}
        {uploadedUrl && (

          <div className="mt-8 bg-gray-800 p-4 rounded-xl">

            <p className="text-green-400 mb-2">
              Resume Uploaded Successfully
            </p>

            <a
              href={uploadedUrl}
              target="_blank"
              rel="noreferrer"
              className="text-blue-400 break-all underline"
            >
              View Uploaded Resume
            </a>

          </div>

        )}

      </div>

    </div>
  );
}

export default UploadResume;