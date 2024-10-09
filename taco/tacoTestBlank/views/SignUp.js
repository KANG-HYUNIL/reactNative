import * as React from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // AsyncStorage import
import * as SecureStore from 'expo-secure-store'; 
import logInStyle from "../styleSheets/styles";
import Icon from 'react-native-vector-icons/Ionicons';


export default function SignUpScreen({ navigation }) {
  
    const [userId, setId] = React.useState(''); //사용자 id를 저장하는 변수
    const [userPw, setPw] = React.useState(''); //사용자 pw를 저장하는 변수
    const [userPwCheck, setPwCheck] = React.useState(''); //사용자 pw를 저장하는 변수

    const requestSignUp = async () => {
        const url = ""; //서버 url
        const req = {
            id : userId,
            pw : userPw
        } //요청 body

        if (userPw !== userPwCheck) {
            Alert.alert("Error", "Passwords do not match");
            return;
        }



        try {
            const response = await fetch(url, {
                method : "POST",
                headers : {
                    "Content-Type" : "application/json",
                },
                body: JSON.stringify(req)
            });

            const jsonData = await response.json();

            if (jsonData.result === "success") {
                await AsyncStorage.setItem('userData', JSON.stringify(req)); // 로그인 성공 시 userData 저장
                // await SecureStore.setItemAsync("userData", JSON.stringify(req)); // 로그인 성공 시 userData 저장 (모바일용)
                navigation.navigate('Root')
            } else {
                alert("SignUp failed");
            }
        }
        catch(err) {
            alert("SignUp error: " + err);
        }
    };//requestSignUp



    return (
        <View style={logInStyle.container}>
            <View style={logInStyle.topBanner}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <Icon name="home" size={30} color="#000" />
                </TouchableOpacity>
                <Text style={logInStyle.topBannerText}>
                    Sign Up
                </Text>
            </View>
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
                <TextInput 
                    style={logInStyle.input} 
                    placeholder="password check" 
                    secureTextEntry={true} 
                    value={userPwCheck}
                    onChangeText={(text) => setPwCheck(text)}
                />
                <View style={logInStyle.buttonContainer}>
                    <Button title="Sign Up" onPress={() => requestSignUp()} />
                </View>
            </View>
      </View>
  );
}


