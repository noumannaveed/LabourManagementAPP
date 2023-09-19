import React from 'react'

import { View, SafeAreaView } from 'react-native'

import styles from './Styles'

import Header from '../../components/Header/Header';
import SimpleButton from '../../components/Button/SimpleButton';

import strings from '../../components/lng/LocalizedStrings'

const Enroll = ({ navigation, route }) => {

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.container}>
                <Header
                    backIcon={'arrow-back-circle-outline'}
                    title={route.params.title.landname}
                    onPress={() => navigation.goBack()}
                    backText={strings.BACK}
                />
                <View style={styles.main}>
                    {/* <SimpleButton title={strings.LAND_DETAIL_ENROLL} onPress={() => navigation.navigate('LandDetail', { title: route.params.title, lng: route.params.lng })} /> */}
                    <SimpleButton title={strings.LABOUR_ENROLL} onPress={() => navigation.navigate('LabourDetail', { title: route.params.title, lng: route.params.lng })} />
                </View>
            </SafeAreaView>
        </View>
    )
}

export default Enroll