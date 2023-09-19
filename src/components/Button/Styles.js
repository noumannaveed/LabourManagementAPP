import { StyleSheet, Dimensions } from "react-native";
import { FontFamily } from "../../helper/AppFontFamily";
import Colors from "../Colors/Colors";

const { height, width } = Dimensions.get('screen');

const styles = StyleSheet.create({
    container: {
        marginVertical: height * 0.01,
    },
    button: {
        alignItems: "center",
        backgroundColor: Colors.green,
        paddingVertical: height * 0.015,
        marginHorizontal: width * 0.1,
        // marginVertical: height * 0.1,
        borderRadius: width * 0.17 / 2,
        flexDirection: 'row',
    },
    simple: {
        alignItems: "center",
        backgroundColor: Colors.green,
        paddingVertical: height * 0.015,
        marginHorizontal: width * 0.1,
        // marginVertical: height * 0.1,
        borderRadius: width * 0.17 / 2,
    },
    text: {
        textAlign: 'center',
        fontFamily: FontFamily.Alegreya_Medium,
        fontSize: 25,
        color: 'white',
    },
    image: {
        height: 30,
        width: 40,
        marginHorizontal: 20
    },
    button1: {
        height: height * 0.20,
        width: width * 0.44,
        // borderRadius: width * 0.23/2,
        justifyContent: 'center',
        // margin:-1,
        // marginVertical: height*0.01,
        // marginHorizontal: width*0.02
    },
    text1: {
        textAlign: 'center',
        fontFamily: FontFamily.Alegreya_Regular,
        fontSize: 30,
        color: 'white',
    },
})

export default styles