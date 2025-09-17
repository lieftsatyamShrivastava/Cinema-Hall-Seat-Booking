import React, { useState, useMemo } from 'react'


const CinemaSeatooking = ({
  layout = {
    rows: 8,
    seatsPerRow: 12,
    aislePositions: 5,
  },


  seatTypes = {
    regular: { name: 'Regular', price: 150, row: [0, 1, 2] },
    premium: { name: 'Premium', price: 250, row: [3, 4, 5] },
    vip: { name: 'VIP', price: 350, row: [6, 7] },
  },
  bookedSeats = [],
  currency = "₹",
  onbookingComplete = () => { },
  title = "Cinema Hall Booking",
  subtitle = "Select ypur preferred seats",

}) => {
  const colors = [
    "blue",
    "purple",
    "yellow",
    "green",
    "red",
    "indigo",
    "pink",
    "gray",
  ];




  const getSeatType = (row) => {
  const seatTypeEntries = Object.entries(seatTypes);

  for (let i = 0; i < seatTypeEntries.length; i++) {
    const [type, config] = seatTypeEntries[i];
    if (config.row.includes(row)) {
      const color = colors[i % colors.length];
      return { type, color, ...config };
    }
  }

    const [firstType, firstConfig] = seatTypeEntries[0];
    return { type: firstType, color: colors[0], ...firstConfig }

    /// todo 
  };

  const initializeSeats = useMemo(() => {
    const seats = [];
    for (let row = 0; row < layout.rows; row++) {
      const seatRow = [];
      const seatTypeInfo = getSeatType(row);

      for (let seat = 0; seat < layout.seatsPerRow; seat++) {
        const seatId = `${String.fromCharCode(65 + row)}${seat + 1}`;
        seatRow.push({
          id: seatId,
          row,
          seat,
          type: seatTypeInfo?.type || "regular",
          price: seatTypeInfo?.price || 150,
          color: seatTypeInfo?.color || 'blue',
          status: bookedSeats.includes(seatId) ? 'booked' : 'available',
          selected: false,

        });
      }
      seats.push(seatRow);
    }
    return seats;

  }, [layout, seatTypes, bookedSeats]);


  const [seats, setSeats] = useState(initializeSeats);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const getColorClass = (colorName) => {
    const colorMap = {
      blue: "bg-blue-100 border-blue-300 text-blue-800",
      purple: "bg-purple-100 border-purple-300 text-purple-800",
      yellow: "bg-yellow-100 border-yellow-300 text-yellow-800",
      green: "bg-green-100 border-green-300 text-green-800",
      red: "bg-red-100 border-red-300 text-red-800",
      indigo: "bg-indigo-100 border-indigo-300 text-indigo-800",
      pink: "bg-pink-100 border-pink-300 text-pink-800",
      gray: "bg-gray-100 border-gray-300 text-gray-800",
    };
    return colorMap[colorName] || colorMap.blue;
  };











  const getSeatClassName = (seat) => {

    const baseClass = "w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 m-1 rounded-t-lg border-2 cursor-pointer transition-all duration-200 flex items-center justify-center text-xs sm:text-sm font-bold bg-blue-100 bordeer-blue-300 text-blue-800";

    if (seat.status === 'booked') {
      return `${baseClass} bg-gray-400 border-grat-500 text-gray-600 cursor-not-allowed`;
    }

    if (seat.selected) {
      return `${baseClass} bg-gray-500 border-grat-500 text-gray-600 text-white transform scale-110`;
    }

    return `${baseClass} ${getColorClass(seat.color)}`;

  };

  const renderSeatSection = (seatRow, StartIndex, endIndex) => {
    return <div className='flex'>
      {seatRow.slice(StartIndex, endIndex).map((seat, index) => {
        return (
          <div className={getSeatClassName(seat)} key={seat.id}>
            {index + 1}

          </div>
        );
      })}

    </div>

  }

    const uniqueSeatTypes = Object.entries(seatTypes).map(
      ([type, config], index)=> {
        return {
          color: colors[index % colors.length],
          ...config,
        }

    })

  return (
    <div className='w-full min-h-screen bg-gray-50 p-4'>
      {/*title*/}
      <div className='max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-6'>
        <h1 className='text-2xl lg:text-3xl font-bold text-center mb-2 text-gray-800'>
          {title}
        </h1>
        <p className='text-center text-gray-600 mb-6'>
          {subtitle}</p>
        {/* screen */}

        <div className='mb-8'>

          <div className='w-full h-4 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 rounded  mb-2 shadow-inner' />
          <p className='text-center text-sm text-gray-500 font-medium'>
            SCREEN</p>
        </div>
        {/* seats map */}
        <div className='mb-6 overflow-x-auto'>
          <div className='flex flex-col items-center min-w-max'>
            {seats.map((row, rowIndex) => {
              return (
                <div key={rowIndex} className='flex items-center mb-2'>
                  <span className='w-8 text-center font-bbold text-gray-600 mr-4'>
                    {String.fromCharCode(65 + rowIndex)}
                  </span>
                  {renderSeatSection(row, 0, layout.aislePosition)}
                  {/*aisle*/}
                  <div className='w-8'></div>
                  {renderSeatSection(row,
                    layout.aislePosition,
                    layout.seatsPerRow
                  )}
                </div>
              )


            })}
          </div>


        </div>



         {/* legend */}
<div className="flex flex-wrap justify-center gap-6 mb-6 p-4 bg-gray-50 rounded-lg">
  {uniqueSeatTypes.map((seatType) => (
    <div key={seatType.type} className="flex items-center gap-2">
      <div
        className={`w-6 h-6 rounded ${
          getColorClass(seatType.color) || "bg-blue-100 border-blue-300"
        }`}
      ></div>
      <span className="text-sm">
        {seatType.name} ({currency}{seatType.price})
      </span>
    </div>
  ))}
</div>





        {/*summary*/}
        {/*Book Button*/}






      </div>
    </div>
  );
};


export default CinemaSeatooking