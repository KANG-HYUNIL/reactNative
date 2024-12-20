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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
    paddingBottom: 10,
    paddingTop: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 10,
  },
  circleButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleButtonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '60%',
  },
  squareButton: {
    width: 50,
    height: 50,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 2,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  calendarContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  calendarCell: {
    width: '14.28%', // 7 columns
    minHeight: 70,
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 5,
  },
  calendarText: {
    fontSize: 16,
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 5,
  },
  scheduleText: {
    fontSize: 12,
    textAlign: 'left',
    width: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayHeader: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  chatContainer: {
    width: '80%',
    height: '60%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatText: {
    fontSize: 16,
    color: 'gray',
  },
  inputContainer: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  iconButton: {
    marginLeft: 10,
  },
  overlayTouchable: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
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
    paddingHorizontal: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  //이 아래는 달력의 일자 클릭 시 나오는 스케줄 팝업 창의 스타일 코드들
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: wp(80),
    height: hp(60),
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  scheduleItem: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  scheduleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  scheduleTag: {
    fontSize: 14,
    color: 'gray',
  },
  scheduleDate: {
    fontSize: 14,
    color: 'gray',
  },
  scheduleNote: {
    fontSize: 14,
    color: 'gray',
  },
  gearIcon: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
});

export { logInStyle, SearchModal, ScheduleForm, RootForm, ScheduleEditForm };