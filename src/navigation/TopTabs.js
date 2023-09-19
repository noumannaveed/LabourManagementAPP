import React from "react";

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


import MyLands from '../screens/MyLands/MyLands';

import Colors from "../components/Colors/Colors";

import { FontFamily } from "../helper/AppFontFamily";


const Tab = createMaterialTopTabNavigator();

const TopTabs = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarLabelStyle: { fontSize: 15, fontFamily: FontFamily.Alegreya_Regular },
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    let colorText;
                    // if (route.name === 'Links')
                    //     return <FontAwesome5 name="compass" size={24} color={color} style={{marginTop:0}}/>
                    // else
                    //     return <FontAwesome5 name="Book" size={24} color={color} style={{marginTop:0}}/>
                },
                tabBarActiveTintColor: Colors.green,
                // tabBarInactiveTintColor:  'red',
                // tabBarBounces:false,
                // keyboardHidesTabBar: true,
                // animationEnabled: true,
                tabBarStyle: {
                    backgroundColor: 'transparent',
                    // elevation: 5,
                    // tabBarBounces: false,
                    // height: 70,
                },
                // showIcon:true,
                tabBarIndicatorStyle: {
                    backgroundColor: Colors.green,
                    width: '0%',
                    justifyContent: 'center',
                    // left: 60,
                    bottom: '10%',
                    marginHorizontal: '15%'
                },
            })}
        // screenOptions={{
        //     tabBarLabelStyle: { fontSize: 15, fontFamily: 'Alegreya-Regular' },
        //     // tabBarActiveTintColor: '#EE2A7B',
        //     tabBarInactiveTintColor: 'grey',
        //     // tabBarPressColor: '#EE2A7B',

        //     // tabBarItemStyle: { width: 100 },
        //     // tabBarStyle: { backgroundColor: 'powderblue' },
        // }}
        >
            <Tab.Screen
                name="MyLand"
                component={MyLands}
                options={{ tabBarLabel: 'My Land' }}
            />
            <Tab.Screen
                name="LabourManagement"
                component={MyLands}
                options={{ tabBarLabel: 'Labour Management' }}
            />
        </Tab.Navigator>
    );
}

export default TopTabs