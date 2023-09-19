import React, { useState, useEffect } from 'react'

import { View, Text, TextInput, I18nManager, Dimensions, Alert, FlatList, TouchableOpacity, SafeAreaView } from 'react-native'

import styles from './Styles'

import { connect } from "react-redux";
import Header from '../../components/Header/Header';

import strings from '../../components/lng/LocalizedStrings';
import { getreport } from '../../auth/FireBase';

import { LineChart } from "react-native-chart-kit";
// import DonutChart from "react-donut-chart"
import Pie from 'react-native-pie'

const { height, width } = Dimensions.get('screen');

const Report = ({ navigation, route, user, userId }) => {

    const [wage, setWage] = useState(0)
    const [other, setOther] = useState(0)
    const [buy, setBuy] = useState(0)
    const [wagePercent, setWagePercent] = useState(false)
    const [otherPercent, setOtherPercent] = useState('')
    const [buyPercent, setBuyPercent] = useState('')
    const [sell, setSell] = useState(0)

    // const data = {
    //     labels: ["Swim", "Bike", "Run"], // optional
    //     data: [0.4, 0.6, 0.8]
    //   };

    const getReport = () => {
        console.log(route.params.title.id);
        getreport(route.params.title.id)
            .then(async (data) => {
                await setWage(data.wage)
                await setOther(data.other)
                await setBuy(data.buying)
                await setSell(data.sell)
                setWagePercent(true)
            })
    }

    useEffect(() => {
        getReport()
    }, [])

    const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 10,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
    };

    return (
        <View style={styles.container}>
            <SafeAreaView>
                <Header
                    backIcon={'arrow-back-circle-outline'}
                    title={route.params.title.landname + ' ' + strings.REPORT}
                    onPress={() => navigation.goBack()}
                    backText={strings.BACK}
                />
                <View style={styles.main}>
                    <View style={styles.title}>
                        <Text style={styles.text}>{strings.CROP_TYPE} : {route.params.title.cropType?.label}</Text>
                    </View>
                    <View style={styles.title}>
                        <Text style={styles.text}>{strings.SEASON} : {route.params.title.cropSeason}</Text>
                    </View>
                    <View>
                        <View style={styles.detail1}>
                            <Text style={styles.text}>Total Wage:</Text>
                            <Text style={styles.text2}>{wage} {strings.RS}</Text>
                        </View>
                        <View style={styles.detail1}>
                            <Text style={styles.text}>Other Expense:</Text>
                            <Text style={styles.text2}>{other} {strings.RS}</Text>
                        </View>
                        <View style={styles.detail1}>
                            <Text style={styles.text}>{strings.BUYING}:</Text>
                            <Text style={styles.text2}>{buy} {strings.RS}</Text>
                        </View>
                        <View style={styles.seprator}></View>
                        <View style={styles.detail1}>
                            <Text style={styles.text}>{strings.SELL}:</Text>
                            <Text style={styles.text2}>{sell} {strings.RS}</Text>
                        </View>
                        <View style={styles.seprator}></View>
                        <View style={styles.detail1}>
                            <Text style={styles.text}>{strings.TOTAL}:</Text>
                            <Text style={styles.text2}>{sell - (other + buy + wage)} {strings.RS}</Text>
                        </View>
                        {sell - (other + buy + wage) > 0 ?
                            (
                                <View style={styles.detail1}>
                                    <Text style={styles.text}>{strings.TOTAL_PROFIT}:</Text>
                                    <Text style={styles.text2}>{sell - (other + buy + wage)} {strings.RS}</Text>
                                </View>
                            ) : (
                                <View style={styles.detail1}>
                                    <Text style={styles.text}>{strings.TOTAL_LOSS}:</Text>
                                    <Text style={styles.text2}>{sell - (other + buy + wage)} {strings.RS}</Text>
                                </View>
                            )
                        }
                    </View>
                    {wagePercent === true ?
                        (
                            <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: '15%' }}>
                                <Pie
                                    radius={80}
                                    innerRadius={50}
                                    sections={[
                                        {
                                            percentage: ((wage / (wage + other + buy)) * 100),
                                            color: '#C70039',
                                        },
                                        {
                                            percentage: ((other / (wage + other + buy)) * 100),
                                            color: '#44CD40',
                                        },
                                        {
                                            percentage: ((buy / (wage + other + buy)) * 100),
                                            color: '#404FCD',
                                        },
                                        // {
                                        //     percentage: (sell - (other + buy + wage)),
                                        //     color: '#EBD22F',
                                        // },
                                    ]}
                                    strokeCap={'butt'}
                                />
                                <View style={{ justifyContent: 'center' }}>
                                    <Text style={styles.text1}>{wage} Total Wage</Text>
                                    <Text style={styles.text4}>{other} Other Expense</Text>
                                    <Text style={styles.text3}>{buy} Buying</Text>
                                </View>
                            </View>
                        ) : (
                            <View></View>
                        )
                    }
                </View>
            </SafeAreaView>
        </View>
    )
}

const mapStateToProps = (state, props) => {
    return { user: state.userReducer.user, userId: state.userReducer.userId };
}
export default connect(mapStateToProps)(Report)