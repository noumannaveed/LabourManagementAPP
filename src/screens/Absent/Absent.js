import React, { useState, useEffect } from 'react'

import { View, Text, TextInput, I18nManager, Dimensions, Alert, FlatList, TouchableOpacity, SafeAreaView } from 'react-native'

import styles from './Styles'

import DatePicker from 'react-native-date-picker'

import DropDownPicker from "react-native-custom-dropdown";
import { connect } from "react-redux";
import Header from '../../components/Header/Header';
import SimpleButton from '../../components/Button/SimpleButton';

import strings from '../../components/lng/LocalizedStrings';
import { getabsent, getattendence, getlabour, markabsent, markattendence } from '../../auth/FireBase';
import Attendee from '../../components/Attendee/Attendee';
import Colors from '../../components/Colors/Colors';
import Attend from '../../components/Attendee/Attend';
import Images from '../../components/Images/Images';
import { FontFamily } from '../../helper/AppFontFamily';

const { height, width } = Dimensions.get('screen');

const Absent = ({ navigation, route, user, userId }) => {

    console.log(route.params.title);

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [name, setName] = useState([])
    const [names, setNames] = useState([])
    const [DATA, setDATA] = useState([])
    const [DATA1, setDATA1] = useState([])

    const getCurrentDate = () => {
        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
        console.log(date + '-' + month + '-' + year);
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
        }
        return true;
    }

    const getLabour = () => {
        getabsent(userId, setNames, setDATA, setDATA1, route.params.title.id, getCurrentDate())
            .then((data) => {
                console.log('data=', data.temp1);
                setDATA1(data.temp1)
                setNames(data.temp)
            })
    }

    useEffect(() => {
        getLabour()
    }, [])

    const getNextDate = () => {
        const Difference_In_Time = endDate.getTime() - startDate.getTime()
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

    const removeDuplicate = () => {
        const newArrayList = [];
        DATA.forEach(obj => {
            if (!newArrayList.some(o => o.value.id === obj.value.id)) {
                newArrayList.push({ ...obj });
            }
        });
        setDATA(newArrayList)
        // this.setState({ userList: newArrayList });
    }

    const remove = (item1) => {
        let newArrayList = DATA;
        // console.log(item.value.id);
        let index = newArrayList.indexOf(item1)
        newArrayList.splice(index, 1)
        newArrayList = newArrayList.filter((item) => item.value.id != item1.value.id);
        console.log(newArrayList);
        setDATA(newArrayList)
        // setDATA(newArrayList)
        // this.setState({ userList: newArrayList });
    }

    const handleChange = (name) => {
        let temp = DATA
        temp.push({
            ...name
        })
        setDATA(temp)
        removeDuplicate()
        console.log(DATA);
    }

    const markAbsent = () => {
        if (validate_field()) {
            markabsent(userId, name, route.params.title.id, getNextDate(), setDATA, DATA1, setDATA1)
        }
    }

    const renderItem = ({ item }) => (
        <Attendee
            title={item.label}
            remove={remove}
            item={item}
            icon='circle-with-cross'
        />
    );

    const renderItem1 = ({ item }) => (
        <Attend
            title={item.label}
            image={Images.attendence}
        />
    );

    return (
        <View style={styles.container}>
            <SafeAreaView>
                <Header
                    backIcon={'arrow-back-circle-outline'}
                    title={route.params.title.landname + ' ' + strings.ABSENT}
                    onPress={() => navigation.goBack()}
                    backText={strings.BACK}
                />
                <View style={styles.main}>
                    {/* <View style={styles.title}>
                    <Text style={styles.text}>{strings.DATE} : {getCurrentDate()}</Text>
                </View> */}
                    <Text style={styles.text}>{strings.LABOUR_NAME}</Text>
                    <View style={styles.pick}>
                        <DropDownPicker
                            placeholder={strings.NAME}
                            placeholderStyle={{ color: '#8B8B8B', fontFamily: FontFamily.Alegreya_Regular }}
                            searchable={true}
                            searchablePlaceholder="Search for an item"
                            searchablePlaceholderTextColor='#8B8B8B'
                            searchTextInputProps={{ color: 'black' }}
                            searchableError={() => <Text>Not Found</Text>}
                            open={open}
                            value={value}
                            items={names}
                            setOpen={setOpen}
                            setValue={setValue}
                            setItems={setNames}
                            renderBadgeItem={(props) => <Button {...props} />}
                            style={styles.picker}
                            containerStyle={{ height: height * 0.07 }}
                            arrowColor={Colors.green}
                            onChangeItem={(name) => {
                                setName(name)
                                handleChange(name)
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
                            setStartDate(date)
                            setDate(date)
                            console.log(date.getDate() + '-' + parseInt(date.getMonth() + 1) + '-' + date.getFullYear());
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
                            setEndDate(date)
                            let temp = await getNextDate(date)
                            console.log(temp);
                        }}
                        onCancel={() => {
                            setEndOpen(false)
                        }}
                    />
                    {/* <FlatList
                    data={DATA}
                    horizontal={true}
                    renderItem={renderItem}
                // keyExtractor={item => item.value.id}
                /> */}
                    <SimpleButton title={strings.SUBMIT} onPress={markAbsent} />
                    <Text style={styles.text}>{strings.ABSENT + ' ' + strings.LABOUR}:</Text>
                    <FlatList
                        data={DATA1}
                        renderItem={renderItem1}
                    // keyExtractor={item => item.value.id}
                    />
                </View>
            </SafeAreaView>
        </View>
    )
}

const mapStateToProps = (state, props) => {
    return { user: state.userReducer.user, userId: state.userReducer.userId };
}
export default connect(mapStateToProps)(Absent)