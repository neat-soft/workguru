import { StackNavigator } from 'react-navigation';

import Overview from './screens/Overview';
import Example from './screens/Example';

export default StackNavigator({
  Overview: { screen: Overview },
  Example: { screen: Example },
});
