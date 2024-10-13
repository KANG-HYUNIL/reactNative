import * as React from 'react';
import { View, Button, TouchableOpacity, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logInStyle } from "../styleSheets/styles";
import Icon from 'react-native-vector-icons/Ionicons';
import { useValidation } from '../hooks/useValidation';
import CustomInput from '../components/CustomInput';
import { showAlert } from '../utils/alertMessages';

export default function SignUpScreen({ navigation }) {
    const [userId, setId, idValidationStatus] = useValidation('', 'id');
    const [userPw, setPw, pwValidationStatus] = useValidation('', 'password');
    const [userPwCheck, setPwCheck, pwMatchStatus] = useValidation('', 'password');
    const [userName, setName] = React.useState('');
    const [userEmail, setEmail, emailValidationStatus] = useValidation('', 'email');
    const [verificationCode, setVerificationCode] = React.useState('');
    const [idCheckStatus, setIdCheckStatus] = React.useState(null);

    // 회원가입 요청
    const requestSignUp = async () => {

        const url = ""; // 서버 URL

        const req = {
            id: userId,
            pw: userPw,
            name: userName,
            email: userEmail,
            verificationCode: verificationCode
        };

        //비밀번호 일치 여부 확인
        if (pwMatchStatus !== "match") {
            showAlert("Error", "Passwords do not match");
            return;
        }

        //아이디 중복 확인 여부
        if (idCheckStatus !== "available") {
            showAlert("Error", "Please check the ID duplication");
            return;
        }

        //빈칸 확인
        if (!userName || !userEmail || !verificationCode) {
            showAlert("Error", "Name, email, and verification code cannot be empty");
            return;
        }

        //회원가입 요청 전송
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(req)
            });

            const jsonData = await response.json();

            if (jsonData.success) {
                await AsyncStorage.setItem('userData', JSON.stringify(req));
                navigation.navigate('Root');
            } else {
                alert("SignUp failed");
            }
        } catch (err) {
            alert("SignUp error: " + err);
        }
    };

    //아이디 중복 확인
    const checkIdDuplication = async () => {

        //아이디 형식 확인
        if (idValidationStatus !== "valid") {
            showAlert("Error", "ID does not meet the requirements");
            return;
        }

        const url = ""; // 서버 URL
        const req = { id: userId }; // 요청 데이터

        //아이디 중복 확인 요청 전송
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(req)
            });

            const jsonData = await response.json();

            if (jsonData.success) {
                setIdCheckStatus("available");
            } else if (jsonData.msg) {
                showAlert("ID check failed: " , jsonData.msg);
                setIdCheckStatus("unavailable");
            }

        }
        catch (err) {
            showAlert("ID check error: " , err);
        }

    };

    //인증번호 발송
    const sendVerificationCode = async () => {

        //이메일 형식 확인
        if (emailValidationStatus !== "valid") {
            showAlert("Error", "Invalid email address");
            return;
        }

        const url = ""; // 서버 URL
        const req = { email: userEmail }; // 요청 데이터

        //인증번호 발송 요청
        try {
            const response = await fetch(url, {
                method : "POST",
                headers : {
                    "Content-Type" : "application/json",
                },
                body : JSON.stringify(req)
                });

            const jsonData = await response.json();

            if (jsonData.success) {
                showAlert("Success", "Verification code sent");
            } 
            else if (jsonData.msg){
                showAlert("Verification code sending failed: " , jsonData.msg);
            }

        } catch (err) {
            showAlert("Verification code sending error: " , err);
        }

    };

    //뷰 렌더링
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
                <View style={logInStyle.inputRow}>
                    <CustomInput
                        placeholder="id"
                        value={userId}
                        onChangeText={(text) => {
                            setId(text);
                            setIdCheckStatus(null);
                        }}
                        validationStatus={idValidationStatus}
                        validationMessage={{ valid: "아이디 규칙 준수", invalid: "아이디 규칙 미준수" }}
                    />
                    <Button title="Check ID" onPress={checkIdDuplication} />
                </View>
                {idCheckStatus === "available" && <Text style={logInStyle.successText}>사용 가능한 아이디</Text>}
                {idCheckStatus === "unavailable" && <Text style={logInStyle.errorText}>존재하는 아이디</Text>}
                {idCheckStatus === null && <Text style={logInStyle.warningText}>아이디 중복 검증 필요</Text>}
                <CustomInput
                    placeholder="password"
                    value={userPw}
                    onChangeText={setPw}
                    validationStatus={pwValidationStatus}
                    validationMessage={{ valid: "비밀번호 규칙 준수", invalid: "비밀번호 규칙 미준수" }}
                />
                <Text style={logInStyle.infoText}>8자 이상 20자 이하, 영어 소문자, 영어 대문자, 숫자, 특수기호 중 3개 이상 포함</Text>
                <CustomInput
                    placeholder="password check"
                    value={userPwCheck}
                    onChangeText={setPwCheck}
                    validationStatus={pwMatchStatus}
                    validationMessage={{ valid: "", invalid: "2차 비밀번호 불일치" }}
                />
                <CustomInput
                    placeholder="name"
                    value={userName}
                    onChangeText={setName}
                />
                <View style={logInStyle.inputRow}>
                    <CustomInput
                        placeholder="email"
                        value={userEmail}
                        onChangeText={setEmail}
                        validationStatus={emailValidationStatus}
                        validationMessage={{ valid: "", invalid: "이메일 주소 형식 오류" }}
                    />
                    <Button title="인증 번호 발송" onPress={sendVerificationCode} />
                </View>
                <CustomInput
                    placeholder="verification code"
                    value={verificationCode}
                    onChangeText={setVerificationCode}
                />
                <View style={logInStyle.buttonContainer}>
                    <Button title="Sign Up" onPress={requestSignUp} />
                </View>
            </View>
        </View>
    );
}