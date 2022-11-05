import * as React from 'react';
import {View, StatusBar, StyleSheet, TouchableOpacity} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import getPositiveCasesCountAPI from './Screen2PositiveCount';
import getFullyVaccinatedCountAPI from './Screen3Vaccination';
import getReffectiveValue from './Screen4Reff';
import getVaccineDistricts from './Screen4VaccineDistricts';
import {Button, Header, Icon} from 'react-native-elements';

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  return (
    <View style={styles.container}>
      <Header
        backgroundColor="#148F77"
        centerComponent={{
          text: 'Charts',
          style: styles.headerHeading,
        }}
      />
      <Tab.Navigator
        initialRouteName="PositiveCasesCount"
        screenOptions={{
          tabBarIndicatorStyle: {borderColor: '#ffffff'},
          tabBarIndicatorContainerStyle: {borderColor: '#ffffff'},

          tabBarActiveTintColor: '#ffffff',
          tabBarLabelStyle: {fontSize: 14, fontWeight: 'bold'},
          tabBarStyle: {backgroundColor: '#FF5733'},
        }}>
        <Tab.Screen
          name="PositiveCasesCount"
          component={getPositiveCasesCountAPI}
          options={{
            activeTintColor: '#ffffff',
            tabBarLabel: 'Cases',
            tabBarStyle: {backgroundColor: '#FF5733'},
            tabBarIndicatorStyle: {borderColor: '#ffffff'},
            tabBarIndicatorContainerStyle: {borderColor: '#ffffff'},
          }}
        />
        {/* <Tab.Screen
          name="Vaccination"
          component={getFullyVaccinatedCountAPI}
          options={{tabBarLabel: 'Vaccine'}}
        /> */}
        <Tab.Screen
          name="Vaccination"
          component={getVaccineDistricts}
          options={{
            tabBarActiveTintColor: '#ffffff',
            tabBarLabel: 'Vaccine',
            tabBarStyle: {backgroundColor: '#2CB083'},
          }}
        />
        <Tab.Screen
          name="REffective"
          component={getReffectiveValue}
          options={{
            tabBarActiveTintColor: '#ffffff',
            tabBarLabel: 'REff',
            tabBarStyle: {backgroundColor: '#0597D8'},
          }}
        />
      </Tab.Navigator>
    </View>
  );
}
export default function topTabBarCharts() {
  return <MyTabs />;
}
const styles = StyleSheet.create({
  container: {
    height: '100%',
    flex: 1,
    paddingTop: 0,
  },
  headerHeading: {
    fontSize: 17,
    color: '#ffffff',

    fontWeight: 'bold',
    textAlign: 'center',
  },
});
