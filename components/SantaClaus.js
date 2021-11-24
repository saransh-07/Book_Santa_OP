import React from 'react';
import LottieView from 'react-native-web-lottie';

export default class SantaAnimation extends React.Component {
  render() {
    return (
      <LottieView
      source={require('../assets/13105-santa-claus.json')}
      style={{width:"60%"}}
      autoPlay loop />
    )
  }
}