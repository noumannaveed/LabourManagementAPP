import React from 'react'

import { View, Text, Dimensions, SafeAreaView } from 'react-native'

import Entypo from 'react-native-vector-icons/Entypo';

import styles from './Styles'

import Header from '../../components/Header/Header';
import SimpleButton from '../../components/Button/SimpleButton';

import strings from '../../components/lng/LocalizedStrings';

const Expense = ({ navigation, route }) => {

    return (
        <View style={styles.container}>
            <SafeAreaView>
                <Header
                    backIcon={'arrow-back-circle-outline'}
                    title={route.params.title.landname + ' ' + strings.EXPENSE}
                    onPress={() => navigation.goBack()}
                    backText={strings.BACK}
                />
                <View style={styles.main}>
                    {/* <View style={styles.title}>
                    <Text style={styles.text}>{strings.TYPE}</Text>
                </View> */}
                    <SimpleButton title={strings.LABOUR_PAYMENT} onPress={() => navigation.navigate('Payment', { title: route.params.title, type: 'Labour Payment' })} />
                    <SimpleButton title={strings.BUYING} onPress={() => navigation.navigate('Buy', { title: route.params.title, type: 'Buy' })} />
                    <SimpleButton title={strings.OTHER} onPress={() => navigation.navigate('Other', { title: route.params.title, type: 'Other' })} />
                </View>
            </SafeAreaView>
        </View>
    )
}

export default Expense