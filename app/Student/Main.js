import * as React from 'react';
import {
    // AppRegistry,
    StyleSheet,
    Text,
    View,
    Linking,
    // Dimensions,
    // Image,
    // ScrollView,
    // StatusBar,
    TouchableOpacity,
    // Platform,
    // LayoutAnimation,
    // Animated,
    // UIManager,
    // FlatList,
    SafeAreaView, Image, ScrollView,

} from 'react-native';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


 const Main = () => {

     return (
         <View style={styles.container}>
             <ScrollView alwaysBounceVertical={true}>
                 <Text style={styles.headingText}>

                 </Text>
                 {/*Jumbotron*/}
                 <View style={styles.paragraph}>
                     <View style={{flex: 0, flexDirection: 'row',justifyContent: 'space-between'}}>
                         <View style={{width: 20,marginLeft: 20}}>
                             <Image source={{uri: 'https://pawacyberschool.net/static/media/book_lover.1d4c50a9.png'}}
                                    style={{width: 80, height: 100}} />
                         </View>
                         <View style={{width: 260,paddingTop:hp('3%'),marginRight: 0}}>
                             <Text style={{ color:'#12A3D5',fontSize: hp('2%'),}} >
                                 Anytime is study time!
                                 Enrol for as many classes as you can to enjoy the full benefits of e-learning

                             </Text>

                         </View>
                     </View>
                 </View>

                 <View style={styles.paragraphT}>
                     <View style={{flex: 0, flexDirection: 'row',justifyContent: 'space-between'}}>
                         <View style={{width: wp('55%'),paddingTop: hp('2%'),marginRight:wp('0%'),}}>
                             <Text style={{ color:'#12A3D5',fontSize: hp('2%'),}} >
                                 View new and pending assignments and also
                                 take time to revise the submitted and marked ones.

                             </Text>

                         </View>
                         <View style={{width: wp('45%'),marginRight:wp('0.5%')}}>
                             <Image source={{
                                 uri:
                                     'https://i.pinimg.com/originals/4b/4b/c8/4b4bc8f0e26e86fcbdfb5b7a898ee910.jpg'}}
                                    style={{width: wp('45%'), height: hp('10%')}} />
                         </View>
                     </View>

                 </View>

                 <View style={styles.paragraphT}>
                     <View style={{flex: 0, flexDirection: 'row',justifyContent: 'space-between'}}>
                         <View style={{width: wp('35%'),marginRight: hp('2%')}}>
                             <Image source={{
                                 uri:
                                     'https://cdn1.vectorstock.com/i/1000x1000/69/25/online-education-video-distance-learning-vector-30566925.jpg'}}
                                    style={{width: wp('40%'), height: 150}} />
                         </View>
                         <View style={{marginRight: hp('2%')}}>
                             <Text style={{ color:'#12A3D5',fontSize: hp('2%'),}} >
                                 Join video classes for more interactive learning with your teachers.

                             </Text>

                         </View>


                     </View>
                 </View>
                 <TouchableOpacity onPress={() => Linking.openURL('https://pawacyberschool.net/')}>
                     <View style={styles.loginButton}>
                         <Text style={styles.loginButtonText}>Visit Website To Enroll</Text>
                     </View>
                 </TouchableOpacity>
             </ScrollView>
         </View>
     );


}
export default Main;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: hp('3%'),
        marginLeft:wp('0.2%'),

    },
    loginButtonText: {
        fontSize: hp('1.5%'),
        textAlign: 'center',
        color: '#fff',

    },

    loginButton: {
        padding:hp('1%'),
        marginTop:hp('3%'),
        backgroundColor: '#12A3D5',
        borderRadius: wp('5%'),
        width: wp('50%'),
        alignSelf: 'center',

    },

    paragraph: {
        backgroundColor: '#fff',
        padding: hp('0.8%'),
        borderRadius:25,
        borderWidth: 1,
        borderColor: "#fff",
        marginTop:hp('3.8%'),
        marginLeft: wp('2%'),
        marginRight: wp('3%'),
        marginBottom: hp('2.5%'),
    },
    paragraphT: {
        backgroundColor: '#fff',
        padding: wp('1%'),
        borderRadius:wp('5%'),
        marginLeft: wp('2%'),
        marginRight: wp('2%'),
        marginBottom: hp('2.5%'),
        marginTop:hp('3.8%'),
    },
    text: {
        color:'#000',
        paddingTop: hp('1%'),
        marginTop:hp('2%'),

    },


})

