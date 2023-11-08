
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'; // Import SweetAlert library
const BookingRow = ({ booking, handleDelete, handleBookingConfirm, handleDateUpdate }) => {
    const { _id, name, email, photo, date, duration, status } = booking;

    console.log(booking);
    const [isEditing, setIsEditing] = useState(false);
    const [newDate, setNewDate] = useState(date); // Initialize with the current date

   

    const handleUpdateDate = async () => {
      const updaeteDate = {
        date: newDate,
      };
      console.log(updaeteDate);
    
      Swal.fire({
        title: 'Press update and reload the page to see your updated date',
        text: 'Are you sure you want to update the booking date?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, update',
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await fetch(`http://localhost:5000/bookings/${_id}`, {
            method: 'PUT',
            headers: {
              'content-type': 'application/json',
            },
            body: JSON.stringify(updaeteDate),
          });
    
          if (response.ok) {
            // Update the date in the UI
            setNewDate(updaeteDate.date);
        
            Swal.fire('Success', 'Booking date updated successfully', 'success');
        
            window.location.reload();

        } else {
            Swal.fire('Error', 'Failed to update booking', 'error');
          }
    
          setIsEditing(false); // Reset editing state
        }
      });
    };
    

    return (
        <tr>
            <td>
                <div className="avatar">
                    <div className="rounded w-24 h-24">
                        {photo && <img src={photo} alt="Avatar Tailwind CSS Component" />}
                    </div>
                </div>
            </td>
            <td>{name}</td>
            <td>
                {isEditing ? (
                    <input
                        type="date"
                        value={newDate}
                        onChange={(e) => setNewDate(e.target.value)}
                    />
                ) : (
                    date
                )}
            </td>
             <th>
                {status === 'confirm' ? (
                    <span className="font-bold text-primary">Confirmed</span>
                ) : isEditing ? (
                    <button onClick={() => handleUpdateDate(_id)} className="btn btn-ghost bg-black text-white btn-xs">
                        Confirm Update
                    </button>

                ) : (
                    <button onClick={() => setIsEditing(true)} className="btn btn-ghost bg-black text-white btn-xs">
                        Update Date
                    </button>
                )}
            </th>
            <td>{email}</td>


            <td>

            <Link to={`/reviews/${_id}`} >
            
              <button className='btn text-white h-10 bg-[#427D9D]'>Give Review</button>
          </Link>
                
            </td>
          
          
            <th>
                <button onClick={() => handleDelete(_id)} className="btn btn-sm btn-circle">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </th>
        </tr>
    );
};

export default BookingRow;
