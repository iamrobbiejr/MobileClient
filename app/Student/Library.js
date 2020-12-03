import React, {useState, Component} from 'react';
import {
  // AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {StudentService} from '../services/StudentServices';
import AsyncStorage from '@react-native-community/async-storage';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

class Library extends Component {
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
    this.getContent();
  }

  getContent() {
    StudentService.get_course_downloadables(this.props.courseId).then(
      (response) => {
        const content = [];
        const corruptContent = [];
        for (const material of response) {
          if (!material.file.includes('materials')) {
            corruptContent.push(material);
          } else {
            if (material.file.includes('video')) {
              material.obj = 'Videos';
              content.push(material);
            } else {
              if (material.obj === 'undefined' || material.obj === 'No Tag') {
                material.obj = 'Textbook';
                content.push(material);
              } else {
                content.push(material);
              }
            }
          }
        }

        const allResources = content.filter((resource) =>
          resource.obj.includes('Textbook'),
        );
        allResources.sort((a, b) =>
          a.materialname.localeCompare(b.materialname),
        );

        // let pages = [];
        // let perPage = 9;
        // const totalPageCount = Math.ceil(allResources.length / perPage);

        // for (var i = 1; i <= totalPageCount; i++) {
        //   pages.push(i);
        // }

        // const resources = this.pageArraySplit(allResources, {
        //   currentPageNumber: this.state.currentPageNumber,
        //   perPage,
        // });
        this.setState({resources: allResources});
      },
    );
  }

  pageArraySplit = (array, pagingOptions) => {
    const currentPageNumber = pagingOptions.currentPageNumber;
    const perPage = pagingOptions.perPage;
    const startingIndex = (currentPageNumber - 1) * perPage;
    const endingIndex = startingIndex + perPage;
    return array.slice(startingIndex, endingIndex);
  };

  handlePageClick = async (pageNumber) => {
    this.setState({currentPageNumber: parseInt(pageNumber)}, () => {
      this.getContent();
    });
  };

  handlePrevClick = async (e) => {
    e.preventDefault();
    const pageNumber =
      this.state.currentPageNumber === this.state.pages.length ||
      this.state.pages.length < 1
        ? this.state.currentPageNumber
        : this.state.currentPageNumber - 1;
    this.setState({currentPageNumber: pageNumber}, () => {
      this.getContent();
    });
  };

  handleNextClick = async (e) => {
    e.preventDefault();
    const pageNumber =
      this.state.currentPageNumber === this.state.pages.length ||
      this.state.pages.length < 1
        ? this.state.currentPageNumber
        : this.state.currentPageNumber + 1;
    this.setState({currentPageNumber: pageNumber}, () => {
      this.getContent();
    });
  };

  download = async (file) => {
    const token = await AsyncStorage.getItem('token');
    this.props.navigation.navigate('PDF_Viewer', {
      file,
      token,
    });
  };

  stream = async (file) => {
    const value = await AsyncStorage.getItem('token');

    var url = file.split(','),
      a = url[0],
      b = url[1],
      c = url[2],
      d = url[3];

    const pdf_url = a + '/' + b + '/' + c + '/' + d;
    this.props.navigation.navigate('PDF_Viewer', {
      uri: this.state.url + pdf_url,
      headers: {
        Authorization: value,
      },
    });
  };
  render() {
    // if (this.state.resources === "" || this.state.resources === undefined || this.state.resources === null) {
    //     return (
    //         <View  style={styles.container}>
    //             <View style={styles.theScroll}>
    //                 <View style={styles.assignments}>
    //                     <View  style={{width: wp('50%')}}>
    //                         <Text style={{color:'white',textAlign: 'center'}}>
    //                             No Resources
    //                         </Text>
    //                     </View>
    //                 </View>
    //             </View>
    //         </View>
    //     )
    // }

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
                Textbooks
              </Text>
            </View>
          </View>

          {this.state.resources.map((resource, i) => (
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
                    <Text style={{color: 'black'}}>
                      {resource.materialname}
                    </Text>
                  </View>
                  <View style={{marginTop: 3, color: 'black'}}>
                    <TouchableOpacity
                      onPress={() => {
                        this.download(resource.file);
                      }}>
                      <View style={styles.downloadButton}>
                        <Text style={styles.downloadButtonText}>Open</Text>
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

export default Library;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
    marginLeft: 5,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
    width: 400,
    height: 300,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: 100,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },

  text: {
    color: '#000',
    paddingTop: 100,
    marginTop: 50,
  },
  loginButtonText: {
    fontSize: 13,
    textAlign: 'center',
    color: '#12A3D5',
  },

  loginButton: {
    padding: 8,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 40,
    backgroundColor: '#fff',
    borderRadius: 10,
    width: 130,
    alignSelf: 'center',
  },
  downloadButton: {
    padding: 8,
    marginTop: 5,
    marginBottom: 5,
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
    borderRightColor: '#12A3D5',
  },
  assignments: {
    margin: wp('3%'),
    borderRadius: wp('5%'),
    padding: wp('4%'),
    backgroundColor: '#12A3D5',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: 'white',
    borderBottomWidth: wp('1%'),
  },
});
