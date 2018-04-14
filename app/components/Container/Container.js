import PropTypes from "prop-types";
import React from "react";
import {
  View,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback
} from "react-native";

import styles from "./styles";

const Container = ({ children, backgroundColor }) => {
  const containerStyle = [styles.container];
  if (backgroundColor) {
    containerStyle.push({ backgroundColor });
  }
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
      style={{ flex: 1 }}
    >
      <View style={containerStyle}>{children}</View>
    </TouchableWithoutFeedback>
  );
};

Container.propTypes = {
  children: PropTypes.any,
  backgroundColor: PropTypes.string
};

export default Container;
