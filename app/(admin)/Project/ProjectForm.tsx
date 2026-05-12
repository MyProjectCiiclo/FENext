export default function ProjectForm() {
  return (
    <div className="relative w-full max-w-[420px] bg-white rounded-3xl shadow-2xl p-8">

      <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 duration-200 text-xl">
        ×
      </button>

      <h1 className="text-center text-3xl font-bold text-gray-800">
        Create Project
      </h1>

      <p className="text-center text-sm text-gray-500 mt-2 mb-8">
        Create and manage your next amazing project
      </p>

      <form className="space-y-5">

        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-700">
            Project Name
          </label>

          <input
            type="text"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#0f375a]"
            placeholder="Enter project name"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-700">
            Language
          </label>

          <input
            type="text"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#0f375a]"
            placeholder="React, Vue, PHP..."
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-700">
            Description
          </label>

          <textarea
            rows={4}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none resize-none focus:ring-2 focus:ring-[#0f375a]"
            placeholder="Project description..."
          ></textarea>
        </div>

        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-700">
            Image
          </label>

          <input
            type="file"
            accept="image/*"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 cursor-pointer"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-700">
            Project Type
          </label>

          <select className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#0f375a]">

            <option value="">
              Select a project type
            </option>

            <option>
              Frontend
            </option>

            <option>
              Backend
            </option>

            <option>
              Fullstack
            </option>

            <option>
              UI/UX
            </option>

          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-[#0f375a] text-white py-3 rounded-xl font-semibold hover:opacity-90 duration-200"
        >
          Create
        </button>

      </form>
    </div>
  );
}