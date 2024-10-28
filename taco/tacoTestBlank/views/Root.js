import * as React from 'react';
import { View, Text, StyleSheet, Button, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // AsyncStorage import
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons'; // 아이콘 사용을 위한 라이브러리
import { logInStyle, SearchModal, ScheduleForm, RootForm } from '../styleSheets/styles';

const { width } = Dimensions.get('window');

export default function RootView({ navigation }) {
  const [schedules, setSchedules] = React.useState([]); // 스케줄 데이터

  // 오늘 날짜 가져오기
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  // 달력 데이터 생성
  const generateCalendar = (year, month) => {
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const calendar = [];

    // 첫 번째 주의 빈 칸 채우기
    for (let i = 0; i < firstDayOfMonth.getDay(); i++) {
      calendar.push(null);
    }

    // 해당 월의 날짜 채우기
    for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
      calendar.push(new Date(year, month, day));
    }

    // 마지막 주의 빈 칸 채우기
    const remainingDays = 7 - (calendar.length % 7);
    if (remainingDays < 7) {
      for (let i = 0; i < remainingDays; i++) {
        calendar.push(null);
      }
    }

    return calendar;
  };

  const calendarData = generateCalendar(year, month);

  // AsyncStorage에서 스케줄 데이터 가져오기
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const value = await AsyncStorage.getItem('scheduleData'); // AsyncStorage에서 scheduleData 가져오기
        if (value !== null) {
          const data = JSON.parse(value);
          setSchedules(data);
        } else {
          setSchedules([]); // 스케줄 데이터가 없을 경우 빈 배열로 설정
        }
      } catch (error) {
        console.error("Error fetching schedule data: ", error);
      }
    };

    fetchData();
  }, []); //useEffect

  // 스케줄 필터링
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
  };

  const filteredSchedules = filterSchedulesForMonth(schedules, year, month);

  // 로그아웃 처리
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userData'); // userData 삭제
      //await SecureStore.deleteItemAsync('userData'); //암호화된 userData 삭제
      navigation.navigate('Home'); // Home 뷰로 이동
    } catch (error) {
      alert("Logout error: " + error);
    }
  }; //handleLogout

  // 달력 렌더링
  const renderCalendar = (calendarData, filteredSchedules) => {
    if (!calendarData) {
      return null; // calendarData가 undefined일 경우 null 반환
    }

    const scheduleMap = {};

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
  };

  // 뷰 렌더링
  return (
    <View style={ScheduleForm.container}>
      <View style={RootForm.header}>
        <TouchableOpacity onPress={() => { /* 메뉴 아이콘 클릭 시 동작할 로직 */ }}>
          <Ionicons name="menu" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { /* 설정 아이콘 클릭 시 동작할 로직 */ }}>
          <Ionicons name="settings" size={24} color="black" />
        </TouchableOpacity>
      </View>
      {renderCalendar(calendarData, filteredSchedules)}
      <View style={RootForm.bottomContainer}>
        <View style={RootForm.buttonRow}>
          <TouchableOpacity style={RootForm.circleButton} onPress={() => navigation.navigate('EditSchedule')}>
            <Ionicons name="add" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={RootForm.circleButton} onPress={handleLogout}>
            {/* 빈 원 */}
          </TouchableOpacity>
        </View>
        <View style={RootForm.middleButtonRow}>
          <TouchableOpacity style={RootForm.squareButton}>
            <Text style={RootForm.buttonText}>3</Text>
          </TouchableOpacity>
          <TouchableOpacity style={RootForm.squareButton}>
            <Text style={RootForm.buttonText}>월</Text>
          </TouchableOpacity>
          <TouchableOpacity style={RootForm.squareButton}>
            <Text style={RootForm.buttonText}>7</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}