import React, {Dispatch, FC, SetStateAction, useState} from 'react';
import {Text, View} from 'react-native';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';
import {Toast} from 'react-native-toast-message/lib/src/Toast';

import Dropdown from '@app/components/UI-kit/Dropdown';
import {
  ExerciseTypeEnum,
  IExerciseBackup,
  IExerciseForm,
  IExerciseWithId,
  ILadderExerciseForm,
} from '@app/types/IExercise';

import LadderExercise from './LadderExercise';
import SingleExercise from './SingleExercise';
import WarmupExercise from './WarmupExercise';

interface IProps {
  exerciseToEdit: IExerciseWithId | null;
  exerciseBackup: IExerciseBackup | null;
  setExerciseBackup: Dispatch<SetStateAction<IExerciseBackup | null>>;
  onSingleExerciseSubmit: (data: IExerciseForm, type: ExerciseTypeEnum) => void;
  onLadderExerciseSubmit: (data: ILadderExerciseForm) => void;
  onWarmupExerciseSubmit: () => void;
}

const ExerciseForm: FC<IProps> = ({
  exerciseToEdit,
  exerciseBackup,
  setExerciseBackup,
  onSingleExerciseSubmit,
  onLadderExerciseSubmit,
  onWarmupExerciseSubmit,
}) => {
  const [type, setType] = useState(
    () => exerciseToEdit?.type || ExerciseTypeEnum.DYNAMIC,
  );

  const commonFormsProps = {
    exerciseBackup,
    setExerciseBackup,
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.formItem}>
          <Text style={styles.title}>Type</Text>
          <Dropdown
            data={[
              ExerciseTypeEnum.DYNAMIC,
              ExerciseTypeEnum.STATIC,
              ExerciseTypeEnum.LADDER,
              ExerciseTypeEnum.WARMUP,
            ]}
            defaultValue={type}
            onSelect={value => setType(value)}
          />
        </View>
        {type === ExerciseTypeEnum.LADDER ? (
          <LadderExercise
            {...commonFormsProps}
            onSubmit={onLadderExerciseSubmit}
          />
        ) : type === ExerciseTypeEnum.WARMUP ? (
          <WarmupExercise onSubmit={onWarmupExerciseSubmit} />
        ) : (
          <SingleExercise
            {...commonFormsProps}
            exerciseToEdit={exerciseToEdit}
            onSubmit={onSingleExerciseSubmit}
            type={type}
          />
        )}
      </View>
      <Toast />
    </>
  );
};

export default ExerciseForm;

const styles = EStyleSheet.create({
  container: {
    paddingHorizontal: 5,
    flex: 1,
    justifyContent: 'space-between',
  },
  formItem: {
    marginBottom: 10,
    flex: 1,
  },
  title: {
    marginBottom: 5,
    color: '$white',
  },
});
