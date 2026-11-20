//Data
const events = [
  {
    eventID: 1,
    title: "Concert A",
    category: "concert",
    date: "2026-12-20",
    venue: "Singapore Indoor Stadium",
    prices: { cat1: 228, cat2: 168, cat3: 108 },
  },
  {
    eventID: 2,
    title: "Concert B",
    category: "concert",
    date: "2026-12-10",
    venue: "Singapore Indoor Stadium",
    prices: { cat1: 300, cat2: 200, cat3: 100 },
  },

  {
    eventID: 3,
    title: "Musical A",
    category: "theatre",
    date: "2027-12-20",
    venue: "Esplanade",
    prices: { cat1: 300, cat2: 200, cat3: 100 },
  },
];

const seats = [
  { eventID: 1, seatID: "A1", section: "cat1", status: "available" },
  { eventID: 1, seatID: "A2", section: "cat1", status: "booked" },
  { eventID: 1, seatID: "B1", section: "cat2", status: "available" },
  { eventID: 1, seatID: "C1", section: "cat3", status: "available" },
  { eventID: 2, seatID: "A1", section: "cat1", status: "available" },
  { eventID: 2, seatID: "B1", section: "cat2", status: "available" },
  { eventID: 2, seatID: "C1", section: "cat3", status: "available" },
  { eventID: 3, seatID: "A1", section: "cat1", status: "available" },
  { eventID: 3, seatID: "B1", section: "cat2", status: "available" },
  { eventID: 3, seatID: "C1", section: "cat3", status: "available" },
];

const bookings = [];
const users = [
  {
    userID: 101,
    name: "Alex",
    points: 120,
  },
];

const Early_Bird_Day = 30;
const Early_Bird_Rate = 0.1;
const Booking_Fee = 2;

//To search events by title or catgory, returns with event details and seat count
function searchEvent(keyword) {
  if (!keyword || keyword.trim() === "") {
    return "Please enter a keyword";
  }
  const key = keyword.toLowerCase();
  const matches = events.filter(
    (event) =>
      event.title.toLowerCase().includes(key) ||
      event.category.toLowerCase().includes(key),
  );
  if (matches.length === 0) {
    return "No Event Found";
  }

  const results = matches.map((event) => ({
    ...event,
    availableSeats: seats.filter(
      (s) => s.eventID === event.eventID && s.status === "available",
    ).length,
  }));

  return { events: results };
}

//Shows list available seats for searched event
function getAvailableSeats(eventID, section) {
  const event = events.find((event) => event.eventID === eventID);

  if (!event) {
    return "Event not Found";
  }

  const availableSeats = seats.filter(
    (seat) =>
      seat.eventID === eventID &&
      seat.status === "available" &&
      (!section || seat.section === section),
  );
  return { seats: availableSeats };
}

//Books the chosen seats
function selectSeats(eventID, seatIDs, userID) {
  const user = users.find((u) => u.userID === userID);
  if (!user) return "User not found";

  const event = events.find((e) => e.eventID === eventID);
  if (!event) return "Event not found";

  if (!Array.isArray(seatIDs) || seatIDs.length === 0)
    return "Please select at least one seat";

  if (new Set(seatIDs).size !== seatIDs.length)
    return { message: "Duplicate seats selected" };

  const chosen = [];
  for (const id of seatIDs) {
    const seat = seats.find((s) => s.eventID === eventID && s.seatID === id);
    if (!seat) return { message: `Seat ${id} does not exist` };
    if (seat.status !== "available") return `Seat ${id} is already booked`;
    chosen.push(seat);
  }

  chosen.forEach((s) => (s.status = "booked"));
  const booking = {
    bookingID: bookings.length + 1,
    eventID,
    userID,
    seatIDs,
    status: "confirmed",
  };
  bookings.push(booking);
  return booking;
}

//Calculate total pricew with discounts and with booking fee
function calculateTicketPrice(eventID, section, quantity, purchaseDate) {
  const event = events.find((e) => e.eventID === eventID);
  if (!event) return { success: false, message: "Event not found" };

  if (!event.prices[section]) return "Invalid Section";

  if (!Number.isInteger(quantity) || quantity < 1)
    return { success: false, message: "Invalid Quantity" };

  const daysBefore =
    (new Date(event.date) - new Date(purchaseDate)) / (1000 * 60 * 60 * 24);
  if (isNaN(daysBefore) || daysBefore < 0) return "Invalid purchase date";

  const subtotal = event.prices[section] * quantity;
  const discountRate = daysBefore >= Early_Bird_Day ? Early_Bird_Rate : 0;
  const discount = subtotal * discountRate;
  const fee = Booking_Fee * quantity;
  const total = subtotal - discount + fee;

  return {
    success: true,
    subtotal,
    discount: Number(discount.toFixed(2)),
    fee,
    total: Number(total.toFixed(2)),
  };
}

//Cancels booking and release seats back to available
function cancelBooking(bookingID) {
  const booking = bookings.find((b) => b.bookingID === bookingID);
  if (!booking) return "Booking not found";
  if (booking.status === "cancelled") return "Already cancelled";

  booking.seatIDs.forEach((id) => {
    const seat = seats.find(
      (s) => s.eventID === booking.eventID && s.seatID === id,
    );
    if (seat) seat.status = "available";
  });
  booking.status = "cancelled";
  return "Booking cancelled successfully";
}

//Test
if (require.main === module) {
  const results = searchEvent("Concert A");
  console.log("Search Results:", results);

  if (results.events) {
    const selectedEventID = results.events[0].eventID;

    console.log("All Available Seats:");
    console.log(getAvailableSeats(selectedEventID));

    console.log("Available Cat 1 Seats:");
    console.log(getAvailableSeats(selectedEventID, "cat1"));
  }

  console.log("Invalid search:");
  console.log(searchEvent("xyz"));

  console.log("Book A1:", selectSeats(1, ["A1"], 101));
  console.log("Book A1 (repeated):", selectSeats(1, ["A1"], 101));

  //Early-bird price
  console.log(
    "Price, early-bird",
    calculateTicketPrice(1, "cat1", 2, "2026-11-18"),
  );
  //Discounted Price
  console.log(
    "Price, without discount",
    calculateTicketPrice(2, "cat1", 2, "2026-11-18"),
  );
  //Invalid section
  console.log(
    "Price, invalid section",
    calculateTicketPrice(1, "cat9", 2, "2026-11-18"),
  );
  console.log("Cancel booking 1:", cancelBooking(1));
  console.log("Cancel again (should fail):", cancelBooking(1));
  console.log("seats are booking cancelled", getAvailableSeats(1, "cat1"));
  console.log("Cancel invalid ID:", cancelBooking(99));
}

module.exports = {
  //To search events by title or catgory
  searchEvent,
  //To check if seats are available
  getAvailableSeats,
  //To book seats that are available
  selectSeats,
  //To calculate total ticket price
  calculateTicketPrice,
  //To cancel seats booked
  cancelBooking,
};
