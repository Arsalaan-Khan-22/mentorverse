import React from "react";
import { FiX } from "react-icons/fi";

const ShowVideos = ({ videoList, handleDeleteVideo, mode, isEditing }) => {
  console.log(videoList);
  return (
    <div className="bg-white p-10 mt-10 rounded-2xl shadow-(--shadow-primary)">
      <h3 className="text-2xl font-semibold">
        Course Videos ({videoList.length})
      </h3>

      <div className="mt-6 flex flex-col gap-4">
        {videoList.length === 0 && (
          <p className="text-center py-10 text-gray-600">
            No videos added yet. Add your first video above.
          </p>
        )}
        {[...videoList]
          .sort((a, b) => a.videoOrder - b.videoOrder)
          .map((video, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-(--bg-color) p-5 border-2 border-[rgba(0,0,0,0.1)] rounded-xl"
            >
              <div className="flex items-center gap-4">
                <span className="bg-linear-(--gradient-secondary) px-2 py-1 rounded-full text-white font-medium text-md text-center w-8">
                  {video.videoOrder}
                </span>
                <img
                  className="w-30 rounded-lg"
                  src={
                    typeof video.thumbnail === "object" && video.thumbnail?.url
                      ? video.thumbnail.url
                      : video.thumbnail
                  }
                  alt="Thumbnail"
                />
                <p className="font-semibold">{video.title}</p>
                <span className="text-gray-600 text-sm">
                  Duration: {video.durationMinute}
                </span>
              </div>
              {(mode === "create" || isEditing) && (
                <div
                  onClick={() => handleDeleteVideo(video.id || video.videoUrl?.url)}
                  className="p-2 hover:bg-red-100 cursor-pointer rounded-md"
                >
                  <FiX className="text-red-600 text-xl" />
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default ShowVideos;

// import React from "react";
// import { FiX } from "react-icons/fi";

// const ShowVideos = ({ videoList, handleDeleteVideo, mode, isEditing }) => {
//   return (
//     <div className="bg-white p-10 mt-10 rounded-2xl shadow-(--shadow-primary)">
//       <h3 className="text-2xl font-semibold">
//         Course Videos ({videoList.length})
//       </h3>

//       <div className="mt-6 flex flex-col gap-4">
//         {videoList.length === 0 && (
//           <p className="text-center py-10 text-gray-600">
//             No videos added yet. Add your first video above.
//           </p>
//         )}
//         {videoList.map((video, index) => (
//           <div
//             key={index}
//             className="flex justify-between items-center bg-(--bg-color) p-5 border-2 border-[rgba(0,0,0,0.1)] rounded-xl"
//           >
//             <div className="flex items-center gap-4">
//               <span className="bg-linear-(--gradient-secondary) px-2 py-1 rounded-full text-white font-medium text-md text-center w-8">
//                 {video.videoOrder}
//               </span>
//               <img
//                 className="w-24 rounded-lg"
//                 src={mode === "create" ? video.thumbnail.url : video.thumbnail}
//                 alt="Thumbnail"
//               />
//               <p className="font-semibold">{video.title}</p>
//               <span className="text-gray-600 text-sm">
//                 Duration: {video.durationMinute}
//               </span>
//             </div>
//             {(mode === "create" || isEditing) && (
//               <div
//                 onClick={() => handleDeleteVideo(video.videoOrder, video.id)}
//                 className="p-2 hover:bg-red-100 cursor-pointer rounded-md"
//               >
//                 <FiX className="text-red-600 text-xl" />
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ShowVideos;
