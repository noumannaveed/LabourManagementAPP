import { StyleSheet, Dimensions } from "react-native";
import Colors from "../Colors/Colors";

const { height, width } = Dimensions.get('screen');

const styles = StyleSheet.create({
    input: {
        // flex: 1,
        borderColor: Colors.green,
        borderWidth: width * 0.003,
        paddingHorizontal: width * 0.02,
        marginHorizontal: width * 0.1,
        marginVertical: height * 0.01,
        borderRadius: width * 0.2 / 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: height * 0.072,
    },
    icon: {
        color: '#8B8B8B',
        // alignItems: 'right'
    },
    textInputRight: {
        flex: 1,
        color: 'black',
        textAlign: 'right',
    },
    textInputLeft: {
        flex: 1,
        color: 'black',
        textAlign: 'left',
    },
})

export default styles