import React, {FC} from 'react';
import {Text, View} from 'react-native';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';

import TrainingHeader from '@app/components/TrainingHeader';
import Btn from '@app/components/UI-kit/Btn';

interface IProps {
  onStartPlanning: () => void;
}

const NoTrainingYet: FC<IProps> = ({onStartPlanning}) => {
  return (
    <View style={styles.container}>
      <TrainingHeader />
      <View style={styles.textInner}>
        <Text style={styles.text}>No training for this day planned yet.</Text>
        <Btn onPress={onStartPlanning}>+ Plan</Btn>
      </View>
    </View>
  );
};

export default NoTrainingYet;

const styles = EStyleSheet.create({
  container: {
    paddingBottom: 20,
    paddingHorizontal: 5,
  },
  textInner: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  text: {
    color: '#fff',
  },
});
