import React,  { useState } from 'react';

// import  {WebView}  from 'react-native-webview';
import {StyleSheet, View, Text,Button , TextInput, TouchableOpacity} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {Picker} from "@react-native-community/picker";


const SignUp = props => {
    let [first_name, setFirstName] = useState('');
    let [last_name, setLastName] = useState('');
    let [userEmail, setUserEmail] = useState('');
    let [password, setUserPassword] = useState('');
    let [confirm_password, setUserPass] = useState('');
    let [gender, setUserGender] = useState('Male');
    let [UserGrade, setUserGrade] = useState(1);
    let [SchoolCode, setSchoolCode] = useState('');
    let [UserDOB,setUserDOB] = useState('');
    let [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };


    const handleSubmitButton = () => {
        // setErrortext('');
        if (!first_name) {
            alert('Please fill First Name');
            return;
        }
        if (!last_name) {
            alert('Please fill Last Name');
            return;
        }
        if (!userEmail) {
            alert('Please fill Email');
            return;
        }
        if (!UserDOB) {
            alert('Please select date');
            return;
        }
        if (!UserGrade) {
            alert('Please fill Grade');
            return;
        }
        if (!gender) {
            alert('Please fill Gender');
            return;
        }
        if (!SchoolCode) {
            alert('Please fill SchoolCode');
            return;
        }
        if (!password) {
            alert('Please fill Password');
            return;
        }
        if (!confirm_password) {
            alert('Please confirm password');
            return;
        }
        if(password !== confirm_password){
            alert('Passwords not matching');
        }

    };

        //if registration succeeds
    if (isRegistraionSuccess) {
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: '#fff',
                    justifyContent: 'center',
                }}>
                {/*add image*/}
                <Text style={styles.successTextStyle}>Registration Successful.</Text>
                <TouchableOpacity
                    style={styles.loginButton}
                    activeOpacity={0.5}
                    onPress={() => props.navigation.navigate('LogIn')}>
                    <Text style={styles.loginButtonText}>Login Now</Text>
                </TouchableOpacity>
            </View>
        );
    }


        return (
            <View style={styles.container}>
                <View style={styles.theScroll}>
                    <Text style={styles.headerText}>Fill in your details</Text>

                    <View style={{flex: 0, flexDirection: 'row',justifyContent: 'space-between',}}>
                        <View  style={{width: 170}}>
                            <Text style={styles.loginText}>First Name</Text>
                            <TextInput
                                underlineColorAndroid='rgba(0,0,0,0)'
                                autoCorrect={false}
                                style={styles.loginInput}
                                onChangeText={first_name => setFirstName(first_name)}>
                            </TextInput>
                        </View>
                        <View style={{width: 170}}>
                            <Text style={styles.loginText}>Last Name</Text>
                            <TextInput
                                underlineColorAndroid='rgba(0,0,0,0)'
                                autoCorrect={false}
                                style={styles.loginInput}
                                onChangeText={last_name => setLastName(last_name)}>
                            </TextInput>
                        </View>

                    </View>

                    <View style={{flex: 0, flexDirection: 'row',justifyContent: 'space-between',}}>
                        <View  style={{width: 170}}>
                            <Text style={styles.loginText}>Gender</Text>
                            <Picker
                                selectedValue ={gender}
                                onValueChange = {(itemValue,itemIndex) => setUserGender(itemValue)}

                            >
                                <Picker.Item label="Male" value="male"/>
                                <Picker.Item label="Female" value="female"/>
                                <Picker.Item label="Other" value="other"/>
                            </Picker>
                        </View>
                        <View  style={{width: 170,marginTop:35}}>
                            <Button title="Select Date" onPress={showDatePicker} />
                            <DateTimePickerModal
                                isVisible={isDatePickerVisible}
                                mode="date"
                                onConfirm={UserDOB => setUserDOB(UserDOB)}
                                onCancel={hideDatePicker}
                            />
                        </View>
                    </View>




                    <View style={{flex: 0, flexDirection: 'row',justifyContent: 'space-between'}}>

                        <View style={{width: 200}}>
                            <Text style={styles.loginText}>School Code</Text>
                            <TextInput
                                underlineColorAndroid='rgba(0,0,0,0)'
                                autoCorrect={false}
                                style={styles.loginInput}
                                onChangeText={SchoolCode => setSchoolCode(SchoolCode)}
                            >
                            </TextInput>
                        </View>
                        <View style={{width: 130}}>
                            <Text style={styles.loginText}>Grade</Text>
                            <Picker
                                selectedValue ={UserGrade}
                                onValueChange = {(itemValue,itemIndex) => setUserGrade(itemValue)}

                            >
                                <Picker.Item label="1" value="1"/>
                                <Picker.Item label="2" value="2"/>
                                <Picker.Item label="3" value="3"/>
                                <Picker.Item label="4" value="4"/>
                                <Picker.Item label="5" value="5"/>
                                <Picker.Item label="6" value="6"/>
                                <Picker.Item label="7" value="7"/>
                                <Picker.Item label="8" value="8"/>
                                <Picker.Item label="9" value="9"/>
                                <Picker.Item label="10" value="10"/>
                                <Picker.Item label="11" value="11"/>
                                <Picker.Item label="12" value="12"/>
                            </Picker>
                        </View>
                    </View>

                    <View>
                        <Text style={styles.loginText}>Student Email</Text>
                        <TextInput
                            underlineColorAndroid='rgba(0,0,0,0)'
                            autoCorrect={false}
                            style={styles.loginInput}
                            onChangeText={UserEmail => setUserEmail(UserEmail)}
                        >
                        </TextInput>
                    </View>

                    <Text style={styles.loginText}>Enter Password</Text>
                    <TextInput
                        underlineColorAndroid='rgba(0,0,0,0)'
                        autoCorrect={false}
                        secureTextEntry={true}
                        style={styles.loginInput}
                        onChangeText={password => setUserPassword(password)}>
                    </TextInput>
                    <Text style={styles.loginText}>Confirm Password</Text>
                    <TextInput
                        underlineColorAndroid='rgba(0,0,0,0)'
                        autoCorrect={false}
                        secureTextEntry={true}
                        style={styles.loginInput}
                        onChangeText={confirm_password => setUserPass(confirm_password)}>
                    </TextInput>

                    <TouchableOpacity onPress={handleSubmitButton}>
                        <View style={styles.loginButton} >
                            <Text style={styles.loginButtonText}>Activate Account</Text>
                        </View>

                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
                            <Text style={styles.alreadyLoginText}>Already have an account? Login</Text>
                    </TouchableOpacity>


                </View>
            </View>
        )


}
export default SignUp;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',

    },
    animationContainer: {
        alignSelf: 'center',
        paddingTop:25,
    },
    alreadyLoginText:{
        fontSize: 15,
        marginTop: 10,
        color: '#12A3D5',
        textAlign: 'center',
    },

    loginText: {
        fontSize: 13,
        marginTop: 10,
        color: '#12A3D5',

    },
    headerText: {
        fontSize: 20,
        marginTop: 8,
        marginBottom: 8,
        color: '#000',

    },
    successTextStyle: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
        padding: 30,
    },
    loginButtonText: {
        fontSize: 13,
        textAlign: 'center',
        color: '#212121',

    },

    loginButton: {
        padding:10,
        marginTop:25,
        marginBottom:10,
        backgroundColor: '#12A3D5',
        borderRadius: 10,
        width: 200,
        alignSelf: 'center',

    },
    loginInput: {
        padding:5,
        marginTop: 10,
        color: '#000',
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: 5.5,
        borderColor: '#12A3D5',
        borderWidth: 1,

        height: 40,
    },

    theScroll: {
        padding: 30,
    },
});