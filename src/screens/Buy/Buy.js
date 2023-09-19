import React, { useEffect, useState } from 'react'

import { View, TouchableOpacity, Text, FlatList, Dimensions, I18nManager, Alert, TouchableWithoutFeedback, Keyboard, SafeAreaView } from 'react-native'

import DropDownPicker from "react-native-custom-dropdown";
import { ActivityIndicator } from "react-native-paper";

import styles from './Styles'

import Input from '../../components/Input/Input'
import Header from '../../components/Header/Header';
import SimpleButton from '../../components/Button/SimpleButton';
import Colors from '../../components/Colors/Colors';
import Images from '../../components/Images/Images';

const { height, width } = Dimensions.get('screen');

import strings from '../../components/lng/LocalizedStrings';
import { addbuying } from '../../auth/FireBase';
import { FontFamily } from '../../helper/AppFontFamily';

const Buy = ({ navigation, route }) => {

    const [price, setPrice] = useState('')
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [type, setType] = useState('')
    const [types, setTypes] = useState([
        { label: 'Fuel', value: 'fuel' },
        { label: 'Fertilizers', value: 'fertilizers' },
        { label: 'Medicine', value: 'medicine' },
    ])
    const [loading, setLoading] = useState(false)

    const validate_field = () => {
        if (type == '') {
            Alert.alert(
                strings.ALERT,
                strings.PLEASE_SELECT_BUY_TYPE,
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

    const addBuying = () => {
        if (validate_field()) {
            setLoading(true)
            addbuying(route.params.title.id, 'buy', type, price)
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
                        title={route.params.title.landname + ' ' + strings.BUY}
                        onPress={() => navigation.goBack()}
                        backText={strings.BACK}
                    />
                    <View style={styles.main}>
                        {/* <View style={styles.title}>
                        <Text style={styles.text}>{strings.TYPE} : {strings.BUY}</Text>
                    </View> */}
                        <Text style={styles.text}>{strings.BUY_TYPE}</Text>
                        <View style={styles.pick}>
                            <DropDownPicker
                                placeholder={strings.TYPE}
                                placeholderStyle={{ color: '#8B8B8B', fontFamily: FontFamily.Alegreya_Regular }}
                                open={open}
                                value={value}
                                items={types}
                                setOpen={setOpen}
                                setValue={setValue}
                                setItems={setTypes}
                                style={styles.picker}
                                containerStyle={{ height: height * 0.07 }}
                                arrowColor={Colors.green}
                                onChangeItem={(type) => setType(type)}
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
                                <SimpleButton title={strings.SUBMIT} onPress={addBuying} />
                            )
                            }
                        </View>
                    </View>
                </SafeAreaView>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default Buy