import EStyleSheet from "react-native-extended-stylesheet";

export default EStyleSheet.create({
  container: {
    alignItems: "center"
  },
  wrapper: {
    flexDirection: "row",
    alignItems: "center" //now aligns vertically since flexDirection is now row
  },
  icon: {
    width: 19,
    marginRight: 11
  },
  text: {
    color: "$white",
    fontSize: 18,
    fontWeight: "300",
    paddingVertical: 20
  }
});
