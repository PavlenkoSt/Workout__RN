import {Middleware} from '@reduxjs/toolkit';

import {syncDaysRealm} from '@app/db/actions/syncDaysRealm';
import {syncGoalsRealm} from '@app/db/actions/syncGoalsRealm';
import {syncPresetsRealm} from '@app/db/actions/syncPresetRealm';
import {syncRecordsRealm} from '@app/db/actions/syncRecordsRealm';

import {RootState} from '../index';

const blackListActionTypes = [
  'trainingDay/setTrainingDays',
  'trainingDay/changeActiveDate',
];

const realmMiddleware: Middleware = store => next => action => {
  const result = next(action);

  if (blackListActionTypes.includes(action.type)) return result;

  const currentState = store.getState() as RootState;

  if (action.type.includes('trainingDay')) {
    syncDaysRealm(currentState.trainingDay.trainingDays);
  }

  if (action.type.includes('records')) {
    syncRecordsRealm(
      currentState.records.records,
      action.type === 'recordsSlice/setRecords',
    );
  }

  if (action.type.includes('goals')) {
    syncGoalsRealm(currentState.goals.goals);
  }

  if (action.type.includes('presets')) {
    syncPresetsRealm(currentState.presets.presets);
  }

  return result;
};

export default realmMiddleware;
