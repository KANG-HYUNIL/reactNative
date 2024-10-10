import React from 'react';
import { View, TextInput, Text } from 'react-native';
import { logInStyle } from '../styleSheets/styles';

const CustomInput = ({ placeholder, value, onChangeText, validationStatus, validationMessage }) => {
    return (
        <View>
            <TextInput
                style={logInStyle.input}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
            />
            {validationStatus === "valid" && <Text style={logInStyle.successText}>{validationMessage.valid}</Text>}
            {validationStatus === "invalid" && <Text style={logInStyle.errorText}>{validationMessage.invalid}</Text>}
        </View>
    );
};

export default CustomInput;