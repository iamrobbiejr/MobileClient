import React, {Component} from 'react';
import {
    // AppRegistry,
    StyleSheet,
    Text,
    View,
    // Dimensions,
    Image,
    ScrollView,
    // StatusBar,
    // Platform,
    // LayoutAnimation,
    // Animated,
    // UIManager,
    FlatList, Linking,
    TouchableOpacity, Modal, Alert, TouchableHighlight,


} from 'react-native';
import { WebView } from 'react-native-webview';
import { StreamService } from "../services/stream";
import AsyncStorage from '@react-native-community/async-storage';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

class VideoRoom extends Component {

    constructor(props) {
        super(props);
        this.state = {
            source: [],
            live: false,
            currentPageNumber: 1,
            meetings: [],
            meeting: { meetingname: "" },
            pages: [],
            refresh: 0,
            modalVisible: false,
            isPortrait: true,
        };

    }
    refresh = 0;
    async componentDidMount() {
        const myArray = await AsyncStorage.getItem("userAll");
        const user = JSON.parse(myArray)
        this.setState({user});
        this.get_meetings();
    }

    get_meetings = () => {
        StreamService.get_meetings()
            .then((response) => {
                const meetingz =
                    response === undefined ? [] : response.data.data.meetings;
                meetingz.sort((a, b) => new Date(b.date) - new Date(a.date));

                let pages = [];
                let perPage = 6;
                const totalPageCount = Math.ceil(meetingz.length / perPage);

                for (let i = 1; i <= totalPageCount; i++) {
                    pages.push(i);
                }

                const meetings = this.pageArraySplit(meetingz, {
                    currentPageNumber: this.state.currentPageNumber,
                    perPage,
                });
                this.setState({ pages, meetings });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    colors = (i) => {
        const colors = [
            "gradient-45deg-light-blue-cyan",
            "gradient-45deg-red-pink",
            "gradient-45deg-green-teal",
            "gradient-45deg-amber-amber",
            "red",
            "teal accent-4",
        ];

        return colors[i % 5];
    };
    pageArraySplit = (array, pagingOptions) => {
        const currentPageNumber = pagingOptions.currentPageNumber;
        const perPage = pagingOptions.perPage;
        const startingIndex = (currentPageNumber - 1) * perPage;
        const endingIndex = startingIndex + perPage;
        return array.slice(startingIndex, endingIndex);
    };
    handlePageClick = (pageNumber) => {
        this.setState({ currentPageNumber: parseInt(pageNumber) });
        this.get_meetings();
    };
    handlePrevClick = async (e) => {
        e.preventDefault();
        const pageNumber =
            this.state.currentPageNumber === this.state.pages.length ||
            this.state.pages.length < 1
                ? this.state.currentPageNumber
                : this.state.currentPageNumber - 1;
        this.setState({ currentPageNumber: pageNumber }, () => {
            this.gettingUsers();
        });
    };
    handleNextClick = async (e) => {
        e.preventDefault();
        const pageNumber =
            this.state.currentPageNumber === this.state.pages.length ||
            this.state.pages.length < 1
                ? this.state.currentPageNumber
                : this.state.currentPageNumber + 1;
        this.setState({ currentPageNumber: pageNumber }, () => {
            this.gettingUsers();
        });
    };


    onSelectOption = (selectedOption) => {
        this.setState({ selectedOption }, () =>
            console.log(this.state.selectedOption)
        );
    };

    download = async ( id) => {
        const token = await AsyncStorage.getItem('token');
        this.props.navigation.navigate('LiveVideo', {
          id,
          token,
        });
      };

    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    }
    render() {
        const { modalVisible } = this.state;
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
                  backgroundColor: '#12A3D5',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  flexWrap: 'wrap',
                }}>
                <View style={{width: 200}}>
                  <Text style={{color: 'white', textAlign: 'left', fontSize: 20}}>
                    Available Meetings
                  </Text>
                </View>
              </View>
              {this.state.meetings.map((meeting, i) => (
                <View key={i} style={styles.subDesc}>
                  <View style={{margin: 10, borderRadius: 10, padding: 10}}>
                    <View
                      style={{
                        flex: 0,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        alignItems: 'flex-start',
                      }}>
                      <View style={{width: 150}}>
                        <Text style={{color: 'black'}}>{meeting.meetingname}</Text>
                      </View>
                      <View style={{marginTop: 3, color: 'black'}}>
                        <TouchableOpacity
                          onPress={() => {
                            this.download(course.id);
                          }}>
                          <View style={styles.downloadButton}>
                            <Text style={styles.downloadButtonText}>Join</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>

        
        );
    }
}

export default VideoRoom;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 20,
        marginLeft: 5,


    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalView: {
        width: 300,
        height: 300,
        margin: 10,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 2,
        width: 400,
        height: 300
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        width: 100
    },
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },

    text: {
        color:'#000',
        paddingTop: 100,
        marginTop:50

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
        fontSize: 13,
        textAlign: 'center',
        color: '#12A3D5',

    },

    loginButton: {
        padding:8,
        marginTop:5,
        marginBottom:5,
        marginLeft: 40,
        backgroundColor: '#fff',
        borderRadius: 10,
        width: 130,
        alignSelf: 'center',

    },
    downloadButton: {
        padding:8,
        marginTop:5,
        marginBottom:5,
        marginLeft: 0,
        backgroundColor: '#12A3D5',
        borderRadius: 10,
        width: 130,

    },
    downloadButtonText: {
        fontSize: 13,
        textAlign: 'center',
        color: '#fff',

    },
    subDesc: {
        flex: 0,
        paddingTop: 5,
        marginLeft: 20,
        marginRight: 20,
        backgroundColor: '#fff',
        borderWidth: 0.5,
        borderRadius: 10,
        borderTopColor: '#12A3D5',
        borderLeftColor: 'white',
        borderBottomColor: '#12A3D5',
        borderRightColor: '#12A3D5'
    }
})