import * as React from 'react';
import { View, Text, StyleSheet, Button, ScrollView, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // AsyncStorage import
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { logInStyle, SearchModal, ScheduleForm, RootForm } from '../styleSheets/styles';

const { width } = Dimensions.get('window');

export default function RootView({ navigation }) {
  const [schedules, setSchedules] = React.useState([]); // 스케줄 데이터
  const [currentIndex, setCurrentIndex] = React.useState(-1); // 현재 스케줄 인덱스, 기본값 -1
  const translateX = useSharedValue(0); // 스케줄 슬라이드 애니메이션

  // AsyncStorage에서 스케줄 데이터 가져오기
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const value = await AsyncStorage.getItem('scheduleData'); // AsyncStorage에서 scheduleData 가져오기
        if (value !== null) {
          const data = JSON.parse(value); // JSON 파싱
          
          // 날짜와 시간 순서대로 스케줄 정렬
          const sortedData = data.sort((a, b) => {
            if (a.date === b.date) {
              return a.time.localeCompare(b.time);
            }
            return a.date.localeCompare(b.date);
          });

          setSchedules(sortedData); // 정렬된 스케줄 데이터 설정

          // 오늘 날짜의 스케줄 찾기
          const today = new Date().toISOString().split('T')[0];
          const todayIndex = sortedData.findIndex(schedule => schedule.date === today);

          // 오늘 날짜의 스케줄이 있으면 currentIndex 설정, 없으면 -1 유지
          if (todayIndex !== -1) {
            setCurrentIndex(todayIndex);
          }
        }
      } catch (error) {
        console.error("Error fetching schedule data: ", error);
      }
    };

    fetchData();
  }, []); //useEffect

  // 날짜 슬라이드 제스처 처리
  const handleGesture = (event) => {
    if (event.nativeEvent.translationX < -50) {
      // 슬라이드 왼쪽
      if (currentIndex < schedules.length - 1) {
        if (currentIndex === -1) {
          // 오늘 날짜에서 가장 가까운 미래의 스케줄 찾기
          const futureIndex = schedules.findIndex(schedule => new Date(schedule.date) > new Date());
          if (futureIndex !== -1) {
            setCurrentIndex(futureIndex);
            translateX.value = withSpring(-width * futureIndex);
          }
        } else {
          setCurrentIndex(currentIndex + 1);
          translateX.value = withSpring(-width * (currentIndex + 1));
        }
      }
    } 

    else if (event.nativeEvent.translationX > 50) {
      // 슬라이드 오른쪽
      if (currentIndex > 0) {
        if (currentIndex === -1) {
          // 오늘 날짜에서 가장 가까운 과거의 스케줄 찾기
          const pastIndex = schedules.slice().reverse().findIndex(schedule => new Date(schedule.date) < new Date());
          if (pastIndex !== -1) {
            const actualIndex = schedules.length - 1 - pastIndex;
            setCurrentIndex(actualIndex);
            translateX.value = withSpring(-width * actualIndex);
          }
        } else {
          setCurrentIndex(currentIndex - 1);
          translateX.value = withSpring(-width * (currentIndex - 1));
        }
      }
    }
  };//handleGesture

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

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

  // 뷰 렌더링
  return (
    <View style={ScheduleForm.container}>
      <PanGestureHandler onGestureEvent={handleGesture}>
        <Animated.View style={[ScheduleForm.scheduleContainer, animatedStyle]}>
          {schedules.length > 0 ? (
            currentIndex === -1 ? (
              <Text style={ScheduleForm.noScheduleText}>오늘은 스케줄이 없음</Text>
            ) : (
              <ScrollView>
                {schedules[currentIndex].map((schedule, index) => (
                  <View key={index} style={ScheduleForm.scheduleItem}>
                    <Text style={ScheduleForm.scheduleTitle}>{schedule.title}</Text>
                    <Text style={ScheduleForm.scheduleTime}>{`${schedule.date} ${schedule.time}`}</Text>
                  </View>
                ))}
              </ScrollView>
            )
          ) : (
            <Text style={ScheduleForm.noScheduleText}>오늘은 스케줄이 없음</Text>
          )}
        </Animated.View>
      </PanGestureHandler>
      <View style={RootForm.buttonRow}>
        <Button title="Edit Schedule" onPress={() => navigation.navigate('EditSchedule')} />
        <Button title="Middle Button" onPress={() => {}} />
        <Button title="Logout" onPress={handleLogout} />
      </View>
    </View>
  );
}