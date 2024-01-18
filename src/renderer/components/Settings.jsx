import React, { useContext } from 'react';
import { SettingsContext } from '../context/SettingsContext';
import Switch from './UI/Switch';
import Dropdown from './UI/Dropdown';
import DayCheckbox from './UI/Checkbox';
import TimeRangeInput from './UI/TimeRangeInput';
import getNestedValue from '../utils/index';

export default function Component() {
  const { settings, updateSettings } = useContext(SettingsContext);
  const isBreakTimeEnabled = getNestedValue(settings, 'breakTime.enabled');

  const days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];
  return (
    <div className="bg-[#1E1E1E] p-4 text-white w-full h-full flex flex-col  ">
      <p className="mb-2">General</p>
      <div className="general-settings flex flex-col p-2 px-4 rounded-md border-solid border-[1px] border-gray-500">
        <div className="login-launch flex justify-between items-center mb-4">
          <p>Launch at login</p>
          <Switch id="launch-login" valuePath="general.launchAtLogin" />
        </div>
        <div className="time-range flex justify-between items-center mb-4">
          <span>Time range</span>
          <div className="flex items-center justify-center">
            <TimeRangeInput
              startTimeKey="general.timeRange.start"
              endTimeKey="general.timeRange.end"
            />
          </div>
        </div>
        <div className="days-checkboxes flex justify-between flex-wrap mb-4">
          {days.map((day) => (
            <DayCheckbox key={day} day={day} />
          ))}
        </div>
      </div>

      <p className="mb-2 mt-4">Menu Bar</p>

      <div className="menubar-settings flex flex-col p-2 px-4 rounded-md border-solid border-[1px] border-gray-500">
        {/* <div className="icon-settings hidden">
          <div className="icon flex justify-between items-center mb-2">
            <span>Icon</span>
            <Switch id="icon-toggle" />
          </div>
          <div className="show-from flex justify-between items-center mb-2">
            <span className="ml-4">Show from</span>
            <Button variant="primary" size="sm" className="bg-[#313131]">
              empty to full
            </Button>
          </div>
          <div className="flipped-toggle flex justify-between items-center mb-2">
            <span className="ml-4">Flipped</span>
            <Switch id="flipped-toggle" />
          </div>
        </div> */}

        <div className="text-show flex justify-between items-center mb-2">
          <span>Text</span>
          <Dropdown
            stateKey="menubar.text"
            options={[
              { value: 'none', label: 'None' },
              { value: 'timeLeft', label: 'Time Left' },
              { value: 'timeOver', label: 'Time Over' },
              { value: 'percentageLeft', label: 'Percentage Left' },
              { value: 'percentageOver', label: 'Percentage Over' },
            ]}
          />
        </div>
        <div className="flex justify-between items-center">
          <span>Show while inactive</span>
          <Switch id="show-login" valuePath="menubar.showWhileInactive" />
        </div>
      </div>
      {/* <div className="break-time-range px-2 mt-6 flex flex-col justify-between  mb-4">
        <div className="flex justify-between items-center">
          <span>Want to include break?</span>
          <Switch id="show-login" valuePath="breakTime.enabled" />
        </div>
        {isBreakTimeEnabled && (
          <div className="mt-4 flex justify-between items-center">
            <span>Break Time Range</span>
            <div className="flex items-center justify-center">
              <TimeRangeInput
                startTimeKey="breakTime.breakTimeRange.start"
                endTimeKey="breakTime.breakTimeRange.end"
              />
            </div>
          </div>
        )}
      </div> */}
    </div>
  );
}
