import React, { useEffect, useState } from 'react'

import { View, TouchableOpacity, Text, FlatList, Dimensions, I18nManager, Alert, TouchableWithoutFeedback, Keyboard, SafeAreaView } from 'react-native'

import DropDownPicker from "react-native-custom-dropdown";

import Entypo from 'react-native-vector-icons/Entypo';

import styles from './Styles'

import Input from '../../components/Input/Input'
import Header from '../../components/Header/Header';
import SimpleButton from '../../components/Button/SimpleButton';
import Colors from '../../components/Colors/Colors';
import Images from '../../components/Images/Images';

import { connect } from "react-redux";

import strings from '../../components/lng/LocalizedStrings'
import { landdetail } from '../../auth/FireBase';

import { ActivityIndicator } from "react-native-paper";
import { FontFamily } from '../../helper/AppFontFamily';

const { height, width } = Dimensions.get('screen');

const LandDetail = ({ navigation, route, user, userId }) => {

    const [season, setSeason] = useState('')
    const [area, setArea] = useState('')
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [crop, setCrop] = useState('')
    const [crops, setCrops] = useState([
        { label: 'Cotton', value: 'cotton' },
        { label: 'Wheat', value: 'wheat' },
        { label: 'Rice', value: 'rice' },
    ])
    const [loading, setLoading] = useState(false)

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
        } else if (season == '') {
            Alert.alert(
                strings.ALERT,
                strings.PLEASE_ENTER_CROP_SEASON,
                [
                    { text: strings.OK, onPress: () => console.log("OK Pressed") }
                ]
            );
            return false;
        } else if (area == '') {
            Alert.alert(
                strings.ALERT,
                strings.PLEASE_ENTER_CROP_AREA,
                [
                    { text: strings.OK, onPress: () => console.log("OK Pressed") }
                ]
            );
            return false;
        }
        return true;
    }

    const landDetail = () => {
        if (validate_field()) {
            setLoading(true)
            landdetail(userId, route.params.title.id, crop, season, area)
                .then(() => {
                    navigation.goBack()
                    setLoading(false)
                })
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <SafeAreaView>
                    <Header
                        backIcon={'arrow-back-circle-outline'}
                        title={route.params.title.landname + ' ' + strings.DETAIL}
                        onPress={() => navigation.goBack()}
                        backText={strings.BACK}
                    />
                    <View style={styles.main}>
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
                        <View style={styles.title}>
                            <Text style={styles.text}>{strings.CROP_AREA}</Text>
                        </View>
                        <Input
                            placeholder={strings.EG_3_ACRE}
                            value={area}
                            onChangeText={(area) => setArea(area)}
                            lng={I18nManager.isRTL}
                            keyboardType='numeric'
                            image={Images.area}
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
                                <SimpleButton title={strings.SUBMIT} onPress={landDetail} />
                            )
                            }
                        </View>
                    </View>
                </SafeAreaView>
            </View>
        </TouchableWithoutFeedback>
    )
}

const mapStateToProps = (state, props) => {
    return { user: state.userReducer.user, userId: state.userReducer.userId };
}
export default connect(mapStateToProps)(LandDetail)