import React, { useEffect, useState } from 'react'

import { View, TouchableOpacity, Text, FlatList, Dimensions, I18nManager, ScrollView, Alert, TouchableWithoutFeedback, Keyboard, Image, SafeAreaView } from 'react-native'

import DropDownPicker from "react-native-custom-dropdown";

import Entypo from 'react-native-vector-icons/Entypo';

import styles from './Styles'

import { connect } from "react-redux";

import Input from '../../components/Input/Input'
import Header from '../../components/Header/Header';
import SimpleButton from '../../components/Button/SimpleButton';
import Colors from '../../components/Colors/Colors';
import Images from '../../components/Images/Images';

import DatePicker from 'react-native-date-picker'
// import { Picker, DatePicker } from 'react-native-wheel-pick';

import { ActivityIndicator } from "react-native-paper";

import strings from '../../components/lng/LocalizedStrings';
import { addpayment, getlabour, checkpresent, checkabsent, addmonthpayment } from '../../auth/FireBase';
import Attendee from '../../components/Attendee/Attendee';
import { FontFamily } from '../../helper/AppFontFamily';

const { height, width } = Dimensions.get('screen');

const Payment = ({ navigation, route, user, userId }) => {

    const [price, setPrice] = useState('')
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [name, setName] = useState('')
    const [names, setNames] = useState([])
    const getCurrentDate = () => {
        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
        //Alert.alert(date + '-' + month + '-' + year);
        // You can turn it in to your desired format
        return year + '-' + month + '-' + date;//format: dd-mm-yyyy;
    }

    const [startDate, setStartDate] = useState(new Date(getCurrentDate()))
    // const [startDate, setStartDate] = useState(new Date(getCurrentDate()))
    const [date, setDate] = useState()
    const [startOpen, setStartOpen] = useState(false)
    const [endDate, setEndDate] = useState(new Date(getCurrentDate()))
    const [endOpen, setEndOpen] = useState(false)
    //   const [open, setOpen] = useState(false)

    const [present, setPresent] = useState([])
    const [absent, setAbsent] = useState([])
    const [day, setDay] = useState('')
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
        } else if (price == '' && absent != '') {
            Alert.alert(
                strings.ALERT,
                strings.PLEASE_ENTER_GIVEN_AMOUNT,
                [
                    { text: strings.OK, onPress: () => console.log("OK Pressed") }
                ]
            );
            return false;
        }
        return true;
    }

    const getLabour = () => {
        getlabour(userId, setNames)
    }

    useEffect(() => {
        getLabour()
        // console.log(route.params.title);
    }, [])

    const getNextDate = (date) => {
        const Difference_In_Time = endDate.getTime() - date.getTime()
        var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24)
        Difference_In_Days
        let temp = []
        let date1 = startDate
        for (let i = 0; i <= Difference_In_Days; i++) {
            if (i === 0) {
                date1 = startDate
                temp.push({
                    date: startDate.getDate() + '-' + (startDate.getMonth() + 1) + '-' + startDate.getFullYear(),
                    col: (startDate.getMonth() + 1) + '-' + startDate.getFullYear()
                })
            } else {
                const currentDayInMilli = new Date(date1).getTime()
                const oneDay = 1000 * 60 * 60 * 24
                const nextDayInMilli = currentDayInMilli + oneDay
                var nextDate = new Date(nextDayInMilli)
                // setDate(nextDate)
                date1 = nextDate
                console.log('i', i, '=', date1);
                // date = nextDate.getDate() + '-' + (nextDate.getMonth() + 1) + '-' + nextDate.getFullYear()
                // col = (nextDate.getMonth() + 1) + '-' + nextDate.getFullYear()
                temp.push({
                    date: nextDate.getDate() + '-' + (nextDate.getMonth() + 1) + '-' + nextDate.getFullYear(),
                    col: (nextDate.getMonth() + 1) + '-' + nextDate.getFullYear()
                })
            }
        }
        return temp;
    }

    const addPayment = () => {
        if (validate_field()) {
            setLoading(true)
            if (name.value.wagetype === 'per day') {
                addpayment(userId, route.params.title.id, type = 'labour payment', name, price, present, total = name.value.wageprice * present.length)
                    .then((data) => {
                        console.log('data=', data);
                        navigation.goBack()
                        setLoading(false)
                    })
                    .catch(error => {
                        alert(error.error)
                        setLoading(false)
                    })
            } else if (name.value.wagetype === 'per month') {
                console.log(name.value.wagetype);
                addmonthpayment(userId, route.params.title.id, type = 'labour payment', name, price, ((date.getMonth() + 1) + '-' + date.getFullYear()), total = name.value.wageprice - (price * absent.length))
                    .then((data) => {
                        console.log('data=', data);
                        navigation.goBack()
                        setLoading(false)
                    })
                    .catch(error => {
                        alert(error.error)
                        setLoading(false)
                    })
            }
        }
    }

    const getFirstDate = (year, month) => {
        var date = 1;
        var month = month;
        var year = year;
        //Alert.alert(date + '-' + month + '-' + year);
        // You can turn it in to your desired format
        return year + '-' + month + '-' + date;//format: dd-mm-yyyy;
    }
    const getEndDate = (year, month) => {
        var date = 0;
        var month = month;
        var year = year;
        //Alert.alert(date + '-' + month + '-' + year);
        // You can turn it in to your desired format
        return year + '-' + month + '-' + date;//format: dd-mm-yyyy;
    }

    const renderItem = ({ item }) => (
        <Attendee
            title={item.date}
            // remove={remove}
            item={item}
        />
    );
    const renderItem1 = ({ item }) => (
        <Attendee
            title={item}
            // remove={remove}
            item={item}
        />
    );

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <SafeAreaView>
                    <Header
                        backIcon={'arrow-back-circle-outline'}
                        title={route.params.title.landname + ' ' + strings.LABOUR_PAYMENT}
                        onPress={() => navigation.goBack()}
                        backText={strings.BACK}
                    />
                    <ScrollView>
                        <View style={styles.main}>
                            {/* <View style={styles.title}>
                            <Text style={styles.text}>{strings.TYPE} : {strings.LABOUR_PAYMENT}</Text>
                        </View> */}
                            <Text style={styles.text}>{strings.LABOUR_NAME}</Text>
                            <View style={styles.pick}>
                                <DropDownPicker
                                    placeholder={strings.NAME}
                                    placeholderStyle={{ color: '#8B8B8B', fontFamily: FontFamily.Alegreya_Regular }}
                                    open={open}
                                    value={value}
                                    items={names}
                                    setOpen={setOpen}
                                    setValue={setValue}
                                    setItems={setNames}
                                    style={styles.picker}
                                    containerStyle={{ height: height * 0.07 }}
                                    arrowColor={Colors.green}
                                    onChangeItem={async (name) => {
                                        setName(name)
                                        setPresent('')
                                        setAbsent('')
                                        setDay('')
                                        let date1 = ''
                                        if (name.value.wagetype === 'per month') {
                                            setStartDate(new Date(getFirstDate(startDate.getFullYear(), (startDate.getMonth() + 1))))
                                            setEndDate(new Date(getEndDate(startDate.getFullYear(), (startDate.getMonth() + 2))))
                                            setDate(startDate)
                                            date1 = new Date(getEndDate(startDate.getFullYear(), (startDate.getMonth() + 2)))
                                            setAbsent([])
                                            checkabsent(userId, route.params.title.id, type = 'labour payment', name, price, date1)
                                                .then((data) => {
                                                    console.log('data=', data);
                                                    { data.temp1.length != 0 ? setAbsent(data.temp1) : setDay(data.days) }
                                                })
                                            // console.log(getNextDate());
                                        } else if (name.value.wagetype === 'per day') {
                                            let temp = await getNextDate(startDate)
                                            setPresent([])
                                            checkpresent(userId, route.params.title.id, type = 'labour payment', name, price, temp)
                                                .then((data) => {
                                                    console.log('data=', data);
                                                    setPresent(data.temp1)
                                                })
                                            // console.log(getNextDate());
                                        }
                                    }}
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
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: width * 0.05 }}>
                                <View>
                                    <Text style={styles.text}>{strings.START_DATE}:</Text>
                                    <TouchableOpacity
                                        style={styles.button1}
                                        onPress={() => setStartOpen(true)}
                                    >
                                        <Text style={styles.text3}>{startDate.getDate() + '-' + (startDate.getMonth() + 1) + '-' + startDate.getFullYear()}</Text>
                                    </TouchableOpacity>
                                </View>
                                <View>
                                    <Text style={styles.text}>{strings.END_DATE}:</Text>
                                    <TouchableOpacity
                                        style={styles.button1}
                                        onPress={() => setEndOpen(true)}
                                    >
                                        <Text style={styles.text3}>{endDate.getDate() + '-' + (endDate.getMonth() + 1) + '-' + endDate.getFullYear()}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <DatePicker
                                title={strings.DATE}
                                modal
                                mode='date'
                                open={startOpen}
                                date={startDate}
                                // maximumDate={new Date(getCurrentDate())}
                                confirmText={strings.CONFIRM}
                                cancelText={strings.CANCEL}
                                onConfirm={(date) => {
                                    setStartOpen(false)
                                    if (validate_field()) {
                                        if (name.value.wagetype === 'per month') {
                                            date = new Date(getFirstDate(date.getFullYear(), (date.getMonth() + 1)))
                                        }
                                        console.log('DATE=', date);
                                        setStartOpen(false)
                                        setStartDate(date)
                                        setDate(date)
                                        console.log(date.getDate() + '-' + parseInt(date.getMonth() + 1) + '-' + date.getFullYear());
                                    }
                                }}
                                onCancel={() => {
                                    setStartOpen(false)
                                }}
                            />
                            <DatePicker
                                title={strings.DATE}
                                modal
                                mode='date'
                                open={endOpen}
                                date={endDate}
                                minimumDate={startDate}
                                // maximumDate={new Date(getCurrentDate())}
                                confirmText={strings.CONFIRM}
                                cancelText={strings.CANCEL}
                                onConfirm={async (date) => {
                                    setEndOpen(false)

                                    if (validate_field()) {
                                        if (name.value.wagetype === 'per month') {
                                            date = new Date(getEndDate(startDate.getFullYear(), (startDate.getMonth() + 2)))
                                            setEndDate(date)
                                            setAbsent([])
                                            checkabsent(userId, route.params.title.id, type = 'labour payment', name, price, date)
                                                .then((data) => {
                                                    console.log('data=', data);
                                                    { data.temp1.length != 0 ? setAbsent(data.temp1) : setDay(data.days) }
                                                })
                                            // console.log(getNextDate());
                                        } else if (name.value.wagetype === 'per day') {
                                            setEndDate(date)
                                            let temp = await getNextDate(startDate)
                                            setPresent([])
                                            checkpresent(userId, route.params.title.id, type = 'labour payment', name, price, temp)
                                                .then((data) => {
                                                    console.log('data=', data);
                                                    setPresent(data.temp1)
                                                })
                                            // console.log(getNextDate());
                                        }
                                    }
                                }}
                                onCancel={() => {
                                    setEndOpen(false)
                                }}
                            />
                            {name != '' && absent != '' || present != '' ? (
                                <View>
                                    {name.value.wagetype === 'per day' ? (
                                        <Text style={styles.text}>{strings.GIVEN_AMOUNT}</Text>
                                    ) : (
                                        <Text style={styles.text}>{strings.FINE_PER_DAY}</Text>
                                    )}
                                    <Input
                                        placeholder={strings.PRICE}
                                        value={price}
                                        onChangeText={(price) => setPrice(price)}
                                        lng={I18nManager.isRTL}
                                        keyboardType='numeric'
                                        image={Images.price}
                                    />
                                </View>
                            ) : (
                                <View></View>
                            )
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
                                    <SimpleButton title={strings.SUBMIT} onPress={addPayment} />
                                )
                                }
                            </View>
                            {name != '' ?
                                <View>
                                    <View style={styles.detail1}>
                                        <Text style={styles.text}>{strings.LABOURTYPE}:</Text>
                                        <Text style={styles.text2}>{name.value.labourtype.label}</Text>
                                    </View>
                                    <View style={styles.detail1}>
                                        <Text style={styles.text}>{strings.PRICE}:</Text>
                                        <Text style={styles.text2}>{name.value.wageprice} -/Rs {name.value.wagetype}</Text>
                                    </View>
                                </View>
                                :
                                <View></View>
                            }
                            {present != '' ?
                                <View>
                                    <View style={styles.detail}>
                                        <Text style={styles.text}>{strings.PRESENT_DATES}:</Text>
                                    </View>
                                    <FlatList
                                        data={present}
                                        horizontal={true}
                                        renderItem={renderItem}
                                    // keyExtractor={item => item.value.id}
                                    />
                                    <View>
                                        <View style={styles.detail1}>
                                            <Text style={styles.text}>{strings.PRESENT_DAYS}:</Text>
                                            <Text style={styles.text2}>{present.length}</Text>
                                        </View>
                                        <View style={styles.detail1}>
                                            <Text style={styles.text}>{strings.PER_DAY_WAGE}:</Text>
                                            <Text style={styles.text2}>{name.value.wageprice} -/Rs</Text>
                                        </View>
                                        <View style={styles.seprator}></View>
                                        <View style={styles.detail1}>
                                            <Text style={styles.text}>{strings.TOTAL}:</Text>
                                            <Text style={styles.text2}>{name.value.wageprice * present.length} -/Rs</Text>
                                        </View>
                                    </View>
                                </View>
                                :
                                <View></View>
                            }
                            {absent != '' || day === 0 ?
                                <View>
                                    <View style={styles.detail}>
                                        <Text style={styles.text}>{strings.ABSENT_DATES}:</Text>
                                    </View>
                                    <FlatList
                                        data={absent}
                                        horizontal={true}
                                        renderItem={renderItem1}
                                    // keyExtractor={item => item.value.id}
                                    />
                                    <View>
                                        <View style={styles.detail1}>
                                            <Text style={styles.text}>{strings.ABSENT_DAYS}:</Text>
                                            <Text style={styles.text2}>{absent.length}</Text>
                                        </View>
                                        <View style={styles.detail1}>
                                            <Text style={styles.text}>{strings.FINE_PER_DAY}:</Text>
                                            <Text style={styles.text2}>{price} -/Rs</Text>
                                        </View>
                                        <View style={styles.detail1}>
                                            <Text style={styles.text}>{strings.PER_MONTH_WAGE}:</Text>
                                            <Text style={styles.text2}>{name.value.wageprice} -/Rs</Text>
                                        </View>
                                        <View style={styles.seprator}></View>
                                        <View style={styles.detail1}>
                                            <Text style={styles.text}>{strings.TOTAL}:</Text>
                                            <Text style={styles.text2}>{name.value.wageprice - (price * absent.length)} -/Rs</Text>
                                        </View>
                                    </View>
                                </View>
                                :
                                <View></View>
                            }
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </View>
        </TouchableWithoutFeedback>
    )
}

const mapStateToProps = (state, props) => {
    return { user: state.userReducer.user, userId: state.userReducer.userId };
}
export default connect(mapStateToProps)(Payment)