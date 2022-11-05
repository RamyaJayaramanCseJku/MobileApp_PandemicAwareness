import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  Linking,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Button, Header, Icon} from 'react-native-elements';

import BehavioralProperties from './BehavioralProperties';
import RoomProperties from './RoomProperties';
import InfectedPersonProperties from './InfectedPersonProperties';
import ModalParameters from './data';
import RiskInfoandSimulation from './riskInfectionCalculation';
import Collapsible from 'react-native-collapsible';

export default function ModelParamSelection({navigation}) {
  //behavior
  const [maskCateogoryPpl, setMaskCategoryPpl] = useState('Mask For People');
  const [maskEfficiencyI, setMaskEfficiencyI] = useState(0);
  const [maskEfficiencyN, setMaskEfficiencyN] = useState(0);
  const [maskTypeI, setMaskTypeI] = useState('None');
  const [maskTypeN, setMaskTypeN] = useState('None');
  const [vaccination, setVaccination] = useState('None');
  //room
  const [eventType, setEventType] = useState('Classroom');
  const [roomSize, setRoomSize] = useState(60);
  const [durationofStay, setDurationofStay] = useState(12);
  const [numberofDays, setNumberofDays] = useState(2);
  const [noOfPeople, setNoOfPeople] = useState(24);
  const [ventilation, setVentilation] = useState(0.35);
  const [ventilationType, setVentilationType] = useState('None');
  const [ceilingHeight, setCeilingHeight] = useState(3);
  //infected person
  const [speechVolume, setSpeechVolume] = useState(2);
  const [speechDuration, setSpeechDuration] = useState(10);
  //modal parameters text
  const [speechDurationinTime, setSpeechDurationinTime] = useState('1.2 hr');
  const [speechVolumeText, setSpeechVolumeText] = useState('Normal');
  const [showRiskInfo, setShowRiskInfo] = useState(true);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() =>
            Linking.openURL('https://www.mpic.de/4747361/risk-calculator')
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

  const behavioralProps = {
    maskCateogoryPpl,
    maskEfficiencyI,
    maskEfficiencyN,
    vaccination,
    eventType,
    roomSize,
    durationofStay,
    numberofDays,
    noOfPeople,
    ventilation,
    ceilingHeight,
    speechVolume,
    speechDuration,
    maskTypeI,
    maskTypeN,
    ventilationType,
    speechDurationinTime,
    speechVolumeText,
    setMaskCategoryPpl,
    setMaskEfficiencyI,
    setMaskEfficiencyN,
    setVaccination,
    setEventType,
    setRoomSize,
    setDurationofStay,
    setNumberofDays,
    setNoOfPeople,
    setVentilation,
    setCeilingHeight,
    setSpeechVolume,
    setSpeechDuration,
    setMaskTypeI,
    setMaskTypeN,
    setVentilationType,
    setSpeechDurationinTime,
    setSpeechVolumeText,
  };
  /* console.log({selectedEventType});
  console.log({maskCateogoryPpl});
  console.log({roomSize});
  console.log({durationofStay});
  console.log({noOfPeople});
  console.log({maskEfficiencyI});
  console.log({maskEfficiencyN});
  console.log({vaccination});
  console.log({ventilation});
  console.log({ceilingHeight});
  console.log({speechDuration});
  console.log({speechVolume}); */
  return (
    <View styles={styles.container}>
      <ScrollView>
        <>
          <RoomProperties roomprops={behavioralProps} />
          <BehavioralProperties todos={behavioralProps} />
          <InfectedPersonProperties infectedpplprops={behavioralProps} />
          <ModalParameters todos={behavioralProps} />
          <RiskInfoandSimulation todos={behavioralProps} />
        </>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5,
    backgroundColor: '#DAE1DE',
  },

  default: {
    color: 'black',
  },
  REffText: {
    fontSize: 16,

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
  row1: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 18,
    color: '#9239FE',
    //color: '#0597D8',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 10,
  },
});
