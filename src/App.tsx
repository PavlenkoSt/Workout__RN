/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {MenuProvider} from 'react-native-popup-menu';
import SplashScreen from 'react-native-splash-screen';
import Toast from 'react-native-toast-message';
import {Provider} from 'react-redux';

import store from './store';

import Navigation from './navigation';

const App = (): JSX.Element => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer>
      <GestureHandlerRootView style={{flex: 1}}>
        <MenuProvider>
          <Provider store={store}>
            <Navigation />
            <Toast />
          </Provider>
        </MenuProvider>
      </GestureHandlerRootView>
    </NavigationContainer>
  );
};

export default App;

EStyleSheet.build({
  $primaryColor: '#08639c',
  $white: '#c7c7c7',
  $bgColor: '#333',
});
