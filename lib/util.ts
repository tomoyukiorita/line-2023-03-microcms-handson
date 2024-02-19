export const fetchThisWeeks = () => {
  const today = new Date(); // 今日の日付を取得
  const threeDaysLater = new Date(today.getTime() + (3 * 24 * 60 * 60 * 1000)); // 3日後の日付を取得
  const dates = [];
  for (var i = 0; i < 7; i++) {
    const day = new Date(threeDaysLater.getTime() + (i * 24 * 60 * 60 * 1000)); // 3日後を基準に7日間の日付を生成
    const dayOfWeek = day.getDay(); // 曜日を取得 (日曜日=0, 月曜日=1, ..., 土曜日=6)
    if (dayOfWeek >= 1 && dayOfWeek <= 5) { // 月曜日から金曜日の場合
      dates.push(day);
    }
  }
  return dates;
}


export const isSameDate = (a, b) => {
  if(a.getFullYear() != b.getFullYear())return false;
  if(a.getMonth() != b.getMonth())return false;
  if(a.getDate() != b.getDate())return false;
  return true;
}

export const isWorkTime = (startTime, targetTime) => {
  if(targetTime < startTime.getHours())return false;
  if(startTime.getHours() + 8 < targetTime)return false;
  return true;
}

export const isIncludeWorkday = (workdays, workday, hour) => {
  const _isSameDate = workdays.some(v => isSameDate(v, workday))
  if(!_isSameDate) return false;
  const d = workdays.filter(v => isSameDate(v, workday))[0]
  const _isWorkTime = isWorkTime(d, hour)
  return _isWorkTime
}

export const getReservation = (reservations, workday, hour) => {
  const reservation = reservations.find((_reservation) => {
    const reservationAt = new Date(_reservation.reservationAt);
    if(!isSameDate(workday, reservationAt)) return false;
    if(reservationAt.getHours() !== hour)return false;
    return true;
  })
  return reservation
}

export const getPreviousReservations = (reservations) => {
  return reservations.filter((reservation) => {
    const a: number = new Date().getTime()
    const b: number = new Date(reservation.reservationAt).getTime();
    return a - b > 0;
  })
}

export const createReservationData = (date, staffId, profile) => {
  return {
    userName: profile.displayName,
    lineId: profile.userId,
    staff: staffId,
    course: 1,
    reservationAt: date,
    clientFreeForm: '',
    staffFreeForm: `${profile.displayName}様 ご予約ありがとうございます。当日よろしくお願い致します。`,
  }
}

export const dateToString = (dateString) => {
  return new Date(dateString).toLocaleString()
}
