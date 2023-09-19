import { StyleSheet, Dimensions } from "react-native";
import { FontFamily } from "../../helper/AppFontFamily";

const { height, width } = Dimensions.get('screen');

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    icon: {
        top: height * 0.0021
    },
    main: {
        marginVertical: height * 0.01,
        height: height * 0.15,
        width: height * 0.15,
        borderRadius: (height * 0.15) / 2,
        alignSelf: 'center',
    },
    image: {
        height: height * 0.15,
        width: height * 0.15,
        alignSelf: 'center',
        overflow: 'hidden',
        borderRadius: (height * 0.15) / 2,
        borderWidth: width * 0.0025,
        backgroundColor: 'black',
    },
    camera: {
        alignItems: 'center',
        height: height * 0.04,
        width: height * 0.04,
        backgroundColor: '#C4C4C4',
        borderRadius: (height * 0.04) / 2,
        bottom: height * 0.05,
        left: width * 0.22,
        opacity: 0.9,

    },

})

export default styles