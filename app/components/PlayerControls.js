import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

function PlayerControls({
  playing,
  showSkip,
  onPlay,
  onPause,
  skipForwards,
  skipBackwards
}) {
  return (
    <View style={styles.wrapper}>
      {showSkip && (
        <TouchableOpacity style={styles.touchable} onPress={skipBackwards}>
          <AntDesign name="banckward" size={24} color="#fff" />
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={styles.touchable}
        onPress={playing ? onPause : onPlay}>
        {playing ? (
          <AntDesign name="pausecircle" size={24} color="#fff" />
        ) : (
          <AntDesign name="play" size={24} color="#fff" />
        )}
      </TouchableOpacity>

      {showSkip && (
        <TouchableOpacity style={styles.touchable} onPress={skipForwards}>
          <AntDesign name="forward" size={24} color="#fff" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flex: 3,
  },
  touchable: {
    padding: 5,
  },
  touchableDisabled: {
    opacity: 0.3,
  },
});

export default PlayerControls;
