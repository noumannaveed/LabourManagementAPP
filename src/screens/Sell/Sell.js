import React, { useState } from 'react'

import { View, Text, TextInput, I18nManager, TouchableWithoutFeedback, Keyboard, Dimensions, Alert, SafeAreaView } from 'react-native'

import styles from './Styles'

import DropDownPicker from "react-native-custom-dropdown";

import Input from '../../components/Input/Input'
import Header from '../../components/Header/Header';
import SimpleButton from '../../components/Button/SimpleButton';

import strings from '../../components/lng/LocalizedStrings';
import { addsell } from '../../auth/FireBase';
import Colors from '../../components/Colors/Colors';
import Images from '../../components/Images/Images';
import { FontFamily } from '../../helper/AppFontFamily';

const { height, width } = Dimensions.get('screen');

const Sell = ({ navigation, route }) => {

    const [price, setPrice] = useState('')
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [crop, setCrop] = useState('')
    const [crops, setCrops] = useState([
        { label: 'Cotton', value: 'cotton' },
        { label: 'Wheat', value: 'wheat' },
        { label: 'Rice', value: 'rice' },
    ])

    const validate_field = () => {
        if (crop == '') {
            Alert.alert(
                strings.ALERT,
                strings.SELECT_CROP_TYPE,
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

    const addSell = () => {
        console.log(route.params.title.id);
        if (validate_field()) {
            addsell(route.params.title.id, crop, price)
                .then((data) => {
                    console.log('data=', data);
                    navigation.goBack()
                })
                .catch(error => {
                    alert(error.error)
                })
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <SafeAreaView>
                    <Header
                        backIcon={'arrow-back-circle-outline'}
                        title={route.params.title.landname + ' ' + strings.SELL}
                        onPress={() => navigation.goBack()}
                        backText={strings.BACK}
                    />
                    <View style={styles.main}>
                        <Text style={styles.text}>{strings.CROP_TYPE}</Text>
                        <View style={styles.pick}>
                            <DropDownPicker
                                placeholder={strings.CROP}
                                placeholderStyle={{ color: '#8B8B8B', fontFamily: FontFamily.Alegreya_Regular }}
                                open={open}
                                value={value}
                                items={crops}
                                setOpen={setOpen}
                                setValue={setValue}
                                setItems={setCrops}
                                style={styles.picker}
                                containerStyle={{ height: height * 0.07 }}
                                arrowColor={Colors.green}
                                onChangeItem={(crop) => setCrop(crop)}
                                itemStyle={{
                                    justifyContent: 'flex-start',
                                }}
                                dropDownStyle={{
                                    borderTopLeftRadius: 20, borderTopRightRadius: 20,
                                    borderBottomLeftRadius: 20, borderBottomRightRadius: 20,
                                    backgroundColor: '#f5f5f5',
                                }}
                                activeLabelStyle={{ color: 'grey' }}
                                labelStyle={{
                                    color: 'black',
                                    width: width * 1
                                }}
                            />
                        </View>
                        <Text style={styles.text}>{strings.SELLING_AMOUNT}</Text>
                        <Input
                            placeholder={strings.PRICE}
                            value={price}
                            onChangeText={(price) => setPrice(price)}
                            lng={I18nManager.isRTL}
                            keyboardType='numeric'
                            image={Images.price}
                        />
                        <SimpleButton title={strings.SUBMIT} onPress={addSell} />
                    </View>
                </SafeAreaView>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default Sell