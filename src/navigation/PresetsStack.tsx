import {createStackNavigator} from '@react-navigation/stack';
import React, {FC} from 'react';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';

import {PresetsParams, PresetsRoutesStack} from './types';

import UsePreset from '@app/components/NavigationComponents/UsePreset';
import Preset from '@app/screens/Preset';
import Presets from '@app/screens/Presets';

const Stack = createStackNavigator<PresetsParams>();

const PresetsStack = () => {
  return (
    <Stack.Navigator initialRouteName={PresetsRoutesStack.PresetsList}>
      <Stack.Screen
        name={PresetsRoutesStack.PresetsList}
        component={Presets}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={PresetsRoutesStack.Preset}
        component={Preset as FC}
        initialParams={{id: '0', name: 'Preset'}}
        options={({route}) => ({
          headerTitle: route.params.name,
          headerStyle: {
            backgroundColor: EStyleSheet.value('$primaryColor'),
          },
          headerTitleStyle: {
            color: '#fff',
          },
          headerTintColor: '#fff',
          headerRight: props => <UsePreset presetId={route.params.id} />,
          headerBackTitleVisible: false,
        })}
      />
    </Stack.Navigator>
  );
};

export default PresetsStack;
