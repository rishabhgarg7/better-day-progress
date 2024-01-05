import React, { createContext, useState, useEffect } from 'react';

export const SettingsContext = createContext();

// interface SettingsType {
//   general:{
//     launchAtLogin:Boolean;
//     timeRange:{
//       start:string;
//       end:string;
//     };
//     trackingDays: [string]
//   };
//   menubar:{
//     text:'string';
//     showWhileInactive: Boolean;
//   };
//   breakTimeRange:{
//     start:string;
//     end:string;
//   };
//   bell:{
//     ring:Boolean;
//     ringOn:string;
//     bell:string;
//   }
// }

export function SettingsProvider({ children }) {
  const initialSettings = {
    general: {
      launchAtLogin: true,
      timeRange: { start: '10:00', end: '18:00' },
      trackingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    },
    menubar: {
      text: 'showTimeLeft',
      showWhileInactive: false,
    },
    breakTimeRange: { start: '13:00', end: '14:00' },
    bell: {
      ring: true,
      ringOn: 'percentage',
      bell: 'jingle',
    },
  };
  const currentUserSettings = window.electron.store.get('settings-data');
  const settingsData = currentUserSettings || initialSettings;
  const [settings, setSettings] = useState(settingsData);

  useEffect(() => {
    // Update electron-store when settings change
    window.electron.store.set('settings-data', settings);
  }, [settings]);

  const updateSettings = (path, value) => {
    setSettings((prevSettings) => {
      const newSettings = { ...prevSettings };
      let current = newSettings;
      const keys = path.split('.');
      keys.forEach((key, index) => {
        if (index === keys.length - 1) {
          current[key] = value;
        } else {
          current = current[key];
        }
      });
      return newSettings;
    });
    window.electron.ipcRenderer.sendMessage('settings-updated');
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}
