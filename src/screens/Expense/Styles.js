import { StyleSheet, Dimensions } from "react-native";
import { FontFamily } from "../../helper/AppFontFamily";

const { height, width } = Dimensions.get('screen');

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    main: {
        paddingVertical: height * 0.04
    },
    text: {
        fontFamily: FontFamily.Alegreya_Regular,
        color: 'black',
        paddingHorizontal: width * 0.02,
        fontSize: 18,
        marginHorizontal: width * 0.07
    },
    title: {
        flexDirection:'row'
    },
})

export default styles