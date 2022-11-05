import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import CollapsibleView from '@eliav2/react-native-collapsible-view';
import {Icon, Card} from 'react-native-elements';
import {List} from 'react-native-paper';
import {Context} from './Context.js';
export const maskforPeople = 'Infected';
export const maskEffInf = 0.5;
export const maskEffNor = 0.7;

function BehavioralProperties({todos}) {
  const [expandMaskForPpl, setExpandMaskForPpl] = useState(false);
  const [showVaccine, setShowVaccine] = useState(false);
  const [showMasks, setShowMasks] = useState(false);
  const [bg, setBg] = useState({colorId: 0});
  const [onpressed, setonpressed] = useState(false);
  const handleMaskPpl = () => setExpandMaskForPpl(!expandMaskForPpl);
  const MaskEfficiencyPeople = [
    {name: 'Infected', id: 1},
    {name: 'Normal', id: 2},
    {name: 'Infected and Normal', id: 3},
  ];

  const [mainbg, setMainBg] = useState({
    vaccine: '',
    mask: '',
    window: '',
    ceilingHeight: '',
    speechTime: '',
    speechVolume: '',
  });
  const setBgColor = selectedParam => {
    if (selectedParam == 'vaccine') {
      setMainBg({vaccine: selectedParam});
    } else if (selectedParam == 'mask') {
      setMainBg({mask: selectedParam});
    } /*  else if (selectedParam == 'window') {
      setMainBg({window: selectedParam});
    } else if (selectedParam == 'ceilingHeight') {
      setMainBg({ceilingHeight: selectedParam});
    } else if (selectedParam == 'speechTime') {
      setMainBg({speechTime: selectedParam});
    } else {
      setMainBg({speechVolume: selectedParam});
    } */
  };
  const selectedVaccinatin = (value, vaccine, id) => {
    todos.setVaccination(value);
    setBgColor(vaccine);
    setBg({colorId: id});
  };
  const showHideParameters = selectedValue => {
    if (selectedValue == 'vaccine') {
      setShowVaccine(!showVaccine);
      setShowMasks(false);
    } else if (selectedValue == 'mask') {
      setShowMasks(!showMasks);
      setShowVaccine(false);
    }
  };
  function setMaskEfficiencyPeople(
    selectedPeopleCategory,
    maskEff,
    id,
    mask,
    maskType,
  ) {
    setBgColor(mask);
    setBg({colorId: id});
    if (selectedPeopleCategory == 'Infected') {
      todos.setMaskEfficiencyI(maskEff);
      todos.setMaskTypeI(maskType);
    } else if (selectedPeopleCategory == 'Normal') {
      todos.setMaskEfficiencyN(maskEff);
      todos.setMaskTypeN(maskType);
    } else if (selectedPeopleCategory == 'Infected and Normal') {
      todos.setMaskEfficiencyI(maskEff);
      todos.setMaskEfficiencyN(maskEff);
      todos.setMaskTypeI(maskType);
      todos.setMaskTypeN(maskType);
    }
  }

  return (
    <View>
      <CollapsibleView
        title={
          <Text
            style={{
              color: '#9239FE',
              fontSize: 18,
              fontStyle: 'normal',
              paddingRight: 45,
              padding: 5,
            }}>
            Behavioral Properties
          </Text>
        }
        style={{
          borderWidth: 0,
          backgroundColor: 'milkwhite',
          borderRadius: 5,
        }}
        arrowStyling={{
          size: 18,
          rounded: true,
          thickness: 5,
          color: '#9239FE',
        }}
        /* collapsibleContainerStyle={{position: 'absolute', top: '100%'}}
        touchableWrapperProps={{paddingLeft: 5, marginLeft: 5}}
        titleProps={{paddingLeft: 5, marginLeft: 5}}
        touchableWrapperStyle={{paddingLeft: 5, marginLeft: 5}}
 */
        titleStyle={{
          paddingLeft: 5,
          marginLeft: 5,
          alignContent: 'center',
          color: '#9239FE',
        }}>
        <Card containerStyle={styles.cardContainer}>
          <List.Accordion
            title={todos.maskCateogoryPpl}
            titleStyle={{color: '#9239FE'}}
            expanded={expandMaskForPpl}
            onPress={handleMaskPpl}>
            {MaskEfficiencyPeople.map(maskPpl => (
              <List.Item
                key={maskPpl.id}
                title={maskPpl.name}
                onPress={() => {
                  todos.setMaskCategoryPpl(maskPpl.name);

                  //  setonpressed(true);
                }}
              />
            ))}
          </List.Accordion>

          <View style={{flexDirection: 'row'}}></View>
          <View style={styles.cardrow}>
            <View style={styles.spaceImagesthree}>
              <TouchableOpacity
                onPress={() => showHideParameters('vaccine')}
                style={
                  mainbg.vaccine === 'vaccine' ? styles.red : styles.defaultBg
                }>
                <Image
                  source={require('./images/injection.png')}
                  style={styles.imgDimensions}
                />
                {/* <Text style={styles.textStyle}>{'\n'}Vaccine</Text> */}
              </TouchableOpacity>
            </View>
            <View style={styles.spaceImagesthree}>
              <TouchableOpacity
                onPress={() => showHideParameters('mask')}
                style={mainbg.mask === 'mask' ? styles.red : styles.defaultBg}>
                <Image
                  source={require('./images/ffp2.png')}
                  style={styles.imgDimensions}
                />
                {/*  <Text style={styles.textStyle}>{'\n'}Mask Type</Text>*/}
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.cardrow1}>
            <Text style={styles.textStyle1}>Vaccine</Text>
            <Text style={styles.textStyle2}>Mask Type</Text>
          </View>
          {showVaccine ? (
            <View style={styles.cardrow}>
              <View style={styles.spaceImagesinSubset1}>
                <TouchableOpacity
                  onPress={() => selectedVaccinatin('None', 'vaccine', 1)}
                  style={bg.colorId === 1 ? styles.red : styles.defaultBg}>
                  <Image
                    source={require('./images/woman.png')}
                    style={styles.imgDimensionsinSubset}
                  />
                </TouchableOpacity>
                <Text style={styles.textStyle}>None</Text>
              </View>
              <View style={styles.spaceImagesinSubset1}>
                <TouchableOpacity
                  onPress={() => selectedVaccinatin('Everyone', 'vaccine', 2)}
                  style={bg.colorId === 2 ? styles.red : styles.defaultBg}>
                  <Image
                    source={require('./images/crowd.png')}
                    style={styles.imgDimensionsinSubset}
                  />
                </TouchableOpacity>
                <Text style={styles.textStyle}>Everyone</Text>
              </View>
              <View style={styles.spaceImagesinSubset1}>
                <TouchableOpacity
                  onPress={() => selectedVaccinatin('Individual', 'vaccine', 3)}
                  style={bg.colorId === 3 ? styles.red : styles.defaultBg}>
                  <Image
                    source={require('./images/peoplevaccinated.png')}
                    style={styles.imgDimensionsinSubset}
                  />
                </TouchableOpacity>
                <Text style={styles.textStyle}>Individual</Text>
              </View>
            </View>
          ) : null}
          {showMasks ? (
            <View style={styles.cardrow}>
              <View style={styles.spaceImagesinSubset}>
                <TouchableOpacity
                  onPress={() =>
                    setMaskEfficiencyPeople(
                      todos.maskCateogoryPpl,
                      0.7,
                      1,
                      'mask',
                      'FFP2',
                    )
                  }
                  style={bg.colorId === 1 ? styles.red : styles.defaultBg}>
                  <Image
                    source={require('./images/ffp2.png')}
                    style={styles.imgDimensionsinSubset}
                  />
                </TouchableOpacity>
                <Text style={styles.textStyle}>FFP2 </Text>
              </View>
              <View style={styles.spaceImagesinSubset}>
                <TouchableOpacity
                  onPress={() =>
                    setMaskEfficiencyPeople(
                      todos.maskCateogoryPpl,
                      0.5,
                      2,
                      'mask',
                      'Surgical',
                    )
                  }
                  style={bg.colorId === 2 ? styles.red : styles.defaultBg}>
                  <Image
                    source={require('./images/mask_normal.png')}
                    style={styles.imgDimensionsinSubset}
                  />
                </TouchableOpacity>
                <Text style={styles.textStyle}>Surgical </Text>
              </View>
              <View style={styles.spaceImagesinSubset}>
                <TouchableOpacity
                  onPress={() =>
                    setMaskEfficiencyPeople(
                      todos.maskCateogoryPpl,
                      0.2,
                      3,
                      'mask',
                      'Cloth',
                    )
                  }
                  style={bg.colorId === 3 ? styles.red : styles.defaultBg}>
                  <Image
                    source={require('./images/cloth-mask.png')}
                    style={styles.imgDimensionsinSubset}
                  />
                </TouchableOpacity>
                <Text style={styles.textStyle}>Cloth </Text>
              </View>
              <View style={styles.spaceImagesinSubset}>
                <TouchableOpacity
                  onPress={() =>
                    setMaskEfficiencyPeople(
                      todos.maskCateogoryPpl,
                      0,
                      4,
                      'mask',
                      'No Mask',
                    )
                  }
                  style={bg.colorId === 4 ? styles.red : styles.defaultBg}>
                  <Image
                    source={require('./images/no-mask.png')}
                    style={styles.imgDimensionsinSubset}
                  />
                </TouchableOpacity>
                <Text style={styles.textStyle}>No Mask</Text>
              </View>
            </View>
          ) : null}
        </Card>
      </CollapsibleView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  cardContainer: {
    borderRadius: 10,
    width: 350,
    marginLeft: 5,
    marginRight: 5,
  },
  imgDimensions: {
    width: 45,
    height: 45,
  },
  cardrow: {
    flexDirection: 'row',
    // paddingTop: 10,
    // paddingBottom: 20,
    // paddingBottom: 15,
  },
  spaceImagesthree: {
    flexDirection: 'row',
    //paddingTop: 20,
    // paddingLeft: 30,
    // padding: 10,
    paddingLeft: 60,
    paddingTop: 10,
  },
  red: {
    backgroundColor: '#58D68D',

    borderRadius: 50,
    width: 70,
    height: 72,
    alignContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  defaultBg: {
    //backgroundColor: '#FF8661',
    backgroundColor: '#add8e6',
    borderRadius: 50,
    width: 70,
    height: 72,
    alignContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  textStyle: {color: 'black', fontSize: 14},
  cardrow1: {
    flexDirection: 'row',
    paddingTop: 3,
  },
  textStyle1: {
    color: 'black',
    paddingLeft: 69,
    fontSize: 14,
  },
  textStyle2: {
    color: 'black',
    paddingLeft: 73,
    fontSize: 14,
  },
  spaceImagesinSubset: {
    // paddingTop: 34,
    // paddingTop: 20,
    // paddingLeft: 5,
    alignContent: 'center',
    alignItems: 'center',
    paddingTop: 5,
    paddingLeft: 9,
    // paddingLeft: 7,
  },
  spaceImagesinSubset1: {
    // paddingTop: 5,
    paddingLeft: 25,
    paddingTop: 7,
    // paddingLeft: 5,
    alignContent: 'center',
    alignItems: 'center',
    // paddingBottom: 25,
    //paddingBottom: 15,
    // padding: 10,
  },
  imgDimensionsinSubset: {
    width: 45,
    height: 45,
  },
});
export default BehavioralProperties;
