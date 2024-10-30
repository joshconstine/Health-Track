

const checkForTimeblockOverlap = (existingTimeblocks, newStartTime, newEndTime) => {
    

    for (let i = 0; i < existingTimeblocks.length; i++) {
        const timeblock = existingTimeblocks[i];

        const existingStartTime = new Date(timeblock.start_time);
        
        const existingEndTime = new Date(timeblock.end_time);

        // add the same offset to the new start and end time
        const offset = newStartTime.getTimezoneOffset();
        const offsetDiff = existingEndTime.getTimezoneOffset() - offset;

        existingEndTime.setMinutes(existingEndTime.getMinutes() + offsetDiff);
        existingStartTime.setMinutes(existingStartTime.getMinutes() + offsetDiff);


        console.log('comparing timeblocks', newStartTime, newEndTime, existingStartTime, existingEndTime);
        if (newStartTime >= existingStartTime && newStartTime < existingEndTime) {
            console.log('overlap detected');
            return true;
        }

        if (newEndTime > existingStartTime && newEndTime <= existingEndTime) {
            console.log('overlap detected');
            return true;
        }
    }
    return false;
}
module.exports = checkForTimeblockOverlap;