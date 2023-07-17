const filterTodayEvents = (eventsOfThisUser, currentDate) => {
  return eventsOfThisUser.filter(event => {
    const start = new Date(event.start);
    const end = new Date(event.end);
    const startOfCurrentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 0, 0, 0, 1);
    const endOfCurrentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 23, 59, 59, 999);
    const minTime = Math.min(start.getTime(), end.getTime(), startOfCurrentDate.getTime(), endOfCurrentDate.getTime())
    const maxTime = Math.max(start.getTime(), end.getTime(), startOfCurrentDate.getTime(), endOfCurrentDate.getTime())
    return ((maxTime - minTime) < 24 * 60 * 60 * 1000 + (end.getTime() - start.getTime()));
  });
}

const filterMonthEvents = (eventsOfThisUser, startDate, endDate) => {
  console.log('eventsOfThisUser:', eventsOfThisUser)
  return eventsOfThisUser.filter(event => {
    const startOfEvent = new Date(event.start);
    const endOfEvent = new Date(event.end);
    console.log('startOfEvent is', startOfEvent)
    const startOfCurrentMonth = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), 0, 0, 0, 1);
    const endOfCurrentMonth = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate(), 23, 59, 59, 999);
    console.log(startOfEvent, endOfEvent, startOfCurrentMonth, endOfCurrentMonth, "Date is: ", event.start, event.end)
    return (startOfEvent <= endOfCurrentMonth && endOfEvent >= startOfCurrentMonth);
  });
}

module.exports = { filterTodayEvents, filterMonthEvents };