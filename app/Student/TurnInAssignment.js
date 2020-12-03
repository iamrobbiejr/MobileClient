import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Button,
    TextInput,
    TouchableOpacity, ToastAndroid, Alert, ScrollView
} from "react-native";
import { StudentService } from "../services/StudentServices";
import AsyncStorage from '@react-native-community/async-storage';
import DocumentPicker from 'react-native-document-picker';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";


export default class TurnInAssignment extends Component{

    constructor(props){
        super(props);
        this.state = {
            assignment: [],
            courses: [],
            submitFor: "",
        }
    }
    user = {};

    componentDidMount(){
       this.getDashData();
    }

    async getDashData() {
        const myArray = await AsyncStorage.getItem("userAll");
        this.user = JSON.parse(myArray);
        // console.log(this.user.studentId)
        StudentService.get_all_courses(this.user.studentId)
            .then((response) => {
                this.setState({courses: response})
                // console.log(this.state.courses)

                this.state.courses.map((c,j) =>{
                    if(c.status === 'active'){
                        this.setState({course_ids: c.classId})
                        console.log(c)
                        console.log(this.state.course_ids)
                        StudentService.get_student_all_classwork(this.state.course_ids)
                            .then((response) => {
                                this.setState({assignment: response})
                                console.log(this.state.assignment)
                            }).catch(err => {
                            this.setState({assignment: undefined})

                        })

                    }

                })
            }).catch(error => {
            // console.log(error);
            this.setState({courses: null})
        })


    }

    upload = async data => {

        const assigmentUploaded = this.state.submitFor;

        ToastAndroid.show(`Assignment ${assigmentUploaded.assignmentname} upload in progress`, ToastAndroid.SHORT);
        const myArray = await AsyncStorage.getItem("userAll");
        this.studentData = JSON.parse(myArray);

        const formData = {
            studentid: this.studentData.studentId,
            schoolid: this.studentData.schoolid,
            grade: this.studentData.gradeid,
            materialname: data,
            materialtype: "file",
            file: false,
            classid: assigmentUploaded.classid,
            assid: assigmentUploaded.assignmentId,
            teacherid: assigmentUploaded.teacherid,
        };
        console.log(formData);

        StudentService.submit_assignment(formData)
            .then((res) => {
                if (res.success){
                    console.log('Finished uploading');
                    Alert.alert(
                        'Assignment Uploaded Successfully',
                    )
                }
            })
            .catch(error => {
                console.error(error);
            });


    }



    onSelectDocument = async () => {
            let file = await DocumentPicker.pick({});
            if(file.type === 'cancel'){
                console.log( file );
                console.log('No upload');
                Alert.alert(
                    'Please select file',
                )
            }else{
                console.log( file );
                await this.upload(file);
            }
        };



    render() {

        if(this.state.assignment === null || this.state.assignment === undefined){
            return (
                <View  style={styles.container}>
                    <View style={styles.theScroll}>
                        <View style={styles.assignments}>
                            <View  style={{width: wp('50%')}}>
                                <Text style={{color:'white',textAlign: 'center'}}>
                                    No New Assignments
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            )
        }

        return (

            <View style={styles.container}>
                <ScrollView alwaysBounceVertical={true}>
                <View style={styles.theScroll}>
                    {this.state.assignment.map((assignment, i)=>
                    {

                            return (
                                <View key={i} style={styles.assignments}>
                                    <View  style={{width: wp('50%')}}>

                                        <Text style={{color:'white'}}>
                                            {assignment.assignmentname}
                                        </Text>
                                    </View>
                                    <View  style={{width: 10}}>
                                        <Text style={{color:'white'}}>
                                            {assignment.duedate}
                                        </Text>
                                    </View>
                                    <TouchableOpacity onPress={() => {
                                        this.setState({submitFor: assignment})
                                        this.onSelectDocument();
                                    }}>
                                        <View style={styles.loginButton} >
                                            <Text style={styles.loginButtonText}>Upload</Text>
                                        </View>

                                    </TouchableOpacity>
                                </View>

                            )


                    }
                    )}

                </View>
                </ScrollView>
            </View>
        )
    }

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: hp('1%'),
    },

    theScroll: {
        // padding: 20,
    },
    loginButtonText: {
        fontSize: hp('1.5%'),
        textAlign: 'center',
        color: '#12A3D5',

    },
    assignments:{
        margin: wp('3%'),
        borderRadius:wp('5%'),
        padding: wp('4%'),
        backgroundColor: '#12A3D5',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: 'white',
        borderBottomWidth: wp('1%'),
    },

    loginButton: {
        padding:hp('1%'),
        marginTop:hp('2%'),
        marginBottom: hp('0.5%'),
        backgroundColor: '#fff',
        borderRadius: wp('5%'),
        width: wp('30%'),
        alignSelf: 'center',

    },


})