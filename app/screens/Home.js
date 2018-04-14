import React, { Component } from "react";
import { StatusBar, KeyboardAvoidingView, View } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { connectAlert } from "../components/Alert";
import { Container } from "./../components/Container";
import { Logo } from "../components/Logo";
import { InputWithButton } from "../components/TextInput";
import { ClearButton } from "../components/Buttons";
import { LastConverted } from "../components/Text";
import { Header } from "../components/Header";

import {
  swapCurrency,
  changeCurrencyAmount,
  getInitialConversion
} from "../actions/";

class Home extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    CurrencyList: PropTypes.object,
    dispatch: PropTypes.func,
    baseCurrency: PropTypes.string,
    quoteCurrency: PropTypes.string,
    amount: PropTypes.number
  };

  componentWillMount() {
    this.props.dispatch(getInitialConversion());
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.currencyError &&
      nextProps.currencyError != this.props.currencyError
    ) {
      this.props.alertWithType("error", "Error", nextProps.currencyError.type);
    }
  }

  handlePressBaseCurrency = () => {
    console.log("base currency");
    this.props.navigation.navigate("CurrencyList", {
      title: "Base Currency",
      type: "base"
    });
  };

  handlePressQuoteCurrency = () => {
    console.log("quote currency");
    this.props.navigation.navigate("CurrencyList", {
      title: "Quote Currency",
      type: "quote"
    });
  };

  handleTextChange = amount => {
    console.log("text changed ", amount);
    this.props.dispatch(changeCurrencyAmount(amount));
  };

  handleSwapCurrency = () => {
    console.log("swap currency");
    this.props.dispatch(swapCurrency());
  };

  handleOptionsPress = () => {
    console.log("options pressed");
    this.props.navigation.navigate("Options");
  };

  render() {
    let quotePrice = (this.props.amount * this.props.conversionRate).toFixed(2);
    if (this.props.isFetching || this.props.isFetching === undefined) {
      quotePrice = "...";
    }
    return (
      <Container backgroundColor={this.props.primaryColor}>
        <Header onPress={this.handleOptionsPress} />
        <Logo tintColor={this.props.primaryColor} />
        <KeyboardAvoidingView behavior="padding">
          <InputWithButton
            buttonText={this.props.baseCurrency}
            onPress={this.handlePressBaseCurrency}
            keyboardType="numeric"
            defaultValue={this.props.amount.toString()}
            onChangeText={this.handleTextChange}
            textColor={this.props.primaryColor}
          />
          <InputWithButton
            buttonText={this.props.quoteCurrency}
            editable={false}
            onPress={this.handlePressQuoteCurrency}
            defaultValue={quotePrice}
            textColor={this.props.primaryColor}
          />
          <LastConverted
            base={this.props.baseCurrency}
            quote={this.props.quoteCurrency}
            conversionRate={this.props.conversionRate}
            date={this.props.lastConvertedDate}
          />
          <ClearButton
            text="Reverse Currency"
            onPress={this.handleSwapCurrency}
          />
        </KeyboardAvoidingView>
      </Container>
    );
  }
}
mapStateToProps = state => {
  const { baseCurrency, quoteCurrency, amount } = state.currencies;
  const conversionSelector = state.currencies.conversions[baseCurrency] || {};
  const rates = conversionSelector.rates || {};
  return {
    baseCurrency,
    quoteCurrency,
    amount,
    conversionRate: rates[quoteCurrency] || 0,
    isFetching: conversionSelector.isFetching,
    lastConvertedDate: conversionSelector.date
      ? new Date(conversionSelector.date)
      : new Date(),
    primaryColor: state.theme.primaryColor,
    currencyError: state.currencies.error
  };
};
export default connect(mapStateToProps)(connectAlert(Home));
