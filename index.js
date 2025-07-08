const express = require("express");
const cors = require("cors");
const axios = require("axios");
const moment = require("moment");
const path = require("path");

const { getLongWeekends } = require("./utils/helper");
const logger = require("./utils/logger");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

// Logging incoming requests
app.use((req, res, next) => {
  logger.info(`Incoming Request: ${req.method} ${req.url}`);
  next();
});

// Get all long weekends
app.get("/long-weekends/:countryCode", async (req, res) => {
  const { countryCode } = req.params;
  const year = new Date().getFullYear();

  try {
    const response = await axios.get(`https://date.nager.at/api/v3/PublicHolidays/${year}/${countryCode}`);
    const holidays = response.data;

    const weekends = getLongWeekends(holidays);
    logger.info(`Found ${weekends.length} long weekends for ${countryCode}`);
    res.json({ longWeekends: weekends });
  } catch (error) {
    logger.error(`Failed to fetch holidays for ${countryCode}: ${error.message}`);
    res.status(500).json({ error: "Failed to fetch holidays from Nager.Date" });
  }
});

// Get next upcoming long weekend
app.get("/next-long-weekend/:countryCode", async (req, res) => {
  const { countryCode } = req.params;
  const year = new Date().getFullYear();
  const today = moment();

  try {
    const response = await axios.get(`https://date.nager.at/api/v3/PublicHolidays/${year}/${countryCode}`);
    const holidays = response.data;

    const weekends = getLongWeekends(holidays);
    const next = weekends.find(w => moment(w.startDate).isAfter(today));

    if (next) {
      logger.info(`Next long weekend for ${countryCode}: ${next.startDate} to ${next.endDate}`);
      res.json({ nextLongWeekend: next });
    } else {
      logger.info(`No upcoming long weekends found for ${countryCode}`);
      res.json({ message: "No upcoming long weekend found." });
    }
  } catch (error) {
    logger.error(`Error fetching next long weekend for ${countryCode}: ${error.message}`);
    res.status(500).json({ error: "Failed to fetch holidays from Nager.Date" });
  }
});

// Start server
app.listen(PORT, () => {
  logger.info(`✅ Server running at http://localhost:${PORT}`);
});
