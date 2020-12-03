import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Platform,
  LayoutAnimation,
  Animated,
  UIManager,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  Linking,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Orientation from 'react-native-orientation-locker';
import AsyncStorage from '@react-native-community/async-storage';
import {AuthServices} from '../services/authServices';

export default class LogIn extends Component {
  static navigationOptions = {
    title: 'Welcome',
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      token: '',
    };
    this.SubmitLog = this.SubmitLog.bind(this);
  }

  componentDidMount() {
    Orientation.unlockAllOrientations();
    this._loadInitialState();
    // this.__clear().done();
  }

  _loadInitialState = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      if (value !== null) {
        this.props.navigation.navigate('Main');
      }
    } catch (e) {}
  };
  __clear = async () => {
    AsyncStorage.clear();
  };
  SubmitLog = () => {
    let studentData;
    const registerAdmin = {
      email: this.state.email,
      password: this.state.password,
    };
    const scheme = {email: this.state.email};

    AuthServices.login(registerAdmin).then((response) => {
      if (response === undefined) {
        alert('Login Failed');
      } else if (response.success === false) {
        alert(response.message);
      } else {
        //document.getElementById("contactForm").reset();
        let id;
        let schoolid;
        let gradeid;

        if (response.roleid === 3) {
          gradeid = response.User.gradeid;
          id = response.User.studentId;
          schoolid = response.User.schoolid;
          studentData = {
            gradeid: gradeid,
            schoolid: schoolid,
          };
          AsyncStorage.setItem('studentData', JSON.stringify(studentData));
          AsyncStorage.setItem('user', JSON.stringify(this.state));
          //const token = response.token;
          //AsyncStorage.setItem("token", JSON.stringify(token));
          const token = response.token;
          console.log(token);

          AsyncStorage.setItem('token', response.token);

          this.props.navigation.navigate('Main');
        } else if (response.roleid === 1) {
          id = response.User.teacherId;
          schoolid = response.User.schoolid;
        } else if (response.roleid === 5) {
          id = response.User.systemadminId;
          schoolid = 10;
        } else if (response.roleid === 4) {
          id = response.User.saId;
          schoolid = response.User.schoolid;
        } else {
          id = response.User.parentId;
          schoolid = response.User.schoolid;
        }

        const roleid = response.roleid;
        const username = response.User.firstname + ' ' + response.User.lastname;
        const userid = id;
        const userAll = response.User;

        AsyncStorage.setItem('userAll', JSON.stringify(userAll));
        this.setState({
          roleid: roleid,
          username: username,
          userid: userid,
          schoolid: schoolid,
          token: response.token,
        });
      }
    });
  };

  render() {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS == 'android' ? 'padding' : 'height'}
        style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <View style={styles.theScroll}>
              <View
                style={{
                  marginBottom: hp('10%'),
                  marginTop: hp('5%'),
                  alignSelf: 'center',
                }}>
                <Image
                  source={require('../../assets/app_splash.png')}
                  style={{width: wp('50%'), height: hp('15%')}}
                />
              </View>
              <View>
                <Text style={styles.headingText}>Welcome, Please Login!</Text>
              </View>

              <Text style={styles.loginText}>Enter Student Email</Text>
              <TextInput
                underlineColorAndroid="rgba(0,0,0,0)"
                autoCorrect={false}
                style={styles.loginInput}
                onChangeText={(email) => this.setState({email})}></TextInput>
              <Text style={styles.loginText}>Enter Password</Text>
              <TextInput
                underlineColorAndroid="rgba(0,0,0,0)"
                autoCorrect={false}
                secureTextEntry={true}
                style={styles.loginInput}
                onChangeText={(password) => {
                  this.setState({password});
                }}></TextInput>

              <TouchableOpacity onPress={this.SubmitLog.bind(this)}>
                <View style={styles.loginButton}>
                  <Text style={styles.loginButtonText}>Log In</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  Linking.openURL('https://pawacyberschool.net/#/register')
                }>
                <View style={styles.newUserText}>
                  <Text style={styles.newUserText}>To Register Click Here</Text>
                </View>
              </TouchableOpacity>
              <View style={{flex: 1}} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    // paddingTop: hp('1%')
    justifyContent: 'flex-end',
    // backgroundColor: '#fff',
  },
  inner: {
    // flex: 0,
  },
  animationContainer: {
    alignSelf: 'center',
    paddingTop: hp('3%'),
  },

  loginText: {
    fontSize: hp('2%'),
    marginTop: hp('1%'),
    color: '#12A3D5',
  },
  loginButtonText: {
    fontSize: hp('2%'),
    textAlign: 'center',
    color: '#fff',
  },
  newUserText: {
    fontSize: hp('1.5%'),
    marginTop: hp('1%'),
    color: '#12A3D5',
    textAlign: 'center',
  },

  loginButton: {
    padding: hp('1%'),
    marginTop: hp('2%'),
    marginBottom: hp('1%'),
    backgroundColor: '#12A3D5',
    borderRadius: hp('1.5%'),
    width: wp('50%'),
    alignSelf: 'center',
  },
  loginInput: {
    padding: hp('0.5%'),
    marginTop: hp('1%'),
    color: '#12A3D5',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: hp('1.5%'),
    borderColor: '#12A3D5',
    borderWidth: 1,

    height: hp('5%'),
  },

  theScroll: {
    paddingLeft: hp('3%'),
    paddingRight: hp('3%'),
    paddingBottom: hp('3%'),
  },
  headingText: {
    marginBottom: hp('3%'),
    marginRight: 5,
    fontSize: hp('3%'),
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#12A3D5',
    borderWidth: 1,
    borderColor: '#12A3D5',
    padding: hp('2%'),
    borderRadius: hp('1.5%'),
  },
});
