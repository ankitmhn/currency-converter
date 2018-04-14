import PropTypes from "prop-types";
import React from "react";
import {
  View,
  Text,
  TouchableHighlight,
  TextInput,
  keyboardType
} from "react-native";
import color from "color";

import styles from "./styles";

const InputWithButton = props => {
  const { onPress, buttonText, editable = true } = props;

  const underlayColor = color(styles.$buttonBackgroudColorBase).darken(
    styles.$buttonBackgroundColorModifier
  );

  const containerStyle = [styles.container];
  if (editable === false) {
    containerStyle.push(styles.containerDisabled);
  }
  const buttonTextStyle = [styles.buttonText];
  if (props.textColor) {
    buttonTextStyle.push({ color: props.textColor });
  }
  return (
    <View style={styles.container}>
      <TouchableHighlight
        style={styles.buttonContainer}
        onPress={onPress}
        underlayColor={underlayColor}
      >
        <Text style={buttonTextStyle}>{buttonText}</Text>
      </TouchableHighlight>
      <View style={styles.border} />
      <TextInput
        style={styles.input}
        underlineColorAndroid="transparent"
        {...props}
      />
    </View>
  );
};

InputWithButton.propTypes = {
  onPress: PropTypes.func,
  buttonText: PropTypes.string,
  editable: PropTypes.bool
};

export default InputWithButton;
