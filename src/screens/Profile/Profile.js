import React, { useState } from 'react'

import { View, Text, ImageBackground, Image, TouchableOpacity, ScrollView, SafeAreaView, Alert } from 'react-native'
import { signout, updateprofile } from '../../auth/FireBase'
import Button from '../../components/Button/Button'
import strings from '../../components/lng/LocalizedStrings'

import Ionicons from 'react-native-vector-icons/Ionicons';

import { useDispatch } from 'react-redux';
import { setUser, setUserId } from '../../redux/actions';

import { connect } from "react-redux";
import Images from '../../components/Images/Images'
import styles from './Styles'
import Header from '../../components/Header/Header'
import Input from '../../components/Input/Input'
import SimpleButton from '../../components/Button/SimpleButton'

import { ActivityIndicator } from 'react-native-paper'

import ImagePicker from 'react-native-image-crop-picker'
import Colors from '../../components/Colors/Colors'

const Profile = ({ props, navigation, user, userId }) => {

    const dispatch = useDispatch();

    const [name, setName] = useState(user.name)
    const [image, setImage] = useState(user.image)
    const [prevImage, setPrevImage] = useState()
    const [check, setCheck] = useState(false)
    const [loading, setLoading] = useState(false)

    function goToPickImage() {
        setPrevImage(image)
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
        }).then((res) => {
            setImage(res.path)
            setCheck(true)
        });
    }

    const validate_field = () => {
        if (name == '') {
            Alert.alert(
                strings.ALERT,
                strings.PLEASE_ENTER_NAME,
                [
                    { text: strings.OK, onPress: () => console.log("OK Pressed") }
                ]
            );
            return false;
        }
        return true;
    }

    const updateProfile = () => {
        if (validate_field()) {
            setLoading(true)
            updateprofile(userId, name, check, image, prevImage)
                .then(async (data) => {
                    dispatch(setUser(data.data))
                    dispatch(setUserId(data.id))
                    setLoading(false)
                    await navigation.goBack()
                })
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header
                backIcon={'arrow-back-circle-outline'}
                title='Profile'
                onPress={() => navigation.goBack()}
                backText={strings.BACK}
            />
            <View style={{ justifyContent: 'center', flex: 1 }}>
                <TouchableOpacity style={styles.main} onPress={goToPickImage}>
                    <View
                        // resizeMode='contain'
                        style={styles.image}
                    >
                        <Image
                            source={{ uri: image }}
                            style={styles.image}
                        />
                    </View>
                    <TouchableOpacity style={styles.camera} onPress={goToPickImage}>
                        <Ionicons name="md-camera" size={22} color="#dbd5d5" style={styles.icon} />
                    </TouchableOpacity>
                </TouchableOpacity>
                <Input
                    placeholder={'Email'}
                    image={Images.mail}
                    value={user.email}
                />
                <Input
                    placeholder={'Name'}
                    image={Images.person}
                    value={name}
                    onChangeText={(name) => { setName(name) }}
                />
                <View>
                    {loading ? (
                        <View style={styles.loading}>
                            <ActivityIndicator
                                color={Colors.green}
                                animating={loading}
                            />
                        </View>
                    ) : (
                        <SimpleButton title='Update' onPress={updateProfile} />
                    )
                    }
                </View>
            </View>
        </SafeAreaView>
    )
}

const mapStateToProps = (state, props) => {
    return { user: state.userReducer.user, userId: state.userReducer.userId };
}
export default connect(mapStateToProps)(Profile)