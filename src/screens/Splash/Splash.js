import React, { useEffect } from 'react'

import { View, Text, I18nManager, ImageBackground, Image } from 'react-native'
import styles from './Styles'

import strings from '../../components/lng/LocalizedStrings'
import { getLng } from '../../helper/ChangeLang'

import AsyncStorage from '@react-native-async-storage/async-storage'

import { useDispatch } from 'react-redux';
import { setUser, setUserId } from '../../redux/actions';

import Images from '../../components/Images/Images'

import firestore from '@react-native-firebase/firestore';

const Splash = ({ navigation }) => {

    const dispatch = useDispatch();

    const checkLogin = async () => {
        let value = await AsyncStorage.getItem('uid');
        let parse = JSON.parse(value)
        setTimeout(() => {
            if (value === null) {
                navigation.replace("SignIn");
            } else if (value != null) {
                firestore()
                    .collection('Users')
                    .doc(parse.user.uid)
                    .get()
                    .then(async (data) => {
                        await dispatch(setUser(data.data()));
                        await dispatch(setUserId(data.id));
                        navigation.replace("Home");
                    })
            }
        }, 5000);
    }

    useEffect(() => {
        checkLogin()
        // selectedLng()
    }, [])

    const selectedLng = async () => {
        let lngData = await getLng()
        if (!!lngData) {
            strings.setLanguage(lngData)
            lngData = await getLng()
        } else if (I18nManager.isRTL) {
            await strings.setLanguage('ur')
            lngData = await getLng()
        } else if (!I18nManager.isRTL) {
            await strings.setLanguage('en')
            lngData = await getLng()
        }
        console.log('Language data1=', lngData);
    }
    return (
        <View style={styles.container}>
            <ImageBackground
                source={Images.splash_background}
                style={styles.background}
                // resizeMode='contain'
            >
                <Image
                    source={Images.splash_logo}
                    style={styles.logo}
                />
            </ImageBackground>
        </View>
    )
}

export default Splash