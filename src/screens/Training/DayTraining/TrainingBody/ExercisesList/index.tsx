import React, {FC, memo, useCallback} from 'react';
import {TouchableOpacity, View} from 'react-native';
import DraggableFlatList, {
  DragEndParams,
  RenderItemParams,
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';
import {useDispatch, useSelector} from 'react-redux';

import TrainingHeader from '@app/components/TrainingHeader';
import Btn from '@app/components/UI-kit/Btn';
import {trainingDateSelector} from '@app/store/selectors/trainingDaySelectors';
import {changeExercisesOrdering} from '@app/store/slices/trainingDaySlice';
import {IExercise, IExerciseWithId} from '@app/types/IExercise';

import Exercise from './Exercise';

const PADDING_HORIZONTAL = 5;

interface IProps {
  onChangeEditExersice: (exercise: IExerciseWithId) => void;
  onAddExercisePress: () => void;
}

const ExercisesList: FC<IProps> = ({
  onChangeEditExersice,
  onAddExercisePress,
}) => {
  const dispatch = useDispatch();

  const trainingDay = useSelector(trainingDateSelector);

  const onDragEnd = ({data, from, to}: DragEndParams<IExercise>) => {
    if (from === to) return;

    dispatch(changeExercisesOrdering(data));
  };

  const renderFooter = useCallback(
    () => (
      <View style={styles.btnContainer}>
        <Btn onPress={onAddExercisePress}>+ Add exercise</Btn>
      </View>
    ),
    [],
  );

  const renderItem = ({
    item: exercise,
    drag,
    isActive,
    getIndex,
  }: RenderItemParams<IExercise>) => {
    return (
      <ScaleDecorator activeScale={0.9}>
        <TouchableOpacity
          activeOpacity={1}
          onLongPress={drag}
          style={styles.itemContainer}>
          <Exercise
            key={exercise.id}
            exercise={exercise}
            idx={getIndex() || 0}
            onChangeEditExersice={onChangeEditExersice}
          />
        </TouchableOpacity>
      </ScaleDecorator>
    );
  };

  return (
    <DraggableFlatList
      data={trainingDay?.exercises || []}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      onDragEnd={onDragEnd}
      ListHeaderComponent={TrainingHeader}
      ListFooterComponent={renderFooter}
    />
  );
};

export default memo(ExercisesList);

const styles = EStyleSheet.create({
  btnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: PADDING_HORIZONTAL,
  },
  itemContainer: {
    paddingHorizontal: PADDING_HORIZONTAL,
  },
});