import React, { useState, useEffect } from 'react'

import { View, I18nManager, FlatList, Alert, Text } from 'react-native'

import SquareButton from '../../components/Button/SquareButton';

import styles from './Styles'

import Header from '../../components/Header/Header';

import strings from '../../components/lng/LocalizedStrings';

import { connect } from "react-redux";
import { deleteland, getland } from '../../auth/FireBase';
import SimpleButton from '../../components/Button/SimpleButton';

const MyLands = ({ navigation, route, user, userId }) => {

    const [data, setData] = useState([])

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getland(userId)
                .then(dat => {
                    setData(dat.temp)
                })
            // console.log(data);
        });
    }, [])

    const deleteLand = (item) => {
        deleteland(userId, item)
            .then(() => {
                getland(userId, setData)
            })
    }

    const onLongPress = (item) => {
        Alert.alert(
            "Alert",
            "Are you sure to delete?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "OK",
                    onPress: () => deleteLand(item),
                }
            ]
        );
    }

    const renderItem = ({ item }) => (
        <SquareButton
            title={item.landname}
            onPress={() => navigation.navigate('Options', { title: item })}
            onLongPress={() => onLongPress(item)}
            type={item}
        />
    );

    return (
        <View style={{ flex: 1 }}>
            {data != '' ?
                (
                    <View style={styles.container}>
                        <FlatList
                            data={data}
                            renderItem={renderItem}
                            numColumns={2}
                            style={{ backgroundColor: 'white' }}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                ) : (
                    <View style={styles.container1}>
                        <SimpleButton title='add Land' onPress={() => navigation.navigate('AddLand')} />
                    </View>
                )
            }
        </View>
    )
}

const mapStateToProps = (state, props) => {
    return { user: state.userReducer.user, userId: state.userReducer.userId };
}
export default connect(mapStateToProps)(MyLands)