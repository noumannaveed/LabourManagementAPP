import { StyleSheet, Dimensions } from "react-native";
import { FontFamily } from "../../helper/AppFontFamily";

import Colors from "../Colors/Colors";

const { height, width } = Dimensions.get('screen');

const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        backgroundColor: Colors.green,
        paddingVertical: height * 0.02,
        paddingHorizontal: width * 0.03,
        marginHorizontal: width * 0.01,
        marginVertical: height * 0.01,
        borderRadius: width * 0.17 / 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: width * 0.45
    },
    button1: {
        alignItems: "center",
        backgroundColor: Colors.green,
        paddingVertical: height * 0.015,
        marginHorizontal: width * 0.1,
        // marginVertical: height * 0.1,
        borderRadius: width * 0.17 / 2,
        flexDirection: 'row',
        marginVertical: height * 0.01,
    },
    text: {
        textAlign: 'center',
        fontFamily: 'Alegreya-Bold',
        fontSize: 18,
        color: 'white',
    },
    text1: {
        textAlign: 'center',
        fontFamily: FontFamily.Alegreya_Medium,
        fontSize: 30,
        color: 'white'
    },
    image: {
        height: 30,
        width: 40,
        marginHorizontal: 20
    },
})

export default styles