import React, { useState } from 'react'

import { View, Text, TextInput, I18nManager, Alert, TouchableWithoutFeedback, Keyboard, SafeAreaView } from 'react-native'

import styles from './Styles'

import Input from '../../components/Input/Input'
import Header from '../../components/Header/Header';
import SimpleButton from '../../components/Button/SimpleButton';

import strings from '../../components/lng/LocalizedStrings';
import { addother } from '../../auth/FireBase';

import { ActivityIndicator } from "react-native-paper";
import Images from '../../components/Images/Images';
import { FontFamily } from '../../helper/AppFontFamily';
import Colors from '../../components/Colors/Colors';

const Other = ({ navigation, route }) => {

    const [price, setPrice] = useState('')
    const [name, setName] = useState('')
    const [detail, setDetail] = useState('')
    const [loading, setLoading] = useState(false)

    const validate_field = () => {
        if (name == '') {
            Alert.alert(
                strings.ALERT,
                strings.PLEASE_ENTER_NAME,
                [
                    { text: strings.OK, onPress: () => console.log("OK Pressed") }
                ]
            );
            return false;
        } else if (detail == '') {
            Alert.alert(
                strings.ALERT,
                strings.PLEASE_ENTER_DETAILS,
                [
                    { text: strings.OK, onPress: () => console.log("OK Pressed") }
                ]
            );
            return false;
        } else if (price == '') {
            Alert.alert(
                strings.ALERT,
                strings.PLEASE_ENTER_PRICE,
                [
                    { text: strings.OK, onPress: () => console.log("OK Pressed") }
                ]
            );
            return false;
        }
        return true;
    }

    const addOther = () => {
        if (validate_field()) {
            setLoading(true)
            addother(route.params.title.id, 'other', name, detail, price)
                .then(() => {
                    navigation.goBack()
                    setLoading(false)
                })
            console.log(route.params.title.id);
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <SafeAreaView>
                    <Header
                        backIcon={'arrow-back-circle-outline'}
                        title={route.params.title.landname + ' ' + strings.OTHER}
                        onPress={() => navigation.goBack()}
                        backText={strings.BACK}
                    />
                    <View style={styles.main}>
                        {/* <View style={styles.title}>
                        <Text style={styles.text}>{strings.TYPE} : {strings.OTHER}</Text>
                    </View> */}
                        <Text style={styles.text}>{strings.ADD_NAME}</Text>
                        <Input placeholder={strings.NAME} value={name} onChangeText={(name) => setName(name)} lng={I18nManager.isRTL} image={Images.person} />
                        <Text style={styles.text}>{strings.DETAILS}</Text>
                        <View style={styles.input}>
                            <TextInput
                                placeholder={strings.DETAILS}
                                placeholderTextColor='#8B8B8B'
                                fontStyle={FontFamily.Alegreya_Regular}
                                onChangeText={(detail) => setDetail(detail)}
                                value={detail}
                                style={I18nManager.isRTL ? styles.detailRight : styles.detailLeft}
                            />
                        </View>
                        <Text style={styles.text}>{strings.AMOUNT}</Text>
                        <Input
                            placeholder={strings.PRICE}
                            value={price}
                            onChangeText={(price) => setPrice(price)}
                            lng={I18nManager.isRTL}
                            keyboardType='numeric'
                            image={Images.price}
                        />
                        <View>
                            {loading ? (
                                <View style={styles.loading}>
                                    <ActivityIndicator
                                        color={Colors.green}
                                        animating={loading}
                                    />
                                </View>
                            ) : (
                                <SimpleButton title={strings.SUBMIT} onPress={addOther} />
                            )
                            }
                        </View>
                    </View>
                </SafeAreaView>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default Other