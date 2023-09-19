import React, { useEffect, useState } from 'react'

import { View, TouchableOpacity, Text, FlatList, Dimensions, I18nManager, Alert, TouchableWithoutFeedback, Keyboard, SafeAreaView } from 'react-native'

import { RadioButton } from 'react-native-paper';

import DropDownPicker from "react-native-custom-dropdown";

import Entypo from 'react-native-vector-icons/Entypo';

import styles from './Styles'

import Input from '../../components/Input/Input'
import Header from '../../components/Header/Header';
import SimpleButton from '../../components/Button/SimpleButton';

import { connect } from "react-redux";

import strings from '../../components/lng/LocalizedStrings';
import { addlabour } from '../../auth/FireBase';

import { ActivityIndicator } from "react-native-paper";
import Images from '../../components/Images/Images';
import Colors from '../../components/Colors/Colors';
import { FontFamily } from '../../helper/AppFontFamily';

const { height, width } = Dimensions.get('screen');

const LabourDetail = ({ navigation, route, user, userId }) => {

    const [checked, setChecked] = useState('');
    const [price, setPrice] = useState('')
    const [name, setName] = useState('')
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [labour, setLabour] = useState('')
    const [labours, setLabours] = useState([
        { label: 'Permanent', value: 'parmanent' },
        { label: 'Visitor', value: 'visitor' },
        { label: 'Contractor', value: 'contractor' },
    ])
    const [loading, setLoading] = useState(false)

    const validate_field = () => {
        if (name == '') {
            Alert.alert(
                strings.ALERT,
                strings.PLEASE_ENTER_LABOUR_NAME,
                [
                    { text: strings.OK, onPress: () => console.log("OK Pressed") }
                ]
            );
            return false;
        } else if (labour == '') {
            Alert.alert(
                strings.ALERT,
                strings.PLEASE_ENTER_LABOUR_TYPE,
                [
                    { text: strings.OK, onPress: () => console.log("OK Pressed") }
                ]
            );
            return false;
        } else if (checked == '') {
            Alert.alert(
                strings.ALERT,
                strings.PLEASE_SELECT_WAGE,
                [
                    { text: strings.OK, onPress: () => console.log("OK Pressed") }
                ]
            );
            return false;
        } else if (checked === 'per day' && price == '') {
            Alert.alert(
                strings.ALERT,
                strings.PLEASE_ENTER_PRICE,
                [
                    { text: strings.OK, onPress: () => console.log("OK Pressed") }
                ]
            );
            return false;
        } else if (checked === 'per month' && price == '') {
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

    const addLabour = () => {
        if (validate_field()) {
            setLoading(true)
            addlabour(userId, name, labour, checked, price)
                .then((data) => {
                    alert(data.error)
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
                        title={route.params.title.landname + ' ' + strings.LABOUR}
                        onPress={() => navigation.goBack()}
                        backText={strings.BACK}
                    />
                    <View style={styles.main}>
                        <View style={styles.title}>
                            <Text style={styles.text}>{strings.LABOUR_NAME}</Text>
                        </View>
                        <Input placeholder={strings.NAME} value={name} onChangeText={(name) => setName(name)} lng={I18nManager.isRTL} image={Images.person} />
                        <View style={styles.title}>
                            <Text style={styles.text}>{strings.TYPE}</Text>
                        </View>
                        <View style={styles.pick}>
                            <DropDownPicker
                                placeholder={strings.LABOUR_TYPE}
                                placeholderStyle={{ color: '#8B8B8B', fontFamily: FontFamily.Alegreya_Regular }}
                                open={open}
                                value={value}
                                items={labours}
                                setOpen={setOpen}
                                setValue={setValue}
                                setItems={setLabours}
                                style={styles.picker}
                                containerStyle={{ height: height * 0.07 }}
                                arrowColor={Colors.green}
                                onChangeItem={(labour) => setLabour(labour)}
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
                            <Text style={styles.text}>{strings.WAGE}</Text>
                        </View>
                        <View style={styles.button}>
                            <RadioButton
                                value="per day"
                                status={checked === 'per day' ? 'checked' : 'unchecked'}
                                onPress={() => setChecked('per day')}
                                color={Colors.green}
                            />
                            <Text style={styles.text1}>{strings.PER_DAY}</Text>
                        </View>
                        {checked === 'per day' ?
                            <View>
                                <View style={styles.title}>
                                    <Text style={styles.text}>{strings.PRICE}</Text>
                                </View>
                                <Input
                                    placeholder={strings.PRICE}
                                    value={price}
                                    onChangeText={(price) => setPrice(price)}
                                    lng={I18nManager.isRTL}
                                    keyboardType='numeric'
                                    image={Images.price}
                                />
                            </View>
                            :
                            <View></View>
                        }
                        <View style={styles.button}>
                            <RadioButton
                                value="per month"
                                status={checked === 'per month' ? 'checked' : 'unchecked'}
                                onPress={() => setChecked('per month')}
                                color={Colors.green}
                            />
                            <Text style={styles.text1}>{strings.PER_MONTH}</Text>
                        </View>
                        {checked === 'per month' ?
                            <View>
                                <View style={styles.title}>
                                    <Text style={styles.text}>{strings.PRICE}</Text>
                                </View>
                                <Input
                                    placeholder={strings.PRICE}
                                    value={price}
                                    onChangeText={(price) => setPrice(price)}
                                    lng={I18nManager.isRTL}
                                    keyboardType='numeric'
                                    image={Images.price}
                                />
                            </View>
                            :
                            <View></View>
                        }
                        <View>
                            {loading ? (
                                <View style={styles.loading}>
                                    <ActivityIndicator
                                        color={Colors.green}
                                        animating={loading}
                                    />
                                </View>
                            ) : (
                                <SimpleButton title={strings.SUBMIT} onPress={addLabour} />
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
export default connect(mapStateToProps)(LabourDetail)