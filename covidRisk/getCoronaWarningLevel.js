import React, {useState, useEffect} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
  ScrollView,
  Linking,
} from 'react-native';
import {SearchBar, Card, Header, Icon} from 'react-native-elements';
import MapView, {
  Marker,
  PROVIDER_GOOGLE,
  Circle,
  Polyline,
} from 'react-native-maps';

import {VictoryLegend} from 'victory-native';
import * as warnlevelDates from './dropDownValues.json';
import {SafeAreaProvider} from 'react-native-safe-area-context';
const STYLES = ['default', 'dark-content', 'light-content'];
const TRANSITIONS = ['fade', 'slide', 'none'];

export default function getWarningLevelDataAPI({navigation}) {
  const [hidden, setHidden] = useState(false);
  const [statusBarStyle, setStatusBarStyle] = useState(STYLES[2]);
  const [statusBarTransition, setStatusBarTransition] = useState(
    TRANSITIONS[2],
  );
  const [showRiskInfo, setShowRiskInfo] = useState(true);

  const [districtName, setDistrictName] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorDate, setError] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date('2022-10-13'));

  const [selectedWarnLevelDate, setSelectedWarnLevelDate] =
    useState('2022-10-13');

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() =>
            Linking.openURL(
              'https://www.data.gv.at/katalog/dataset/52abfc2b-031c-4875-b838-653abbfccf4e',
            )
          }>
          <Icon
            name="information"
            type="material-community"
            color="#ffffff"
            style={{paddingTop: 2, paddingRight: 10}}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);
  const getWarnLevelDates = async () => {
    try {
      const response = await fetch(
        `https://covid19infoapi51055.lm.r.appspot.com/api/warnLevelRegion/?date=${selectedWarnLevelDate}`,
      );
      const json = await response.json();
      setDistrictName(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getWarnLevelDates();
  }, [selectedWarnLevelDate]);

  let wld = warnlevelDates['WarnLevelDates'];
  let wldates = wld.map(d => d.Date);
  const sdates = wldates;
  let result = [];
  function parseddates() {
    for (let i = 0; i < sdates.length; i++) {
      result[i] = new Date(sdates[i]);
    }

    return result.reverse();
  }
  parseddates();
  const Item = ({
    item,
    onPress,
    backgroundColor,
    textColor,
    getMonth,
    dayNumber,
    dayString,
    getYear,
  }) => (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.wldates, backgroundColor]}>
      <Text style={[styles.dateOutput, backgroundColor && textColor]}>
        {getMonth}
      </Text>
      <Text style={[styles.dateOutput, backgroundColor && textColor]}>
        {dayNumber}
      </Text>
      {/*  <Text style={[styles.dayStyle, backgroundColor && textColor]}>
        {isToday(item) ? 'today' : dayString}
      </Text> */}
      <Text style={[styles.dayStyle, backgroundColor && textColor]}>
        {getYear}
      </Text>
    </TouchableOpacity>
  );

  function dateSubtractDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() - days);
    return result;
  }

  function getDayString(date) {
    return date.toString().split(' ')[0];
  }

  function getMonthName(date) {
    return date.toString().split(' ')[1];
  }
  function getAcademicYear(date) {
    return date.toString().split(' ')[2];
  }
  function isSameDay(date1, date2) {
    if (
      date1.getDate() == date2.getDate() &&
      date1.getMonth() == date2.getMonth()
    )
      return true;
    else false;
  }
  function isToday(date) {
    if (
      new Date().getDate() == new Date(date).getDate() &&
      new Date().getMonth() == new Date(date).getMonth()
    )
      return true;
  }

  function parseDate(selectedDate) {
    const format =
      new Date(selectedDate).getFullYear().toString() +
      '-' +
      ('0' + (new Date(selectedDate).getMonth() + 1)).slice(-2) +
      '-' +
      ('0' + new Date(selectedDate).getDate()).slice(-2);
    return format;
  }
  const onDatePress = date => {
    var currentDate = new Date();
    var checkSelectedDate = new Date(date);

    if (checkSelectedDate > currentDate) {
      setSelectedDate(date);
      setSelectedWarnLevelDate(parseDate(date));
      setError(true);
      setLoading(true);
    } else {
      setSelectedDate(date);
      setSelectedWarnLevelDate(parseDate(date));
      setLoading(true);
      setError(false);
    }
  };
  const renderItem = ({item}) => {
    const dayNumber = item.getDate();
    const dayString = getDayString(item);
    const getMonth = getMonthName(item);
    const getYear = item.getFullYear();
    const isActive = isSameDay(new Date(selectedDate), item);
    const backgroundColor = isActive ? 'white' : '#0346a6';
    const color = isActive ? 'green' : 'white';

    return (
      <Item
        item={item}
        onPress={() => onDatePress(item)}
        backgroundColor={{backgroundColor}}
        textColor={{color}}
        getMonth={getMonth}
        dayNumber={dayNumber}
        dayString={dayString}
        getYear={getYear}
      />
    );
  };

  const ItemView = ({item}) => {
    return (
      <View>
        <Text style={styles.itemStyle} onPress={() => getItem(item)}>
          {item.Dates}
        </Text>
      </View>
    );
  };
  const ItemSeparatorView = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };
  const getItem = item => {
    setSelectedDate(item.Dates);
    setLoading(true);
  };
  const toggleRiskInfo = () => {
    //Toggling the state of single Collapsible
    setShowRiskInfo(!showRiskInfo);
  };
  /*  function riskInfo() {
    return (
      <View style={styles.REffText1}>
        <Collapsible collapsed={showRiskInfo}>
          <Text style={styles.REffText}>
            Click on the link below to know about datasources used in COVID-19
            Positive Cases Count chart<Text>{'  '}</Text>
            <Text
              style={[styles.REffText, {color: 'blue'}]}
              onPress={() =>
                Linking.openURL(
                  'https://www.data.gv.at/katalog/dataset/4b71eb3d-7d55-4967-b80d-91a3f220b60c',
                )
              }>
              link
            </Text>
          </Text>
        </Collapsible>
      </View>
    );
  } */
  /*  if (loading)
    return (
      <View>
        <ActivityIndicator />
      </View>
    ); */

  return (
    <SafeAreaProvider>
      <ScrollView style={styles.container}>
        {/* <StatusBar
          animated={true}
          backgroundColor="#d78700"
          barStyle={'light-content'}
          showHideTransition={'fade'}
          hidden={true}
        /> */}
        <View style={{paddingTop: 1}}>
          {/* <Header
            backgroundColor="#d78700"
            centerComponent={{
              text: 'Corona Warning Level',
              style: {color: '#fff', fontSize: 18, fontWeight: 'bold'},
              color: '#fff',

              textColor: '#fff',
              fontWeight: 'bold',
            }}
          /> */}
        </View>
        <View
          style={{
            paddingTop: 1,
          }}>
          <Card containerStyle={styles.cardStyle1}>
            <View>
              <View style={styles.row1}>
                <Card.Title style={styles.cardTitle}>
                  COVID-19 Risk Level Indicators
                </Card.Title>
              </View>
            </View>
            {/*  <Card.Title style={styles.cardTitle}>
              COVID-19 Risk Level Indicators
            </Card.Title> */}
            <VictoryLegend
              x={1}
              y={1}
              orientation="horizontal"
              gutter={30}
              data={[
                {name: 'Very High', symbol: {fill: 'red', type: 'circle'}},
                {name: 'High', symbol: {fill: 'orange', type: 'circle'}},
                {name: 'Medium', symbol: {fill: 'gold', type: 'circle'}},
                {name: 'Low', symbol: {fill: 'green', type: 'circle'}},
              ]}
            />
          </Card>
        </View>

        <View style={styles.map}>
          {loading ? (
            <View style={{paddingTop: 250}}>
              <ActivityIndicator />
              <Text style={{textAlign: 'center'}}>Loading...</Text>
            </View>
          ) : (
            <MapView
              provider={PROVIDER_GOOGLE}
              style={styles.map}
              region={{
                latitude: 47.333333,
                longitude: 13.333333,
                latitudeDelta: 6.5,
                longitudeDelta: 1.5,
              }}
              onLoadEnd={() => setLoading(false)}>
              {districtName.map((report, i) => (
                <Circle
                  key={i}
                  center={{
                    latitude: report.Latitude,
                    longitude: report.Longitude,
                  }}
                  radius={8000}
                  strokeWidth={1}
                  strokeColor={report.MarkerColor}
                  fillColor={report.MarkerColor}
                  zIndex={1}
                  lineCap={'square'}
                />
              ))}
            </MapView>
          )}
        </View>
        <View style={styles.map}>
          {errorDate ? (
            <View style={{paddingTop: 250}}>
              <Text style={{textAlign: 'center'}}>
                Please Choose a date less than or equal to current date
              </Text>
            </View>
          ) : null}
        </View>
        <View style={{paddingTop: 445}}>
          <Card containerStyle={styles.cardStyle}>
            <Card.Title style={styles.cardTitle}>
              Corona Warning Level on - {selectedWarnLevelDate}
            </Card.Title>
            <Text style={{color: 'black'}}>Choose a date</Text>
            <FlatList
              style={styles.FlatlistContainer}
              data={result}
              renderItem={renderItem}
              keyExtractor={item => item.toDateString()}
              horizontal={true}
              // initialNumToRender={15}
              maxToRenderPerBatch={113}
              showsHorizontalScrollIndicator={true}
              initialScrollIndex={result.length - 3}
              contentContainerStyle={[{paddingLeft: 4, paddingRight: 4}]}
            />
          </Card>
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
}
const styles = StyleSheet.create({
  container: {
    height: '100%',
    flex: 1,
    paddingTop: 0,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    top: 48,
    //top: 60 || 70,
    height: 500,
  },
  itemStyle: {
    paddingLeft: 50,
    alignItems: 'center',
  },
  searchbarstyle: {
    height: 30,
  },
  inputParametersContainer: {
    paddingTop: 20,
  },
  FlatlistContainer: {
    backgroundColor: '#0346a6',
  },
  cardStyle: {
    marginTop: 3,
    paddingTop: 3,
    borderRadius: 20,
    height: 170,
    width: 380,
    marginRight: 0,
    marginLeft: 5,
    borderColor: 'lightgrey',
    marginBottom: 5,
  },
  cardStyle1: {
    marginTop: 3,
    paddingTop: 5,
    borderRadius: 20,
    height: 90,
    width: 382,
    marginRight: 0,
    marginLeft: 5,
    borderColor: 'lightgrey',
  },
  cardTitle: {
    color: '#0087ff',
    fontSize: 17,
  },
  flatListStyle: {
    padding: 45,
    paddingTop: 10,
    paddingBottom: 10,
    width: '100%',
    height: '60%',
    borderRadius: 20,

    backgroundColor: '#d4d4d4',
    flexGrow: 0,
  },
  dateOutput: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
  dayStyle: {
    color: 'white',
    fontSize: 18,

    textTransform: 'lowercase',
  },
  activeText: {
    color: 'green',
  },
  wldates: {
    width: 60,
    height: 90,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  row1: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
