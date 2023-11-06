import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import BookingRow from "./BookingRow";
import Swal from 'sweetalert2'; // Import SweetAlert
import moment from "moment";

const MyBookings = () => {
    const { user } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);

    const url = `http://localhost:5000/bookings?email=${user.email}`;

    // Fetch user's bookings and update the state
    useEffect(() => {
        fetch(url)
            .then((res) => res.json())
            .then((data) => setBookings(data))
            .catch((error) => console.error("Error fetching bookings:", error));
    }, []);

    
  

    // Function to cancel a booking
    const handleDelete = (id, date) => {
      const bookingDate = moment(date, 'DD/MM/YYYY'); // Parse the booking date
    console.log( 'bookingDate',bookingDate);
      const currentDate = moment(); // Get the current date
      const cancellationDate = moment(bookingDate).subtract(1, 'days'); // Calculate the date 1 day before the booking
    
      if (currentDate.isBefore(cancellationDate)) {
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
      } else {
        Swal.fire('Cancellation Not Allowed', 'You cannot cancel this booking.', 'error');
      }
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
                        <th>Duration</th>
                        <th>User Email</th>
                        <th>Update Date</th>
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
