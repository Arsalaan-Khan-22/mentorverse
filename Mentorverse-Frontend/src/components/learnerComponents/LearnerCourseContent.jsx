import React from 'react'
import { FiPlay } from 'react-icons/fi';

const LearnerCourseContent = ({courseVideos}) => {

  return (
    <div className="w-full h-123.5 overflow-auto bg-white p-8 rounded-2xl shadow-lg"> {/* Add h-100 if using what you will learn */}
            <h2 className="text-2xl font-semibold mb-6">Course Content</h2>

            {courseVideos.length === 0 && <p className='text-center mt-15 text-gray-600'>Mentor has not uploaded any lectures yet</p>}

            <div className="flex flex-col gap-3">
              {courseVideos.map((video) => (
                <div
                  key={video.id}
                  className="flex items-center gap-4 bg-(--bg-color) hover:bg-gray-100 transition-all p-5 rounded-xl"
                >
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-teal-600 text-white">
                    {video.videoOrder}
                  </div>

                  <FiPlay className="text-teal-600 text-xl" />
                  <div className="flex flex-col">
                    <span className="text-lg font-medium">{video.title}</span>
                    <span className="text-gray-500 text-sm">
                      {video.durationMinute}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
  )
}

export default LearnerCourseContent
