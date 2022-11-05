import React, {useState, useEffect} from 'react';

import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  Linking,
} from 'react-native';

import {
  VictoryLine,
  VictoryChart,
  VictoryTheme,
  VictoryBar,
  VictoryZoomContainer,
  VictoryTooltip,
  VictoryBrushContainer,
  VictoryVoronoiContainer,
  VictoryAxis,
  createContainer,
  VictoryLabel,
} from 'victory-native';
import {Header, Icon, Card} from 'react-native-elements';
import Collapsible from 'react-native-collapsible';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {DataTable} from 'react-native-paper';
export default function getReffectiveValue({navigation}) {
  const [loading, setLoading] = useState(true);
  const [rEffAustria, setREffAustria] = useState([]);
  const [showRiskInfo, setShowRiskInfo] = useState(true);
  const VictoryZoomVoronoiContainer = createContainer('zoom', 'voronoi');

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() =>
            Linking.openURL(
              'https://www.ages.at/wissen-aktuell/publikationen/epidemiologische-parameter-des-covid19-ausbruchs-oesterreich-20202021/',
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

  const getREffectiveValue = async () => {
    try {
      const response = await fetch(
        `https://covid19infoapi51055.lm.r.appspot.com/api/R_eff_Austria/?interval=Daily`,
      );
      const json = await response.json();
      setREffAustria(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getREffectiveValue();
  }, []);
  var MyChart = (
    <VictoryLine
      style={{
        data: {stroke: '#0597D8', strokeWidth: 3},
        parent: {border: '1px solid #ccc'},
      }}
      data={rEffAustria}
      x={'Interval'}
      y={'R_eff'}
      interpolation="catmullRom"
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
              <Text style={styles.subHeading}>Chart</Text>
            </DataTable.Title>
            <DataTable.Title>
              <Text style={styles.subHeading}>Details</Text>
            </DataTable.Title>
          </DataTable.Header>

          <DataTable.Row style={styles.tableBorder}>
            <DataTable.Cell>
              <Text style={styles.subHeading}>Granularity:</Text>
            </DataTable.Cell>
            <DataTable.Cell>
              <Text style={styles.tabletextStyle}> Country</Text>
            </DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row style={styles.tableBorder}>
            <DataTable.Cell>
              {' '}
              <Text style={styles.subHeading}>Update Interval</Text>
            </DataTable.Cell>
            <DataTable.Cell>
              {' '}
              <Text style={styles.tabletextStyle}>Daily</Text>
            </DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row style={styles.tableBorder}>
            <DataTable.Cell>
              {' '}
              <Text style={styles.subHeading}>Availability</Text>
            </DataTable.Cell>
            <DataTable.Cell>
              {' '}
              <Text style={styles.tabletextStyle}>Lagging By One Week</Text>
            </DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row style={styles.tableBorder}>
            <DataTable.Cell>
              {' '}
              <Text style={styles.subHeading}>Graph Interval</Text>
            </DataTable.Cell>
            <DataTable.Cell>
              {' '}
              <Text style={styles.tabletextStyle}>Date Wise</Text>
            </DataTable.Cell>
          </DataTable.Row>
        </DataTable>
      </View>
    );
  };
  return (
    <SafeAreaProvider>
      <ScrollView>
        <View style={styles.container}>
          <View>
            <Text style={styles.textStyle}>Austria Daily View</Text>
          </View>

          <VictoryChart
            theme={VictoryTheme.material}
            width={400}
            height={520}
            domainPadding={{x: [2, 20], y: [0, 20]}}
            padding={{top: 80, left: 50, right: 30, bottom: 60}}
            containerComponent={
              <VictoryZoomVoronoiContainer
                allowPan={true}
                allowZoom={true}
                responsive={false}
                zoomDimension="x"
                minimumZoom={{x: 3, y: 0.01}}
                /*  zoomDomain={zoomDomain}
                  onZoomDomainChange={handleZoom} */
                labels={({datum}) => `R_eff: ${datum.R_eff.toFixed(2)}`}
              />
            }>
            <VictoryAxis
              dependentAxis
              fixLabelOverlap={true}
              tickValues={rEffAustria.R_eff}
              style={{
                axis: {stroke: 'black'},
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
              tickLabelComponent={<VictoryLabel angle={-19} y={470} dy={10} />}
              style={{
                axis: {stroke: 'black'},
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
            {MyChart}
          </VictoryChart>
        </View>
      </ScrollView>
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
  parametersRow: {
    flexDirection: 'row',
  },

  centeredView: {
    flex: 1,
    alignItems: 'center',
    marginTop: 100,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
  },
  modalView: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
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
    width: 100,
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
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0597D8',
    marginLeft: 17,
    marginTop: 15,
    flexDirection: 'row',
    textAlign: 'center',
    justifyContent: 'center',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  heading: {
    fontSize: 16,
    color: '#0597D8',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 20,
  },
  subHeading: {
    fontSize: 17,
    color: '#4c70e6',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  REffText: {
    fontSize: 15,
    marginBottom: 2,
    paddingBottom: 2,
    textAlign: 'left',
    marginLeft: 7,
    marginRight: 5,
    color: 'black',
  },
  subHeading: {
    textAlign: 'center',
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  tableHeader: {
    backgroundColor: '#DCDCDC',
    fontSize: 14,
    color: 'black',
  },
  tableBorder: {
    borderBottomWidth: 1,
    borderColor: 'black',
    paddingLeft: 15,
    paddingRight: 20,
    backgroundColor: '#E9E4E3',
  },
  tabletextStyle: {
    fontSize: 14,
    color: '#0597D8',
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
    marginLeft: 20,
  },
});
