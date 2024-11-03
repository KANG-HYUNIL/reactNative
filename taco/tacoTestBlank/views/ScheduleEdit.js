import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { ScheduleEditForm } from '../styleSheets/styles';
import { v4 as uuidv4 } from 'uuid';
import TextInputField from './TextInputField';
import DateTimePickerField from './DateTimePickerField';

export default function ScheduleEdit({ navigation }) {
  const [title, setTitle] = React.useState('');
  const [tag, setTag] = React.useState('');
  const [startDate, setStartDate] = React.useState(null);
  const [startTime, setStartTime] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);
  const [endTime, setEndTime] = React.useState(null);
  const [note, setNote] = React.useState('');
  const [schedules, setSchedules] = React.useState([]);
  const [userId, setUserId] = React.useState(null);
  const [showStartDatePicker, setShowStartDatePicker] = React.useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = React.useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = React.useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = React.useState(false);

  //사용자 및 스케줄 데이터 가져오기
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData');
        if (userData !== null) {
          const user = JSON.parse(userData);
          setUserId(user.id);

          const scheduleData = await AsyncStorage.getItem(userId);
          if (scheduleData !== null) {
            const data = JSON.parse(scheduleData);
            setSchedules(data.scheduleData || []);
          }
        }
      } catch (error) {
        console.error("Error fetching schedule data: ", error);
      }
    };

    fetchData();
  }, []);

  //제출 버튼 메서드
  const handleSubmit = async () => {
    //제목 체크
    if (!title.trim()) {
      alert("제목을 입력해주세요.");
      return;
    }

    //날짜 체크
    if (!startDate && !endDate) {
      alert("시작 날짜와 종료 날짜 중 하나를 입력해주세요.");
      return;
    }

    //시간 유효성 체크
    if (startDate && endDate && endDate < startDate) {
      alert("종료 날짜는 시작 날짜보다 늦어야 합니다.");
      return;
    }

    //새로운 스케줄 object 생성
    const newSchedule = {
      id: uuidv4(),
      title,
      tag,
      startDate: startDate ? new Date(startDate.setHours(startTime.getHours(), startTime.getMinutes())).toISOString() : null,
      endDate: endDate ? new Date(endDate.setHours(endTime.getHours(), endTime.getMinutes())).toISOString() : null,
      note,
    };

    //스케줄 데이터 배열에 새 스케줄 데이터 추가
    const updatedSchedules = [...schedules, newSchedule];
    setSchedules(updatedSchedules);

    //asyncStorage에 저장 시도 코드
    //이 아래에 서버와의 통신 및 데이터 저장 요청 코드 추가 필요
    try {
      const userData = await AsyncStorage.getItem('userData');
      if (userData !== null) {
        const scheduleData = await AsyncStorage.getItem(userId);
        const data = scheduleData ? JSON.parse(scheduleData) : { scheduleData: [] };
        data.scheduleData.push(newSchedule);
        await AsyncStorage.setItem(userId, JSON.stringify(data));
        alert("스케줄이 추가되었습니다.");
        navigation.navigate('Root');
      }
    } catch (error) {
      console.error("Error saving schedule data: ", error);
    }
  }; //handleSubmit, 제출 버튼 메서드

  //렌더링 코드
  return (
    <View style={ScheduleEditForm.container}>
      <View style={ScheduleEditForm.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Root')}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={ScheduleEditForm.headerTitle}>스케줄 편집</Text>
        <TouchableOpacity onPress={handleSubmit}>
          <Ionicons name="checkmark" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View style={ScheduleEditForm.content}>
        <TextInputField
          placeholder="제목"
          value={title}
          onChangeText={setTitle}
        />

        <TextInputField
          placeholder="태그"
          value={tag}
          onChangeText={setTag}
        />

        <DateTimePickerField
          date={startDate}
          time={startTime}
          showDatePicker={showStartDatePicker}
          showTimePicker={showStartTimePicker}
          setShowDatePicker={setShowStartDatePicker}
          setShowTimePicker={setShowStartTimePicker}
          onDateChange={setStartDate}
          onTimeChange={setStartTime}
        />

        <DateTimePickerField
          date={endDate}
          time={endTime}
          showDatePicker={showEndDatePicker}
          showTimePicker={showEndTimePicker}
          setShowDatePicker={setShowEndDatePicker}
          setShowTimePicker={setShowEndTimePicker}
          onDateChange={setEndDate}
          onTimeChange={setEndTime}
        />

        <TextInputField
          placeholder="Note"
          value={note}
          onChangeText={setNote}
        />
      </View>
    </View>
  );
}