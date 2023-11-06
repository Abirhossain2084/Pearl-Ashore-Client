import { useState } from 'react';

const BookingRow = ({ booking, handleDelete, handleBookingConfirm, handleDateUpdate }) => {
    const { _id, name, email, photo, date, duration, status } = booking;
    const [newDate, setNewDate] = useState(date);
    const [isEditing, setIsEditing] = useState(false);

    const handleUpdateDate = () => {
        const updatedData = { date: newDate };

        fetch(`http://localhost:5000/bookings/${_id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.modifiedCount > 0) {
                alert('Booking date updated successfully');
                setIsEditing(false);
                handleDateUpdate(_id, newDate);
            } else {
                alert('Error updating booking date');
            }
        })
        .catch(error => {
            console.error('Error updating booking date:', error);
            alert('Error updating booking date');
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
            <td>{duration}</td>
            <td>{email}</td>
            <th>
                {status === 'confirm' ? (
                    <span className="font-bold text-primary">Confirmed</span>
                ) : isEditing ? (
                    <button onClick={handleUpdateDate} className="btn btn-ghost bg-black text-white btn-xs">
                        Confirm Update
                    </button>
                ) : (
                    <button onClick={() => setIsEditing(true)} className="btn btn-ghost bg-black text-white btn-xs">
                        Update Date
                    </button>
                )}
            </th>
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
