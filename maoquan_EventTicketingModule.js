//Data
const events = [
    {
        id: 1, title: "Concert A",
        category: "concert",
        date: "2026-12-20",
        venue: "Singapore Indoor Stadium",
        prices: {cat1: 228, cat2: 168, cat3: 108}
    },
        {
        id: 2, title: "Concert B",
        category: "concert",
        date: "2026-12-20",
        venue: "Singapore Indoor Stadium",
        prices: {cat1: 300, cat2: 200, cat3: 100}
    }
];

const seats = [
    {
        eventID: 1,
        seatID: "A1",
        section: "cat1",
        status: "available"
    }
];

const bookings = [];
const users = [{
    userID: 101,
    name: "Alex",
    points: 120
}];

    //To search events by title or catgory
    function searchEvent(keyword){
        if (!keyword || keyword.trim() === ""){
            return [],
        }
        const results = events.filter(event => 
            event.title.toLowerCase().includes(keyword.toLowerCase()) || 
            event.category.toLowerCase().includes(keyword.toLowerCase())
     );
        return results;
    },


module.exports = {
    //To search events by title or catgory
    searchEvent(),
    //Get available seats for the event
    getAvailableSeats(),
    //Calculate ticket price and discounts
    calculateTicketPrice(),
    //Create booking to reserve a seat
    bookTickets(),
    //Retrieve user's booking history
    getUserBooking(),
    
}
