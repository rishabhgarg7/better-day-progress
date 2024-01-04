import React, { useContext } from 'react';
import { SettingsContext } from '../../context/SettingsContext';
import getNestedValue from '../../utils/index';

function Switch({ valuePath }) {
  const { settings, updateSettings } = useContext(SettingsContext);
  const enabled = getNestedValue(settings, valuePath);
  // const enabled = false;
  return (
    <div className="flex items-center justify-center">
      <span className="mr-2">Off</span>
      <button
        onClick={() => updateSettings(valuePath, !enabled)}
        type="button"
        className={`${enabled ? 'bg-blue-600' : 'bg-gray-200'}
                            relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none`}
      >
        <span
          className={`${enabled ? 'translate-x-5' : 'translate-x-1'}
                                inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
        />
      </button>
      <span className="ml-2">On</span>
    </div>
  );
}

export default Switch;
