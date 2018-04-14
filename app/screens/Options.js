import React, { Component } from "react";
import PropTypes from "prop-types";

import { StatusBar, ScrollView, Platform, Linking } from "react-native";
import { ListItem, Separator } from "./../components/List";
import { Ionicons } from "@expo/vector-icons";
import { ConnectAlert, connectAlert } from "./../components/Alert";

const ICON_PREFIX = Platform.OS === "ios" ? "ios" : "md";
const ICON_COLOR = "#868686";
const ICON_SIZE = 23;

class Options extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    alertWithType: PropTypes.func
  };

  handleThemesPress = () => {
    console.log("themes press");
    this.props.navigation.navigate("Themes");
  };

  handleSitePress = () => {
    console.log("site press");
    Linking.openURL("https://fixer.io").catch(() =>
      this.props.alertWithType("error", "Sorry!", "Unable to reach fixer.io")
    );
  };
  render() {
    return (
      <ScrollView>
        <StatusBar translucent={false} barStyle="default" />
        <ListItem
          text="Themes"
          onPress={this.handleThemesPress}
          customIcon={
            <Ionicons
              name={`${ICON_PREFIX}-arrow-forward`}
              color={ICON_COLOR}
              size={ICON_SIZE}
            />
          }
        />
        <Separator />
        <ListItem
          text="Fixer.io"
          onPress={this.handleSitePress}
          customIcon={
            <Ionicons
              name={`${ICON_PREFIX}-link`}
              color={ICON_COLOR}
              size={ICON_SIZE}
            />
          }
        />
        <Separator />
      </ScrollView>
    );
  }
}

export default connectAlert(Options);
