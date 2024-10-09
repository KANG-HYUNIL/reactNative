import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const logInStyle = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
    },
    topBanner: {
      width: wp(100),
      height: hp(20),
      flexDirection: 'row', // 추가: 가로 정렬
      alignItems: 'center', // 추가: 세로 가운데 정렬
      paddingLeft: wp(5),
    },
    topBannerText: {
      fontSize: hp(3),
      fontWeight: 'bold',
      marginLeft: wp(2), // 추가: 아이콘과 텍스트 사이의 간격
    },
    input: {
      width: '100%',
      height: hp(5),
      borderWidth: 1,
      borderColor: 'black',
      borderRadius: 5,
      paddingLeft: wp(2),
      marginTop: hp(2),
    },
    formContainer: {
      width: wp('80%'),
      alignItems: 'center',
    },
    buttonContainer: {
      width: '50%',
      marginTop: hp('2%'),
    },
  });
  
  export default logInStyle;

