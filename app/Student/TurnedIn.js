import React, { Component } from 'react'
import {Button, FlatList, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import { StudentService } from "../services/StudentServices";
import AsyncStorage from '@react-native-community/async-storage';
import axios from "axios";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";


const FormData = require('form-data');
const data = new FormData();

const config = {
    method: 'get',
    baseURL: 'https://cybers.azurewebsites.net/api/student',
    headers: {
        Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBhd2FzdHVkZW50QGN5YmVyc2Nob29sLmNvbSIsInJvbGVpZCI6MywidXNlcmlkIjoxMzUsImFjdGl2ZXN1YnNjcmlwdGlvbnMiOjAsImlhdCI6MTU5OTUyODcyMSwiZXhwIjoxNTk5NjU4MzIxfQ.ccsBSOvXRte6WswHTHyj8RnVh_Cdpe6prK5W1SlHg_c',
        Cookie: 'ARRAffinity=a80963775c4d94ae70d427fd076679c1358d55b680ff823849cd8313d0643baa',
        "Content-Type": "application/x-www-form-urlencoded",
        "Access-Control-Allow-Origin": "https://cybers.azurewebsites.net",
        "Access-Control-Allow-Credentials": true,
    },
    data: data
};

export default class TurnedIn extends Component {

    constructor(props) {
        super(props);
        this.state = {
            courses: [],
            markedWork: [],
        };
    }

    user = {};

    componentDidMount() {
        this.getDashData();
    }

    async getDashData() {
        const myArray = await AsyncStorage.getItem("userAll");
        this.user = JSON.parse(myArray);
        StudentService.get_student_marked_classwork(this.user.studentId)
            .then((response) => {
                console.log(response);
                this.setState({markedWork: response})

            }).catch(err =>{
                this.setState({markedWork: null})
        })
    }

    render()
    {

        if(this.state.markedWork === null || this.state.markedWork === undefined){
            return (
                <View  style={styles.container}>
                    <View style={styles.theScroll}>
                        <View style={styles.assignments}>
                            <View  style={{width: wp('50%')}}>
                                <Text style={{color:'white',textAlign: 'center'}}>
                                    No Marked Assignments
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            )
        }
        return  (
            <View  style={styles.container}>
                <ScrollView alwaysBounceVertical={true}>
                <View style={styles.theScroll}>
                    {this.state.markedWork.map((markedWork, i)=> (
                            <View key={i} style={styles.assignments}>
                                <View  style={{width: wp('80%')}}>
                                    <Text style={{color:'white'}}>
                                        {markedWork.assignmentname}
                                    </Text>
                                </View>
                                <View  style={{width: 10, color: 'white'}}>
                                    <Text>
                                        {markedWork.duedate}
                                    </Text>
                                </View>
                                <View  style={{width: 10, color: 'white'}}>
                                    <Text>
                                        {markedWork.score}
                                    </Text>
                                </View>

                            </View>
                        )
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
        padding:  hp('2%'),
        margin:  hp('2%'),
        borderRadius:  wp('5%'),
        backgroundColor: '#12A3D5'
    },
    loginButtonText: {
        fontSize: hp('1.5%'),
        textAlign: 'center',
        color: '#12A3D5',

    },
    assignments:{
        margin: wp('2%'),
        borderRadius:wp('5%'),
        padding: wp('2%'),
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
        backgroundColor: '#12A3D5',
        borderRadius: wp('5%'),
        width: wp('50%'),
        alignSelf: 'center',

    },


})