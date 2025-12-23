import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import BookingCard from "../../components/mentorComponents/BookingCard";
import { useAuth } from "../../context/AuthContext";

const LearnerBookings = () => {
  const {user} = useAuth();
  const learnerId = user?.id;
  const [bookings, setBookings] = useState([]);

  const fetchAllBookings = async () => {
    let response = await api.get(
      `http://localhost:8080/api/bookings/learner/${learnerId}`
    );
    console.log(response.data);
    setBookings(response.data.data);
  };

  const cancelSession = async (bookingId) => {
    const isCancelled = confirm("Do you really want to cancel this session");
    if (isCancelled) {
      let response = await api.put(
        `/bookings/cancel-session/${learnerId}`,
        bookingId
      );
      console.log(response);
      fetchAllBookings();
    }
  };

  useEffect(() => {
    fetchAllBookings();
  }, []);

  return (
    <div className="px-24 py-32 bg-(--bg-color)">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-4xl tracking-wider font-bold">Booking Requests</h2>
        <p className="text-lg text-gray-700">
          Manage session bookings from students
        </p>
      </div>
      <div className="flex flex-wrap gap-5 justify-center">
        {bookings.length === 0 && (
          <h3 className="text-lg text-gray-600">
            You don't have any bookings yet
          </h3>
        )}

        {/* {
            bookings.map(booking => {
                return (
                    booking.status == "PENDING" && <BookingCard key={booking.id} booking={booking} onHandleStatus={handleStatus} />
                )
            })
        } */}
        {/* {
          bookings.map(booking => {
                return (
                    booking.status == "APPROVED" && <BookingCard key={booking.id} booking={booking}/>
                )
            })
        } */}
        {bookings.map((booking) => {
          return (
            <BookingCard
              key={booking.id}
              booking={booking}
              onCancelSession={cancelSession}
              mode={"learner"}
            />
          );
        })}
        {/* {
          bookings.map(booking => {
                return (
                    (booking.status == "CANCELLED" || booking.status == "REJECTED") && <BookingCard key={booking.id} booking={booking} />
                )
            })
        } */}
      </div>
    </div>
  );
};

export default LearnerBookings;
