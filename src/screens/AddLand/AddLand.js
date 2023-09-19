import React, { useEffect, useState } from 'react'

import { View, ScrollView, Text, Dimensions, I18nManager, Alert, TouchableWithoutFeedback, Keyboard, SafeAreaView } from 'react-native'

import { RadioButton } from 'react-native-paper';

import styles from './Styles'

import SimpleButton from '../../components/Button/SimpleButton';

import DropDownPicker from "react-native-custom-dropdown";


import { connect } from "react-redux";

import Input from '../../components/Input/Input'
import Header from '../../components/Header/Header';

import strings from '../../components/lng/LocalizedStrings';
import { addland } from '../../auth/FireBase';

import { ActivityIndicator } from "react-native-paper";
import Images from '../../components/Images/Images';
import { FontFamily } from '../../helper/AppFontFamily';
import Colors from '../../components/Colors/Colors';

const { height, width } = Dimensions.get('screen');


const AddLand = ({ navigation, route, user, userId }) => {

    const [name, setName] = useState('')
    const [area, setArea] = useState('')
    const [rent, setRent] = useState('')
    const [checked, setChecked] = useState('');
    const [loading, setLoading] = useState(false)

    const [season, setSeason] = useState('')
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [crop, setCrop] = useState('')
    const [crops, setCrops] = useState([
        { label: 'Cotton', value: 'cotton' },
        { label: 'Wheat', value: 'wheat' },
        { label: 'Rice', value: 'rice' },
    ])

    const validate_field = () => {
        if (name == '') {
            Alert.alert(
                strings.ALERT,
                strings.PLEASE_ENTER_LAND_NAME,
                [
                    { text: strings.OK, onPress: () => console.log("OK Pressed") }
                ]
            );
            return false;
        } else if (area == '') {
            Alert.alert(
                strings.ALERT,
                strings.PLEASE_ENTER_LAND_AREA,
                [
                    { text: strings.OK, onPress: () => console.log("OK Pressed") }
                ]
            );
            return false;
        } else if (checked == '') {
            Alert.alert(
                strings.ALERT,
                strings.PLEASE_SELECT_LAND_TYPE,
                [
                    { text: strings.OK, onPress: () => console.log("OK Pressed") }
                ]
            );
            return false;
        } else if (checked === 'rent' && rent == '') {
            Alert.alert(
                strings.ALERT,
                strings.PLEASE_ENTER_RENT,
                [ 
                    { text: strings.OK, onPress: () => console.log("OK Pressed") }
                ]
            );
            return false;
        } else if (crop == '') {
            Alert.alert(
                strings.ALERT,
                strings.SELECT_CROP_TYPE,
                [
                    { text: strings.OK, onPress: () => console.log("OK Pressed") }
                ]
            );
            return false;
        } else if (season == '') {
            Alert.alert(
                strings.ALERT,
                strings.PLEASE_ENTER_CROP_SEASON,
                [
                    { text: strings.OK, onPress: () => console.log("OK Pressed") }
                ]
            );
            return false;
        }
        return true;
    }

    const addLand = () => {
        if (validate_field()) {
            setLoading(true)
            addland(userId, name, area, rent, checked)
                .then((user) => {
                    navigation.navigate('Home')
                    setLoading(false)
                })
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <SafeAreaView style={styles.container}>
                <View>
                    <Header
                        backIcon={'arrow-back-circle-outline'}
                        title={strings.ADD}
                        onPress={() => navigation.navigate('Home')}
                    />
                    <ScrollView>
                        <View style={styles.main}>
                            <Text style={styles.text}>{strings.LAND_TYPE}</Text>
                            <View style={styles.radio}>
                                <View style={styles.button}>
                                    <RadioButton
                                        value="owner"
                                        status={checked === 'owner' ? 'checked' : 'unchecked'}
                                        onPress={() => setChecked('owner')}
                                        color={Colors.green}
                                    />
                                    <Text style={styles.text2}>{strings.OWNER}</Text>
                                </View>
                                <View style={styles.button}>
                                    <RadioButton
                                        value="rent"
                                        status={checked === 'rent' ? 'checked' : 'unchecked'}
                                        onPress={() => setChecked('rent')}
                                        color={Colors.green}
                                    />
                                    <Text style={styles.text2}>{strings.RENT}</Text>
                                </View>
                            </View>
                            {checked === 'rent' ?
                                <Input
                                    placeholder={strings.RENT_PER_ACRE}
                                    value={rent}
                                    onChangeText={(rent) => setRent(rent)}
                                    lng={I18nManager.isRTL}
                                    keyboardType='numeric'
                                    image={Images.area}
                                /> :
                                <View></View>
                            }
                            <Text style={styles.text}>{strings.LAND_NAME}</Text>
                            <Input placeholder={strings.LAND_NAME} value={name} onChangeText={(name) => setName(name)} lng={I18nManager.isRTL} image={Images.land_name} />
                            <Text style={styles.text}>{strings.LAND_AREA}</Text>
                            <Input
                                placeholder={strings.LAND_AREA}
                                value={area}
                                onChangeText={(area) => setArea(area)}
                                lng={I18nManager.isRTL}
                                keyboardType='numeric'
                                image={Images.area}
                            />
                            <View style={styles.title}>
                                <Text style={styles.text}>{strings.CROP_TYPE}</Text>
                            </View>
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
                            <View style={styles.title}>
                                <Text style={styles.text}>{strings.CROP_SEASON}</Text>
                            </View>
                            <Input
                                placeholder={strings.EG_2022}
                                value={season}
                                onChangeText={(season) => setSeason(season)}
                                lng={I18nManager.isRTL}
                                keyboardType='numeric'
                                image={Images.calander}
                            />
                            <View style={styles.contain1}>
                                {loading ? (
                                    <View style={styles.loading}>
                                        <ActivityIndicator
                                            color={Colors.green}
                                            animating={loading}
                                        />
                                    </View>
                                ) : (
                                    <SimpleButton title={strings.SUBMIT} onPress={addLand} />
                                )
                                }
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

const mapStateToProps = (state, props) => {
    return { user: state.userReducer.user, userId: state.userReducer.userId };
}
export default connect(mapStateToProps)(AddLand)