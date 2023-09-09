import {yupResolver} from '@hookform/resolvers/yup';
import React, {FC, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {View} from 'react-native';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';
import {useDispatch} from 'react-redux';

import FormItem from '@app/components/FormItem';
import Btn from '@app/components/UI-kit/Btn';
import {addExercise, updateExercise} from '@app/store/slices/trainingDaySlice';
import {ExerciseTypeEnum, IExerciseWithId} from '@app/types/IExercise';
import {exerciseValidation} from '@app/validations/exercise.validation';

interface IForm {
  exercise: string;
  reps: number;
  sets: number;
  rest: number;
}

interface IProps {
  exerciseToEdit: IExerciseWithId | null;
  type: ExerciseTypeEnum;
  onAfterSubmit: () => void;
}

const SingleExercise: FC<IProps> = ({exerciseToEdit, type, onAfterSubmit}) => {
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm<IForm>({
    resolver: yupResolver(exerciseValidation),
    defaultValues: exerciseToEdit ? exerciseToEdit : void 0,
  });

  useEffect(() => {
    return () => reset();
  }, []);

  const onSubmit = (data: IForm) => {
    if (exerciseToEdit) {
      const {id, setsDone} = exerciseToEdit;

      dispatch(
        updateExercise({
          id,
          type,
          setsDone,
          ...data,
        }),
      );
    } else {
      dispatch(
        addExercise({...data, type, setsDone: 0, id: Date.now().toString()}),
      );
    }

    onAfterSubmit();
  };

  return (
    <View>
      <FormItem
        control={control}
        errors={errors}
        label="Exercise"
        name="exercise"
      />
      <View style={styles.formLine}>
        <FormItem
          control={control}
          errors={errors}
          label={type === ExerciseTypeEnum.DYNAMIC ? 'Reps' : 'Hold(sec)'}
          name="reps"
          keyboardType="numeric"
        />
        <FormItem
          control={control}
          errors={errors}
          label="Sets"
          name="sets"
          keyboardType="numeric"
        />
        <FormItem
          control={control}
          errors={errors}
          label="Rest(sec)"
          name="rest"
          keyboardType="numeric"
        />
      </View>
      <View style={styles.btnContainer}>
        <Btn onPress={handleSubmit(onSubmit)}>
          {exerciseToEdit ? 'Save' : '+ Add'}
        </Btn>
      </View>
    </View>
  );
};

export default SingleExercise;

const styles = EStyleSheet.create({
  formLine: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  formItem: {
    marginBottom: 10,
    flex: 1,
  },
  title: {
    marginBottom: 5,
    color: '$white',
  },
  error: {
    marginTop: 2,
    color: 'red',
    fontSize: 10,
  },
  btnContainer: {
    marginTop: 30,
  },
});
