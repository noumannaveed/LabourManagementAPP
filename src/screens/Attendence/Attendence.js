import React, { useState, useEffect } from 'react'

import { View, Text, TextInput, I18nManager, Dimensions, ScrollView, FlatList, SafeAreaView } from 'react-native'

import styles from './Styles'

import DropDownPicker from "react-native-custom-dropdown";
import { connect } from "react-redux";
import Header from '../../components/Header/Header';
import SimpleButton from '../../components/Button/SimpleButton';

import strings from '../../components/lng/LocalizedStrings';
import { getattendence, getactive, markattendence } from '../../auth/FireBase';
import Attendee from '../../components/Attendee/Attendee';
import Attend from '../../components/Attendee/Attend';
import Colors from '../../components/Colors/Colors';
import Images from '../../components/Images/Images';
import { FontFamily } from '../../helper/AppFontFamily';

import { ActivityIndicator } from 'react-native-paper';

const { height, width } = Dimensions.get('screen');

const Attendence = ({ navigation, route, user, userId }) => {

    console.log(route.params.title);

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [name, setName] = useState([])
    const [names, setNames] = useState([])
    const [DATA, setDATA] = useState([])
    const [DATA1, setDATA1] = useState([])
    const [loading, setLoading] = useState(false)

    const getCurrentDate = () => {
        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
        //Alert.alert(date + '-' + month + '-' + year);
        // You can turn it in to your desired format
        return date + '-' + month + '-' + year;//format: dd-mm-yyyy;
    }

    const getLabour = () => {
        setLoading(true)
        getattendence(userId, route.params.title.id, getCurrentDate())
            .then((data) => {
                console.log('data1=', data.temp1);
                setNames(data.temp)
                setDATA1(data.temp1)
                setLoading(false)
            })
    }

    useEffect(() => {
        getLabour()
    }, [])

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

    const markAttendence = () => {
        markattendence(userId, DATA, route.params.title.id, getCurrentDate(), setDATA, DATA1, setDATA1)
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
                    title={route.params.title.landname + ' ' + strings.ATTENDENCE}
                    onPress={() => navigation.goBack()}
                    backText={strings.BACK}
                />
                <View style={styles.main}>
                    <View style={styles.title}>
                        <Text style={styles.text}>{strings.DATE} : {getCurrentDate()}</Text>
                    </View>
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
                    <FlatList
                        data={DATA}
                        horizontal={true}
                        renderItem={renderItem}
                    // keyExtractor={item => item.value.id}
                    />
                    <SimpleButton title={strings.SUBMIT} onPress={markAttendence} />
                    <Text style={styles.text}>{strings.ACTIVE_LABOUR}:</Text>
                    <View>
                        {loading ? (
                            <View style={styles.loading}>
                                <ActivityIndicator
                                    color={Colors.green}
                                    animating={loading}
                                />
                            </View>
                        ) : (
                            <FlatList
                                data={DATA1}
                                renderItem={renderItem1}
                            // keyExtractor={item => item.value.id}
                            />
                        )
                        }
                    </View>
                </View>
            </SafeAreaView>
        </View>
    )
}

const mapStateToProps = (state, props) => {
    return { user: state.userReducer.user, userId: state.userReducer.userId };
}
export default connect(mapStateToProps)(Attendence)