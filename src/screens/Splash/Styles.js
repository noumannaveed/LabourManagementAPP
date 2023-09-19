import React from 'react'

import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get('screen');


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        // flex: 1,
        height: height,
        width: width,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        width: width * 0.7,
        height: height * 0.5,
        resizeMode: 'contain'
    },
})

export default styles