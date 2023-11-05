import { useLoaderData } from "react-router-dom";


const Room = () => {

    const rooms = useLoaderData([]);

    
    

    console.log(rooms);
    return (
        <div>
        <h1 className="text-3xl font-semibold text-gray-800 mb-8 text-center font-extrabold text-5xl">My Rooms List</h1>
      
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 m-4">
          {rooms.map((room) => (
            <div
              key={room.id}
              className="card h-96 bg-base-100 shadow-xl image-full"
              style={{ backgroundImage: `url(${room.images[0]})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
           >
              <figure>
                <img src={room.images[0]} alt="Room" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{room.name}</h2>
                <p>{room.description}</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Book Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
    );
};

export default Room;