import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Linking,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {Card, Header, HeaderProps, Icon} from 'react-native-elements';
import {createStackNavigator} from '@react-navigation/stack';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import DataOverview from './Screen1Overviewtrial';

import getPositiveCasesCountAPI from './Screen2PositiveCount';
import getVaccineDistricts from './Screen3VaccineDistricts';
import getReffectiveValue from './Screen4Reff';
import getWarningLevelDataAPI from './getCoronaWarningLevel';
import ModelParamSelection from './modal';

const Stack1 = createStackNavigator();

function DataOverviewStack() {
  return (
    <View style={styles.container}>
      <Stack1.Navigator
        initialRouteName="App Overview"
        screenOptions={{
          headerMode: 'screen',
          headerStyle: {
            backgroundColor: '#005fff',
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: 'bold',
            textAlign: 'justify',
            alignItems: 'center',
          },
        }}>
        <Stack1.Screen
          name="App Overview"
          component={DataOverview}
          options={{
            title: 'App Overview',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#005fff',
            },
            headerTintColor: '#ffffff',
            headerTitleStyle: {
              fontSize: 20,
              fontWeight: 'bold',
              textAlign: 'justify',
              alignItems: 'center',
            },
          }}
        />
        <Stack1.Screen
          name="COVID-19 Positive Cases Count"
          component={getPositiveCasesCountAPI}
          options={{
            title: 'COVID-19 Positive Cases Count',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#FF5733',
            },
            headerTintColor: '#ffffff',
            headerTitleStyle: {
              fontSize: 20,
              //fontWeight: 'bold',
              textAlign: 'justify',
              alignItems: 'center',
            },

            /*  headerRight: () => (
              <TouchableOpacity onPress={() => positiveCases()}>
                <MaterialCommunityIcons
                  name="database-check"
                  color={'#ffffff'}
                  size={25}
                  style={{paddingRight: 18}}
                /> 
                <Icon
                  name="information"
                  type="material-community"
                  color="#ffffff"
                  style={{paddingRight: 16}}
                />
              </TouchableOpacity>
            ), */
          }}
        />
        <Stack1.Screen
          name="Vaccinated Count"
          component={getVaccineDistricts}
          options={{
            title: 'Vaccinated Count',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#2CB083',
            },
            headerTintColor: '#ffffff',
            headerTitleStyle: {
              fontSize: 20,
              fontWeight: 'bold',
              textAlign: 'justify',
              alignItems: 'center',
            },
          }}
        />
        <Stack1.Screen
          name="REffective Value"
          component={getReffectiveValue}
          options={{
            title: 'Effective Reproduction Number',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#0597D8',
            },
            headerTintColor: '#ffffff',
            headerTitleStyle: {
              fontSize: 20,
              fontWeight: 'bold',
              textAlign: 'justify',
              alignItems: 'center',
            },
          }}
        />
        <Stack1.Screen
          name="Warning Level"
          component={getWarningLevelDataAPI}
          options={{
            title: 'Warning Level',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#d78700',
            },
            headerTintColor: '#ffffff',
            headerTitleStyle: {
              fontSize: 20,
              fontWeight: 'bold',
              textAlign: 'justify',
              alignItems: 'center',
            },
          }}
        />
        <Stack1.Screen
          name="Modal Parameters"
          component={ModelParamSelection}
          options={{
            title: 'Model',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#9239FE',
            },
            headerTintColor: '#ffffff',
            headerTitleStyle: {
              fontSize: 20,
              fontWeight: 'bold',
              textAlign: 'justify',
              alignItems: 'center',
            },
          }}
        />
      </Stack1.Navigator>
    </View>
  );
}
export const OverviewStackNavigator = () => {
  return <DataOverviewStack />;
};
const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#ffffff',
  },
  textStyle: {
    color: 'black',
    fontSize: 14,
  },
  Heading: {
    fontWeight: 'bold',
    color: '#0087ff',
    fontSize: 15,
  },
  cardRow: {
    //flex: 1,
    flexDirection: 'row',
  },
  modelCard: {
    borderRadius: 20,
    borderColor: 'lightgrey',
    marginRight: 0,
    marginLeft: 10,
    width: 370,
    paddingTop: 6,
    paddingBottom: 15,
  },
  cardStyle: {
    paddingTop: 6,
    borderRadius: 20,
    width: 180,
    marginRight: 0,
    marginLeft: 10,
    borderColor: 'lightgrey',
  },
  cardTitle: {
    color: '#0087ff',
    fontSize: 15,
  },
  subHeading: {
    fontWeight: 'bold',
    color: 'black',
  },
  headerRight: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 5,
  },
});
