import * as React from 'react';
import { View, Text } from 'react-native';
import { RootForm, ScheduleEditForm } from '../styleSheets/styles';

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
  const { year, month } = getTodayDate(); //오늘 날짜 가져오기
  const calendarData = generateCalendarData(year, month); //달력 생성
  const filteredSchedules = filterSchedulesForMonth(schedules, year, month); //해당 월에 맞는 스케줄 필터링
  const [scheduleMap, setScheduleMap] = React.useState({}); //스케줄 맵 설정
  const [selectedSchedules, setSelectedSchedules] = React.useState([]); //선택된 스케줄 설정
  const [isModalVisible, setIsModalVisible] = React.useState(false); //모달 상태 설정

  React.useEffect(() => {
    const map = {}; //맵 설정

    //스케줄 필터링
    filteredSchedules.forEach(schedule => {
      const startDate = schedule.startDate ? new Date(schedule.startDate) : null; //시작 날짜 설정
      const endDate = schedule.endDate ? new Date(schedule.endDate) : null; //종료 날짜 설정

      //시작 날짜가 있을 경우
      if (startDate) 
      {
        const key = startDate.toISOString().split('T')[0];
        if (!map[key]) 
        {
          map[key] = [];
        }
        map[key].push(schedule); //스케줄 추가
      } 
      //종료 날짜만 있으면
      else if (endDate) 
      {
        const key = endDate.toISOString().split('T')[0];
        if (!map[key]) 
        {
          map[key] = [];
        }
        map[key].push(schedule); //스케줄 추가
      }
    });
    setScheduleMap(map); //스케줄 맵 설정
  }, [filteredSchedules]); 

  //날짜 클릭 시 스케줄 목록 보여주기
  const handleDatePress = (schedulesForDate) => {

    //스케줄을 시간 순으로 정렬
    const sortedSchedules = schedulesForDate.sort((a, b) => {
      const startA = a.startDate ? new Date(a.startDate) : new Date(a.endDate);
      const startB = b.startDate ? new Date(b.startDate) : new Date(b.endDate);
      return startA - startB;
    });
    setSelectedSchedules(sortedSchedules);
    setIsModalVisible(true); //모달 상태 변경
  };

  //스케줄 Modal 닫기
  const closeModal = () => {
    setIsModalVisible(false); //모달 상태 변경
    setSelectedSchedules([]); //선택된 스케줄 초기화
  };

  //스케줄 별 설정 버튼 
  const handleGearPress = () => {

  };

  //달력 데이터가 없으면 null 반환
  if (!calendarData) {
    return null;
  }

  //렌더링 코드
  return (
    <View style={RootForm.calendarContainer}>
      {calendarData.map((date, index) => {
        const key = date ? date.toISOString().split('T')[0] : null;
        const schedulesForDate = key ? scheduleMap[key] || [] : [];

        return (
          <TouchableOpacity key={index} style={RootForm.calendarCell} onPress={() => handleDatePress(schedulesForDate)}>
            {date && (
              <>
                <Text style={RootForm.calendarText}>{date.getDate()}</Text>
                <View style={RootForm.separator} />
                {schedulesForDate.map((schedule, idx) => (
                  <Text key={idx} style={RootForm.scheduleText}>- {schedule.title}</Text>
                ))}
              </>
            )}
          </TouchableOpacity>
        );
      })}

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View style={ScheduleEditForm.modalContainer}>
          <View style={ScheduleEditForm.modalContent}>
            <TouchableOpacity style={ScheduleEditForm.closeButton} onPress={closeModal}>
              <Text style={ScheduleEditForm.closeButtonText}>X</Text>
            </TouchableOpacity>
            <Text style={ScheduleEditForm.modalTitle}>스케줄 목록</Text>
            <ScrollView>
              {selectedSchedules.map((schedule, idx) => (
                <View key={idx} style={ScheduleEditForm.scheduleItem}>
                  <TouchableOpacity style={ScheduleEditForm.gearIcon} onPress={handleGearPress}>
                    <Ionicons name="settings" size={20} color="black" />
                  </TouchableOpacity>
                  <Text style={ScheduleEditForm.scheduleTitle}>{schedule.title}</Text>
                  <Text style={ScheduleEditForm.scheduleTag}>{schedule.tag}</Text>
                  <Text style={ScheduleEditForm.scheduleDate}>시작: {schedule.startDate}</Text>
                  <Text style={ScheduleEditForm.scheduleDate}>종료: {schedule.endDate}</Text>
                  <Text style={ScheduleEditForm.scheduleNote}>{schedule.note}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}; //CalendarView

export default CalendarView;