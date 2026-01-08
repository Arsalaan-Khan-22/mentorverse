// import React from 'react';
// import { Link } from 'react-router-dom';

// const QuickActionCard = ({ data }) => {
//   return (
//     <Link 
//       to={data.to} // <-- navigate to the correct page
//       className='flex flex-col items-center gap-4 w-full py-10 rounded-xl shadow-(--card-shadow)'
//     >
//       <data.icon className="text-4xl text-(--primary-color)" />
//       <p className='font-semibold'>{data.title}</p>
//     </Link>
//   );
// };

// export default QuickActionCard;







import React from 'react';
import { Link } from 'react-router-dom';

const QuickActionCard = ({ data }) => {
  return (
    <Link
      to={data.to}
      className="
        flex flex-col items-center justify-center 
        gap-3 sm:gap-4 
        w-full 
        py-6 sm:py-8 lg:py-10 
        rounded-xl 
        shadow-(--card-shadow) 
        transition-transform duration-200 hover:scale-105
      "
    >
      {/* Icon */}
      <data.icon
        className="
          text-2xl sm:text-3xl lg:text-4xl 
          text-(--primary-color)
        "
      />
      {/* Title */}
      <p className="font-semibold text-sm sm:text-base lg:text-lg text-center">
        {data.title}
      </p>
    </Link>
  );
};

export default QuickActionCard;