import React from "react";

const MentorSkills = ({ mentorSkills }) => {
  const skills = mentorSkills.split(",");
  return (
    <div className="mt-8 bg-white rounded-2xl shadow-(--shadow-primary) p-8 flex flex-col gap-7">
      <h3 className="text-2xl font-semibold">Skills & Expertise</h3>
      <div className="flex items-center gap-3">
        {skills.map((skill,index) => {
          return (
            <span key={index} className="font-medium px-5 py-3 rounded-full bg-linear-(--gradient-secondary) text-white">
              {skill}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default MentorSkills;
