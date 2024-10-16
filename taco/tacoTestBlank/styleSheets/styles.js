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
      height: hp(10),
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: wp(5),
    },
    topBannerText: {
      fontSize: hp(3),
      fontWeight: 'bold',
      marginLeft: wp(2),
    },
    input: {
      width: '70%',
      height: hp(5),
      borderWidth: 1,
      borderColor: 'black',
      borderRadius: 5,
      paddingLeft: wp(2),
      marginTop: hp(2),
    },
    inputRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
    },
    formContainer: {
      width: wp('80%'),
      alignItems: 'center',
    },
    buttonContainer: {
      width: '50%',
      marginTop: hp('2%'),
    },
    successText: {
      color: 'green',
      marginTop: hp(1),
    },
    errorText: {
      color: 'red',
      marginTop: hp(1),
    },
    warningText: {
      color: 'orange',
      marginTop: hp(1),
    },
    infoText: {
      color: 'blue',
      marginTop: hp(1),
    },
  });

const SearchModal = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 18,
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
});

const ScheduleForm = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scheduleContainer: {
    width: wp(75),
    height: hp(60),
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  scheduleItem: {
    marginBottom: 15,
  },
  scheduleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  scheduleTime: {
    fontSize: 14,
    color: 'gray',
  },
  noScheduleText: {
    textAlign: 'center',
    fontSize: 18,
    color: 'gray',
  },
});


const RootForm = StyleSheet.create({
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    padding: 10,
  },
});

const ScheduleEditForm = StyleSheet.create({

  container: {
    flex: 1,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});


export { logInStyle, SearchModal, ScheduleForm, RootForm, ScheduleEditForm };