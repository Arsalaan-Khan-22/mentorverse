import React from 'react'

const PriceCard = ({priceDetails}) => {
  return (
    <div className="col-start-2 h-fit sticky top-[100px] bg-white px-8 py-7 rounded-2xl shadow-(--shadow-primary)">
            <h3 className="text-xl font-semibold">Course Price</h3>
            <h2 className="text-(--primary-color) text-[2.5rem] font-bold text-center py-5">
              ₹{priceDetails.price}
            </h2>
            <p className="py-2 text-gray-600">
              <span className="font-bold">Level: </span> {priceDetails.level[0] + priceDetails.level.slice(1).toLowerCase()}
            </p>
            <p className="py-2 text-gray-600">
              <span className="font-bold">Lectures: </span> {priceDetails.totalLectures}
            </p>
            <p className="py-2 text-gray-600">
              <span className="font-bold">Duration: </span> {priceDetails.duration} hours
            </p>
          </div>
  )
}

export default PriceCard
