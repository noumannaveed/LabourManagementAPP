import { StyleSheet, Dimensions } from "react-native";

import Colors from "../Colors/Colors";

const { height, width } = Dimensions.get('screen');

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        // marginVertical: height * 0.02,
        paddingHorizontal: height * 0.01,
        height: height * 0.1,
        backgroundColor: Colors.green,
    },
    back: {
        flexDirection: 'row',
        alignItems: 'center',
        fontFamily: 'Roboto-Bold',
    },
    text: {
        color: 'white',
        fontSize: 18,
        // fontWeight: 'bold',
        fontFamily: 'Roboto-Bold',
    },
    text1: {
        color: 'white',
        fontFamily: 'Alegreya-Bold',
        fontSize: 25,
        textAlign: 'center',
        // borderWidth: 1,
        flex: 1,
        // left: width * 0.230,
    },
})

export default styles