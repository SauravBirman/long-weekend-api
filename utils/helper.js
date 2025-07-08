const moment = require("moment");

const getLongWeekends = (holidays) => {
  const longWeekends = [];

  holidays.forEach((holiday) => {
    const date = holiday.date;
    if (!date || !moment(date, "YYYY-MM-DD", true).isValid()) return;

    const momentDate = moment(date);
    const weekday = momentDate.day();

    let start = null, end = null;

    if (weekday === 5) {
      start = momentDate;
      end = momentDate.clone().add(2, "days");
    } else if (weekday === 0) {
      start = momentDate.clone().subtract(2, "days");
      end = momentDate;
    } else if (weekday === 1) {
      start = momentDate.clone().subtract(2, "days");
      end = momentDate;
    }

    if (start && end) {
      const days = [];
      for (let d = start.clone(); d.diff(end) <= 0; d.add(1, "day")) {
        days.push(d.format("YYYY-MM-DD"));
      }

      if (days.length >= 3) {
        longWeekends.push({
          startDate: start.format("YYYY-MM-DD"),
          endDate: end.format("YYYY-MM-DD"),
          days,
          numberOfDays: days.length,
          holiday: holiday.localName || holiday.name,
        });
      }
    }
  });

  return longWeekends;
};

module.exports = { getLongWeekends };

