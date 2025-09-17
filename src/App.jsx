 import './App.css'
 import CinemaSeatooking from './components/cinema-seat-booking'

function App() {
  

  return (
    
      <CinemaSeatooking layouut={{
        rows:10,
        seatsPerRow:15,
        bookedSeats:20,
      } } seatTypes={ {
        regular:{name:'Regular', price:150, row:[0,1,2,3]},
        premium:{name:'Premium', price:250, row:[4,5,6]},
        vip:{name:'VIP', price:350, row:[7,8,9]},
      }}
      />
  )
}

export default App
