import * as React from 'react';
import { View, Text, StyleSheet, Button, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // AsyncStorage import
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { logInStyle, SearchModal, ScheduleForm, RootForm, ScheduleEditForm} from '../styleSheets/styles';


export default function ScheduleEdit({ navigation }) {
    return (
      <View style={ScheduleEditForm.container}>

        <View style={ScheduleEditForm.header}>
          <TouchableOpacity onPress={() => navigation.navigate('Root')}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>

          <Text style={ScheduleEditForm.headerTitle}>스케줄 편집</Text>
          <TouchableOpacity onPress={() => { /* "+" 아이콘 클릭 시 동작할 로직 */ }}>
            <Ionicons name="add" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <View style={ScheduleEditForm.content}>
          <Text>스케줄 편집 화면</Text>
        </View>

      </View>
    );
  }
