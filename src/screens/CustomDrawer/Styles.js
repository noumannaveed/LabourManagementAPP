import { StyleSheet, Dimensions } from "react-native";
import { FontFamily } from "../../helper/AppFontFamily";

const { height, width } = Dimensions.get('screen');

const styles = StyleSheet.create({
    head: {
        height: height * 0.22,
        // width: width * 0.78,
        // justifyContent: 'center',
        // flexDirection: 'row',
    },
    image: {
        height: height * 0.07,
        width: width * 0.14,
        // tintColor: 'white',
        // backgroundColor: 'white',
        borderRadius: width * 0.15 / 2
        // alignSelf: 'center'
    },
    foot: {
        height: height * 0.11,
        // borderWidth: 1,
        // position: 'absolute',
        // top: height * 0.075,
        // width: width * 0.78,
        // flex:1
        // position: 'absolute',
        // bottom: height * 0.0311,
    },
    icon: {
        height: height * 0.03,
        width: width * 0.1,
    },
    contain: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10
    },
    text: {
        fontFamily: FontFamily.Alegreya_Regular,
        fontSize: 20,
        paddingHorizontal: 10,
        color: 'grey'
    },
    text1: {
        fontFamily: FontFamily.Alegreya_Regular,
        fontSize: 18,
        paddingHorizontal: 10,
        color: 'white',
        // textAlign: 'left',
    },
    text2: {
        fontFamily: FontFamily.Alegreya_Regular,
        fontSize: 27,
        paddingHorizontal: 10,
        color: 'white',
        // textAlign: 'left',
    },
})

export default styles