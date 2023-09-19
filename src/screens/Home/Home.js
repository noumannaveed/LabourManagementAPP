import React, { useEffect, useState } from 'react'

import { View, TouchableOpacity, Text, FlatList, ImageBackground, Image, SafeAreaView } from 'react-native'

import SquareButton from '../../components/Button/SquareButton';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { connect } from "react-redux";

import styles from './Styles'

import strings from '../../components/lng/LocalizedStrings';
import Images from '../../components/Images/Images';

import TopTabs from '../../navigation/TopTabs';

const Home = ({ navigation, route, user, userId }) => {

    console.log('user1=', userId);

    return (
        <View>
            <ImageBackground
                source={Images.home}
                // resizeMode='cover'
                style={styles.image}
            >
                <SafeAreaView>
                    <View style={styles.icons}>
                        <TouchableOpacity onPress={() => navigation.openDrawer()}>
                            <FontAwesome name="bars" size={24} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.flagStart} onPress={() => navigation.navigate('AddLand')}>
                            <Ionicons name='add-circle-outline' size={24} color="white" />
                            <Text style={styles.text}>Add Land</Text>
                        </TouchableOpacity>
                    </View>
                    {/* <View style={styles.icons}>
                    <TouchableOpacity onPress={() => navigation.openDrawer()}>
                        <FontAwesome name="bars" size={24} color="white" style={styles.styleBtn} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.flagStart} onPress={() => navigation.navigate('AddLand')}>
                        <Ionicons name='add-circle-outline' size={24} color="white" />
                        <Text style={styles.text}>Add Land</Text>
                    </TouchableOpacity>
                </View> */}
                    <Image
                        source={Images.splash_logo}
                        style={styles.logo}
                    />
                    <ImageBackground
                        style={styles.main}
                        source={Images.white_bg}
                        resizeMode='contain'
                    >
                        <View style={styles.container}>
                            <TopTabs />
                        </View>
                    </ImageBackground>
                </SafeAreaView>
            </ImageBackground>
        </View>
    )
}

const mapStateToProps = (state, props) => {
    return { user: state.userReducer.user, userId: state.userReducer.userId };
}
export default connect(mapStateToProps)(Home)