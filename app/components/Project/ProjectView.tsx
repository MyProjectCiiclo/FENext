export default function ProjectView() {
  const projects = [
    {
      id: 1,
      project_name: "Portfolio Website",
      language: "React",
      project_type: "Frontend",
      description: "Modern portfolio website using React and TailwindCSS.",
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    },
  ];

  return (
    <div className=" bg-[#0f375a] px-6 lg:px-[180px] py-10">
      <div className="bg-white rounded-3xl shadow-xl p-6">

        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

          <h2 className="text-3xl font-bold text-gray-800">
            Project
          </h2>

          <button className="bg-[#0f375a] text-white px-5 py-3 rounded-xl hover:opacity-90 duration-200">
            New Project
          </button>

        </header>

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">

          <input
            type="text"
            placeholder="Search..."
            className="border border-gray-300 px-4 py-3 rounded-xl lg:w-[350px] outline-none focus:ring-2 focus:ring-[#0f375a]"
          />

          <div className="flex gap-3">

            <button className="border border-gray-300 px-5 py-3 rounded-xl hover:bg-gray-100 duration-200">
              Sort
            </button>

            <button className="border border-gray-300 px-5 py-3 rounded-xl hover:bg-gray-100 duration-200">
              Filter
            </button>

          </div>
        </div>

        <div className="overflow-x-auto">

          <table className="min-w-full">

            <thead className="bg-gray-100 text-gray-700">
              <tr>

                <th className="px-4 py-4 w-[50px]">
                  <input type="checkbox" />
                </th>

                <th className="px-4 py-4 text-left">
                  ID
                </th>

                <th className="px-4 py-4 text-left">
                  Project Name
                </th>

                <th className="px-4 py-4 text-left">
                  Language
                </th>

                <th className="px-4 py-4 text-left">
                  Type
                </th>

                <th className="px-4 py-4 text-left">
                  Description
                </th>

                <th className="px-4 py-4 text-left">
                  Image
                </th>

                <th className="px-4 py-4 text-left">
                  Action
                </th>

              </tr>
            </thead>

            <tbody>

              {projects.map((project) => (
                <tr
                  key={project.id}
                  className="border-b hover:bg-gray-50 duration-200"
                >

                  <td className="px-4 py-4">
                    <input type="checkbox" />
                  </td>

                  <td className="px-4 py-4 font-medium">
                    {project.id}
                  </td>

                  <td className="px-4 py-4 font-medium">
                    {project.project_name}
                  </td>

                  <td className="px-4 py-4">
                    {project.language}
                  </td>

                  <td className="px-4 py-4">

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium
                        ${
                          project.project_type === "Frontend"
                            ? "bg-blue-100 text-blue-600"
                            : project.project_type === "Backend"
                            ? "bg-green-100 text-green-600"
                            : project.project_type === "Fullstack"
                            ? "bg-purple-100 text-purple-600"
                            : "bg-pink-100 text-pink-600"
                        }
                      `}
                    >
                      {project.project_type}
                    </span>

                  </td>

                  <td className="px-4 py-4 max-w-[220px] truncate">
                    {project.description}
                  </td>

                  <td className="px-4 py-4">

                    {project.image ? (
                      <img
                        src={project.image}
                        alt="project"
                        className="w-16 h-16 object-cover rounded-xl"
                      />
                    ) : (
                      <span className="text-gray-400 text-sm">
                        No image
                      </span>
                    )}

                  </td>

                  <td className="px-4 py-4">

                    <div className="flex gap-3">

                      <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 duration-200">
                        Edit
                      </button>

                      <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 duration-200">
                        Delete
                      </button>

                    </div>

                  </td>
                </tr>
              ))}

            </tbody>
          </table>

          <div className="flex justify-center gap-3 mt-8">

            <button className="px-4 py-2 border rounded-lg hover:bg-gray-100">
              Prev
            </button>

            <button className="px-4 py-2 bg-[#0f375a] text-white rounded-lg">
              1
            </button>

            <button className="px-4 py-2 border rounded-lg hover:bg-gray-100">
              2
            </button>

            <button className="px-4 py-2 border rounded-lg hover:bg-gray-100">
              Next
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}