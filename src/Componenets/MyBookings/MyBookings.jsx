import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import BookingRow from "./BookingRow";
import Swal from 'sweetalert2'; // Import SweetAlert
import useAxiosSecure from "../Hooks/useAxiosSecure";


const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);

  const axiosSecure = useAxiosSecure();

  // const url = `http://localhost:5000/bookings?email=${user.email}`;
  const url = `/bookings?email=${user.email}`;

  // Fetch user's bookings and update the state
  useEffect(() => {
    fetch(url,{credentials:"include"})
      // .then((res) => res.json())
      // .then((data) => setBookings(data))
      // .catch((error) => console.error("Error fetching bookings:", error));

      axiosSecure.get(url)
      .then(res => setBookings(res.data))
  }, [url,axiosSecure]);




// Function to cancel a booking
// Function to cancel a booking
const handleDelete = (id) => {
  Swal.fire({
    title: 'Are you sure?',
    text: 'You will not be able to recover this booking!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
  }).then((result) => {
    if (result.isConfirmed) {
      fetch(`http://localhost:5000/bookings/${id}`, {
        method: 'DELETE',
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            Swal.fire('Deleted!', 'Your booking has been deleted.', 'success');
            const remaining = bookings.filter((booking) => booking._id !== id);
            setBookings(remaining);
          }
        });
    }
  });
};


  return (
    <div>
      <h2 className="text-5xl text-center my-20 font-bold text-[#164863]">Booked Items: {bookings.length}</h2>
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr className="text-xl font-bold text-[#164863]">

              <th>Image</th>
              <th>Service Name</th>
              <th>Date</th>
              <th>Update Date</th>

              <th>User Email</th>
              <th>Review</th>
              <th>Delete item</th>
            </tr>
          </thead>
          <tbody>
            {
              bookings.map(booking => <BookingRow
                key={booking._id}
                booking={booking}
                handleDelete={handleDelete}
              // handleBookingConfirm={handleBookingConfirm}
              ></BookingRow>)
            }
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default MyBookings;
