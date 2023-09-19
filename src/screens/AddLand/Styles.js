import { StyleSheet, Dimensions } from "react-native";
import Colors from "../../components/Colors/Colors";
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
    text2: {
        fontFamily: FontFamily.Alegreya_Regular,
        color: 'black',
        paddingHorizontal: width * 0.02,
        fontSize: 18,
    },
    text1: {
        fontSize: 30,
        // fontWeight: 'bold',
        color: 'white',
        fontFamily: 'Roboto-Bold'
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: width*0.1
    },
    radio: {
        flexDirection: 'row',
        marginVertical: height * 0.03,
    },
    contain1: {
        marginVertical: height * 0.03,
    },
    pick: {
        marginHorizontal: width * 0.1,
        marginVertical: height * 0.01,
    },
    picker: {
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        borderColor: Colors.green,
        backgroundColor: '#f5f5f5',
        paddingHorizontal: width * 0.03,
    },
})

export default styles