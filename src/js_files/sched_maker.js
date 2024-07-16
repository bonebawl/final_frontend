function generateSchedule(list, time, typaGuy) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const startTimes = {
      night: '19:00',
      morning: '07:00',
      noon: '11:00',
      afternoon: '15:00'
    };
  
    // Convert time to minutes
    const totalMinutes = parseInt(time.split(':')[0]) * 60 + parseInt(time.split(':')[1]);
  
    // Determine the frequency of the primary time slot
    const primaryFrequency = 4;
  
    // Create an array of start times based on typaGuy
    let weekStartTimes = new Array(7).fill(startTimes[typaGuy]);
    const otherTypes = Object.keys(startTimes).filter(type => type !== typaGuy);
    for (let i = primaryFrequency; i < 7; i++) {
      weekStartTimes[i] = startTimes[otherTypes[(i - primaryFrequency) % 3]];
    }
  
    // Shuffle the weekStartTimes array
    weekStartTimes = shuffleArray(weekStartTimes);
  
    // Generate the schedule
    const schedule = days.map((day, index) => {
      const daySchedule = [];
      let remainingMinutes = totalMinutes;
      let currentMinutes = parseTime(weekStartTimes[index] || startTimes[typaGuy]);
  
      while (remainingMinutes > 0) {
        const task = list[Math.floor(Math.random() * list.length)];
        const taskDuration = Math.min(Math.floor(Math.random() * remainingMinutes) + 15, remainingMinutes);
        
        const startTime = formatTime(currentMinutes);
        currentMinutes += taskDuration;
        const endTime = formatTime(currentMinutes);
        
        daySchedule.push({
          task,
          start: startTime,
          end: endTime
        });
  
        remainingMinutes -= taskDuration;
      }
  
      return { day, schedule: daySchedule };
    });
  
    return schedule;
  }
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  
  function parseTime(timeString) {
    if (!timeString) {
      console.error('Invalid time string:', timeString);
      return 0; // Default to midnight
    }
    const [hours, minutes] = timeString.split(':').map(Number);
    return hours * 60 + minutes;
  }
  
  function formatTime(totalMinutes) {
    let hours = Math.floor(totalMinutes / 60) % 24;
    const minutes = totalMinutes % 60;
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')} ${ampm}`;
  }
  export default generateSchedule;