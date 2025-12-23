import React from 'react'
import { FiPlus, FiUpload, FiX } from 'react-icons/fi'

const AddVideosForm = ({handleForm, handleThumbnail, handleVideo}) => {
  return (
    <form
            onSubmit={handleForm.handleSubmit(handleForm.submitHandler)}
            className="bg-white p-10 mt-15 rounded-2xl shadow-(--shadow-primary)"
          >
            <h3 className="text-2xl font-semibold">Add New Video</h3>
    
            <div className="flex gap-10 pt-10">
              <div className="w-full flex flex-col gap-6">
                <div className="flex flex-col gap-3 w-full">
                  <label className="font-medium" htmlFor="video-title">
                    Video Title
                  </label>
                  <input
                    {...handleForm.register("title", { required: true, minLength: 3 })}
                    className={
                      "w-full border-2 border-[rgba(0,0,0,0.15)] px-5 py-3 rounded-lg focus:shadow-(--shadow-primary) focus:-translate-y-px transition-all duration-100 focus:outline-(--primary-color) " +
                      (handleForm.errors.title
                        ? "focus:outline-red-600"
                        : "focus:outline-(--primary-color)")
                    }
                    type="text"
                    id="video-title"
                    placeholder="Enter video title"
                  />
                  <p className="text-red-600">
                    {(handleForm.errors.title?.type == "required" &&
                      "Video Title is Required") ||
                      (handleForm.errors.title?.type == "minLength" &&
                        "Minimum 3 characters required")}
                  </p>
                </div>
    
                <div className="flex flex-col gap-3 w-full">
                  <label className="font-medium" htmlFor="video-duration">
                    Duration (mm:ss)
                  </label>
                  <input
                    {...handleForm.register("durationMinute", { required: true })}
                    className={
                      "w-full border-2 border-[rgba(0,0,0,0.15)] px-5 py-3 rounded-lg focus:shadow-(--shadow-primary) focus:-translate-y-px transition-all duration-100 focus:outline-(--primary-color) " +
                      (handleForm.errors.durationMinute
                        ? "focus:outline-red-600"
                        : "focus:outline-(--primary-color)")
                    }
                    type="text"
                    id="video-duration"
                    placeholder="Enter duration"
                  />
                  <p className="text-red-600">
                    {handleForm.errors.durationMinute?.type == "required" &&
                      "Video duration is Required"}
                  </p>
                </div>
    
                <div className="flex flex-col gap-5 w-full">
                  <label className="font-medium">Add Video</label>
                  <div
                    {...handleVideo.getVideoRootProps()}
                    className={
                      "border-2 border-dashed border-[rgba(0,0,0,0.15)] rounded-2xl flex flex-col items-center py-[1.62rem] gap-3 transition-all duration-300 cursor-pointer " +
                      (handleVideo.video ? "bg-gray-200 " : "") +
                      (handleForm.error.video
                        ? "border-red-600 "
                        : "hover:border-(--primary-color) ") +
                      (handleVideo.isVideoDragActive && "bg-[#e7f0ff]")
                    }
                  >
                    <input {...handleVideo.getVideoInputProps()} />
                    <div className="flex items-center gap-4">
                      {!handleVideo.video && <FiUpload className="text-2xl text-gray-600" />}
                      <p className="font-medium px-5 text-center">
                        {handleVideo.isVideoDragActive
                          ? "Drop the file here..."
                          : handleVideo.video
                          ? handleVideo.video.name
                          : "Click to upload video or drag and drop"}
                      </p>
                    </div>
                  </div>
                  <p className="text-red-600 text-center">
                    {handleForm.error.video && "Upload Video"}
                  </p>
                </div>
              </div>
    
              <div className="flex flex-col gap-5 w-full">
                <label className="font-medium">Video Thumbnail</label>
                <div
                  {...handleThumbnail.getThumbnailRootProps()}
                  className={
                    "border-2 border-dashed border-[rgba(0,0,0,0.15)] rounded-2xl flex flex-col items-center py-10 gap-3 transition-all duration-300 cursor-pointer " +
                    (handleForm.error.image
                      ? "border-red-600 "
                      : "hover:border-(--primary-color) ") +
                    (handleThumbnail.isThumbnailDragActive && "bg-[#e7f0ff]")
                  }
                >
                  <input {...handleThumbnail.getThumbnailInputProps()} />
                  <FiUpload className="text-[2.5rem] text-gray-600 mb-3" />
                  <p className="font-medium">
                    {handleThumbnail.isThumbnailDragActive
                      ? "Drop the file here..."
                      : "Click to upload or drag and drop"}
                  </p>
                  <span className="text-sm text-gray-600">
                    PNG, JPG, Etc up to 10MB
                  </span>
                </div>
                <p className="text-red-600 text-center">
                  {handleForm.error.image && "Upload video thumbnail"}
                </p>
                {handleThumbnail.image && (
                  <div className="relative w-fit shadow-(--card-shadow) rounded-2xl p-3 bg-(--bg-color) self-end">
                    <FiX
                      onClick={handleThumbnail.handleDeleteImagePreview}
                      className="text-red-600 absolute right-2 top-3 text-lg cursor-pointer w-5 h-5 hover:-translate-y-px hover:scale-105 transition-all"
                    />
                    <div className="flex flex-col items-center w-50 text-center">
                      <img
                        className="w-30 rounded-lg"
                        src={handleThumbnail.image.url}
                        alt="uploaded image"
                      />
                      <p className="mt-2 text-sm">{handleThumbnail.image.name}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
    
            <button
              className="flex items-center gap-2 mt-5 bg-linear-(--gradient-secondary) text-white text-sm font-semibold px-8 py-3 rounded-lg cursor-pointer hover:-translate-y-0.5 hover:shadow-[0_10px_15px_rgba(0,0,0,0.15)] transition-all duration-300 disabled:cursor-not-allowed"
              type="submit"
            >
              <FiPlus />
              Add Video
            </button>
          </form>
  )
}

export default AddVideosForm









// import React from "react";
// import { FiPlus, FiUpload, FiX } from "react-icons/fi";

// const AddVideosForm = ({ handleForm, handleThumbnail, handleVideo }) => {
//   return (
//     <form
//       onSubmit={handleForm.handleSubmit(handleForm.submitHandler)}
//       className="bg-white p-10 mt-15 rounded-2xl shadow-(--shadow-primary)"
//     >
//       <h3 className="text-2xl font-semibold">Add New Video</h3>

//       <div className="flex gap-10 pt-10">
//         <div className="w-full flex flex-col gap-6">
//           {/* Title */}
//           <div className="flex flex-col gap-3 w-full">
//             <label className="font-medium" htmlFor="video-title">
//               Video Title
//             </label>
//             <input
//               {...handleForm.register("title", { required: true, minLength: 3 })}
//               className={
//                 "w-full border-2 border-[rgba(0,0,0,0.15)] px-5 py-3 rounded-lg transition-all duration-100 focus:outline-(--primary-color) " +
//                 (handleForm.errors.title ? "focus:outline-red-600" : "")
//               }
//               type="text"
//               id="video-title"
//               placeholder="Enter video title"
//             />
//             <p className="text-red-600">
//               {(handleForm.errors.title?.type === "required" && "Video Title is Required") ||
//                 (handleForm.errors.title?.type === "minLength" && "Minimum 3 characters required")}
//             </p>
//           </div>

//           {/* Duration */}
//           <div className="flex flex-col gap-3 w-full">
//             <label className="font-medium" htmlFor="video-duration">
//               Duration (mm:ss)
//             </label>
//             <input
//               {...handleForm.register("durationMinute", { required: true })}
//               className={
//                 "w-full border-2 border-[rgba(0,0,0,0.15)] px-5 py-3 rounded-lg transition-all duration-100 focus:outline-(--primary-color) " +
//                 (handleForm.errors.durationMinute ? "focus:outline-red-600" : "")
//               }
//               type="text"
//               id="video-duration"
//               placeholder="Enter duration"
//             />
//             <p className="text-red-600">
//               {handleForm.errors.durationMinute?.type === "required" && "Video duration is Required"}
//             </p>
//           </div>

//           {/* Video Upload */}
//           <div className="flex flex-col gap-5 w-full">
//             <label className="font-medium">Add Video</label>
//             <div
//               {...handleVideo.getVideoRootProps()}
//               className={
//                 "border-2 border-dashed border-[rgba(0,0,0,0.15)] rounded-2xl flex flex-col items-center py-[1.62rem] gap-3 cursor-pointer " +
//                 (handleVideo.video ? "bg-gray-200 " : "") +
//                 (handleForm.error.video ? "border-red-600 " : "hover:border-(--primary-color) ") +
//                 (handleVideo.isVideoDragActive && "bg-[#e7f0ff]")
//               }
//             >
//               <input {...handleVideo.getVideoInputProps()} />
//               <div className="flex items-center gap-4">
//                 {!handleVideo.video && <FiUpload className="text-2xl text-gray-600" />}
//                 <p className="font-medium px-5 text-center">
//                   {handleVideo.isVideoDragActive
//                     ? "Drop the file here..."
//                     : handleVideo.video
//                     ? handleVideo.video.name
//                     : "Click to upload video or drag and drop"}
//                 </p>
//               </div>
//             </div>
//             <p className="text-red-600 text-center">
//               {handleForm.error.video && "Upload Video"}
//             </p>
//           </div>
//         </div>

//         {/* Thumbnail Upload */}
//         <div className="flex flex-col gap-5 w-full">
//           <label className="font-medium">Video Thumbnail</label>
//           <div
//             {...handleThumbnail.getThumbnailRootProps()}
//             className={
//               "border-2 border-dashed border-[rgba(0,0,0,0.15)] rounded-2xl flex flex-col items-center py-10 gap-3 cursor-pointer " +
//               (handleForm.error.image ? "border-red-600 " : "hover:border-(--primary-color) ") +
//               (handleThumbnail.isThumbnailDragActive && "bg-[#e7f0ff]")
//             }
//           >
//             <input {...handleThumbnail.getThumbnailInputProps()} />
//             <FiUpload className="text-[2.5rem] text-gray-600 mb-3" />
//             <p className="font-medium">
//               {handleThumbnail.isThumbnailDragActive
//                 ? "Drop the file here..."
//                 : "Click to upload or drag and drop"}
//             </p>
//             <span className="text-sm text-gray-600">PNG, JPG up to 10MB</span>
//           </div>
//           <p className="text-red-600 text-center">
//             {handleForm.error.image && "Upload video thumbnail"}
//           </p>
//           {handleThumbnail.image && (
//             <div className="relative w-fit rounded-2xl p-3 bg-(--bg-color) self-end">
//               <FiX
//                 onClick={handleThumbnail.handleDeleteImagePreview}
//                 className="text-red-600 absolute right-2 top-3 text-lg cursor-pointer w-5 h-5"
//               />
//               <div className="flex flex-col items-center w-50 text-center">
//                 <img
//                   className="w-24 rounded-lg"
//                   src={handleThumbnail.image.url}
//                   alt="uploaded image"
//                 />
//                 <p className="mt-2 text-sm">{handleThumbnail.image.name}</p>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       <button
//         className="flex items-center gap-2 mt-5 bg-linear-(--gradient-secondary) text-white text-sm font-semibold px-8 py-3 rounded-lg cursor-pointer hover:-translate-y-0.5 transition-all duration-300"
//         type="submit"
//       >
//         <FiPlus />
//         Add Video
//       </button>
//     </form>
//   );
// };

// export default AddVideosForm;