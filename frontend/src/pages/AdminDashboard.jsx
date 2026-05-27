import { useEffect, useState } from "react";

import API from "../services/api";

function AdminDashboard() {

  const [resumes, setResumes] = useState([]);

  useEffect(() => {

    fetchAllResumes();

  }, []);

  const fetchAllResumes = async () => {

    try {

      const response = await API.get(

        "/resume/all",

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

      alert("Admin Access Required");

    }

  };

  const updateStatus = async (id, status) => {

    try {

      await API.put(

        `/resume/verify/${id}`,

        { status },

        {

          headers: {

            Authorization:
              `Bearer ${localStorage.getItem("token")}`,

          },

        }

      );

      fetchAllResumes();

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="min-h-screen bg-gray-950 text-white px-6 py-10">

      <h1 className="text-5xl font-bold text-blue-400 mb-10">
        Admin Dashboard
      </h1>

      <div className="overflow-x-auto">

        <table className="w-full bg-gray-900 rounded-2xl overflow-hidden">

          <thead className="bg-gray-800">

            <tr>

              <th className="p-4 text-left">
                Resume
              </th>

              <th className="p-4 text-left">
                Status
              </th>

              <th className="p-4 text-left">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {resumes.map((resume) => (

              <tr
                key={resume._id}
                className="border-b border-gray-800"
              >

                <td className="p-4">

                  <a
                    href={resume.fileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-400 underline"
                  >

                    {resume.fileName}

                  </a>

                </td>

                <td className="p-4">

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold
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

                </td>

                <td className="p-4 flex gap-3">

                  <button
                    onClick={() =>
                      updateStatus(
                        resume._id,
                        "Verified"
                      )
                    }
                    className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-xl"
                  >

                    Approve

                  </button>

                  <button
                    onClick={() =>
                      updateStatus(
                        resume._id,
                        "Rejected"
                      )
                    }
                    className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-xl"
                  >

                    Reject

                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default AdminDashboard;