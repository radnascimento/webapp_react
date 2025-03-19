import React from "react";
import { DatePicker, Card } from "antd";
import dayjs from "dayjs";

const DateSelector = ({ selectedDate, onDateChange }) => {
  console.log("Selected Date received in DateSelector:", selectedDate); // Log received selectedDate

  return (
    <div className="col-sm-6 col-md-4 col-lg-3">
    <DatePicker
      onChange={(date) => {
        console.log("Date changed:", date); // Log when the date changes
        onDateChange(date);
      }}
      value={selectedDate ? selectedDate : null}  // If selectedDate is null, set the value to null
      format="DD/MM/YYYY"
      style={{ width: "100%", borderRadius: 6 }}
    />
  </div>
  
  );
};

export default DateSelector;
