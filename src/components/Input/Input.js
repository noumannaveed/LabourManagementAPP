import React from "react";
import { View, TextInput, Image } from "react-native";
import { FontFamily } from "../../helper/AppFontFamily";

import styles from "./Styles";

const Input = ({ placeholder, onChangeText, value, icon, secureTextEntry, style, lng, keyboardType, image }) => {
    return (
        <View style={styles.input}>
            <Image
                source={image}
                style={{height:20,width:40}}
                resizeMode='contain'
            />
            <TextInput
                placeholder={placeholder}
                placeholderTextColor='#8B8B8B'
                fontStyle={FontFamily.Alegreya_Regular}
                onChangeText={onChangeText}
                value={value}
                secureTextEntry={secureTextEntry}
                style={[lng ? styles.textInputRight : styles.textInputLeft, style]}
                keyboardType={keyboardType}
            />
            <View style={styles.icon}>{icon}</View>
        </View>
    );
};

export default Input;