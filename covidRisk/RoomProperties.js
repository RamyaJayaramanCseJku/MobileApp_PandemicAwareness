import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import CollapsibleView from '@eliav2/react-native-collapsible-view';
import {Icon, Card} from 'react-native-elements';
import {TextInput, HelperText, List} from 'react-native-paper';

function RoomProperties({roomprops}) {
  const [expandEvent, setExpandEvent] = useState(false);
  const [showWindow, setShowWindow] = useState(false);
  const [showCeilingHeight, setShowCeilingHeight] = useState(false);
  const [errorRoomSize, SetErrorRoomSize] = useState('');
  const [errorDuration, SetErrorDuration] = useState('');
  const [errorNoofDays, SetErrorNoofDays] = useState('');
  const [errorPplCount, SetErrorPplCount] = useState('');
  const [bg, setBg] = useState({colorId: 0});
  function setValuesByEvent(selectedId) {
    if (selectedId == 'Classroom') {
      roomprops.setEventType(selectedId);
      roomprops.setSpeechVolume(2);
      roomprops.setMaskEfficiencyI(0);
      roomprops.setMaskEfficiencyN(0);
      roomprops.setSpeechDuration(10);
      roomprops.setVentilation(0.35);
      roomprops.setRoomSize(60);
      roomprops.setCeilingHeight(3);
      roomprops.setDurationofStay(12);
      roomprops.setNumberofDays(2);
      roomprops.setNoOfPeople(24);
      roomprops.setMaskTypeI('No Mask');
      roomprops.setMaskTypeN('No Mask');
      roomprops.setMaskCategoryPpl('Mask For People');
      roomprops.setVentilationType('Window Closed');
      roomprops.setSpeechVolumeText('Normal');
      roomprops.setSpeechDurationinTime('1.2 hr');
    } else if (selectedId == 'Office') {
      roomprops.setEventType(selectedId);
      roomprops.setSpeechVolume(2);
      roomprops.setMaskEfficiencyI(0);
      roomprops.setMaskEfficiencyN(0);
      roomprops.setSpeechDuration(10);
      roomprops.setVentilation(0.35);
      roomprops.setRoomSize(40);
      roomprops.setCeilingHeight(3);
      roomprops.setDurationofStay(16);
      roomprops.setNumberofDays(2);
      roomprops.setNoOfPeople(4);
      roomprops.setMaskTypeI('No Mask');
      roomprops.setMaskTypeN('No Mask');
      roomprops.setMaskCategoryPpl('Mask For People');
      roomprops.setVentilationType('Window Closed');
      roomprops.setSpeechVolumeText('Normal');
      roomprops.setSpeechDurationinTime('1.6 hr');
    } else if (selectedId == 'Reception') {
      roomprops.setEventType(selectedId);
      roomprops.setSpeechVolume(2);
      roomprops.setMaskEfficiencyI(0);
      roomprops.setMaskEfficiencyN(0);
      roomprops.setSpeechDuration(25);
      roomprops.setVentilation(0.35);
      roomprops.setRoomSize(100);
      roomprops.setCeilingHeight(4);
      roomprops.setDurationofStay(3);
      roomprops.setNumberofDays(2);
      roomprops.setNoOfPeople(100);
      roomprops.setMaskTypeI('No Mask');
      roomprops.setMaskTypeN('No Mask');
      roomprops.setMaskCategoryPpl('Mask For People');
      roomprops.setVentilationType('Window Closed');
      roomprops.setSpeechVolumeText('Normal');
      roomprops.setSpeechDurationinTime('1.10 hr');
    } else if (selectedId == 'Choir') {
      roomprops.setEventType(selectedId);
      roomprops.setSpeechVolume(5.32);
      roomprops.setMaskEfficiencyI(0);
      roomprops.setMaskEfficiencyN(0);
      roomprops.setSpeechDuration(60);
      roomprops.setVentilation(0.35);
      roomprops.setRoomSize(100);
      roomprops.setCeilingHeight(4);
      roomprops.setDurationofStay(3);
      roomprops.setNumberofDays(2);
      roomprops.setNoOfPeople(25);
      roomprops.setMaskTypeI('No Mask');
      roomprops.setMaskTypeN('No Mask');
      roomprops.setMaskCategoryPpl('Mask For People');
      roomprops.setVentilationType('Window Closed');
      roomprops.setSpeechVolumeText('Yelling');
      roomprops.setSpeechDurationinTime('1.8 hr');
    } else if (selectedId == 'Supermarket') {
      roomprops.setEventType(selectedId);
      roomprops.setSpeechVolume(3);
      roomprops.setMaskEfficiencyI(0);
      roomprops.setMaskEfficiencyN(0);
      roomprops.setSpeechDuration(5);
      roomprops.setVentilation(4);
      roomprops.setRoomSize(200);
      roomprops.setCeilingHeight(4.5);
      roomprops.setDurationofStay(1);
      roomprops.setNumberofDays(2);
      roomprops.setNoOfPeople(10);
      roomprops.setMaskTypeI('No Mask');
      roomprops.setMaskTypeN('No Mask');
      roomprops.setMaskCategoryPpl('Mask For People');
      roomprops.setVentilationType('Ventilation System');
      roomprops.setSpeechVolumeText('Loud');
      roomprops.setSpeechDurationinTime('3 min');
    }
  }
  const selectedVentilation = (value, window, id, ventilationType) => {
    roomprops.setVentilation(value);
    setBgColor(window);
    setBg({colorId: id});
    roomprops.setVentilationType(ventilationType);
  };
  const selectedCeilingHeight = (value, ceilingHeight, id) => {
    roomprops.setCeilingHeight(value);
    setBgColor(ceilingHeight);
    setBg({colorId: id});
  };
  const onCheckLimitRoomSize = roomSize => {
    const parsedRoomSize = Number.parseFloat(roomSize);

    if (Number.isNaN(parsedRoomSize)) {
      roomprops.setRoomSize(Math.round(0));
      SetErrorRoomSize('Enter a Number');
    } else if (parsedRoomSize < 40) {
      roomprops.setRoomSize(Math.round(parsedRoomSize));
      SetErrorRoomSize('Minimum size is 40 sq.m');
    } else if (parsedRoomSize > 100) {
      roomprops.setRoomSize(Math.round(parsedRoomSize));
      SetErrorRoomSize('Maximum size is 100 sq.m');
    } else {
      roomprops.setRoomSize(Math.round(parseFloat(parsedRoomSize)));
      SetErrorRoomSize('');
    }
  };
  const onCheckLimitDurationStay = durationofStay => {
    const parsedDuration = Number.parseFloat(durationofStay);
    if (Number.isNaN(parsedDuration)) {
      roomprops.setDurationofStay(Math.round(0));
      SetErrorDuration('Enter a Number');
    } else if (parsedDuration < 1) {
      roomprops.setDurationofStay(Math.round(parsedDuration));
      SetErrorDuration('Minimum duration is 1 hour');
    } else if (parsedDuration > 24) {
      roomprops.setDurationofStay(Math.round(parsedDuration));
      SetErrorDuration('Maximum duration is 24 hours');
    } else {
      roomprops.setDurationofStay(Math.round(parseFloat(parsedDuration)));
      SetErrorDuration('');
    }
  };
  const onCheckLimitNumberfDay = numberofDay => {
    const parsedDay = Number.parseFloat(numberofDay);
    if (Number.isNaN(parsedDay)) {
      roomprops.setNumberofDays(Math.round(0));
      SetErrorNoofDays('Enter a Number');
    } else if (parsedDay < 1) {
      roomprops.setNumberofDays(Math.round(parsedDay));
      SetErrorNoofDays('Minimum of 1 day');
    } else if (parsedDay > 5) {
      roomprops.setNumberofDays(Math.round(parsedDay));
      SetErrorNoofDays('Maximum of 5 days');
    } else {
      roomprops.setNumberofDays(Math.round(parseFloat(parsedDay)));
      SetErrorNoofDays('');
    }
  };
  const onCheckLimitPeopleCount = pplCount => {
    const parsedpplcount = Number.parseInt(pplCount);

    if (Number.isNaN(parsedpplcount)) {
      roomprops.setNoOfPeople(Math.round(0));
      SetErrorPplCount('Enter a Number');
    } else if (parsedpplcount < 2) {
      roomprops.setNoOfPeople(Math.round(parsedpplcount));
      SetErrorPplCount('Minimum of 2 people in room');
    } else if (parsedpplcount > 100) {
      roomprops.setNoOfPeople(Math.round(parsedpplcount));
      SetErrorPplCount('Maximum of 100 people in room');
    } else {
      roomprops.setNoOfPeople(Math.round(parsedpplcount));
      SetErrorPplCount('');
    }
  };
  const [mainbg, setMainBg] = useState({
    vaccine: '',
    mask: '',
    window: '',
    ceilingHeight: '',
    speechTime: '',
    speechVolume: '',
  });
  const handleEventType = () => setExpandEvent(!expandEvent);

  const eventType = [
    {name: 'Classroom', id: 1},
    {name: 'Office', id: 2},
    {name: 'Reception', id: 3},
    {name: 'Choir', id: 4},
    {name: 'Supermarket', id: 5},
  ];
  const setBgColor = selectedParam => {
    if (selectedParam == 'vaccine') {
      setMainBg({vaccine: selectedParam});
    } else if (selectedParam == 'mask') {
      setMainBg({mask: selectedParam});
    } else if (selectedParam == 'window') {
      setMainBg({window: selectedParam});
    } else if (selectedParam == 'ceilingHeight') {
      setMainBg({ceilingHeight: selectedParam});
    } else if (selectedParam == 'speechTime') {
      setMainBg({speechTime: selectedParam});
    } else {
      setMainBg({speechVolume: selectedParam});
    }
  };

  const showHideParameters = selectedValue => {
    if (selectedValue == 'window') {
      setShowWindow(!showWindow);

      setShowCeilingHeight(false);
    } else if (selectedValue == 'ceilingHeight') {
      setShowCeilingHeight(!showCeilingHeight);
      setShowWindow(false);
    }
  };

  return (
    <View>
      <CollapsibleView
        title={
          <Text
            style={{
              color: '#9239FE',
              fontSize: 18,
              fontStyle: 'normal',
              paddingRight: 80,
              padding: 5,
            }}>
            Room Properties
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
        titleStyle={{paddingLeft: 5, marginLeft: 5, alignContent: 'center'}}>
        <Card containerStyle={styles.cardContainer}>
          <List.Accordion
            title={roomprops.eventType}
            titleStyle={{color: '#9239FE'}}
            expanded={expandEvent}
            onPress={handleEventType}>
            {eventType.map(eventtype => (
              <List.Item
                key={eventtype.id}
                title={eventtype.name}
                onPress={() => {
                  setValuesByEvent(eventtype.name);
                }}
              />
            ))}
          </List.Accordion>

          <View style={{paddingTop: 15}}>
            <TextInput
              label={<Text style={{fontSize: 18}}>Room Size in sq.m</Text>}
              value={roomprops.roomSize.toString()}
              onChangeText={roomSize => onCheckLimitRoomSize(roomSize)}
              mode="outlined"
              placeholder="Enter Room Size"
              keyboardType={'numeric'}
              style={styles.textInputLabel}
              theme={{
                colors: {
                  text: '#9239FE',
                },
              }}
            />
            <HelperText type="error" visible={true} style={styles.helpText}>
              {errorRoomSize}
            </HelperText>
            <TextInput
              selectionColor="#9239FE"
              style={styles.textInputLabel}
              label={<Text style={{fontSize: 18}}>Duration of Stay in hr</Text>}
              value={roomprops.durationofStay.toString()}
              onChangeText={durationofStay =>
                onCheckLimitDurationStay(durationofStay)
              }
              mode="outlined"
              placeholder="Enter Duration of Stay"
              keyboardType={'numeric'}
              theme={{
                colors: {
                  text: '#9239FE',
                },
              }}
            />
            <HelperText type="error" visible={true} style={styles.helpText}>
              {errorDuration}
            </HelperText>
            <TextInput
              selectionColor="#9239FE"
              style={styles.textInputLabel}
              label={<Text style={{fontSize: 18}}>Number of days</Text>}
              value={roomprops.numberofDays.toString()}
              onChangeText={noofDays => onCheckLimitNumberfDay(noofDays)}
              mode="outlined"
              placeholder="Enter Number of Days"
              keyboardType={'numeric'}
              theme={{
                colors: {
                  text: '#9239FE',
                },
              }}
            />
            <HelperText type="error" visible={true} style={styles.helpText}>
              {errorNoofDays}
            </HelperText>
            <TextInput
              style={styles.textInputLabel}
              label={<Text style={{fontSize: 18}}>Number of people</Text>}
              value={roomprops.noOfPeople.toString()}
              onChangeText={noOfPeople => onCheckLimitPeopleCount(noOfPeople)}
              mode="outlined"
              placeholder="Enter Number of People"
              keyboardType={'numeric'}
              theme={{
                colors: {
                  text: '#9239FE',
                },
              }}
            />
            <HelperText type="error" visible={true} style={styles.helpText}>
              {errorPplCount}
            </HelperText>
          </View>
          <View style={styles.cardrow}>
            <View style={styles.spaceImagesthree}>
              <TouchableOpacity
                onPress={() => showHideParameters('window')}
                style={
                  mainbg.window === 'window' ? styles.red : styles.defaultBg
                }>
                <Image
                  source={require('./images/windowicon.png')}
                  style={styles.imgDimensions}
                />
                {/* <Text style={styles.textStyle}>{'\n'}window</Text> */}
              </TouchableOpacity>
            </View>
            <View style={styles.spaceImagesthree}>
              <TouchableOpacity
                onPress={() => showHideParameters('ceilingHeight')}
                style={
                  mainbg.ceilingHeight === 'ceilingHeight'
                    ? styles.red
                    : styles.defaultBg
                }>
                <Image
                  source={require('./images/ceiling_height_icon.png')}
                  style={styles.imgDimensions}
                />
                {/* <Text style={styles.textStyle}>
                  {'\n'}Ceiling{'\n'}Height
                </Text> */}
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.cardrow1}>
            <Text style={styles.textStyle1}>Ventilation Type</Text>
            <Text style={styles.textStyle2}>Ceiling Height</Text>
          </View>
          {showWindow ? (
            <View style={styles.cardrow}>
              <View style={styles.spaceImagesinSubset}>
                <TouchableOpacity
                  onPress={() =>
                    selectedVentilation(0.35, 'window', 1, 'Window Closed')
                  }
                  style={bg.colorId === 1 ? styles.red : styles.defaultBg}>
                  <Image
                    source={require('./images/window_closed.png')}
                    style={styles.imgDimensionsinSubset}
                  />
                </TouchableOpacity>
                <Text style={styles.textStyle}>No{'\n'}Ventilation</Text>
              </View>
              <View style={styles.spaceImagesinSubset}>
                <TouchableOpacity
                  onPress={() =>
                    selectedVentilation(1, 'window', 2, 'Cracked Open')
                  }
                  style={bg.colorId === 2 ? styles.red : styles.defaultBg}>
                  <Image
                    source={require('./images/window_crackedopen.png')}
                    style={styles.imgDimensionsinSubset}
                  />
                </TouchableOpacity>
                <Text style={styles.textStyle}>Cracked{'\n'}Open</Text>
              </View>

              <View style={styles.spaceImagesinSubset}>
                <TouchableOpacity
                  onPress={() =>
                    selectedVentilation(2.0, 'window', 3, 'Full Open')
                  }
                  style={bg.colorId === 3 ? styles.red : styles.defaultBg}>
                  <Image
                    source={require('./images/window_fullopen.png')}
                    style={styles.imgDimensionsinSubset}
                  />
                </TouchableOpacity>
                <Text style={styles.textStyle}> Burst{'\n'}Ventilation</Text>
              </View>

              <View style={styles.spaceImagesinSubset}>
                <TouchableOpacity
                  onPress={() =>
                    selectedVentilation(6.0, 'window', 4, 'Ventilation System')
                  }
                  style={bg.colorId === 4 ? styles.red : styles.defaultBg}>
                  <Image
                    source={require('./images/ventilation.png')}
                    style={styles.imgDimensionsinSubset}
                  />
                </TouchableOpacity>
                <Text style={styles.textStyle}>Ventilation{'\n'}System</Text>
              </View>
            </View>
          ) : null}
          {showCeilingHeight ? (
            <View style={styles.cardrow}>
              <View style={styles.spaceImagesinSubset}>
                <TouchableOpacity
                  onPress={() => selectedCeilingHeight(3, 'ceilingHeight', 1)}
                  style={bg.colorId === 1 ? styles.red : styles.defaultBg}>
                  <Image
                    source={require('./images/height.png')}
                    style={styles.imgDimensions}
                  />
                  <Text style={styles.textStyle}>{'\n'}3 m</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.spaceImagesinSubset}>
                <TouchableOpacity
                  onPress={() =>
                    selectedCeilingHeight(3.25, 'ceilingHeight', 2)
                  }
                  style={bg.colorId === 2 ? styles.red : styles.defaultBg}>
                  <Image
                    source={require('./images/height.png')}
                    style={styles.imgDimensions}
                  />
                  <Text style={styles.textStyle}>{'\n'}3.25 m</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.spaceImagesinSubset}>
                <TouchableOpacity
                  onPress={() => selectedCeilingHeight(3.5, 'ceilingHeight', 3)}
                  style={bg.colorId === 3 ? styles.red : styles.defaultBg}>
                  <Image
                    source={require('./images/height.png')}
                    style={styles.imgDimensions}
                  />
                  <Text style={styles.textStyle}>{'\n'}3.5 m</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.spaceImagesinSubset}>
                <TouchableOpacity
                  onPress={() => selectedCeilingHeight(4, 'ceilingHeight', 4)}
                  style={bg.colorId === 4 ? styles.red : styles.defaultBg}>
                  <Image
                    source={require('./images/height.png')}
                    style={styles.imgDimensions}
                  />
                  <Text style={styles.textStyle}>{'\n'}4 m</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : null}
        </Card>
      </CollapsibleView>
    </View>
  );
}
const styles = StyleSheet.create({
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

    //marginVertical: 0,
    // paddingBottom: 20,
    // paddingBottom: 15,
  },
  spaceImagesthree: {
    flexDirection: 'row',
    //paddingTop: 10,

    paddingLeft: 60,
    // padding: 10,
    // marginBottom: 10,
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
  textStyle: {color: 'black', paddingLeft: 4, fontSize: 14},

  helpText: {
    color: '#ff0000',
  },
  cardrow1: {
    flexDirection: 'row',
    paddingTop: 3,
  },
  textStyle1: {
    color: 'black',
    paddingLeft: 49,
    fontSize: 14,
  },
  textStyle2: {
    color: 'black',
    paddingLeft: 34,
    fontSize: 14,
  },
  spaceImagesinSubset: {
    // paddingTop: 34,
    paddingTop: 5,
    paddingLeft: 9,
    alignContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  imgDimensionsinSubset: {
    width: 45,
    height: 45,
  },
});
export default RoomProperties;
