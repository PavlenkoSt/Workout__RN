import {NavigationPropsType} from '@app/navigation/types';
import {useNavigation} from '@react-navigation/native';

const useTypedNavigation = () => {
  const navigation = useNavigation<NavigationPropsType>();

  return navigation;
};

export default useTypedNavigation;
