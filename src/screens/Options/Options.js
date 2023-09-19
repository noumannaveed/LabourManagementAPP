import React from 'react'

import { View, SafeAreaView } from 'react-native'

import styles from './Styles'

import Header from '../../components/Header/Header';
import Button from '../../components/Button/Button';

import strings from '../../components/lng/LocalizedStrings';
import Images from '../../components/Images/Images';

const Options = ({ navigation, route }) => {

    console.log(route.params.title.landname);

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.container}>
                <Header
                    backIcon={'arrow-back-circle-outline'}
                    title={route.params.title.landname}
                    onPress={() => navigation.goBack()}
                    icon={'add-circle-outline'}
                    backText={strings.BACK}
                    add={() => navigation.navigate('Enroll', { title: route.params.title })}
                />
                <View style={styles.main}>
                    <Button
                        title={strings.EXPENSE}
                        land={route.params.title.landname}
                        onPress={() => navigation.navigate('Expense', { title: route.params.title })}
                        image={Images.expenses}
                    />
                    <Button
                        title={strings.SELL}
                        land={route.params.title.landname}
                        onPress={() => navigation.navigate('Sell', { title: route.params.title })}
                        image={Images.goods}
                    />
                    <Button
                        title={strings.ATTENDENCE}
                        land={route.params.title.landname}
                        onPress={() => navigation.navigate('Attendence', { title: route.params.title })}
                        image={Images.attendence}
                    />
                    <Button
                        title={strings.ABSENT}
                        land={route.params.title.landname}
                        onPress={() => navigation.navigate('Absent', { title: route.params.title })}
                        image={Images.attendence}
                    />
                    <Button
                        title={strings.REPORT}
                        land={route.params.title.landname}
                        onPress={() => navigation.navigate('Report', { title: route.params.title })}
                        image={Images.goods}
                    />
                </View>
            </SafeAreaView>
        </View>
    )
}

export default Options