import React, { useEffect, useState } from 'react'

import { View, TouchableOpacity, Text, I18nManager, Image, ScrollView, Alert, TouchableWithoutFeedback, Keyboard, ImageBackground, SafeAreaView } from 'react-native'

import Ionicons from 'react-native-vector-icons/Ionicons';

import SimpleButton from '../../components/Button/SimpleButton';

import styles from './Styles'

import Input from '../../components/Input/Input'

import strings from '../../components/lng/LocalizedStrings';

import { setLng, getLng } from '../../helper/ChangeLang';

import RNRestart from 'react-native-restart'

import { useDispatch } from 'react-redux';
import { setUser, setUserId } from '../../redux/actions';

import firestore from '@react-native-firebase/firestore';

import Images from '../../components/Images/Images';
import { login } from '../../auth/FireBase';

import { ActivityIndicator } from "react-native-paper";
import { FontFamily } from '../../helper/AppFontFamily';
import Colors from '../../components/Colors/Colors';

const SignIn = ({ navigation, route }) => {

    const dispatch = useDispatch();

    // useEffect(() => {
    //     selectedLng()
    // }, [])

    // const selectedLng = async () => {
    //     const lngData = await getLng()
    //     if (!!lngData) {
    //         strings.setLanguage(lngData)
    //     }
    //     console.log('Language data=', lngData);
    // }

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSecureEntry, setIsSecureEntry] = useState(true);
    const [loading, setLoading] = useState(false)

    const validate_field = () => {
        if (email == '') {
            Alert.alert(
                strings.ALERT,
                strings.PLEASE_ENTER_EMAIL,
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
        }
        return true;
    }

    const logIn = () => {
        if (validate_field()) {
            setLoading(true)
            login(email, password)
                .then((user) => {
                    console.log('qwe=', user.user.user.uid);
                    setLoading(false)
                    firestore()
                        .collection('Users')
                        .doc(user.user.user.uid)
                        .get()
                        .then(async (data) => {
                            console.log(data.id);
                            await dispatch(setUser(data.data()));
                            await dispatch(setUserId(data.id));
                            navigation.replace('Home');
                        })
                })
                .catch((error) => {
                    console.log(error);
                    alert(error.error);
                    setLoading(false)
                })
        }
    }

    const onChangeLng = async (lng) => {
        if (lng === 'en') {
            await I18nManager.forceRTL(false)
            setLng('en')
            RNRestart.Restart()
            return;
        }
        if (lng === 'ur') {
            await I18nManager.forceRTL(true)
            setLng('ur')
            RNRestart.Restart()
            return;
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
                <ImageBackground
                    style={styles.container}
                    source={Images.signIn}
                // resizeMode='contain'
                >
                    {/* <View style={I18nManager.isRTL ? styles.flagStart : styles.flagEnd}>
                        <Button
                            styleBtn={styles.styleBtn}
                            title={I18nManager.isRTL ? 'Eng' : 'اردو'}
                            onPress={() => { I18nManager.isRTL ? onChangeLng('en') : onChangeLng('ur') }}
                        />
                        <Image
                            source={I18nManager.isRTL ? Images.english : Images.urdu}
                            style={styles.image}
                            resizeMode='contain'
                        />
                    </View> */}
                    <SafeAreaView>
                        <Image
                            source={Images.splash_logo}
                            style={styles.logo}
                        />
                        <View style={styles.main}>
                            <View style={styles.contain1}>
                                <Text style={styles.text}>Sign In</Text>
                                <Text style={styles.text1}>Welcome to Pak Kissan</Text>
                            </View>
                            <View style={styles.contain1}>
                                <Input placeholder={strings.EMAIL_ADDRESS} value={email} onChangeText={(email) => setEmail(email)} lng={I18nManager.isRTL} image={Images.person} />
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
                            </View>
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
                                        <SimpleButton title='Sign In' onPress={logIn} style={{ fontFamily: FontFamily.AlegreyaRoman_Bold }} />
                                    )
                                    }
                                </View>
                                <View style={styles.contain}>
                                    <Text style={styles.text1}>Create a new account? </Text>
                                    <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                                        <Text style={styles.text2}>{strings.SIGN_UP}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </SafeAreaView>
                </ImageBackground>
            </ScrollView>
        </TouchableWithoutFeedback>
    )
}

export default SignIn