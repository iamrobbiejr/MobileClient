import React, { useState, Component } from "react";
import {
  // AppRegistry,
  StyleSheet,
  Text,
  View,
    Button,
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Platform,
  LayoutAnimation,
    DrawerLayoutAndroid,
  Animated,
  UIManager,
  FlatList,
  ToastAndroid
  
} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import NewAssignments from "./NewAssignments";
import TurnedIn from "./TurnedIn";
import TurnInAssignment from "./TurnInAssignment";



 export default class Assignments extends Component {



        render(){

            const Tab = createMaterialTopTabNavigator();
        return(

            <Tab.Navigator>
                {/*<Tab.Screen name="New Assignments" component={NewAssignments} />*/}
                <Tab.Screen name="Turn In" component={TurnInAssignment} />
                <Tab.Screen name="Marked" component={TurnedIn}  />

            </Tab.Navigator>
        );
        }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        backgroundColor: "#ecf0f1",
        padding: 8
    },
    grade:{
        color: 'green',
        fontSize:16
    }
});

