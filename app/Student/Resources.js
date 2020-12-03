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
  Modal,
  TouchableOpacity,
  TouchableHighlight,
  Platform,
  LayoutAnimation,
  DrawerLayoutAndroid,
  Animated,
  UIManager,
  FlatList,
  Linking,
  Alert,
} from "react-native";
import { StudentService } from "../services/StudentServices";
import AsyncStorage from "@react-native-community/async-storage";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import ShowResources from "./ShowResources";

class Resources extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topics: [],
      resources: [],

      course_ids: [],
      subResource: [],
      modalVisible: false,
      isPortrait: true,
    };
  }
  componentDidMount() {
    this.videoResources();
  }

  async videoResources() {
    const myArray = await AsyncStorage.getItem("userAll");
    this.user = JSON.parse(myArray);
    StudentService.get_all_courses(this.user.studentId).then((response) => {
      this.setState({ topics: response });
    });
  }

  render() {
    if (
      this.state.topics === "" ||
      this.state.topics === undefined ||
      this.state.topics === null
    ) {
      return (
        <View style={styles.container}>
          <View style={styles.theScroll}>
            <View style={styles.assignments}>
              <View style={{ width: wp("50%") }}>
                <Text style={{ color: "white", textAlign: "center" }}>
                  No Resources
                </Text>
              </View>
            </View>
          </View>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <ScrollView alwaysBounceVertical={true}>
          <View
            style={{
              margin: 10,
              borderRadius: 10,
              paddingLeft: 30,
              paddingTop: 5,
              paddingBottom: 5,
              backgroundColor: "#12A3D5",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-start",
              flexWrap: "wrap",
            }}
          >
            <View style={{ width: 200 }}>
              <Text style={{ color: "white", textAlign: "left", fontSize: 20 }}>
                Enrolled Classes
              </Text>
            </View>
          </View>

          {this.state.topics.map((course, i) => {
            return (
              <View key={i} style={styles.subDesc}>
                <View style={{ margin: 10, borderRadius: 10, padding: 10 }}>
                  <View
                    style={{
                      flex: 0,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      alignItems: "flex-start",
                    }}
                  >
                    <View style={{ width: 150 }}>
                      <Text style={{ color: "#fff" }}>{course.classname}</Text>
                    </View>
                    <View style={{ marginTop: 3, color: "black" }}>
                      <TouchableOpacity
                        onPress={() =>
                          this.props.navigation.navigate("ShowResources", {
                            courseId: course.classId,
                          })
                        }
                      >
                        <View style={styles.downloadButton}>
                          <Text style={styles.downloadButtonText}>View</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

export default Resources;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 20,
    marginLeft: 5,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 2,
    width: 400,
    height: 300,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: 100,
  },
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },

  text: {
    color: "#fff",
    paddingTop: 100,
    marginTop: 50,
  },
  loginButtonText: {
    fontSize: 13,
    textAlign: "center",
    color: "#12A3D5",
  },

  loginButton: {
    padding: 8,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 40,
    backgroundColor: "#fff",
    borderRadius: 10,
    width: 130,
    alignSelf: "center",
  },
  downloadButton: {
    padding: 8,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 0,
    backgroundColor: "#fff",
    borderRadius: 10,
    width: 130,
  },
  downloadButtonText: {
    fontSize: 13,
    textAlign: "center",
    color: "#12A3D5",
  },
  subDesc: {
    flex: 0,
    paddingTop: 5,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: hp("1%"),
    backgroundColor: "#12A3D5",
    color: "#fff",
    borderWidth: 0.5,
    borderRadius: 10,
    borderTopColor: "#12A3D5",
    borderLeftColor: "white",
    borderBottomColor: "#12A3D5",
    borderRightColor: "#12A3D5",
  },
  assignments: {
    margin: wp("3%"),
    borderRadius: wp("5%"),
    padding: wp("4%"),
    backgroundColor: "#12A3D5",
    color: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "white",
    borderBottomWidth: wp("1%"),
  },
});
