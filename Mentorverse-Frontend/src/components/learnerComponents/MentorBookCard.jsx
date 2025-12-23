import React from 'react'

const MentorBookCard = ({mentorData}) => {
  return (
    <div className="bg-white shadow-(--shadow-primary) p-8 rounded-2xl flex items-center gap-6">
        <div className="shrink-0">
          <img
            src={mentorData.profilePic || "https://api.dicebear.com/7.x/avataaars/svg?seed=default"}
            alt="Tutor avatar"
            className="w-25 h-25 rounded-full border-4 border-(--primary-color)"
          />
        </div>
        <div className="flex flex-col gap-4">
            <h3 className="text-3xl font-bold">Book Session with {mentorData.name}</h3>
            <span className="text-gray-600 text-lg">₹{mentorData.ratePerHour}/hour • Rating: {mentorData.avgRating.toFixed(2)}</span>
        </div>
      </div>
  )
}

export default MentorBookCard
