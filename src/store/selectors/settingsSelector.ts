import {RootState} from '../index';

export const enableAutocompleteSelector = (state: RootState) =>
  state.settings.enableAutocomplete;

export const exercisesForAutocompleteSelector = (state: RootState) => {
  return state.settings.exercisesForAutocomplete;
};

export const defaultGoalsFilterSelector = (state: RootState) => {
  return state.settings.defaultGoalsFilter;
};
