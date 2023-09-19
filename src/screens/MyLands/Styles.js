import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get('screen');

const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'pink',
        // marginHorizontal: 15.5,
        // bottom: height * 0.222,
        backgroundColor: 'white',
        height: height * 0.62,
        alignItems: 'center',
    },
    container1: {
        // backgroundColor: 'pink',
        justifyContent: 'center',
        height: height * 0.52,
        backgroundColor: 'white'
        // alignItems: 'center'
    },
})

export default styles