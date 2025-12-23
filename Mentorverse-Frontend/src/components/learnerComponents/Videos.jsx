import React from "react";
import { FiCheck } from "react-icons/fi";

const Videos = ({
  videoList,
  selectedVideo,
  handleVideoSelect,
  completedVideos,
  onVideoCompleted,
}) => {
  return (
    <>
      <div className="col-start-1 col-end-3 px-8 bg-black pt-[calc(88px+2rem)]">
        <video
          className="w-250 rounded-xl"
          src={selectedVideo?.videoUrl}
          controls
          onEnded={onVideoCompleted}
          poster={selectedVideo?.thumbnail}
        />

        <div className="text-white my-8 flex flex-col gap-2">
          <h3 className="text-2xl font-semibold">{selectedVideo?.title}</h3>
          <p className="text-gray-300">
            Course: {selectedVideo?.courses.title}
          </p>
        </div>
      </div>
      <div>
        <div className="flex justify-between border-b pb-5 border-gray-300 mb-8 pt-[calc(88px+2rem)]">
          <h3 className="text-xl font-semibold">Course Content</h3>
          <span className="text-sm text-gray-600">{videoList.length} {videoList.length > 1 ? "Videos" : "Video"}</span>
        </div>
        <div className="flex flex-col gap-3 h-142 overflow-auto">
          {/* <div className="bg-linear-(--gradient-secondary) px-5 py-5 flex justify-between items-center gap-3 text-white rounded-xl shadow-sm">
            <span className="bg-[rgba(255,255,255,0.35)] w-8 text-center h-8 content-center rounded-full text-sm font-semibold">
              1
            </span>
            <div className="flex-1 flex flex-col gap-2">
              <h4 className="font-semibold text-[0.95rem]">
                Introduction to React
              </h4>
              <span className="opacity-80 text-sm">15:30</span>
            </div>
            <FiCheck className="text-xl" />
          </div>
          <div className="bg-gray-100 px-5 py-5 flex justify-between items-center gap-3 text-black rounded-xl shadow-sm">
            <span className="bg-[rgba(255,255,255,0.35)] w-8 text-center h-8 content-center rounded-full text-sm font-semibold">
              1
            </span>
            <div className="flex-1 flex flex-col gap-2">
              <h4 className="font-semibold text-[0.95rem]">
                Introduction to React
              </h4>
              <span className="opacity-80 text-sm">15:30</span>
            </div>
            <FiCheck className="text-xl text-gray-600" />
          </div> */}

          {videoList.map((video) => {
            return (
              <div
                onClick={() => handleVideoSelect(video)}
                key={video.id}
                className={`px-5 py-5 flex justify-between items-center gap-3 rounded-xl shadow-sm cursor-pointer 
              ${
                selectedVideo.id == video.id
                  ? "bg-linear-(--gradient-secondary) text-white"
                  : "bg-gray-100 text-black hover:bg-gray-200"
              }`}
              >
                <span className="bg-[rgba(255,255,255,0.35)] w-8 text-center h-8 content-center rounded-full text-sm font-semibold">
                  {video.videoOrder}
                </span>
                <div className="flex-1 flex flex-col gap-2">
                  <h4 className="font-semibold text-[0.95rem]">
                    {video.title}
                  </h4>
                  <span className="opacity-80 text-sm">
                    {video.durationMinute}
                  </span>
                </div>
                {completedVideos.has(video.id) && (
                  <FiCheck className="text-xl" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Videos;
