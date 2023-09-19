import React, { useEffect, useState } from 'react'

import { View, TouchableOpacity, Text, ScrollView, Alert, TouchableWithoutFeedback, Keyboard, Image, ImageBackground, SafeAreaView } from 'react-native'

import Ionicons from 'react-native-vector-icons/Ionicons';

import SimpleButton from '../../components/Button/SimpleButton';

import styles from './Styles'

import Input from '../../components/Input/Input'

import strings from '../../components/lng/LocalizedStrings';

import { I18nManager } from 'react-native';

import { signup } from '../../auth/FireBase';

import { useDispatch } from 'react-redux';
import { setUser, setUserId } from '../../redux/actions';

import firestore from '@react-native-firebase/firestore';

import { ActivityIndicator } from "react-native-paper";

import Images from '../../components/Images/Images';
import Colors from '../../components/Colors/Colors';

const SignUp = ({ navigation, route }) => {

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [isSecureEntry, setIsSecureEntry] = useState(true);
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch();

    const validate_field = () => {
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (name == '') {
            Alert.alert(
                strings.ALERT,
                strings.PLEASE_ENTER_NAME,
                [
                    { text: strings.OK, onPress: () => console.log("OK Pressed") }
                ]
            );
            return false;
        } else if (email == '') {
            Alert.alert(
                strings.ALERT,
                strings.PLEASE_ENTER_EMAIL,
                [
                    { text: strings.OK, onPress: () => console.log("OK Pressed") }
                ]
            );
            return false;
        } else if (reg.test(email) == false) {
            Alert.alert(
                strings.ALERT,
                strings.INCORRECT_EMAIL,
                [
                    { text: strings.OK, onPress: () => console.log("OK Pressed") }
                ]
            );
            return false;
        } else if (password == '') {
            Alert.alert(
                strings.ALERT,
                strings.PLEASE_ENTER_PASSWORD,
                [
                    { text: strings.OK, onPress: () => console.log("OK Pressed") }
                ]
            );
            return false;
        } else if (password.length < 6) {
            Alert.alert(
                strings.ALERT,
                strings.CHARACTERS,
                [
                    { text: strings.OK, onPress: () => console.log("OK Pressed") }
                ]
            );
            return false;
        }
        return true;
    }
    const signUp = async () => {
        if (validate_field()) {
            setLoading(true)
            signup(email, password, name)
                .then((user) => {
                    setLoading(false)
                    navigation.replace('Home');
                    firestore()
                        .collection('Users')
                        .doc(user.user.user.uid)
                        .get()
                        .then(async (data) => {
                            await dispatch(setUser(data.data()));
                            await dispatch(setUserId(data.id));
                        })
                })
                .catch((error) => {
                    console.log(error);
                    alert(error.error);
                    setLoading(false)
                })
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <ScrollView style={{ flex: 1 }}>
                <SafeAreaView>
                    <ImageBackground
                        style={styles.container}
                        source={Images.signUp}
                    // resizeMode='contain'
                    >
                        <Image
                            source={Images.splash_logo}
                            style={styles.logo}
                        />
                    </ImageBackground>
                    <View style={styles.main}>
                        <View style={styles.contain1}>
                            <Text style={styles.text}>{strings.SIGN_UP}</Text>
                            <Text style={styles.text1}>Welcome to Pak Kissan</Text>
                        </View>
                        <Input placeholder={strings.NAME} value={name} onChangeText={(name) => setName(name)} lng={I18nManager.isRTL} image={Images.person} />
                        <Input placeholder={strings.EMAIL_ADDRESS} value={email} onChangeText={(email) => setEmail(email)} lng={I18nManager.isRTL} image={Images.mail} />
                        <Input
                            placeholder={strings.PASSWORD}
                            value={password}
                            onChangeText={(password) => setPassword(password)}
                            icon={
                                <TouchableOpacity onPress={() => {
                                    setIsSecureEntry((prev) => !prev)
                                }}>
                                    <Ionicons name={isSecureEntry ? "eye-outline" : "eye-off-outline"} size={20} />
                                </TouchableOpacity>
                            }
                            secureTextEntry={isSecureEntry}
                            lng={I18nManager.isRTL}
                            image={Images.lock}
                        />
                        <View style={styles.contain1}>
                            <View>
                                {loading ? (
                                    <View style={styles.loading}>
                                        <ActivityIndicator
                                            color={Colors.green}
                                            animating={loading}
                                        />
                                    </View>
                                ) : (
                                    <SimpleButton title={strings.SIGN_UP} onPress={signUp} style={{ fontFamily: 'AlegreyaRoman-Bold' }} />
                                )
                                }
                            </View>
                            <View style={styles.contain}>
                                <Text style={styles.text1}>Already have an account? </Text>
                                <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                                    <Text style={styles.text2}>Login</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </SafeAreaView>
            </ScrollView>
        </TouchableWithoutFeedback>
    )
}

export default SignUp