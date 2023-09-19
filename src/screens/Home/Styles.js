import { StyleSheet, Dimensions } from "react-native";
import { FontFamily } from "../../helper/AppFontFamily";

const { height, width } = Dimensions.get('screen');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        top: height * 0.08,
    },
    image: {
        // flex: 1,
        height: height * 0.3,
        width: width,
        // position: 'absolute',
        // bottom: 13.9,
        // right: 30,
        // justifyContent:'center',
        // alignItems:'center',
    },
    logo: {
        width: width * 0.53,
        height: height * 0.12,
        resizeMode: 'contain',
        // alignSelf: 'center',
        // top: height * 0.09,
        left: width * 0.1,
        top: height * 0.02,
    },
    main: {
        // backgroundColor: 'white',
        // height: height * 0.8,
        // width: width * 1,
        height: height,
        width: width,
        // position: 'absolute',
        // bottom: height * 0.13,
        // borderWidth: 1,
        // bottom: 100,
        // marginVertical: height * 0.03,
        // marginHorizontal: width * 0.05,
        // borderTopLeftRadius: height * 0.2 / 2,
        // borderTopRightRadius: height * 0.2 / 2,
        // paddingVertical: height * 0.1
    },
    text: {
        fontSize: 20,
        // fontWeight: 'bold',
        color: 'white',
        fontFamily: FontFamily.Alegreya_Regular,
        textAlign: 'left',
    },
    text1: {
        fontFamily: 'Roboto-Bold',
        color: 'black',
        paddingHorizontal: width * 0.02,
        fontSize: 18,
        textAlign: 'left',
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    flagEnd: {
        alignSelf: 'flex-end',
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: width * 0.01,
    },
    flagStart: {
        flexDirection: 'row',
        alignItems: 'center',
        // right: width * 0.07,
        // marginHorizontal: width * 0.01,
    },
    styleBtn: {
        // left: width * 0.07,
    },
    icons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: width * 0.05,
        marginTop: height * 0.02,
        // margin: width * 0.05,
    },
})

export default styles