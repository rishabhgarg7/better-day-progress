import React, { useContext } from 'react';
import { SettingsContext } from '../../context/SettingsContext';

function DayCheckbox({ day }) {
  const dayMapping = {
    Monday: 'Mon',
    Tuesday: 'Tue',
    Wednesday: 'Wed',
    Thursday: 'Thu',
    Friday: 'Fri',
    Saturday: 'Sat',
    Sunday: 'Sun',
  };

  const { settings, updateSettings } = useContext(SettingsContext);

  const isChecked = settings.general.trackingDays.includes(day);

  const handleChange = () => {
    const updatedDays = isChecked
      ? settings.general.trackingDays.filter((d) => d !== day)
      : [...settings.general.trackingDays, day];

    updateSettings('general.trackingDays', updatedDays);
  };

  return (
    <label className="">
      <input
        className="mr-2"
        type="checkbox"
        checked={isChecked}
        onChange={handleChange}
      />
      {dayMapping[day]}
    </label>
  );
}

export default DayCheckbox;
