import Hinter from "./Hinter";

const Calendar = ({ date, changeMonth, openPopup, reserveList }) => {
    const curMonth = date.getMonth() + 1;
    let weekDayOfFirstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay()

    let today = new Date()
    let condition = today < date

    const daysPerMount = {
        28: [2],
        30: [4, 6, 9, 11],
        31: [1, 3, 5, 7, 8, 10, 12]
    }

    const monthMap = {
        0: "Jan",
        1: "Feb",
        2: "Mar",
        3: "Apr",
        4: "May",
        5: "Jun",
        6: "Jul",
        7: "Aug",
        8: "Sept",
        9: "Oct",
        10: "Nov",
        11: "Dec"
    }

    const weekDayMap = {
        "1": "Mon",
        "2": "Tue",
        "3": "Wedn",
        "4": "Thu",
        "5": "Fri",
        "6": "Sat",
        "0": "Sun",
    }

    let daysAmount;
    for (let key in daysPerMount) {
        if (daysPerMount[key].includes(curMonth)) {
            daysAmount = key;
            break
        }
    }

    const handleClick = (e, dayId)=> {
        if (e.target.classList.contains("calendar__day_disabled")) 
            return 
        openPopup(dayId)
    }

    const pickedDaysArr = []

    for (let day of reserveList) {
        pickedDaysArr.push(day.dayId)
    }

    return (
        <div className="calendar">
            <h2 className="calendar__title">Pick a day</h2>
            <div className="calendar__header">
                <div
                    className={`calendar__arrow calendar__arrow_prev ${!condition && "calendar__arrow_hide"}`}
                    onClick={() =>  {
                        if (condition)
                            changeMonth(-1)}
                    }
                />
                    {monthMap[date.getMonth()]}, {date.getFullYear()}
                <div
                    className="calendar__arrow calendar__arrow_next"
                    onClick={() => changeMonth(1)}
                />
            </div>
            <div className="calendar__body">
                {                    
                    [...Array(parseInt(daysAmount)).keys()].map(element => {
                        let currentDate = new Date(date.getFullYear(), date.getMonth(), element + 1)
                        let dayId = currentDate.getTime()
                        let className = `calendar__day${today > currentDate ? " calendar__day_disabled" : ""}${pickedDaysArr.includes(dayId) ? " calendar__day_picked" : ""} `
                        return (
                            <div 
                                className={className}
                                key={dayId}
                                style={{
                                    marginLeft: element === 0 && (weekDayOfFirstDay === 0 ? `calc(6 * (100% / 7))` : `calc(${weekDayOfFirstDay - 1} * (100% / 7))`),
                                }}
                                onClick={(e) => handleClick(e, dayId) }
                            >
                                <span>{element + 1}</span>
                                {pickedDaysArr.includes(dayId) && <Hinter pathient={reserveList.find(pathient => pathient.dayId === dayId)} />}
                            </div>
                        )

                    })
                }
            </div>
        </div>
    )
}

export default Calendar