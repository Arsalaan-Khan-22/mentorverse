import React from "react";
import { FiX } from "react-icons/fi";

const CourseContent = ({ courseVideos }) => {
  return (
    <div className="bg-white px-8 py-10 rounded-2xl shadow-(--shadow-primary)">
      <h3 className="text-3xl font-semibold">Course Content</h3>
      <div className="mt-6 flex flex-col gap-4 overflow-auto h-85">
        {courseVideos.map((video) => {
          return (
            <div key={video.id} className="flex justify-between items-center bg-(--bg-color) p-5 border-2 border-[rgba(0,0,0,0.1)] rounded-xl">
              <div className="flex items-center gap-4">
                <span className="bg-linear-(--gradient-secondary) px-2 py-1 rounded-full text-white font-medium text-md text-center w-8">
                  {video.videoOrder}
                </span>
                <div
                  style={{
                    backgroundImage: `url(${video.thumbnail})`,
                  }}
                  className="w-30 h-17 rounded-lg bg-cover bg-top"
                ></div>
                <div className="flex flex-col gap-2">
                  <p className="font-semibold">{video.title}</p>
                  <span className="text-gray-600 text-sm">{video.durationMinute}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CourseContent;
