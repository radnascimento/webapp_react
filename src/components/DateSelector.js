import React from "react";
import { DatePicker } from "antd";
import dayjs from "dayjs";

const DateSelector = ({ selectedDate, onDateChange }) => {
  const handleDateChange = (date) => {
    const newDate = date ? dayjs(date) : null; // Convert date to dayjs or null
    console.log("Date changed:", newDate ? newDate.format("YYYY-MM-DD") : "No date selected");
    onDateChange(newDate); // Send updated date to parent
  };

  return (
    <div className="col-sm-6 col-md-4 col-lg-3">
      <DatePicker
        onChange={handleDateChange}
        value={selectedDate ? dayjs(selectedDate) : null} // Ensure value is valid
        format="DD/MM/YYYY"
        style={{ width: "100%", borderRadius: 6 }}
      />
    </div>
  );
};

export default DateSelector;


