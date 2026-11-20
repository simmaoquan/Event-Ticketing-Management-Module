# Assignment 1

You will only need one file, ie, your node module, for this assignment.

In this readme file, describe how to use your node module. It could be similar to **app.js** from Lab2, where you call some functions in your node module and display the output. Describe how to setup your node module, if any. Describe how to call the functions, what parameters required and so on.

You can press **Ctrl+Shift+V** in this file in Visual Studio Code to see a live preview of the readme file.

For some tips in formatting text in readme file, refer to https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax

# References
Used AI to provide some sample websites that is related to event ticketing and provide sample data

#Website
https://www.sistic.com.sg/

#Functions
#1 searchEvent(keyword)
This function allows user to event by its title or category which will also the total available seats. Parameters required are either title or category to call the function.

#2 getAvailableSeats(eventID,section)
Shows list of available seats for an event. Required parameters will be the eventID and optionally the section for user to see if the section for that event is still available

#3 selectSeats(eventID,seatID,userID)
Allow users to book seat. Booked seat then will be marked as unavailable. Required parameters will be eventID, seatID and userID

#4 calculateTicketPrice(eventID,section,quantity,purchaseDate)
Calculate total ticket price. There will be a early bird discount applied when tickets are bought at least 30 days before the event and with a booking fee included

#5 cancelBooking(bookingID)
Cancels a booking and release the seat as avaialable again
