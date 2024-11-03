import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { ScheduleEditForm } from '../styleSheets/styles';

const TextInputField = ({ placeholder, value, onChangeText }) => {
  return (
    <TextInput
      style={ScheduleEditForm.input}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
    />
  );
};

export default TextInputField;