import * as React from 'react';
import { View, Text } from 'react-native';
import { RootForm } from '../styleSheets/styles';

//오늘 날짜 가져오기
const getTodayDate = () => {
  const today = new Date();
  return { year: today.getFullYear(), month: today.getMonth() };
}; //getTodayDate

//달력 생성하기
const generateCalendarData = (year, month) => {
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const calendar = [];

  for (let i = 0; i < firstDayOfMonth.getDay(); i++) {
    calendar.push(null);
  }

  for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
    calendar.push(new Date(year, month, day));
  }

  const remainingDays = 7 - (calendar.length % 7);
  if (remainingDays < 7) {
    for (let i = 0; i < remainingDays; i++) {
      calendar.push(null);
    }
  }

  return calendar;
}; //generateCalendarData

//해당 월에 맞는 스케줄 필터링
const filterSchedulesForMonth = (schedules, year, month) => {
  return schedules.filter(schedule => {
    const startDate = schedule.startDate ? new Date(schedule.startDate) : null;
    const endDate = schedule.endDate ? new Date(schedule.endDate) : null;

    if (startDate && startDate.getFullYear() === year && startDate.getMonth() === month) {
      return true;
    }

    if (endDate && endDate.getFullYear() === year && endDate.getMonth() === month) {
      return true;
    }

    return false;
  });
}; //filterSchedulesForMonth

//달력 렌더링 코드 
const CalendarView = ({ schedules }) => {
  const { year, month } = getTodayDate();
  const calendarData = generateCalendarData(year, month);
  const filteredSchedules = filterSchedulesForMonth(schedules, year, month);

  if (!calendarData) {
    return null;
  }

  const scheduleMap = {};

  //달력에 스케줄 삽입
  filteredSchedules.forEach(schedule => {
    const startDate = schedule.startDate ? new Date(schedule.startDate) : null;
    const endDate = schedule.endDate ? new Date(schedule.endDate) : null;

    if (startDate) {
      const key = startDate.toISOString().split('T')[0];
      if (!scheduleMap[key]) {
        scheduleMap[key] = [];
      }
      scheduleMap[key].push(schedule);
    } else if (endDate) {
      const key = endDate.toISOString().split('T')[0];
      if (!scheduleMap[key]) {
        scheduleMap[key] = [];
      }
      scheduleMap[key].push(schedule);
    }
  });

  //렌더링 코드
  return (
    <View style={RootForm.calendarContainer}>
      {calendarData.map((date, index) => {
        const key = date ? date.toISOString().split('T')[0] : null;
        const schedulesForDate = key ? scheduleMap[key] || [] : [];

        return (
          <View key={index} style={RootForm.calendarCell}>
            {date && (
              <>
                <Text style={RootForm.calendarText}>{date.getDate()}</Text>
                <View style={RootForm.separator} />
                {schedulesForDate.map((schedule, idx) => (
                  <Text key={idx} style={RootForm.scheduleText}>- {schedule.title}</Text>
                ))}
              </>
            )}
          </View>
        );
      })}
    </View>
  );
}; //CalendarView

export default CalendarView;