import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import BookingCard from "../../components/mentorComponents/BookingCard";
import { useAuth } from "../../context/AuthContext";

const MentorBookings = () => {
    
    const {user} = useAuth();
    const mentorId = user?.id;
    const [bookings, setBookings] = useState([]);

    const fetchAllBookings = async () => {
      try {
        let response = await api.get(`/bookings/mentor/${mentorId}`);
        setBookings(response.data.data);
      } catch(err) {
        console.log(err.response?.data);
      }
    }

    useEffect(()=>{
        fetchAllBookings();
    }, [])

  return (
    <div className="px-24 py-32 bg-(--bg-color)">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-4xl tracking-wider font-bold">Booking Requests</h2>
        <p className="text-lg text-gray-700">
          Manage session bookings from students
        </p>
      </div>
      <div className="flex flex-wrap gap-5 justify-center">
        {bookings.length === 0 && <h3 className='text-lg text-gray-600'>You don't have any bookings yet</h3>}
        
        {
            bookings.map(booking => {
                return (
                    booking.status == "ACTIVE" && <BookingCard key={booking.id} booking={booking} mode={"mentor"} />
                )
            })
        }
        {
          bookings.map(booking => {
                return (
                    booking.status == "CANCELLED" && <BookingCard key={booking.id} booking={booking} mode={"mentor"} />
                )
            })
        }
        {
          bookings.map(booking => {
                return (
                    booking.status == "COMPLETED" && <BookingCard key={booking.id} booking={booking} mode={"mentor"} />
                )
            })
        }
      </div>
    </div>
  );
};

export default MentorBookings;
