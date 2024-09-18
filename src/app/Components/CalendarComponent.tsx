"use client";
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; 
import './styles/calendar.css';

const CalendarComponent: React.FC = () => {
    const [date, setDate] = useState<Date>(new Date());
    const [event, setEvent] = useState<string>('');

    const handleDateChange = (newDate: Date) => {
        setDate(newDate);
    };

    const handleEventChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEvent(e.target.value);
    };

    return (
        <div className="flex flex-col sm:flex-row bg-white p-4 sm:p-6 rounded-lg shadow-lg border border-gray-200">
            {/* Calendar Container */}
            <div className="flex-shrink-0 mb-4 sm:mb-0">
                <Calendar
                    value={date}
                    className="react-calendar"
                    onChange={handleDateChange}
                />
            </div>

            {/* Data Container */}
            <div className="flex-1 pl-4">
                <h3 className="text-gray-700 font-bold text-lg mb-4 text-center sm:text-left">
                    Selected Date: {date.toDateString()}
                </h3>

                <div className="mb-4">
                    <input
                        type="text"
                        value={event}
                        onChange={handleEventChange}
                        placeholder="Add or edit event"
                        className="border p-2 rounded w-full"
                    />
                </div>

                <p className="text-gray-600 text-center sm:text-left">
                    Event Details: {event || "No event added for this date"}
                </p>
            </div>
        </div>
    );
};

export default CalendarComponent;
