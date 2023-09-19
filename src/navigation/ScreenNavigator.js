import React, { useEffect } from 'react'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { Provider } from 'react-redux';
import { Store } from '../redux/store';

import Splash from '../screens/Splash/Splash';
import SignIn from '../screens/SignIn/SignIn';
import SignUp from '../screens/SignUp/SignUp';
import Home from '../screens/Home/Home';
import MyLands from '../screens/MyLands/MyLands';
import AddLand from '../screens/AddLand/AddLand';
import Options from '../screens/Options/Options';
import LandDetail from '../screens/LandDetail/LandDetail';
import LabourDetail from '../screens/LabourDetail/LabourDetail';
import Enroll from '../screens/Enroll/Enroll';
import Expense from '../screens/Expense/Expense';
import Payment from '../screens/Payment/Payment';
import Buy from '../screens/Buy/Buy';
import Other from '../screens/Other/Other';
import Sell from '../screens/Sell/Sell';

import CustomDrawer from '../screens/CustomDrawer/CustomDrawer';
import Attendence from '../screens/Attendence/Attendence';

import { getLng, setLng } from '../helper/ChangeLang';
import strings from '../components/lng/LocalizedStrings';

import { I18nManager } from 'react-native'
import Absent from '../screens/Absent/Absent';
import Report from '../screens/Report/Report';
import Profile from '../screens/Profile/Profile';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerRoutes() {
    return (
        <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />}>
            <Drawer.Screen name="Home" component={Home} options={{ headerShown: false }} />
            {/* <Drawer.Screen name="MyLands" component={MyLands} options={{ headerShown: false }} /> */}
            <Drawer.Screen name="AddLand" component={AddLand} options={{ headerShown: false }} />
            {/* <Drawer.Screen name="LogOut" component={logOut} options={{ headerShown: false }} /> */}
        </Drawer.Navigator>
    );
}

const ScreenNavigator = () => {


    useEffect(() => {
        selectedLng()
    }, [])

    const selectedLng = async () => {
        let lngData = await getLng()
        if (!!lngData) {
            strings.setLanguage(lngData)
            lngData = await getLng()
        } else if (I18nManager.isRTL) {
            await strings.setLanguage('ur')
            lngData = await getLng()
        } else if (!I18nManager.isRTL) {
            await strings.setLanguage('en')
            lngData = await getLng()
        }
        console.log('Language data1=', lngData);
    }

    return (
        <Provider store={Store}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name="Splash"
                        component={Splash}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="SignIn"
                        component={SignIn}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="SignUp"
                        component={SignUp}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="Home"
                        component={DrawerRoutes}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="MyLands"
                        component={MyLands}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="AddLand"
                        component={AddLand}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="Options"
                        component={Options}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="Enroll"
                        component={Enroll}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="LandDetail"
                        component={LandDetail}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="LabourDetail"
                        component={LabourDetail}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="Expense"
                        component={Expense}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="Payment"
                        component={Payment}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="Buy"
                        component={Buy}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="Other"
                        component={Other}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="Sell"
                        component={Sell}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="Attendence"
                        component={Attendence}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="Absent"
                        component={Absent}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="Report"
                        component={Report}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="Profile"
                        component={Profile}
                        options={{ headerShown: false }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    )
}

export default ScreenNavigator