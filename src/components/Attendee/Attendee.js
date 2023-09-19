import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import styles from "./Styles";

import Entypo from 'react-native-vector-icons/Entypo';


const Attendee = ({ title, remove, style, styleBtn, land, item, icon }) => {
    return (
        <View style={[styles.button, styleBtn]}>
            <Text style={[styles.text, style]}>{land} {title}</Text>
            < TouchableOpacity
                onPress={()=>remove(item)}
            >
                <Entypo name={icon} size={24} color="black" />
            </TouchableOpacity >
        </View >
    );
};

export default Attendee;