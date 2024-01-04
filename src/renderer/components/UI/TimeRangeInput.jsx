import React, { useContext } from 'react';
import getNestedValue from '../../utils/index';
import { SettingsContext } from '../../context/SettingsContext';

function TimeRangeInput({ startTimeKey, endTimeKey }) {
  const { settings, updateSettings } = useContext(SettingsContext);
  console.log('settings: time: ', settings);
  const start = getNestedValue(settings, startTimeKey);
  const end = getNestedValue(settings, endTimeKey);
  console.log('startTimeKey: start: end: ', startTimeKey, start, end);

  const handleStartTimeChange = (event) => {
    updateSettings(startTimeKey, event.target.value);
  };

  const handleEndTimeChange = (event) => {
    updateSettings(endTimeKey, event.target.value);
  };

  return (
    <div className="flex items-center space-x-4">
      <div>
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

      <div>
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
  );
}

export default TimeRangeInput;
