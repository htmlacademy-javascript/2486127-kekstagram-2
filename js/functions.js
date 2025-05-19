const checkLength = (string, maxSimbols) => string.length <= maxSimbols;

checkLength('Привет!', 3);

const checkStringPalindrome = function (polindromString) {
  const normalString = polindromString.replaceAll(' ', '').toUpperCase();
  let reversString = '';

  for (let i = normalString.length - 1; i >= 0 ; i--) {
    reversString += normalString.at(i);
  }

  return reversString === normalString;
};

checkStringPalindrome('');

const extractNumbers = function (string) {
  let result = '';
  string = string.toString();
  for (let i = 0; i < string.length; i++) {

    const parseString = parseInt(string[i], 10);

    if (!Number.isNaN(parseString)) {
      result += string[i];
    }
  }
  return result;
};

extractNumbers(-10);

const checkMeeting = (startWork, endWork, startMeeting, duration) => {
  const getMinutes = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const workStart = getMinutes(startWork);
  const workEnd = getMinutes(endWork);
  const meetingStart = getMinutes(startMeeting);
  const meetingEnd = meetingStart + duration;

  return meetingStart >= workStart && meetingEnd <= workEnd;
};

window.console.log(checkMeeting('08:00', '17:30', '14:00', 90));
window.console.log(checkMeeting('8:0', '10:0', '8:0', 120));
window.console.log(checkMeeting('08:00', '14:30', '14:00', 90));
window.console.log(checkMeeting('14:00', '17:30', '08:0', 90));
window.console.log(checkMeeting('8:00', '17:30', '08:00', 900));
