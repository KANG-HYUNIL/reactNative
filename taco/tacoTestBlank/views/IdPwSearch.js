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
    // ID/PW 검색 결과 모달창
    const handleIdSearch = () => {
        setSearchResult("Your ID is: exampleID");
        setIsModalVisible(true);
    };

    // 비밀번호 검색 결과 모달창
    const handlePwSearch = () => {
        setIsPwResetVisible(true);
    };

    // 비밀번호 변경
    const sendVerificationCode = () => {
        showAlert("Success", "Verification code sent");
    };

    // 비밀번호 변경
    const handlePasswordReset = () => {
        showAlert("Success", "Password reset successful");
        setIsPwResetVisible(false);
    };

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
                <Button title="Send Verification Code" onPress={sendVerificationCode} />
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
                <Button title="Send Verification Code" onPress={sendVerificationCode} />
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