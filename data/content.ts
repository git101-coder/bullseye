// This file contains all the editable content for the application
// You can modify this file directly to update the content

// Trading Signal (just one featured signal)
export const featuredSignal = {
  id: "1",
  name: "USD/RUB",
  startTime: "7:00 PM",
  duration: "4 hrs",
  winRate: "86%",
  profit: "40%",
  description: "The win rate is there to help you make better  decisions on the amount you choose to invest",
  tags: ["Premium", "Medium Win Rate", "NOT STARTED"],
}

// Year to Date Stats
export const yearToDateStats = {
  wins: 121,
  losses: 5,
  successRate: "96%",
}

// Payment Details
export const paymentDetails = {
  method: "M-Pesa",
  minimum: "500 KSH",
  name: "Ida Muturia",
  paybill: "522522",
  account: "1327570440",
}

// Payment Instructions (keeping this for reference but we won't display it)
export const paymentInstructions = [
  "Go to M-Pesa on your phone",
  'Select "Lipa na M-Pesa"',
  'Select "Pay Bill"',
  "Enter Business Number: 522522",
  "Enter Account Number: 1327570440",
  "Enter Amount: Minimum 500 KSH",
  "Enter your M-Pesa PIN and confirm",
  "Click the button below after making payment",
]

// Important Notes
export const paymentNotes = [
  "New signals are updated every day before 13.00(GMT+3);That is East Africa local time",
  "Please double check details before payment",
  "Once a signal starts, Do Not make payment, kindly wait for the next signal",
  "For longterm consistent profitability, consider having a plan for your investment",
  "Follow instructions carefully, we will not be responsible for your ignorance",
  "Remember that despite the high  win rate,we also concede losses purely from rare factors we cannot control,so be smart",
]

// Site Information
export const siteInfo = {
  name: "Bullseye",
  tagline: "Precision Trading Signals",
  description: "Get the best trading signals with high win rates",
}
