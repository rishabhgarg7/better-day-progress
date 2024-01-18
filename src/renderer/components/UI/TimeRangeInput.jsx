import React, { useState, useContext } from 'react';
import getNestedValue from '../../utils/index';
import { SettingsContext } from '../../context/SettingsContext';

function TimeRangeInput({ startTimeKey, endTimeKey }) {
  const { settings, updateSettings } = useContext(SettingsContext);
  const [isEndTimeValid, setIsEndTimeValid] = useState(true);
  const start = getNestedValue(settings, startTimeKey);
  const end = getNestedValue(settings, endTimeKey);

  const validateEndTime = (endTime, startTime) => {
    const now = new Date();
    const currentStartTime = new Date(now);
    currentStartTime.setHours(
      parseInt(startTime.split(':')[0]),
      parseInt(startTime.split(':')[1]),
      0,
    );

    const currentEndTime = new Date(now);
    currentEndTime.setHours(
      parseInt(endTime.split(':')[0]),
      parseInt(endTime.split(':')[1]),
      0,
    );
    setIsEndTimeValid(currentEndTime > currentStartTime);
  };

  const handleStartTimeChange = (event) => {
    updateSettings(startTimeKey, event.target.value);
    // Re-validate end time when start time changes
    validateEndTime(end, event.target.value);
  };

  const handleEndTimeChange = (event) => {
    validateEndTime(event.target.value, start);
    updateSettings(endTimeKey, event.target.value);
  };

  return (
    <div className="flex flex-col justify-center w-72">
      <div className="start-end-time flex justify-between items-center">
        <div className="start-time-label-input mx-1">
          <label
            htmlFor="startTime"
            className="block text-xs font-medium text-gray-500 mb-1"
          >
            Start Time
          </label>
          <input
            type="time"
            id="startTime"
            name="startTime"
            className="px-2 block text-black w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={start}
            onChange={handleStartTimeChange}
            step="60"
          />
        </div>

        <div className="end-time-label-input mx-1">
          <label
            htmlFor="endTime"
            className="block text-xs font-medium text-gray-500 mb-1"
          >
            End Time
          </label>
          <input
            type="time"
            id="endTime"
            name="endTime"
            className="px-2 block text-black w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={end}
            onChange={handleEndTimeChange}
            step="60"
          />
        </div>
      </div>

      {!isEndTimeValid && (
        <div className="text-xs text-red-500 mt-1 ml-2">
          End time should be higher than the start time.
        </div>
      )}
    </div>
  );
}

export default TimeRangeInput;
