import React, { useContext } from 'react';
import { SettingsContext } from '../../context/SettingsContext';
import getNestedValue from '../../utils/index';

function Dropdown({ label, stateKey, options }) {
  const { settings, updateSettings } = useContext(SettingsContext);

  const selectedValue = getNestedValue(settings, stateKey);

  const handleChange = (event) => {
    updateSettings(stateKey, event.target.value);
  };

  return (
    <div className="inline-block relative">
      {/* label shown above dropdown for UX. not needed for our usecase */}
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <select
        className="block appearance-none w-full bg-white text-gray-900 border border-gray-400 hover:border-gray-500 px-2 py-2 pr-6 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
        value={selectedValue || ''}
        onChange={handleChange}
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg
          className="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M5.516 7.548c0.436-0.446 1.045-0.481 1.576 0l2.908 2.932 2.908-2.932c0.53-0.481 1.141-0.446 1.576 0 0.436 0.445 0.408 1.197 0 1.615l-3.415 3.432c-0.53 0.481-1.141 0.446-1.576 0l-3.415-3.432c-0.408-0.418-0.436-1.17 0-1.615z" />
        </svg>
      </div>
    </div>
  );
}

export default Dropdown;
