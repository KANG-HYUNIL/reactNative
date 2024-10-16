import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View, BackHandler, Alert } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage'; // AsyncStorage import
import * as SecureStore from 'expo-secure-store'; //암호화된 데이터 저장을 위한 라이브러리
import SignUpScreen from "./views/SignUp";
import RootView from "./views/Root";
import IdPwSearchScreen from "./views/IdPwSearch"; // ID/PW Search 뷰 import
import ScheduleEdit from './views/ScheduleEdit';
import {logInStyle} from './styleSheets/styles';
import ErrorBoundary from './ErrorBoundary';

//stack navigator 생성
const Stack = createStackNavigator();

//초기 Home 화면을 정의하는 component
function HomeScreen({ navigation }) {
  const [isReady, setIsReady] = React.useState(false); //네트워크 상태를 저장하는 변수
  const [userId, setId] = React.useState(''); //사용자 id를 저장하는 변수
  const [userPw, setPw] = React.useState(''); //사용자 pw를 저장하는 변수

  React.useEffect(() => {
    const url = "http://localhost:3000/test";

    //네트워크 상태 확인 함수
    const checkNetworkStatus = async () => {
      try {
        const response = await fetch(url); //서버로 응답 받기
        const jsonData = await response.json(); //받은 응답 json 파싱
        
        //받은 응답의 json에 따라 isReady 값 설정,
        if (jsonData.length > 0) {
          setIsReady(true);
        } else {
          setIsReady(false);
        }
      } catch (error) {
        setIsReady(false);
      }
    }; //checkNetworkStatus

    checkNetworkStatus(); //네트워크 상태 확인
  }, []);

  
  //로그인 요청 전달 및 응답 처리 함수
  const requestLogin = async () => {

    // 입력값 검증
    const specialCharPattern = /[!@#$%^&*(),.?":{}|<>]/g;

    if (!userId.trim() || !userPw.trim()) {
      alert("ID와 비밀번호를 모두 입력해주세요.");
      return;
    }

    if (specialCharPattern.test(userId)) {
      alert("ID에 특수문자를 포함할 수 없습니다.");
      return;
    }


    const url = "http://localhost:3000/login"; //서버 url
    const req = {
      id : userId,
      pw : userPw
    } //요청 body

    try{
      const response = await fetch(url, {
        method: "POST", //rest api 요청
        headers : { //보낼 데이터에 대한 정보
            "Content-Type" : "application/json",
        }, 
        body: JSON.stringify(req) //req를 JSON 타입화 변경
      });

      const jsonData = await response.json(); //받은 응답 json 파싱
      if(jsonData.success)
      {
        await AsyncStorage.setItem('userData', JSON.stringify(req)); // 로그인 성공 시 userData 저장
        // await SecureStore.setItemAsync("userData", JSON.stringify(req)); // 로그인 성공 시 userData 저장 (모바일용)
        navigation.navigate('Root')
      }
      else {
        alert("Login failed" + jsonData.msg);
      }

    }
    catch(error){
      alert("Login error" + error);
    }

  };//requestLogin

  //Home 화면의 UI 코드
  return (
    <View style={logInStyle.container}>
      <View style={logInStyle.topBanner}>
        <Text style={logInStyle.topBannerText}>
          {isReady ? "Welcome to LogIn" : "Network error"}
        </Text>
      </View>
      {isReady && (
        <View style={logInStyle.formContainer}>
          <TextInput 
            style={logInStyle.input} 
            placeholder="id" 
            value={userId}
            onChangeText={(text) => setId(text)}
          />
          <TextInput 
            style={logInStyle.input} 
            placeholder="password" 
            secureTextEntry={true} 
            value={userPw}
            onChangeText={(text) => setPw(text)}
          />
          <View style={logInStyle.buttonContainer}>
            <Button title="LogIn" onPress={() => requestLogin()} />
          </View>
          <View style={logInStyle.buttonContainer}>
            <Button title="Sign up" onPress={() => navigation.navigate('SignUp')} />
          </View>
          <View style={logInStyle.buttonContainer}>
            <Button title="ID/PW Search" onPress={() => navigation.navigate('IdPwSearch')} />
          </View>
        </View>
      )}
      <StatusBar style="auto" />
    </View>
  );
}//HomeScreen

export default function App() {

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [initialRoute, setInitialRoute] = React.useState('Home');
  const [isLoading, setIsLoading] = React.useState(true); // 로딩 상태 추가

  // 상태 업데이트를 위한 별도의 함수
  const updateState = (loggedIn, route) => {
    setIsLoggedIn(loggedIn);
    setInitialRoute(route);
    setIsLoading(false); // 로딩 완료
    console.log('isLoggedIn:', loggedIn);
    console.log('initialRoute:', route);
  };

  //component 생성 시 실행되는 함수, 앱의 로그인 여부 확인
  React.useEffect(() => {
    const checkLogin = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData'); // 저장된 userData 가져오기
        // const userData = await SecureStore.getItemAsync('userData'); // 저장된 userData 가져오기 (모바일용)
        console.log('userData:', userData);
        
        if (userData !== null) {
          updateState(true, 'Root');
        } else {
          setIsLoading(false); // 로그인 정보가 없을 때도 로딩 완료
        }
      } catch (err) {
        alert("Login check error" + err);
        setIsLoading(false); // 에러 발생 시 로딩 완료
      }
    };

    checkLogin();
  }, []);

  //component 생성 시 실행되는 함수, 디바이스 자체 뒤로 가기 버튼 동작 막기
  React.useEffect(() => {
    const backAction = () => {
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    //return () => backHandler.remove(); //component가 사라질 때 backHandler 제거
  }, []);

  React.useEffect(() => {
    console.log('isLoggedIn state updated:', isLoggedIn);
    console.log('initialRoute state updated:', initialRoute);
  }, [isLoggedIn, initialRoute]);

  if (isLoading) {
    return (
      <View style={logInStyle.container}>
        <Text>Loading...</Text>
      </View>
    ); // 로딩 중일 때 표시할 화면
  }

  return(
    //다른 view를 불러오기 위해서는 Navigation 활용 필요, 모든 view는 NavigationContainer 안에 있어야 함
    <ErrorBoundary>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={initialRoute}>
          <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="SignUp" 
            component={SignUpScreen} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name='Root' 
            component={RootView} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name='IdPwSearch' 
            component={IdPwSearchScreen} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name='EditSchedule' 
            component={ScheduleEdit} 
            options={{ headerShown: false }} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ErrorBoundary>
  
  );
}