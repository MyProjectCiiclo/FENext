import Link from "next/link"

export default function Register(){
    return(
        <div className="min-h-screen flex items-center justify-center">
    <div
      className="flex flex-col items-center p-6 rounded-xl shadow-xl bg-[#0f375a]"
    >
      <h1 className="text-xl font-bold mb-4 text-white">Register Account</h1>

      <div className="mb-4 w-80">
        <input
          v-model="name"
          className="w-full outline-none p-2 rounded-xl"
          type="text"
          placeholder="Enter name"
        />
      </div>

      <div className="mb-4 w-80">
        <input
          v-model="email"
          className="w-full outline-none p-2 rounded-xl"
          type="text"
          placeholder="Enter email"
        />
      </div>

      <div className="mb-4 w-80">
        <input
          v-model="password"
          className="w-full outline-none p-2 rounded-xl"
          type="password"
          placeholder="Enter password"
        />
      </div>

      <div className="mb-4 w-80">
        <input
          v-model="confirmPassword"
          className="w-full outline-none p-2 rounded-xl"
          type="password"
          placeholder="Enter confirm password"
        />
      </div>

      <p className="text-sm text-white mt-2 mb-4">
        Already have an account?
        <Link
          href="/login"
          className="text-blue-500 font-medium hover:underline ml-1"
        >
          Login
        </Link>
      </p>

      <button
        className="bg-[#FF4D8D] py-2 px-4 rounded-xl text-white"
      >
        Submit
      </button>
    </div>
  </div>
    )
}