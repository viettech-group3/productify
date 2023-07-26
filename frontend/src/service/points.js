const points = (start, end) => {
    // if start or end date is invalid, then point is default to be 10
    if (isNaN(start) || isNaN(end)) {
        return 10;
    }

    // get the point based on the time difference between start and end time
    let period = end.getTime() - start.getTime();
    period = period / 1000 / 60 / 60; // convert from milisecond to hours
    let points = period * 10;

    // check if the event is already overdue and deduct point accordingly
    const currentTime = new Date();
    if (end.getTime() < currentTime.getTime()) {
        points = Math.floor(points / 2);
    }

    return points;
};

module.exports = { points };
