import { StackNavigator } from "react-navigation";
import { StatusBar } from "react-native";

import Home from "../screens/Home";
import CurrencyList from "../screens/CurrencyList";
import Options from "../screens/Options";
import Themes from "../screens/Themes";

const HomeStack = StackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        //remove the header bar
        header: () => null
      }
    },
    Options: {
      screen: Options,
      navigationOptions: {
        headerTitle: "Options"
      }
    },
    Themes: {
      screen: Themes,
      navigationOptions: {
        headerTitle: "Themes"
      }
    }
  },
  {
    //the header comes and goes with the screen
    headerMode: "screen"
  }
);

const CurrencyListStack = StackNavigator(
  {
    CurrencyList: {
      screen: CurrencyList,
      /* {navigation} object is the one that is sent from the screen (Home.js in this case)
      *  here navigationOptions is set to a function that RETURNs an OBJECT (note the paren outside curlies)
      *  */
      navigationOptions: ({ navigation }) => ({
        headerTitle: navigation.state.params.title
      })
    }
  },
  { mode: "modal" }
);
const Navigator = StackNavigator(
  {
    Home: {
      //setting a StackNavigator as a HomeScreen
      screen: HomeStack
    },
    CurrencyList: {
      screen: CurrencyListStack
    }
  },
  {
    cardStyle: { paddingTop: StatusBar.currentHeight },
    //don't render a header for this navigator
    headerMode: "none"
  }
);

export default Navigator;
