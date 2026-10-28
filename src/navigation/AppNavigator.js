import { createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createTabIcon } from '../components';
import { ICON_SIZES } from '../constants';
import {
  ContactScreen,
  HomeScreen,
  ScheduleScreen,
  SocialScreen,
  TopChartsScreen,
} from '../screens';
import { colors } from '../theme';

const HOME_ICON_OFFSET = -4;

const route = (screen, tabBarIcon) => ({
  screen,
  navigationOptions: { title: '', tabBarLabel: '', tabBarColor: colors.tabBar, tabBarIcon },
});

const Tabs = createMaterialBottomTabNavigator(
  {
    Schedule: route(
      ScheduleScreen,
      createTabIcon(require('../assets/images/tab-schedule.png'), ICON_SIZES.tab),
    ),
    TopCharts: route(
      TopChartsScreen,
      createTabIcon(require('../assets/images/tab-charts.jpg'), ICON_SIZES.tab),
    ),
    Home: route(
      HomeScreen,
      createTabIcon(require('../assets/images/tab-home.png'), ICON_SIZES.tabHome, HOME_ICON_OFFSET),
    ),
    Social: route(
      SocialScreen,
      createTabIcon(require('../assets/images/tab-social.png'), ICON_SIZES.tab),
    ),
    Contact: route(
      ContactScreen,
      createTabIcon(require('../assets/images/tab-contact.png'), ICON_SIZES.tab),
    ),
  },
  {
    initialRouteName: 'Home',
    activeColor: colors.primary,
    inactiveColor: colors.tabInactive,
    barStyle: { backgroundColor: colors.tabBar },
  },
);

export default createAppContainer(Tabs);
