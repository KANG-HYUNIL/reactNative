import * as React from 'react';
import { View, TouchableOpacity, Text, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { logInStyle, SearchModal, ScheduleForm, RootForm } from '../styleSheets/styles';
import CalendarView from './CalendarView';

export default function RootView({ navigation }) {
  const [schedules, setSchedules] = React.useState([]);
  const [userId, setUserId] = React.useState(null);
  const [isOverlayVisible, setIsOverlayVisible] = React.useState(false);

  // 로그인된 사용자의 데이터 가져오기
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData');
        if (userData !== null) {
          const user = JSON.parse(userData);
          setUserId(user.id);

          const scheduleData = await AsyncStorage.getItem(user.id);
          if (scheduleData !== null) {
            const data = JSON.parse(scheduleData);
            setSchedules(data.scheduleData || []); // 스케줄은 scheduleData라는 key로 저장
          } else {
            setSchedules([]);
          }
        }
      } catch (error) {
        console.error("Error fetching schedule data: ", error);
        setSchedules([]);
      }
    };

    fetchData();
  }, []); // useEffect

  // 로그아웃
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userData');
      navigation.navigate('Home');
    } catch (error) {
      alert("Logout error: " + error);
    }
  }; // handleLogout

  // 민기 민기 버튼 처리
  const handleOverlayToggle = () => {
    setIsOverlayVisible(!isOverlayVisible);
  }; // handleOverlayToggle

  // 렌더링 코드
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
      <CalendarView schedules={schedules} />
      <View style={RootForm.bottomContainer}>
        <View style={RootForm.buttonRow}>
          <TouchableOpacity style={RootForm.circleButton} onPress={() => navigation.navigate('EditSchedule')}>
            <Ionicons name="add" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={RootForm.circleButton} onPress={handleOverlayToggle}>
            {/* 민기 민기 */}
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
      {isOverlayVisible && (
        <View style={RootForm.overlay} pointerEvents="box-none">
          <View style={RootForm.overlayHeader}>
            <TouchableOpacity onPress={handleOverlayToggle}>
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { /* 메뉴 아이콘 클릭 시 동작할 로직 */ }}>
              <Ionicons name="menu" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View style={RootForm.chatContainer}>
            <Text style={RootForm.chatText}>채팅 기록이 없습니다.</Text>
          </View>
          <View style={RootForm.inputContainer}>
            <TextInput style={RootForm.textInput} placeholder="메세지를 입력하세요" />
            <TouchableOpacity style={RootForm.iconButton}>
              <Ionicons name="add" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={RootForm.iconButton}>
              <Ionicons name="send" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View style={RootForm.overlayTouchable} pointerEvents="auto" />
        </View>
      )}
    </View>
  );
}