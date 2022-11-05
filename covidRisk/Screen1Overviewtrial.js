import React, {useState, useEffect} from 'react';
import {PermissionsAndroid} from 'react-native';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Linking,
  Image,
  LogBox,
  TouchableOpacity,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import * as cityNames from './dropDownValues.json';
import * as muninames from './municipalities.json';
import {Card, Header, Icon} from 'react-native-elements';

export default function DataOverview({navigation}) {
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [revGeocoding, setRevGeocoding] = useState();
  const [districtName, setDistrictName] = useState();
  const [municipalityName, setMunicipalityName] = useState();
  const [loading, setLoading] = useState(false);

  const locationgranted = async () => {
    const checkPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (checkPermission === PermissionsAndroid.RESULTS.GRANTED) {
      console.log(checkPermission);
      geolocation();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Geolocation Permission',
            message:
              'We need access to your location so you can get location-aware covid updates.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          geolocation();
        } else {
          setDistrictName('Linz-Land');
          setMunicipalityName('Linz');
          console.log("You don't have access for the location", granted);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  locationgranted();
  const geolocation = () => {
    try {
      Geolocation.getCurrentPosition(
        position => {
          var coordinates = position.coords;
          setLatitude(coordinates['latitude']);
          setLongitude(coordinates['longitude']);
          if (latitude && longitude) {
            console.log(latitude, longitude);
            getAddress(latitude, longitude);
          } else {
            setDistrictName('Linz-Land');
            setMunicipalityName('Linz');
          }
        },
        error => {
          setDistrictName('Linz-Land');
          setMunicipalityName('Linz');
          console.log(
            "You don't have access for the location,enable by default",
          );
        },
        {enableHighAccuracy: true, timeout: 15000},
      );
    } catch (err) {
      console.log(err);
    }
  };
  //  geolocation();
  const getAddress = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode?latitude=${latitude}&longitude=${longitude}&localityLanguage=en&key=bdc_349b83632d4a446285aa95bb2e4092f2`,

        // `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`,
      );
      const json = await response.json();

      var locality = json['city'];

      setRevGeocoding(locality);

      if (revGeocoding) {
        matchCity(revGeocoding);
        getmunname(revGeocoding);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  function matchCity(revGeocoding) {
    const stm = revGeocoding.toString();

    const cn = cityNames['Districts'];

    const regex = new RegExp(stm + '.*');
    let result = cn.find(t => t.districtName.match(regex));
    if (result.districtName) {
      setDistrictName(result.districtName);

      console.log('dist name find', districtName);
    } else {
      setDistrictName('Linz-Land');
    }
  }
  function getmunname(revGeocoding) {
    const mtm = revGeocoding.toString();
    const mn = muninames['Municipalities'];
    const regex = new RegExp(mtm + '.*');
    let munresult = mn.find(m => m.municipality_name.match(regex));
    if (munresult.municipality_name) {
      setMunicipalityName(munresult.municipality_name);

      console.log('muni name find', municipalityName);
    } else {
      setMunicipalityName('Linz');
    }
  }
  LogBox.ignoreLogs(['new NativeEventEmitter']);
  LogBox.ignoreAllLogs();
  return (
    <ScrollView style={styles.container}>
      <View style={styles.cardRow}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('COVID-19 Positive Cases Count', {
              districtName: districtName,
            });
          }}>
          <Card containerStyle={styles.cardStyle}>
            <View style={styles.row}>
              <View style={styles.ImageView}>
                <Image
                  source={require('./images/sick-boy-covid-infected.png')}
                  style={styles.imgDimensions}
                />
              </View>
              <Card.Title style={styles.cardTitle}> Positive Cases</Card.Title>
            </View>

            <View style={styles.cardRow}>
              <Text style={styles.subHeading}>Granularity:</Text>
              <Text style={styles.textStyle}> District</Text>
            </View>
            <View style={styles.cardRow}>
              <Text style={styles.subHeading}>Update Interval:</Text>
              <Text style={styles.textStyle}> Daily</Text>
            </View>
            <View>
              <Text style={styles.subHeading}>Availability:</Text>
              <Text style={styles.textStyle}>Lagging By One Week</Text>
            </View>

            <View>
              <Text style={styles.subHeading}>Graph Interval:</Text>
              <Text style={styles.textStyle}>Day-Week-Month-Year</Text>
            </View>
          </Card>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Vaccinated Count', {
              municipalityName: municipalityName,
            });
          }}>
          <Card containerStyle={styles.cardStyle}>
            <View style={styles.row}>
              <View style={styles.ImageView}>
                <Image
                  source={require('./images/covid_vaccine.png')}
                  style={styles.imgDimensions}
                />
              </View>
              <Card.Title style={styles.cardTitle}> Vaccination</Card.Title>
            </View>

            <View style={styles.cardRow}>
              <Text style={styles.subHeading}>Granularity:</Text>
              <Text style={styles.textStyle}> District</Text>
            </View>
            <View style={styles.cardRow}>
              <Text style={styles.subHeading}>Update Interval:</Text>
              <Text style={styles.textStyle}> Daily</Text>
            </View>
            <View>
              <Text style={styles.subHeading}>Availability:</Text>
              <Text style={styles.textStyle}>Lagging By One Week</Text>
            </View>
            <View>
              <Text style={styles.subHeading}>Graph Interval:</Text>
              <Text style={styles.textStyle}>For Specific Date</Text>
            </View>
          </Card>
        </TouchableOpacity>
      </View>

      <View style={styles.cardRow}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('REffective Value');
          }}>
          <Card containerStyle={styles.cardStyle}>
            <View style={styles.row}>
              <View style={styles.ImageView}>
                <Image
                  source={require('./images/REff_prediction.png')}
                  style={styles.imgDimensions}
                />
              </View>
              <Card.Title style={styles.cardTitle}> Effective R</Card.Title>
            </View>

            <View style={styles.cardRow}>
              <Text style={styles.subHeading}>Granularity:</Text>
              <Text style={styles.textStyle}> Country</Text>
            </View>
            <View style={styles.cardRow}>
              <Text style={styles.subHeading}>Update Interval:</Text>
              <Text style={styles.textStyle}> Daily</Text>
            </View>

            <Text style={styles.subHeading}>Availability:</Text>
            <Text style={styles.textStyle}>Lagging By One Week</Text>

            <View style={styles.cardRow}>
              <Text style={styles.subHeading}>Graph Interval:</Text>
              <Text style={styles.textStyle}> Daily</Text>
            </View>
          </Card>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Warning Level');
          }}>
          <Card containerStyle={styles.cardStyle}>
            <View style={styles.row}>
              <View style={styles.ImageView}>
                <Image
                  source={require('./images/warn_level.png')}
                  style={styles.imgDimensions}
                />
              </View>
              <Card.Title style={styles.cardTitle}> Warning</Card.Title>
            </View>

            <View style={styles.cardRow}>
              <Text style={styles.subHeading}>Granularity:</Text>
              <Text style={styles.textStyle}> District</Text>
            </View>
            <View style={styles.cardRow}>
              <Text style={styles.subHeading}>Update Interval:</Text>
              <Text style={styles.textStyle}> Week</Text>
            </View>
            <View>
              <Text style={styles.subHeading}>Availability:</Text>
              <Text style={styles.textStyle}>Lagging By One Week</Text>
            </View>
            <View style={styles.cardRow}>
              <Text style={styles.subHeading}>Map Interval:</Text>
              <Text style={styles.textStyle}> Week</Text>
            </View>
          </Card>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Modal Parameters');
          }}>
          <Card containerStyle={styles.modelCard}>
            <View style={styles.row}>
              <View style={styles.ImageView}>
                <Image
                  source={require('./images/risk_prediction.png')}
                  style={styles.imgDimensions}
                />
              </View>
              <Card.Title style={styles.cardTitle}> Model</Card.Title>
            </View>

            <View style={{paddingTop: 5}}>
              <View style={styles.cardRow}>
                <Text style={styles.subHeading}>Granularity: </Text>
                <Text style={styles.textStyle}>Indoor Environments</Text>
              </View>
              <View style={styles.cardRow}>
                <Text style={styles.subHeading}>Room: </Text>
                <Text style={styles.textStyle}>
                  Event type, Size, Ventilation, Ceiling Height, {'\n'} People
                  count, Stay duration
                </Text>
              </View>

              <View style={styles.cardRow}>
                <Text style={styles.subHeading}>Behavior: </Text>
                <Text style={styles.textStyle}>Masks and Vaccination</Text>
              </View>
              <View style={styles.cardRow}>
                <Text style={styles.subHeading}>Infected Person: </Text>
                <Text style={styles.textStyle}>
                  Speech Volume, Speech Duration
                </Text>
              </View>
            </View>
          </Card>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#fafafa',
  },
  textStyle: {
    color: 'black',
    fontSize: 14,
    padding: 3,
  },
  Heading: {
    fontWeight: 'bold',
    color: '#0087ff',
    fontSize: 14,
  },
  cardRow: {
    flexDirection: 'row',
    padding: 1,
  },
  modelCard: {
    borderRadius: 20,
    borderColor: 'lightgrey',
    marginRight: 0,
    marginLeft: 10,
    width: 370,
    height: 230,
    paddingTop: 6,
    paddingBottom: 15,
    marginBottom: 20,
  },
  cardStyle: {
    paddingTop: 6,
    borderRadius: 20,
    width: 180,
    marginRight: 1,
    marginLeft: 10,
    borderColor: 'lightgrey',
  },
  cardTitle: {
    color: '#0087ff',
    fontSize: 15,
    paddingTop: 15,
  },
  subHeading: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 16,
  },
  imgDimensions: {
    width: 50,
    height: 50,
  },
  ImageView: {
    alignItems: 'flex-start',
  },
  row: {
    flexDirection: 'row',
    textAlign: 'center',
    justifyContent: 'center',
    paddingTop: 1,
  },
});
