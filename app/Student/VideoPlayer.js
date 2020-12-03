import React from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import Video from 'react-native-video';
import Orientation from 'react-native-orientation-locker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import PlayerControls from '../components/PlayerControls';
import ProgressBar from '../components/ProgressBar';

export default class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      play: false,
      currentTime: 0,
      duration: 0,
      showControls: true,
    };
    this.handleClose = this.handleClose.bind(this);
    this.handlePlayPause = this.handlePlayPause.bind(this);
    this.skipBackward = this.skipBackward.bind(this);
    this.skipForward = this.skipForward.bind(this);
    this.onSeek = this.onSeek.bind(this);
    this.onLoadEnd = this.onLoadEnd.bind(this);
    this.onProgress = this.onProgress.bind(this);
    this.onEnd = this.onEnd.bind(this);
    this.showControls = this.showControls.bind(this);
  }

  componentDidMount() {
    StatusBar.setHidden(true);
    Orientation.lockToLandscape();
  }

  componentWillUnmount() {
    this.handleClose();
  }

  handleClose() {
    StatusBar.setHidden(false);
    Orientation.lockToPortrait();
    Orientation.unlockAllOrientations();
    this.props.navigation.goBack();
  }

  handlePlayPause() {
    // If playing, pause and show controls immediately.
    if (this.state.play) {
      this.setState({play: false, showControls: true});
      return;
    }

    this.setState({play: true});
    setTimeout(() => this.setState({showControls: false}), 2000);
  }

  skipBackward() {
    this.player.seek(this.state.currentTime - 15);
    this.setState({currentTime: this.state.currentTime - 15});
  }

  skipForward() {
    this.player.seek(this.state.currentTime + 15);
    this.setState({currentTime: this.state.currentTime + 15});
  }

  onSeek(data) {
    this.player.seek(data.seekTime);
    this.setState({currentTime: data.seekTime});
  }

  onLoadEnd(data) {
    this.setState({
      duration: data.duration,
      currentTime: data.currentTime,
    });
  }

  onProgress(data) {
    this.setState({
      currentTime: data.currentTime,
    });
  }

  onEnd() {
    this.setState({play: false});
    this.player.seek(0);
  }

  showControls() {
    this.state.showControls
      ? this.setState({showControls: false})
      : this.setState({showControls: true});
  }
  render() {
    // const source = {
    //   uri: 'http://samples.leanpub.com/thereactnativebook-sample.pdf',
    //   cache: true,
    // };
    //const source = require('./test.pdf');  // ios only
    //const source = {uri:'bundle-assets://test.pdf'};

    //const source = {uri:'file:///sdcard/test.pdf'};
    const baseURL = 'http://pawacyberschool.net/api/upload/stream/';
    const url = this.props.route.params.file.split(','),
      a = url[0].trim(),
      b = url[1].trim(),
      c = url[2].trim(),
      d = url[3].trim();

    const uri = baseURL + a + '/' + b + '/' + c + '/' + d;
    const source = {
      uri,
      headers: {
        Authorization: `Bearer ${this.props.route.params.token}`
      },
    };
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={this.showControls}>
          <View>
            <Video
              ref={(ref) => {
                this.player = ref;
              }}
              source={source}
              style={styles.video}
              controls={false}
              resizeMode={'contain'}
              onLoad={this.onLoadEnd}
              onProgress={this.onProgress}
              onEnd={this.onEnd}
              paused={!this.state.play}
            />
            {this.state.showControls && (
              <View style={styles.controlOverlay}>
                <TouchableOpacity
                  onPress={this.handleClose}
                  hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                  style={styles.closeButton}>
                  <MaterialIcons name="clear" size={24} color="#fff" />
                </TouchableOpacity>
                <PlayerControls
                  onPlay={this.handlePlayPause}
                  onPause={this.handlePlayPause}
                  playing={this.state.play}
                  showSkip={true}
                  skipBackwards={this.skipBackward}
                  skipForwards={this.skipForward}
                />
                <ProgressBar
                  currentTime={this.state.currentTime}
                  duration={this.state.duration > 0 ? this.state.duration : 0}
                  onSlideStart={this.handlePlayPause}
                  onSlideComplete={this.handlePlayPause}
                  onSlideCapture={this.onSeek}
                />
              </View>
            )}
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ebebeb',
  },
  video: {
    height: '100%',
    width: '100%',
    backgroundColor: 'black',
  },
  text: {
    marginTop: 30,
    marginHorizontal: 20,
    fontSize: 15,
    textAlign: 'justify',
  },
  closeButton: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'flex-end',
    alignItems: 'center',
    paddingRight: 10,
  },
  controlOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#000000c4',
    justifyContent: 'space-between',
  },
});
