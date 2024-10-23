

 const checkForTimeblockOverlap = (existingTimeblocks, newStartTime, newEndTime) => {
      for  (let i = 0; i < existingTimeblocks.length; i++) {
        console.log('existingTimeblocks', existingTimeblocks);
        const timeblock = existingTimeblocks[i];
    const existingStartTime = new Date(timeblock.start_time)
    const existingEndTime = new Date(timeblock.end_time);


    const newStartTimeUTC = newStartTime.toISOString().slice(0, 19).replace('T', ' ');
    const newEndTimeUTC = newEndTime.toISOString().slice(0, 19).replace('T', ' ');

    newStartTime = new Date(newStartTimeUTC);
    newEndTime = new Date(newEndTimeUTC);

    

       console.log('comparing timeblocks', newStartTime, newEndTime, existingStartTime, existingEndTime);


    if (newStartTime >= existingStartTime && newStartTime < existingEndTime) {
      return true;
    }

    if (newEndTime > existingStartTime && newEndTime <= existingEndTime) {
      return true;
    }
  }
  return false;
}

module.exports = checkForTimeblockOverlap;