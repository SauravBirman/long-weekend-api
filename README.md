# 🗓️ Long Weekend Finder – Public Holiday Timeline App

A full-stack Node.js + Express application that finds long weekends using real-time public holiday data from the Nager.Date API and displays them in a timeline-style frontend.

---

## 📖 What is a Long Weekend?

A long weekend is a sequence of **3 or more consecutive days off**. This can occur when a **public holiday** falls on a **Friday or Monday**, combining with the weekend to create an extended break.

This app detects such weekends and helps users visualize them easily.

---

## 🌟 Key Features

- 🔍 Fetch all long weekends or just the **next upcoming one**
- 📅 Uses [Nager.Date](https://date.nager.at/) for holiday data
- 🌐 Supports multiple countries (IN, US, DE, GB, etc.)
- 🖼️ Timeline-style frontend (no frameworks used)
- ⚙️ REST API returns JSON data
- 🧾 Server-side logging with Winston
- ☁️ Easily deployable to Render

---

## 📁 Project Structure

long-weekend-finder/
├── public/ # Frontend files (HTML, CSS, JS)
│ └── index.html # Main UI
├── utils/
│ ├── helper.js # Logic for finding long weekends
│ └── logger.js # Winston logger config
├── index.js # Express server with API routes
├── package.json # Project dependencies & scripts
└── README.md # Project documentation

yaml
Copy
Edit

---

## 🌐 API Documentation

### `GET /long-weekends/:countryCode`

Returns **all long weekends** for the current year in the selected country.

**Example:**
GET /long-weekends/IN

cpp
Copy
Edit

**Response Format:**
```json
{
  "longWeekends": [
    {
      "startDate": "2025-01-24",
      "endDate": "2025-01-26",
      "days": ["2025-01-24", "2025-01-25", "2025-01-26"],
      "numberOfDays": 3,
      "holiday": "Republic Day"
    }
    // More weekends...
  ]
}
GET /next-long-weekend/:countryCode
Returns the next upcoming long weekend from today’s date.

Example:

vbnet
Copy
Edit
GET /next-long-weekend/US
Response Format:

json
Copy
Edit
{
  "nextLongWeekend": {
    "startDate": "2025-07-04",
    "endDate": "2025-07-06",
    "days": ["2025-07-04", "2025-07-05", "2025-07-06"],
    "numberOfDays": 3,
    "holiday": "Independence Day"
  }
}
🌍 Supported Countries
These are currently supported through the UI dropdown and Nager.Date API:

Country	Code
India	IN
United States	US
Germany	DE
France	FR
United Kingdom	GB
Japan	JP
Canada	CA
Australia	AU

You can find the full list of available countries from Nager.Date at:
https://date.nager.at/api/v3/AvailableCountries

🖼️ Frontend Preview
The UI is a vertical timeline

Displays:

📅 Start and End Dates

🗓️ Number of Days

🎉 Name of the Holiday

Built with plain HTML, CSS, and JavaScript (no React/Vue)

🔽 Screenshot (optional – add this if you have one)


💻 How to Run on Your Machine (Local Setup)
Clone the repository

bash
Copy
Edit
git clone https://github.com/YOUR-USERNAME/long-weekend-finder.git
cd long-weekend-finder
Install dependencies

bash
Copy
Edit
npm install
Start the server

bash
Copy
Edit
node index.js
Visit in browser

arduino
Copy
Edit
http://localhost:3000
The UI loads automatically from the /public/index.html file.

All backend APIs are live on the same server.

🌐 Live Deployment
🔗 Live Demo: https://long-weekend-api.onrender.com

This link serves:

Frontend UI at /

API endpoints at /long-weekends/:code and /next-long-weekend/:code

create a readme.md for this above content
