import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get('screen');

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    main: {
        justifyContent:'center',
        flex:1
    },
})

export default styles