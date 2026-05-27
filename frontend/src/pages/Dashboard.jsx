import { useEffect, useState } from "react";

import API from "../services/api";

function Dashboard() {

  const [resumes, setResumes] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetchResumes();

  }, []);

  const fetchResumes = async () => {

    try {

      const response = await API.get(

        "/resume/my-resumes",

        {

          headers: {

            Authorization:
              `Bearer ${localStorage.getItem("token")}`,

          },

        }

      );

      setResumes(response.data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="min-h-screen bg-gray-950 text-white px-6 py-10">

      <h1 className="text-5xl font-bold text-blue-400 mb-10">
        My Dashboard
      </h1>

      {loading ? (

        <p className="text-gray-400">
          Loading resumes...
        </p>

      ) : resumes.length === 0 ? (

        <div className="bg-gray-900 p-10 rounded-2xl border border-gray-800">

          <p className="text-gray-400 text-xl">
            No resumes uploaded yet.
          </p>

        </div>

      ) : (

        <div className="grid md:grid-cols-2 gap-6">

          {resumes.map((resume) => (

            <div
              key={resume._id}
              className="bg-gray-900 p-6 rounded-2xl border border-gray-800 shadow-lg"
            >

              <h2 className="text-2xl font-semibold text-blue-300 mb-3">
                {resume.fileName}
              </h2>

              <p className="mb-4">

                Status:

                <span
                  className={`ml-2 px-3 py-1 rounded-full text-sm font-semibold
                  ${
                    resume.status === "Verified"
                      ? "bg-green-500 text-white"
                      : resume.status === "Rejected"
                      ? "bg-red-500 text-white"
                      : "bg-yellow-500 text-black"
                  }`}
                >

                  {resume.status}

                </span>

              </p>

              <a
                href={resume.fileUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-block bg-blue-500 hover:bg-blue-600 transition px-5 py-2 rounded-xl"
              >

                View Resume

              </a>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default Dashboard;