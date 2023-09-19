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
        fontFamily: FontFamily.Alegreya_Bold,
        color: 'black',
        paddingHorizontal: width * 0.02,
        fontSize: 18,
    },
    text1: {
        fontFamily: FontFamily.Alegreya_Bold,
        color: '#C70039',
        paddingHorizontal: width * 0.02,
        fontSize: 18,
    },
    text4: {
        fontFamily: FontFamily.Alegreya_Bold,
        color: '#44CD40',
        paddingHorizontal: width * 0.02,
        fontSize: 18,
    },
    text3: {
        fontFamily: FontFamily.Alegreya_Bold,
        color: '#404FCD',
        paddingHorizontal: width * 0.02,
        fontSize: 18,
    },
    title: {
        alignItems: 'center'
    },
    detail1: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    text2: {
        paddingHorizontal: width * 0.02,
        // marginHorizontal: width * 0.1,
        fontSize: 20,
        fontFamily: FontFamily.Alegreya_Regular,
        color: 'grey',
    },
    seprator: {
        borderWidth: 0.2,
        borderColor: '#000000',
        marginVertical: width * 0.01,
    },
    gauge: {
        position: 'absolute',
        width: 100,
        height: 160,
        alignItems: 'center',
        justifyContent: 'center',
    },
    gaugeText: {
        backgroundColor: 'transparent',
        color: '#000',
        fontSize: 24,
    },
    contain: {
        alignItems: 'center', justifyContent: 'center', height: 1050, paddingVertical: 15,
        flexDirection: 'row',
        width: 350,
        justifyContent: 'space-between',
    },
})

export default styles