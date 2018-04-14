import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { ScrollView, StatusBar } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";

import { ListItem, Separator } from "../components/List";
import { changePrimaryColor } from "./../actions";

const styles = EStyleSheet.create({
  $green: "$primaryGreen",
  $blue: "$primaryBlue",
  $orange: "$primaryOrange",
  $purple: "$primaryPurple"
});

class Themes extends Component {
  static propTypes = {
    navigation: PropTypes.object
  };

  handleThemePress = color => {
    console.log("press theme handler", color);
    this.props.dispatch(changePrimaryColor(color));
    this.props.navigation.goBack();
  };

  render() {
    return (
      <ScrollView>
        <StatusBar translucent={false} barStyle="default" />
        <ListItem
          text="Blue"
          onPress={() => this.handleThemePress(styles.$blue)}
          selected
          checkmark={false}
          iconBackground={styles.$blue}
        />
        <Separator />
        <ListItem
          text="Orange"
          onPress={() => this.handleThemePress(styles.$orange)}
          selected
          checkmark={false}
          iconBackground={styles.$orange}
        />
        <Separator />
        <ListItem
          text="Green"
          onPress={() => this.handleThemePress(styles.$green)}
          selected
          checkmark={false}
          iconBackground={styles.$green}
        />
        <Separator />
        <ListItem
          text="Purple"
          onPress={() => this.handleThemePress(styles.$purple)}
          selected
          checkmark={false}
          iconBackground={styles.$purple}
        />
        <Separator />
      </ScrollView>
    );
  }
}

export default connect()(Themes);
