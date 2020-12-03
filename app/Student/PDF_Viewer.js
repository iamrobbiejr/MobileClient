import React from 'react';
import {StyleSheet, Dimensions, View} from 'react-native';

import {WebView} from 'react-native-webview';
import Pdf from 'react-native-pdf';

export default class PDF_Viewer extends React.Component {
  render() {
    //https://cyberschool.blob.core.windows.net/materials/934-Biology%20Grade%2012%20Chapter%205%20Enzymes%20Part%201.mp4
    //https://cyberschool.blob.core.windows.net/materials/1213Marking Scheme Paper 1 March 2017 0610_12.pdf
    //https://cyberschool.blob.core.windows.net/materials/1112-NSSCHmaths%20examination%20papres%202018.pdf
    //https://cyberschool.blob.core.windows.net/materials/1257-Paper%206%20Feb-March%202019%200610_62.pdf
    const baseURL = 'https://cyberschool.blob.core.windows.net/materials/';
   // const url = this.props.route.params.mId + "-" + this.props.route.params.materialname
   
    const url = this.props.route.params.file.split(','),
      a = url[0].trim(),
      b = url[1].trim(),
      c = url[2].trim(),
      d = url[3].trim();

    
    const res = encodeURI(b)
    const uri = baseURL + res
    
    //const uri = "//https://cyberschool.blob.core.windows.net/materials/1112-NSSCHmaths%20examination%20papres%202018.pdf"
    //const uri = 'http://samples.leanpub.com/thereactnativebook-sample.pdf';
    const source = {
      uri: uri,
      /*headers: {
        Authorization: `Bearer ${this.props.route.params.token}`,
      },*/
    };
    console.log(source)
    return (
      <View style={styles.container}>
                <Pdf
                    source={source}
                    onLoadComplete={(numberOfPages,filePath)=>{
                        console.log(`number of pages: ${numberOfPages}`);
                    }}
                    onPageChanged={(page,numberOfPages)=>{
                        console.log(`current page: ${page}`);
                    }}
                    onError={(error)=>{
                        console.log(error);
                    }}
                    onPressLink={(uri)=>{
                        console.log(`Link presse: ${uri}`)
                    }}
                    style={styles.pdf}/>
            </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginTop: 25,
  },
  pdf: {
      flex:1,
      width:Dimensions.get('window').width,
      height:Dimensions.get('window').height,
  }
});
