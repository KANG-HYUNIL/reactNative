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


    const requestSignUp = async () => {
        const url = "";
        const req = {
            id: userId,
            pw: userPw,
            name: userName,
            email: userEmail,
            verificationCode: verificationCode
        };

        if (pwMatchStatus !== "match") {
            showAlert("Error", "Passwords do not match");
            return;
        }

        if (idCheckStatus !== "available") {
            showAlert("Error", "Please check the ID duplication");
            return;
        }

        if (!userName || !userEmail || !verificationCode) {
            showAlert("Error", "Name, email, and verification code cannot be empty");
            return;
        }

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(req)
            });

            const jsonData = await response.json();

            if (jsonData.result === "success") {
                await AsyncStorage.setItem('userData', JSON.stringify(req));
                navigation.navigate('Root');
            } else {
                alert("SignUp failed");
            }
        } catch (err) {
            alert("SignUp error: " + err);
        }
    };

    const checkIdDuplication = async () => {
        if (idValidationStatus !== "valid") {
            showAlert("Error", "ID does not meet the requirements");
            return;
        }

        if (userId === "test") {
            setIdCheckStatus("unavailable");
        } else {
            setIdCheckStatus("available");
        }
    };

    const sendVerificationCode = async () => {
        if (emailValidationStatus !== "valid") {
            showAlert("Error", "Invalid email address");
            return;
        }

        showAlert("Success", "Verification code sent");
    };

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