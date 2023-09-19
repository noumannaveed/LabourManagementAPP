import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

import styles from "./Styles";

import Entypo from 'react-native-vector-icons/Entypo';


const Attend = ({ title, remove, style, styleBtn, land, image }) => {
    return (
        <View style={[styles.button1, styleBtn]}>
            <Image
                source={image}
                style={styles.image}
                resizeMode="contain"
            />
            <Text style={[styles.text1, style]}>{land} {title}</Text>
        </View >
    );
};

export default Attend;