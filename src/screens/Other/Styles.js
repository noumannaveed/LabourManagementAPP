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
    input: {
        // flex: 1,
        borderColor: Colors.green,
        borderWidth: width * 0.003,
        paddingHorizontal: width * 0.02,
        marginHorizontal: width * 0.1,
        marginVertical: height * 0.01,
        borderRadius: height * 0.05/2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: height * 0.172,
    },
    icon: {
        color: '#8B8B8B',
    },
    detailLeft: {
        alignSelf: "flex-start",
        color: 'black',
        flex: 1,
        textAlign: 'left',
    },
    detailRight: {
        alignSelf: "flex-start",
        color: 'black',
        flex: 1,
        textAlign: 'right',
    },
})

export default styles