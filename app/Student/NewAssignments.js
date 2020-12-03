import React, { Component } from 'react';
import {
    Button,
    FlatList,
    PermissionsAndroid,
    Platform,
    Linking,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Alert,
    ScrollView
} from "react-native";
import { StudentService } from "../services/StudentServices";
import AsyncStorage from "@react-native-community/async-storage";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default class NewAssignments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: [],
            pendingWork: [],
            file: '',
            course_ids: []
        };
    }

    user = {};
    componentDidMount() {
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
                                    this.setState({pendingWork: response})
                                    console.log(this.state.pendingWork)
                                }).catch(err => {
                                this.setState({pendingWork: undefined})

                            })

                    }

                })
            }).catch(error => {
                // console.log(error);
            this.setState({courses: null})
        })


        }


    async downloadFile(file) {
        console.log(file)
        //await WebBrowser.openBrowserAsync('http://www.africau.edu/images/default/sample.pdf');

    };


    render() {
        if(this.state.pendingWork === '' || this.state.pendingWork === undefined){
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
            <View  style={styles.container}>
                <ScrollView alwaysBounceVertical={true}>
                <View style={styles.theScroll}>
                    {this.state.pendingWork.map((pendingWork, i)=>
                    {
                        // if(pendingWork.assignmentname === 'Assignment1.pdf'){
                            return (
                                <View key={i} style={styles.assignments}>
                                    <View  style={{flex:1,width: wp('50%')}}>
                                        <Text style={{color:'white'}}>
                                            {pendingWork.assignmentname}
                                        </Text>
                                    </View>
                                    {/*<View  style={{flex:2,width: wp('50%')}}>*/}
                                    {/*    <PDFReader*/}
                                    {/*        source={{*/}
                                    {/*            uri: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',*/}
                                    {/*        }}*/}
                                    {/*    />*/}
                                    {/*</View>*/}
                                    <TouchableOpacity
                                        onPress={() => this.downloadFile(pendingWork.file)}>
                                        <View style={styles.loginButton} >
                                            <Text style={styles.loginButtonText}>Download</Text>
                                        </View>
                                    </TouchableOpacity>

                                </View>

                            )
                        // }

                    }

                    )
                    }
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
        // padding: 30,

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
    loginButtonText: {
        fontSize: hp('1.5%'),
        textAlign: 'center',
        color: '#12A3D5',

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