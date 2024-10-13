import * as React from 'react';
import { View, Button, TouchableOpacity, Modal, Text } from 'react-native';
import { logInStyle, SearchModal } from '../styleSheets/styles';
import Icon from 'react-native-vector-icons/Ionicons';
import { useValidation } from '../hooks/useValidation';
import CustomInput from '../components/CustomInput';
import { showAlert } from '../utils/alertMessages';

export default function IdPwSearchScreen({ navigation }) {
    const [email, setEmail, emailValidationStatus] = useValidation('', 'email');
    const [verificationCode, setVerificationCode] = React.useState('');
    const [userId, setUserId] = React.useState('');
    const [pwEmail, setPwEmail, pwEmailValidationStatus] = useValidation('', 'email');
    const [pwVerificationCode, setPwVerificationCode] = React.useState('');
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const [isPwResetVisible, setIsPwResetVisible] = React.useState(false);
    const [searchResult, setSearchResult] = React.useState('');
    const [newPassword, setNewPassword, pwValidationStatus] = useValidation('', 'password');
    const [newPasswordCheck, setNewPasswordCheck, pwMatchStatus] = useValidation('', 'password');

    // ID 검색 결과 모달창
    const handleIdSearch = async () => {

        const url = ""; // 서버 URL
        const req = {email : email, verificationCode : verificationCode}; // 요청 데이터

        // 서버로 요청 전송
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(req)
            });

            const jsonData = await response.json(); // 응답 데이터 파싱

            if (jsonData.success) {
                setSearchResult("Your ID is: " + jsonData.id); // id 검색 결과 저장
                setIsModalVisible(true); // 모달창 열기
            } 
            else if (jsonData.msg){
                showAlert("Id Search failed: " , jsonData.msg);
            }

        } catch (err) {
            showAlert("Id Search error: " , err);
        }

        // setSearchResult("Your ID is: exampleID");
        // setIsModalVisible(true); // 모달창 열기
    }; //handleIdSearch

    // 비밀번호 검색 결과 모달창
    const handlePwSearch = async () => {

        const url = ""; // 서버 URL
        const req = {id : userId, email : pwEmail, verificationCode : pwVerificationCode}; // 요청 데이터

        // 서버로 요청 전송
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(req)
            });

            const jsonData = await response.json(); // 응답 데이터 파싱

            if (jsonData.success) {
                alert("Move to Pw reset page"); // 비밀번호 변경 페이지로 이동
                setIsPwResetVisible(true); // 비밀번호 변경 모달창 열기
            } 
            else if (jsonData.msg){
                showAlert("Pw Search failed: " , jsonData.msg);
            }

        } catch (err) {
            showAlert("Pw Search error: " , err);
        }


        //setIsPwResetVisible(true); // 비밀번호 변경 모달창 열기
    }; //handlePwSearch

    //아이디 확인 용 인증번호 요청
    const sendVerificationCodeId = async () => {

        // 이메일 형식 검증
        if (emailValidationStatus !== "valid") 
        {
            showAlert("Error", "Invalid email address");
            return;
        }

        const url = ""; // 서버 URL
        const req = {email : email}; // 요청 데이터

        // 서버로 요청 전송
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(req)
            });

            const jsonData = await response.json(); // 응답 데이터 파싱

            if (jsonData.success) {
                showAlert("Success", "Verification code sent");
            } 
            else if (jsonData.msg){
                showAlert("Verification code sending failed: " , jsonData.msg);
            }

        } catch (err) {
            showAlert("Verification code sending error: " , err);
        }

        showAlert("Success", "Verification code sent");
    }; //sendVerificationCodeId

    // 비밀번호 확인 용 인증번호 요청
    const sendVerificationCodePw = async () => {

        // 이메일 형식 검증
        if (!pwEmailValidationStatus !== "valid") 
        {
            showAlert("Error", "Invalid email address");
            return;
        }

        const url = ""; // 서버 URL
        const req = {id : userId, email : email}; // 요청 데이터

        // 서버로 요청 전송
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(req)
            });

            const jsonData = await response.json(); // 응답 데이터 파싱

            if (jsonData.success) {
                showAlert("Success", "Verification code sent");
            } 
            else if (jsonData.msg){
                showAlert("Verification code sending failed: " , jsonData.msg);
            }

        } catch (err) {
            showAlert("Verification code sending error: " , err);
        }

    }; //sendVerificationCodePw

    // 비밀번호 변경
    const handlePasswordReset = async () => {

        // 비밀번호 형식 확인
        if (pwValidationStatus !== "valid") 
        {
            showAlert("Error", "Invalid password");
            return;
        }

        // 비밀번호 일치 확인
        if (pwMatchStatus !== "valid")
        {
            showAlert("Error", "Passwords do not match");
            return;
        }

        const url = ""; // 서버 URL
        const req = {newPassword : newPassword, id : userId, email : pwEmail}; // 요청 데이터

        // 서버로 요청 전송
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(req)
            });

            const jsonData = await response.json(); // 응답 데이터 파싱

            if (jsonData.success) {
                showAlert("Success", "Password reset successful");
            } 
            else if (jsonData.msg){
                showAlert("Password reset error: " , jsonData.msg);
            }

        } catch (err) {
            showAlert("Password reset error: " , err);
        }

        showAlert("Success", "Password reset successful");
        setIsPwResetVisible(false); // 비밀번호 변경 모달창 닫기
    }; //handlePasswordReset

    //뷰 렌더링
    return (
        <View style={logInStyle.container}>
            <View style={logInStyle.topBanner}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <Icon name="home" size={30} color="#000" />
                </TouchableOpacity>
                <Text style={logInStyle.topBannerText}>
                    ID/PW Search
                </Text>
            </View>
            <View style={logInStyle.formContainer}>
                <Text style={logInStyle.infoText}>ID Search</Text>
                <CustomInput
                    placeholder="Enter your email"
                    value={email}
                    onChangeText={setEmail}
                    validationStatus={emailValidationStatus}
                    validationMessage={{ valid: "", invalid: "이메일 주소 형식 오류" }}
                />
                <Button title="Send Verification Code" onPress={sendVerificationCodeId} />
                <CustomInput
                    placeholder="Enter verification code"
                    value={verificationCode}
                    onChangeText={setVerificationCode}
                />
                <View style={logInStyle.buttonContainer}>
                    <Button title="Search ID" onPress={handleIdSearch} />
                </View>
            </View>
            <View style={logInStyle.formContainer}>
                <Text style={logInStyle.infoText}>PW Search</Text>
                <CustomInput
                    placeholder="Enter your ID"
                    value={userId}
                    onChangeText={setUserId}
                />
                <CustomInput
                    placeholder="Enter your email"
                    value={pwEmail}
                    onChangeText={setPwEmail}
                    validationStatus={pwEmailValidationStatus}
                    validationMessage={{ valid: "", invalid: "이메일 주소 형식 오류" }}
                />
                <Button title="Send Verification Code" onPress={sendVerificationCodePw} />
                <CustomInput
                    placeholder="Enter verification code"
                    value={pwVerificationCode}
                    onChangeText={setPwVerificationCode}
                />
                <View style={logInStyle.buttonContainer}>
                    <Button title="Search PW" onPress={handlePwSearch} />
                </View>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => {
                    setIsModalVisible(!isModalVisible);
                }}
            >
                <View style={SearchModal.modalContainer}>
                    <View style={SearchModal.modalView}>
                        <Text style={SearchModal.modalText}>{searchResult}</Text>
                        <TouchableOpacity
                            style={SearchModal.closeButton}
                            onPress={() => setIsModalVisible(!isModalVisible)}
                        >
                            <Icon name="close" size={30} color="#000" />
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={false}
                visible={isPwResetVisible}
                onRequestClose={() => {
                    setIsPwResetVisible(!isPwResetVisible);
                }}
            >
                <View style={logInStyle.container}>
                    <View style={logInStyle.topBanner}>
                        <TouchableOpacity onPress={() => setIsPwResetVisible(false)}>
                            <Icon name="close" size={30} color="#000" />
                        </TouchableOpacity>
                        <Text style={logInStyle.topBannerText}>
                            Reset Password
                        </Text>
                    </View>
                    <View style={logInStyle.formContainer}>
                        <CustomInput
                            placeholder="New Password"
                            value={newPassword}
                            onChangeText={setNewPassword}
                            validationStatus={pwValidationStatus}
                            validationMessage={{ valid: "비밀번호 규칙 준수", invalid: "비밀번호 규칙 미준수" }}
                        />
                        <Text style={logInStyle.infoText}>8자 이상 20자 이하, 영어 소문자, 영어 대문자, 숫자, 특수기호 중 3개 이상 포함</Text>
                        <CustomInput
                            placeholder="Confirm New Password"
                            value={newPasswordCheck}
                            onChangeText={setNewPasswordCheck}
                            validationStatus={pwMatchStatus}
                            validationMessage={{ valid: "", invalid: "2차 비밀번호 불일치" }}
                        />
                        <View style={logInStyle.buttonContainer}>
                            <Button title="Change Password" onPress={handlePasswordReset} />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}