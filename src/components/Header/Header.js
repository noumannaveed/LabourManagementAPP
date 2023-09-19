import React from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";

import styles from "./Styles";

import Ionicons from 'react-native-vector-icons/Ionicons';

const Header = ({ backIcon, backText, title, onPress, icon, add }) => {
    return (
        <View>
            <View style={styles.container}>
                <TouchableOpacity style={styles.back} onPress={onPress}>
                    <Ionicons name={backIcon} size={30} color='white' />
                </TouchableOpacity>
                <Text style={styles.text1}>{title}</Text>
                <TouchableOpacity onPress={add}>
                    <Ionicons name={icon} size={30} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Header;