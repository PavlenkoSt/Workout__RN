import React, {FC} from 'react';
import {StatusBar, StatusBarProps} from 'react-native';

import {useIsFocused} from '@react-navigation/native';

const FocusAwareStatusBar: FC<StatusBarProps> = props => {
  const isFocused = useIsFocused();

  return isFocused ? <StatusBar {...props} /> : <></>;
};

export default FocusAwareStatusBar;
