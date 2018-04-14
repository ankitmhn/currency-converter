import React, { Component } from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  Keyboard,
  Animated,
  Platform,
  StyleSheet
} from "react-native";

import styles from "./styles";

const ANIMATION_DURATION = 250;

class Logo extends Component {
  constructor(props) {
    super(props);

    this.containerImageWidth = new Animated.Value(styles.$largeContainerSize);
    this.imageWidth = new Animated.Value(styles.$largeImageSize);
  }
  componentDidMount() {
    let showEvent = "keyboardWillShow";
    let hideEvent = "keybarodWillHide";
    // <---- EVENTS ABOVE NOT AVAILABLE ON ANDROID ---->
    if (Platform.OS === "android") {
      showEvent = "keyboardDidShow";
      hideEvent = "keyboardDidHide";
    }
    this.keyboardShowListener = Keyboard.addListener(
      showEvent,
      this.keyboardShow
    );
    this.keyboardHideListener = Keyboard.addListener(
      hideEvent,
      this.keyboardHide
    );
  }
  componentWillUnmount() {
    this.keyboardHideListener.remove();
    this.keyboardShowListener.remove();
  }
  keyboardShow = () => {
    // Animated.timing(this.containerImageWidth, {
    //   toValue: styles.$smallContainerSize,
    //   duration: ANIMATION_DURATION
    // }).start();

    // Animated.timing(this.imageWidth, {
    //   toValue: styles.$smallImageSize,
    //   duration: ANIMATION_DURATION
    // }).start();

    // <-------THE FUNCTIONS ABOVE ARE SETUP TO RUN IN PARALLEL BELOW ------>
    // <-------THE parallel function takes an array of functions ----------->
    Animated.parallel([
      Animated.timing(this.containerImageWidth, {
        toValue: styles.$smallContainerSize,
        duration: ANIMATION_DURATION
      }),
      Animated.timing(this.imageWidth, {
        toValue: styles.$smallImageSize,
        duration: ANIMATION_DURATION
      })
    ]).start();
  };

  keyboardHide = () => {
    Animated.parallel([
      Animated.timing(this.containerImageWidth, {
        toValue: styles.$largeContainerSize,
        duration: ANIMATION_DURATION
      }),
      Animated.timing(this.imageWidth, {
        toValue: styles.$largeImageSize,
        duration: ANIMATION_DURATION
      })
    ]).start();
  };
  render() {
    const containerImageStyle = [
      styles.containerImage,
      { width: this.containerImageWidth, height: this.containerImageWidth }
    ];

    const imageStyle = [
      styles.logo,
      { width: this.imageWidth },
      this.props.tintColor ? { tintColor: this.props.tintColor } : null
    ];
    return (
      <View style={styles.container}>
        <Animated.View style={containerImageStyle}>
          <Animated.Image
            resizeMode="contain"
            style={[StyleSheet.absoluteFill, containerImageStyle]}
            source={require("./images/background.png")}
          />
          <Animated.Image
            resizeMode="contain"
            style={imageStyle}
            source={require("./images/logo.png")}
          />
        </Animated.View>
        <Text style={styles.text}>Currency Converter</Text>
      </View>
    );
  }
}

export default Logo;
