import { Link, useLoaderData } from "react-router-dom";

const Room = () => {
  const rooms = useLoaderData([]);

  return (
    <div className="">
      <h1 className="text-3xl font-semibold text-gray-800 mb-8 text-center font-extrabold text-5xl">
        Rooms List
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 m-4">
        {rooms.map((room) => (
          <Link to={`/rooms/${room._id}`} key={room.id}>
            <div
              className="card h-96 bg-base-100 shadow-2xl image-full"
              style={{
                backgroundImage: `url(${room.images[0]})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="card-body text-center">
                <h2 className="text-white font-bold text-4xl">{room.name}</h2>
                <p>{room.description}</p>

                <p className="text-lg font-bold">Price: ${room.pricePerNight} / night</p>
                <p className="text-lg font-bold">Size: {room.size}</p>
                <p className="text-lg font-bold">
                  Availability: {room.availability} rooms
                </p>
                <p className="text-xl font-bold text-[#DDF2FD]">
                  Customer Review: {room.reviews.length}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Room;
