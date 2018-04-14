import React, { Component } from "react";
import PropTypes from "prop-types";
import { Text, FlatList, View, StatusBar } from "react-native";
import { connect } from "react-redux";

import { ListItem, Separator } from "../components/List";
import currencies from "../data/currencies";

import { changeBaseCurrency, changeQuoteCurrency } from "../actions/";

const TEMP_SELECTED_CURRENCY = "CAD";

class CurrencyList extends Component {
  static propTypes = {
    navigation: PropTypes.object
  };

  handlePress = currency => {
    console.log("row press");
    const { type } = this.props.navigation.state.params;
    if (type === "base") {
      this.props.dispatch(changeBaseCurrency(currency));
    } else if (type === "quote") {
      this.props.dispatch(changeQuoteCurrency(currency));
    }
    this.props.navigation.goBack(null);
  };
  render() {
    let comparisonCurrency =
      this.props.navigation.state.params.type === "quote"
        ? this.props.quoteCurrency
        : this.props.baseCurrency;
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="default" translucent={false} />
        <FlatList
          data={currencies}
          renderItem={({ item }) => (
            <ListItem
              text={item}
              selected={item === comparisonCurrency}
              onPress={() => this.handlePress(item)}
              iconBackground={this.props.primaryColor}
            />
          )}
          keyExtractor={item => item}
          ItemSeparatorComponent={Separator}
        />
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    baseCurrency: state.currencies.baseCurrency,
    quoteCurrency: state.currencies.quoteCurrency,
    primaryColor: state.theme.primaryColor
  };
};
export default connect(mapStateToProps)(CurrencyList);
