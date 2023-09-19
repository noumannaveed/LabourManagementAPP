import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import styles from "./Styles";

const SimpleButton = ({ title, onPress, style, styleBtn, land }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={[styles.simple, styleBtn]}
                onPress={onPress}
            >
                <Text style={[styles.text, style]}>{land} {title}</Text>
            </TouchableOpacity>
        </View>
    );
};

export default SimpleButton;