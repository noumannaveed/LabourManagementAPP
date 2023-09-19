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
        // paddingHorizontal: width * 0.02,
        fontSize: 18,
        marginHorizontal: width * 0.05
    },
    title: {
        alignItems:'center'
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: width*0.1
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
    detail: {
        flexDirection:'row',
    },
    detail1: {
        flexDirection:'row',
        justifyContent: 'space-between'
    },
    text1: {
        paddingHorizontal: width * 0.02,
        marginHorizontal: width * 0.1,
        fontSize: 18,
    },
    text2: {
        marginHorizontal: width * 0.05,
        // marginHorizontal: width * 0.1,
        fontFamily: FontFamily.Alegreya_Bold,
        color: 'grey',
        fontSize: 18,
    },
    seprator: {
        borderWidth: 0.2,
        borderColor: '#000000',
        marginVertical: width * 0.01,
    },
    button1: {
        alignItems: "center",
        borderColor: Colors.green,
        borderWidth: width * 0.003,
        paddingVertical: height * 0.02,
        paddingHorizontal: height * 0.04,
        marginHorizontal: width * 0.04,
        marginVertical: height * 0.01,
        borderRadius: width * 0.17/2,
    },
    text3: {
        textAlign: 'center',
        fontFamily: 'Alegreya-Bold',
        fontSize: 18,
        color: '#8B8B8B',
    },
})

export default styles