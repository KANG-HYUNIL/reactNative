import * as React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage'; // AsyncStorage import
import * as SecureStore from 'expo-secure-store'; 



export default function RootView({ navigation }) {

    const handleLogout = async () => {
        try {
          await AsyncStorage.removeItem('userData'); // userData 삭제
          //await SecureStore.deleteItemAsync('userData'); //암호화된 userData 삭제
          navigation.navigate('Home'); // Home 뷰로 이동
        } catch (error) {
          alert("Logout error: " + error);
        }
    }; //handleLogout


    return (
        <View style={styles.container}>
            <Text>Ya hoohoo</Text>
            <Button title="Logout" onPress={handleLogout} />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

});

