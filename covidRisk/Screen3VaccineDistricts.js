import React, {useState, useEffect} from 'react';

import {
  ScrollView,
  FlatList,
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  TouchableOpacity,
  Modal,
  Dimensions,
  ActivityIndicator,
  LogBox,
  Linking,
} from 'react-native';
import {
  VictoryBar,
  VictoryGroup,
  VictoryLine,
  VictoryChart,
  VictoryTheme,
  VictoryZoomContainer,
  VictoryTooltip,
  VictoryBrushContainer,
  VictoryVoronoiContainer,
  VictoryAxis,
  createContainer,
  VictoryLabel,
} from 'victory-native';
import Geolocation from 'react-native-geolocation-service';
import * as muninames from './municipalities.json';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import * as dropdownvales from './municipalities.json';
import {Menu, MenuItem, MenuDivider} from 'react-native-material-menu';
import {Button, Header, Icon} from 'react-native-elements';
import Collapsible from 'react-native-collapsible';
import {DataTable} from 'react-native-paper';
export default function getFullyVaccinatedCountAPI({navigation, route}) {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [districtWiseVaccCount, setDistrictWiseVaccCount] = useState([]);
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [revGeocoding, setRevGeocoding] = useState();
  const [municipalityName, setMunicipalityName] = useState();
  const [selectedDistrictName, setSelectedDistrictName] = useState(
    route.params.municipalityName
      ? route.params.municipalityName.toString()
      : 'Linz',
  );
  const [selectedInterval, setSelectedInterval] = useState('Monthly');
  const [query, setQuery] = useState('');

  const [state, setState] = useState({data: dropdownvales['Municipalities']});
  const [modalVisible, setModalVisible] = useState(false);
  const [showRiskInfo, setShowRiskInfo] = useState(true);
  // https://www.data.gv.at/katalog/dataset/d230c9e8-745a-4da3-a3b4-86842591d9f0

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() =>
            Linking.openURL(
              'https://www.data.gv.at/katalog/dataset/85d040af-e09a-4401-8d67-8cee3e41fcaa',
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
  const toggleRiskInfo = () => {
    //Toggling the state of single Collapsible
    setShowRiskInfo(!showRiskInfo);
  };

  const selectedYear = 2021;

  const showMenu = () => setVisible(true);
  const hideMenu = () => setVisible(false);

  const getSelectedInterval = Interval => {
    setSelectedInterval(Interval);
    //hideMenu();
  };
  const getSelectedState = district => {
    setSelectedDistrictName(district);

    setModalVisible(!modalVisible);
  };
  const visibleYear = true;

  const ddvalues = dropdownvales['Municipalities'];

  const getVaccinationData = async () => {
    try {
      const response = await fetch(
        `https://covid19infoapi51055.lm.r.appspot.com/api/VaccinationDistricts/?districtname=${selectedDistrictName}`,
      );
      const json = await response.json();
      setDistrictWiseVaccCount(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getVaccinationData();
  }, [selectedDistrictName, selectedInterval]);
  useEffect(() => {
    if (route.params.municipalityName)
      setSelectedDistrictName(route.params.municipalityName.toString());
  }, [route.params.municipalityName]);

  LogBox.ignoreLogs(['new NativeEventEmitter']);
  LogBox.ignoreAllLogs();
  function searchData(text) {
    console.log(text);
    const newData = ddvalues.filter(item => {
      const itemData = item.municipality_name.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    setState({
      data: newData,
    });
    setQuery(text);
  }
  const itemSeparator = () => {
    return (
      <View
        style={{
          height: 0.7,
          width: '100%',
          backgroundColor: '#000',
        }}
      />
    );
  };
  const Item = ({item, onPress, textColor}) => (
    <ScrollView>
      <TouchableOpacity onPress={onPress}>
        <Text style={[textColor, styles.row]}>{item.municipality_name}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
  const renderItem = ({item}) => {
    const color =
      item.municipality_name === selectedDistrictName ? 'green' : 'black';

    return (
      <Item
        item={item}
        onPress={() => getSelectedState(item.municipality_name)}
        textColor={{color}}
      />
    );
  };
  var MyChart = (
    <VictoryBar
      data={districtWiseVaccCount}
      x={'Type'}
      y={'Dose'}
      labels={({datum}) => `${datum.Dose}`}
      style={{
        data: {stroke: 'green', strokeWidth: 3, fill: '#2CB083'},
        parent: {border: '7px solid #ccc'},
        fontSize: 15,
      }}
      labelComponent={<VictoryLabel style={[{fill: 'black', fontSize: 15}]} />}
    />
  );
  if (loading)
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  const TableExample = () => {
    return (
      <View>
        <DataTable
          style={{
            paddingLeft: 10,

            paddingRight: 10,
            paddingBottom: 15,
          }}>
          <DataTable.Header style={styles.tableHeader}>
            <DataTable.Title>
              <Text style={styles.subHeadingTable}>Population</Text>
            </DataTable.Title>
            <DataTable.Title>
              <Text style={styles.subHeadingTable}>Dose_Type</Text>
            </DataTable.Title>
            <DataTable.Title>
              <Text style={styles.subHeadingTable}>Vaccinated(%)</Text>
            </DataTable.Title>
          </DataTable.Header>

          <DataTable.Row style={styles.tableBorder}>
            <DataTable.Cell>
              <Text style={styles.subHeading}>
                {' '}
                {districtWiseVaccCount[0].municipality_population}
              </Text>
            </DataTable.Cell>

            <DataTable.Cell>
              <Text style={styles.subHeading}>Dose_1</Text>
            </DataTable.Cell>
            <DataTable.Cell>
              <Text style={styles.tabletextStyle}>
                {(
                  (districtWiseVaccCount[0].dose_1 /
                    districtWiseVaccCount[0].municipality_population) *
                  100
                ).toFixed(2)}
              </Text>
            </DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row style={styles.tableBorder}>
            <DataTable.Cell>
              <Text style={styles.subHeading}></Text>
            </DataTable.Cell>

            <DataTable.Cell>
              <Text style={styles.subHeading}>Dose_2</Text>
            </DataTable.Cell>
            <DataTable.Cell>
              <Text style={styles.tabletextStyle}>
                {(
                  (districtWiseVaccCount[0].dose_2 /
                    districtWiseVaccCount[0].municipality_population) *
                  100
                ).toFixed(2)}
              </Text>
            </DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row style={styles.tableBorder}>
            <DataTable.Cell>
              <Text style={styles.subHeading}></Text>
            </DataTable.Cell>

            <DataTable.Cell>
              <Text style={styles.subHeading}>Dose_3</Text>
            </DataTable.Cell>
            <DataTable.Cell>
              <Text style={styles.tabletextStyle}>
                {(
                  (districtWiseVaccCount[0].dose_3 /
                    districtWiseVaccCount[0].municipality_population) *
                  100
                ).toFixed(2)}
              </Text>
            </DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row style={styles.tableBorder}>
            <DataTable.Cell>
              <Text style={styles.subHeading}></Text>
            </DataTable.Cell>

            <DataTable.Cell>
              <Text style={styles.subHeading}>Dose_4</Text>
            </DataTable.Cell>
            <DataTable.Cell>
              <Text style={styles.tabletextStyle}>
                {(
                  (districtWiseVaccCount[0].dose_4 /
                    districtWiseVaccCount[0].municipality_population) *
                  100
                ).toFixed(2)}
              </Text>
            </DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row style={styles.tableBorder}>
            <DataTable.Cell>
              <Text style={styles.subHeading}></Text>
            </DataTable.Cell>

            <DataTable.Cell>
              <Text style={styles.subHeading}>Dose_5</Text>
            </DataTable.Cell>
            <DataTable.Cell>
              <Text style={styles.tabletextStyle}>
                {(
                  (districtWiseVaccCount[0]['dose_5+'] /
                    districtWiseVaccCount[0].municipality_population) *
                  100
                ).toFixed(2)}
              </Text>
            </DataTable.Cell>
          </DataTable.Row>
        </DataTable>
      </View>
    );
  };
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <ScrollView>
          <View>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}>
              <View style={styles.centeredView1}>
                <View style={styles.modalView}>
                  <TextInput
                    style={styles.textInput}
                    onChangeText={text => searchData(text)}
                    value={query}
                    underlineColorAndroid="transparent"
                    placeholder="Search for a district"
                    placeholderTextColor="black"
                  />

                  <FlatList
                    data={state.data}
                    keyExtractor={(item, id) => id.toString()}
                    ItemSeparatorComponent={itemSeparator}
                    initialNumToRender={5}
                    renderItem={renderItem}
                    style={{marginTop: 10}}
                  />
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}>
                    <Text style={styles.ModalButtontextStyle}>Close</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>
          </View>

          <View
            style={{
              flexDirection: 'row',
              textAlign: 'center',
              justifyContent: 'center',
              paddingTop: 5,
            }}>
            <Pressable onPress={() => setModalVisible(true)}>
              <Text style={styles.districtNametextStyle}>
                {selectedDistrictName}{' '}
              </Text>
            </Pressable>
          </View>

          <VictoryChart
            theme={VictoryTheme.material}
            width={400}
            height={400}
            domainPadding={{x: [50, 30]}}
            padding={{top: 40, left: 85, right: 40, bottom: 55}}>
            <VictoryAxis
              dependentAxis
              fixLabelOverlap={true}
              tickValues={districtWiseVaccCount['Type']}
              style={{
                axis: {stroke: 'black', size: 8},
                ticks: {stroke: 'black'},

                tickLabels: {
                  fill: 'black',
                  fontSize: 15,
                },
                grid: {
                  stroke: 'transparent',
                },
              }}
            />
            <VictoryAxis
              fixLabelOverlap={true}
              independentAxis
              tickLabelComponent={<VictoryLabel angle={-19} y={350} dy={8} />}
              style={{
                axis: {stroke: 'black', size: 8},
                ticks: {stroke: 'black'},

                tickLabels: {
                  fill: 'black',
                  fontSize: 15,
                },
                grid: {
                  stroke: 'transparent',
                  size: 7,
                },
              }}
            />
            {MyChart}
          </VictoryChart>
          <View style={{marginTop: 1}}>
            <Text style={styles.textStyle}>
              Date: {districtWiseVaccCount[0].Interval}
            </Text>
          </View>

          <View style={{paddingTop: 10}}>
            <TableExample />
          </View>
        </ScrollView>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 3,
  },
  row1: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  centeredView1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 110,
    marginBottom: 150,
  },
  row: {
    fontSize: 18,
    padding: 10,
  },
  parametersRow: {
    flexDirection: 'row',
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: 320,
  },
  button: {
    marginLeft: 5,
    width: 120,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  normalButton: {
    width: 70,
    height: 30,
    borderRadius: 50,
    paddingTop: 0,
    paddingBottom: 0,
    paddingRight: 5,
    paddingLeft: 0,
  },
  buttonOpen: {
    backgroundColor: 'dodgerblue',
  },
  buttonClose: {
    backgroundColor: '#F93C2D',
  },
  textStyle: {
    fontSize: 16,
    color: '#2CB083',
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
    marginLeft: 20,
    marginBottom: 15,
  },
  districtNametextStyle: {
    fontSize: 16,
    color: '#2CB083',
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
    marginLeft: 20,
    marginTop: 15,
  },

  highlight: {
    fontWeight: '700',
  },
  heading: {
    fontSize: 16,
    color: '#2CB083',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 20,
  },

  ModalButtontextStyle: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textInput: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    width: 280,
    height: 42,
    borderWidth: 1,
    borderColor: '#009688',
    borderRadius: 50,
    backgroundColor: '#FFFF',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  REffText: {
    fontSize: 15,

    paddingTop: 5,

    textAlign: 'left',
    marginLeft: 7,
    marginRight: 5,
    color: 'black',
  },
  REffText1: {
    paddingTop: 5,
    height: 50,
    paddingBottom: 20,
    textAlign: 'left',
    marginLeft: 7,
    marginRight: 5,
    color: 'black',
  },
  subHeading: {
    textAlign: 'center',
    fontSize: 15,
    color: '#2CB083',
    fontWeight: 'bold',
  },
  subHeadingTable: {
    textAlign: 'center',
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  tableHeader: {
    backgroundColor: '#DCDCDC',
    fontSize: 16,
    color: 'black',
  },
  tableBorder: {
    borderBottomWidth: 1,
    borderColor: 'black',
    backgroundColor: '#E9E4E3',
  },
  tabletextStyle: {
    fontSize: 15,
    color: '#2CB083',
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
    marginLeft: 20,
  },
});
