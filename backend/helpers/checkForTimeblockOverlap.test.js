const checkForTimeblockOverlap = require('./checkForTimeblockOverlap');

test('checkForTimeblockOverlap should return true if there is an overlap', () => {
    // 2024-10-23 03:30:00 
    const timeblock1 = {
        start_time: '2024-10-23T03:30:00Z',
        end_time: '2024-10-23T04:30:00Z'
    };
   const startTimeToTest = '2020-01-01T00:30:00Z';
    const endTimeToTest = '2020-01-01T01:30:00Z';
    expect(checkForTimeblockOverlap(timeblock1, startTimeToTest, endTimeToTest)).toBe(true);

})

test('checkForTimeblockOverlap should return false if there is no overlap', () => {
    // 2024-10-23 03:30:00 
    const timeblock1 = {
        start_time: '2024-10-23T03:30:00Z',
        end_time: '2024-10-23T04:30:00Z'
    };
   const startTimeToTest = '2020-01-01T00:30:00Z';
    const endTimeToTest = '2020-01-01T01:30:00Z';
    expect(checkForTimeblockOverlap(timeblock1, startTimeToTest, endTimeToTest

    )).toBe(false);

})


test('checkForTimeblockOverlap should return true if there is a complete overlap', () => {

    const timeblock1 = {
        start_time: '2024-10-23T03:30:00Z',
        end_time: '2024-10-23T04:30:00Z'
    };
   const startTimeToTest = '2024-10-23T03:30:00Z';
    const endTimeToTest = '2024-10-23T04:30:00Z';
    expect(checkForTimeblockOverlap(timeblock1, startTimeToTest, endTimeToTest)).toBe(true);

})




