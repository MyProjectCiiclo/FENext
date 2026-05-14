import {Image }
export default function AdminProfileInfo() {
  return (
    <div className="h-screen flex overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-5">
        <div className="bg-white rounded-3xl shadow-lg p-8">
          <div className="flex flex-col items-center">
            <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-blue-500">
                            <Image
                              src={profile.avatar}
                              alt="avatar"
                              width={160}
                              height={160}
                              className="object-cover w-full h-full"
                            />
                          </div>
        </div>
      </div>
    </div>
  );
}
