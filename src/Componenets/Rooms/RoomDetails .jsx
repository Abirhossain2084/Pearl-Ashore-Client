import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import swal from 'sweetalert';
// import 'sweetalert/dist/sweetalert.css';


// ... Rest of the imports and code ...

const RoomDetails = () => {
  const rooms = useLoaderData();
  const [bookingDate, setBookingDate] = useState(new Date());
  const [bookingDuration, setBookingDuration] = useState(1); // Default duration is 1 day
  const [showSummary, setShowSummary] = useState(false);
  const [availableSeats, setAvailableSeats] = useState(rooms.availability);

  const handleBookNow = () => {
    if (availableSeats > 0) {
      // If there are available seats, allow the booking
      const summary = `Room: ${rooms.name}\nDate: ${bookingDate.toDateString()}\nDuration: ${bookingDuration} days\nTotal Price: $${rooms.pricePerNight * bookingDuration}\nRoom Description: ${rooms.description}`;

      swal({
        title: "Booking Summary",
        text: summary,
        icon: "info",
        buttons: true,
      })
        .then((confirmed) => {
          if (confirmed) {
            // Implement your logic here to proceed with the booking.
            setShowSummary(true);

            // Decrement available seats
            setAvailableSeats(availableSeats - 1);
          }
        });
    } else {
      // No available seats, show an error message
      swal('Error', 'The room is not available.', 'error');
    }
  };
  return (
    <div className="my-20">
      <h1 className="text-center font-bold text-6xl my-10">{rooms.name} Details</h1>
      <div className="card glass bg-[#DDF2FD] shadow-xl m-4">
        <div className="flex gap-6 m-4">
          {rooms.images.map((image, index) => (
            <figure key={index} className="w-1/2">
              <img
                className="rounded-lg h-28 lg:h-72 w-full"
                src={image}
                alt={`Room ${index + 1}`}
              />
            </figure>
          ))}
        </div>
        <div className="card-body text-center">
          <h2 className="text-4xl font-bold">{rooms.name}</h2>
          <p className="text-xl">{rooms.description}</p>
          <p className="font-bold text-lg">Price per Night: ${rooms.pricePerNight}</p>
          <p className="font-bold text-lg">Room Size: {rooms.size}</p>
          <p className="font-bold text-lg">Availability: {rooms.availability} rooms</p>
          {rooms.specialOffers && <p className="font-bold text-[#f3a648]">Special Offers: {rooms.specialOffers}</p>}

          {/* Date Picker */}
          <div className="my-4 space-y-3 ">
            <h2 className="font-bold text-lg">Select Booking Date</h2>
            <DatePicker selected={bookingDate} onChange={date => setBookingDate(date)} />
            <div className='grid justify-center items-center'>
              <label>Select Booking Duration (in days):</label>
              <input
                className=''
                type="number"
                value={bookingDuration}
                onChange={(e) => setBookingDuration(parseInt(e.target.value))}
              />
            </div>
          </div>

          <button className="btn text-white bg-[#164863] hover-bg-[#427D9D]" onClick={handleBookNow}>
            Book Now
          </button>

          {/* Booking Summary */}

          <div>
            {showSummary && (
              <div className="my-20 grid justify-center space-y-2">
                <hr className='bg-[#164863] h-1 m-4' />
                <h2 className="text-4xl font-bold">Booking Summary</h2>
                <p>Room: {rooms.name}</p>
                <p>Date: {bookingDate.toDateString()}</p>
                <p>Duration: {bookingDuration} days</p>
                <p>Total Price: ${rooms.pricePerNight * bookingDuration}</p>
                <p>Room Description: {rooms.description}</p>
                <button className="btn text-white bg-[#164863] hover-bg-[#427D9D]">Confirm Booking</button>
              </div>
            )}
          </div>


        </div>
      </div>


    </div>
  );
};

export default RoomDetails;
