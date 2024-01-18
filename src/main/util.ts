/* eslint import/prefer-default-export: off */
import { URL } from 'url';
import path from 'path';
import { updateTrayIcon, updateTrayTitle } from './tray';
import getNestedValue from '../renderer/utils';

export function resolveHtmlPath(htmlFileName: string) {
  if (process.env.NODE_ENV === 'development') {
    const port = process.env.PORT || 1212;
    const url = new URL(`http://localhost:${port}`);
    url.pathname = htmlFileName;
    return url.href;
  }
  return `file://${path.resolve(__dirname, '../renderer/', htmlFileName)}`;
}

export function hanndleLaunchAtLogin(app, newSettings) {
  //  check launch at login thing
  const currentLaunchAtLogin = app.getLoginItemSettings().openAtLogin;
  const newLaunchAtLogin = getNestedValue(newSettings, 'general.launchAtLogin');
  if (currentLaunchAtLogin !== newLaunchAtLogin) {
    app.setLoginItemSettings({
      openAtLogin: newLaunchAtLogin,
    });
  }
}

function formatTime(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const mins = Math.round(minutes % 60);
  return `${hours >= 1 ? `${hours}h ` : ''}${mins}m`;
}

export function isActiveAppZone(newSettings) {
  // Check if today is a working day
  const trackingDays =
    getNestedValue(newSettings, 'general.trackingDays') || [];
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  if (!trackingDays.includes(today)) {
    return false; // Not a working day
  }

  const workStartTime = getNestedValue(newSettings, 'general.timeRange.start');
  const workEndTime = getNestedValue(newSettings, 'general.timeRange.end');

  // Convert work start and end times to Date objects
  const now = new Date();
  const startTime = new Date(now);
  startTime.setHours(
    parseInt(workStartTime.split(':')[0]),
    parseInt(workStartTime.split(':')[1]),
    0,
  );

  const endTime = new Date(now);
  endTime.setHours(
    parseInt(workEndTime.split(':')[0]),
    parseInt(workEndTime.split(':')[1]),
    0,
  );

  // Check if current time is within the work time range
  return now >= startTime && now <= endTime;
}

export function calculateWorkElapsedMins(newSettings) {
  const workStartTime: string = getNestedValue(
    newSettings,
    'general.timeRange.start',
  );
  const workEndTime: string = getNestedValue(
    newSettings,
    'general.timeRange.end',
  );

  // Current time
  const now = new Date();

  // Convert work start and end times to Date objects
  const startTime = new Date(now);
  startTime.setHours(
    parseInt(workStartTime.split(':')[0]),
    parseInt(workStartTime.split(':')[1]),
    0,
  );

  const endTime = new Date(now);
  endTime.setHours(
    parseInt(workEndTime.split(':')[0]),
    parseInt(workEndTime.split(':')[1]),
    0,
  );

  // Calculate total work minutes and minutes elapsed
  const totalWorkMinutes = (endTime - startTime) / 60000;
  const elapsedMinutes = (now - startTime) / 60000;

  // Return progress information
  return {
    totalWorkMinutes,
    elapsedMinutes,
  };
}

export function calculateTimeProgress(totalWorkMinutes, elapsedMinutes) {
  const percentageOver = Math.round((elapsedMinutes / totalWorkMinutes) * 100);
  const percentageLeft = 100 - percentageOver;

  const minutesLeft = totalWorkMinutes - elapsedMinutes;

  const timeOver = formatTime(elapsedMinutes);
  const timeLeft = formatTime(minutesLeft);

  return {
    percentageOver: `${percentageOver.toString()}%`,
    percentageLeft: `${percentageLeft.toString()}%`,
    timeOver,
    timeLeft,
  };
}

export function updateProgressInApp(
  totalWorkMinutes,
  elapsedMinutes,
  tray,
  newSettings,
) {
  // check inactive or not
  // update icon of app with progress
  // update title of app
  // let currentIcon = '16x16.png';
  // setInterval(() => {
  //   console.log('updating icon to: ', currentIcon);
  // updateTrayIcon(tray, getAssetPath(`icons/${currentIcon}`));
  //   currentIcon = currentIcon === '16x16.png' ? '24x24.png' : '16x16.png';
  // }, 0.2 * 60000);
  let newTitleOfApp = null;
  // let newIconOfApp: string = getAssetPath(`icons/16x16.png`);
  if (elapsedMinutes === 0) {
    console.log('inactive');
    newTitleOfApp = '';
  } else {
    const progress = calculateTimeProgress(totalWorkMinutes, elapsedMinutes);
    newTitleOfApp = progress[newSettings.menubar.text] || '';
  }
  updateTrayTitle(tray, newTitleOfApp);
}
