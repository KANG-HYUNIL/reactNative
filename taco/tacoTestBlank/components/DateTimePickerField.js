import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ScheduleEditForm } from '../styleSheets/styles';

const DateTimePickerField = ({
  date,
  time,
  showDatePicker,
  showTimePicker,
  setShowDatePicker,
  setShowTimePicker,
  onDateChange,
  onTimeChange,
}) => {
  return (
    <View style={ScheduleEditForm.dateTimeContainer}>
      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <Ionicons name="calendar" size={24} color="black" />
      </TouchableOpacity>
      {showDatePicker && (
        <DatePicker
          selected={date}
          onChange={(date) => {
            onDateChange(date);
            setShowDatePicker(false);
          }}
          dateFormat="yyyy/MM/dd"
          inline
        />
      )}
      <TextInput
        style={ScheduleEditForm.input}
        placeholder="날짜"
        value={date ? date.toLocaleDateString() : ''}
        editable={false}
      />

      <TouchableOpacity onPress={() => setShowTimePicker(true)}>
        <Ionicons name="time" size={24} color="black" />
      </TouchableOpacity>
      {showTimePicker && (
        <DatePicker
          selected={time}
          onChange={(time) => {
            onTimeChange(time);
            setShowTimePicker(false);
          }}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={1}
          timeCaption="Time"
          dateFormat="h:mm aa"
          inline
        />
      )}
      <TextInput
        style={ScheduleEditForm.input}
        placeholder="시간"
        value={time ? time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
        editable={false}
      />
    </View>
  );
};

export default DateTimePickerField;