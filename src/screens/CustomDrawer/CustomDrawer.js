import React from 'react'

import { View, Text, ImageBackground, Image, TouchableOpacity, ScrollView } from 'react-native'
import { signout } from '../../auth/FireBase'
import Button from '../../components/Button/Button'
import strings from '../../components/lng/LocalizedStrings'

import { useDispatch } from 'react-redux';
import { setUser, setUserId } from '../../redux/actions';

import { connect } from "react-redux";
import Images from '../../components/Images/Images'
import styles from './Styles'

const CustomDrawer = ({ props, navigation, user, userId }) => {

    const dispatch = useDispatch();

    function logOut() {
        signout()
            .then(async (user) => {

                // console.log(user);
                navigation.replace('SignIn');
                dispatch(setUser(null))
                dispatch(setUserId(null))

            })
    }
    return (
        <View style={{ height: '100%' }}>
            <ImageBackground
                source={Images.head_drawer}
                style={styles.head}
            // resizeMode='contain'
            >
                <View style={{ flexDirection: 'row', alignSelf: 'center', top: '15%' }}>
                    <Image
                        source={{ uri: user?.image }}
                        style={styles.image}
                        // resizeMode='contain'
                    />
                    <View>
                        <Text style={styles.text2}>{user?.name}</Text>
                        <Text style={styles.text1}>Owner</Text>
                    </View>
                </View>
            </ImageBackground>
            <ScrollView>
                <TouchableOpacity style={styles.contain} onPress={() => navigation.navigate('Profile')}>
                    <Image
                        source={Images.person}
                        style={styles.icon}
                        resizeMode='contain'
                    />
                    <Text style={styles.text}>Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.contain}>
                    <Image
                        source={Images.land}
                        style={styles.icon}
                        resizeMode='contain'
                    />
                    <Text style={styles.text}>Land Management</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.contain}>
                    <Image
                        source={Images.labour}
                        style={styles.icon}
                        resizeMode='contain'
                    />
                    <Text style={styles.text}>Labour Management</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.contain}>
                    <Image
                        source={Images.expense}
                        style={styles.icon}
                        resizeMode='contain'
                    />
                    <Text style={styles.text}>Add Expense</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.contain}>
                    <Image
                        source={Images.support}
                        style={styles.icon}
                        resizeMode='contain'
                    />
                    <Text style={styles.text}>Customer Support</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.contain}>
                    <Image
                        source={Images.star}
                        style={styles.icon}
                        resizeMode='contain'
                    />
                    <Text style={styles.text}>Rate Us</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.contain}>
                    <Image
                        source={Images.about}
                        style={styles.icon}
                        resizeMode='contain'
                    />
                    <Text style={styles.text}>About App</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.contain}>
                    <Image
                        source={Images.setting}
                        style={styles.icon}
                        resizeMode='contain'
                    />
                    <Text style={styles.text}>Setting</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.contain} onPress={logOut} >
                    <Image
                        source={Images.logout}
                        style={styles.icon}
                        resizeMode='contain'
                    />
                    <Text style={styles.text}>Logout</Text>
                </TouchableOpacity>
            </ScrollView>
            <ImageBackground
                source={Images.foot_drawer}
                style={styles.foot}
            />
        </View>
    )
}

const mapStateToProps = (state, props) => {
    return { user: state.userReducer.user, userId: state.userReducer.userId };
}
export default connect(mapStateToProps)(CustomDrawer)