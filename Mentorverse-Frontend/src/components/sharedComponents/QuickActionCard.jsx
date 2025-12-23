import React from 'react';
import { Link } from 'react-router-dom';

const QuickActionCard = ({ data }) => {
  return (
    <Link 
      to={data.to} // <-- navigate to the correct page
      className='flex flex-col items-center gap-4 w-full py-10 rounded-xl shadow-(--card-shadow)'
    >
      <data.icon className="text-4xl text-(--primary-color)" />
      <p className='font-semibold'>{data.title}</p>
    </Link>
  );
};

export default QuickActionCard;
