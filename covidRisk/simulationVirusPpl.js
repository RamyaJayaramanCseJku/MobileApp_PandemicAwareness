import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import BouncingBalls from 'react-native-bouncing-ball';
import {Icon, Card} from 'react-native-elements';
export default function ParticleSimulation(RiskProb, pplCount) {
  const peopleCount = parseInt(pplCount);
  let riskInfection = parseInt(RiskProb);
  function checkRiskInfExists(RiskProb) {
    if (RiskProb < 1) {
      riskInfection = 1;
    }
  }
  checkRiskInfExists(RiskProb);

  return (
    <View>
      <View>
        <Text style={styles.cardHeaderText}>Simulation</Text>
      </View>
      <ImageBackground>
        <BouncingBalls
          amount={riskInfection}
          animationDuration={5000}
          minSpeed={30}
          maxSpeed={40}
          minSize={5}
          maxSize={5}
          imageBall={require('./images/corona_virus.png')}
        />

        <BouncingBalls
          amount={peopleCount}
          animationDuration={5000}
          minSpeed={30}
          maxSpeed={40}
          minSize={20}
          maxSize={20}
          imageBall={require('./images/man.png')}
        />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainerStyle: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    //width: 360,
    width: 350,
    marginLeft: 20,
    height: 270,
    overflow: 'hidden',
  },
  cardHeaderStyle: {
    backgroundColor: '#F9481A',
    marginLeft: 0,
    marginRight: 0,
    borderRadius: 7,
  },
  cardHeaderText: {
    color: '#F9481A',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    paddingTop: 5,
    paddingBottom: 5,
  },
});
