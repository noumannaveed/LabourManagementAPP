import { StyleSheet, Dimensions } from "react-native";
import Colors from "../../components/Colors/Colors";
import { FontFamily } from "../../helper/AppFontFamily";

const { height, width } = Dimensions.get('screen');

const styles = StyleSheet.create({
    container: {
        height: height * 0.82,
        width: width,
        bottom: height * 0.01,
    },
    main: {
        backgroundColor: 'white',
        height: height,
        width: width,
        top: height * 0.15,
        borderTopLeftRadius: height * 0.2 / 2,
        borderTopRightRadius: height * 0.2 / 2,
    },
    text: {
        fontSize: 30,
        // fontWeight: 'bold',
        textAlign: 'center',
        color: Colors.green,
        fontFamily: FontFamily.AlegreyaRoman_Bold,
    },
    text1: {
        textAlign: 'center',
        fontFamily: FontFamily.Alegreya_Regular,
        color: '#484848',
        marginVertical: height * 0.01,
        fontSize: 18,
    },
    text2: {
        // textAlign: 'center',
        fontFamily: FontFamily.AlegreyaRoman_Bold,
        color: Colors.green,
        // marginVertical: height * 0.009,
        fontSize: 18,
    },
    logo: {
        width: width * 0.5,
        height: height * 0.1,
        resizeMode: 'contain',
        alignSelf: 'center',
        top: height * 0.05
    },
    contain: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    contain1: {
        marginVertical: height * 0.03,
    },
})

export default styles