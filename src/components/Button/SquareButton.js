import React from "react";
import { View, Text, Dimensions, TouchableOpacity, ImageBackground } from "react-native";

import styles from "./Styles";
import Images from "../Images/Images";

const SquareButton = ({ title, onPress, style, styleBtn, onLongPress, type }) => {
    // console.log(item);
    return (
        <View>
            <TouchableOpacity
                onPress={onPress}
                onLongPress={onLongPress}
            >
                <ImageBackground
                    source={Images.land_button}
                    style={styles.button1}
                >
                    <Text style={[styles.text1, style]}>{title}</Text>
                    <Text style={[styles.text1, style]}>{type.cropType?.label}</Text>
                </ImageBackground>
            </TouchableOpacity>
        </View>
    );
};

export default SquareButton;