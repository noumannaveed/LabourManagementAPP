/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';

import { setLng, getLng } from './src/helper/ChangeLang';

import strings from './src/components/lng/LocalizedStrings';

import ScreenNavigator from './src/navigation/ScreenNavigator'

import { I18nManager } from 'react-native';

const App = () => {

  // const selectedLng = async () => {
  //   let lngData = await getLng()
  //   if (!!lngData) {
  //     strings.setLanguage(lngData)
  //     lngData = await getLng()
  //   } else if (I18nManager.isRTL) {
  //     await strings.setLanguage('ur')
  //     lngData = await getLng()
  //   } else if (!I18nManager.isRTL) {
  //     await strings.setLanguage('en')
  //     lngData = await getLng()
  //   }
  //   console.log('Language data=',I18nManager.isRTL);
  // }

  // useEffect(() => {
  //   selectedLng()
  // }, [])

  return (
    <ScreenNavigator />
  );
};

export default App;
