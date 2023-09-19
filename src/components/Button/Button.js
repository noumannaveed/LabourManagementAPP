import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

import styles from "./Styles";

const Button = ({ title, onPress, style, styleBtn, land, image }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={[styles.button, styleBtn]}
                onPress={onPress}
            >
                <Image 
                    source={image}
                    style={styles.image}
                    resizeMode="contain"
                />
                <Text style={[styles.text, style]}>{land} {title}</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Button;