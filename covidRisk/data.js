import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Button,
} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
/* export const SLIDER_WIDTH = Dimensions.get('window').width - 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
 */

/* const horizontalMargin = 50;
const slideWidth = 280;
const sliderWidth = Dimensions.get('window').width;
const itemWidth = slideWidth + horizontalMargin * 2;
const itemHeight = 200;
export const SLIDER_WIDTH = Dimensions.get('window').width;
export const ITEM_WIDTH = slideWidth + horizontalMargin * 2; */
export const SLIDER_WIDTH = 380;
export const ITEM_WIDTH = 432;

export default function ModalParameters({todos}) {
  const isCarousel = React.useRef(null);
  const [index, setIndex] = useState({activeIndex: 0});

  const maskCategory = todos.maskCateogoryPpl;
  const maskTypeI = todos.maskTypeI;
  const maskTypeN = todos.maskTypeN;
  const maskEffInf = todos.maskEfficiencyI;
  const maskEffNormal = todos.maskEfficiencyN;
  const vaccine = todos.vaccination;
  const eventType = todos.eventType;
  const roomSize = todos.roomSize;
  const duration = todos.durationofStay;
  const noOfPpl = todos.noOfPeople;
  const ventilation = todos.ventilation;
  const ventilationType = todos.ventilationType;
  const ceilingHt = todos.ceilingHeight;
  const speechVolume = todos.speechVolume;
  const speechDuration = todos.speechDuration;
  const speechDurationTime = todos.speechDurationinTime;
  const speechVolumeText = todos.speechVolumeText;

  const data = [
    {
      title: 'Room Properties',
      text:
        'Event Type -' +
        eventType +
        '\n' +
        'Room size -' +
        roomSize +
        ' ' +
        'sq.m' +
        '\n' +
        'Duration of stay -' +
        duration +
        ' ' +
        'hr' +
        '\n' +
        'Number of people -' +
        noOfPpl +
        '\n' +
        'Ventilation -' +
        ventilationType +
        '\n' +
        'Ceiling Height -' +
        ceilingHt +
        ' ' +
        'm',
    },
    {
      title: 'Behavioral Properties',
      text:
        /*  'Mask for People -' +
        maskCategory +
        '\n' + */
        'Mask Type for Infected People -' +
        maskTypeI +
        '\n' +
        'Mask Type for Normal People -' +
        maskTypeN +
        '\n' +
        'Vaccination -' +
        vaccine +
        '\n',
    },
    {
      title: 'Infected Person Properties',
      text:
        'Speech volume -' +
        speechVolumeText +
        '\n' +
        'Speech Duration -' +
        speechDurationTime,
    },
  ];
  const CarouselCardItem = ({item, index}) => {
    return (
      <View style={styles.container} key={index}>
        <Text style={styles.header}>{item.title}</Text>
        <Text style={styles.body}>{item.text}</Text>
      </View>
    );
  };
  return (
    <SafeAreaView>
      <View style={styles.CarousalContainer}>
        <Carousel
          layout={'default'}
          layoutCardOffset={18}
          inactiveSlideScale={0.94}
          inactiveSlideOpacity={0.7}
          initialNumToRender={3}
          ref={isCarousel}
          data={data}
          renderItem={CarouselCardItem}
          sliderWidth={SLIDER_WIDTH}
          itemWidth={ITEM_WIDTH}
          useScrollView={true}
          onSnapToItem={index => setIndex({activeIndex: index})}
        />

        <View style={styles.CarousalPagination}>
          <Pagination
            containerStyle={{paddingVertical: 0}}
            dotsLength={data.length}
            activeDotIndex={index.activeIndex}
            carouselRef={isCarousel}
            dotStyle={styles.carousalPaginationDotStyle}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
            tappableDots={true}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    //width: 360,
    width: 350,
    height: 215,
    marginTop: 10,
    borderRadius: 15,
    //paddingTop: 10,
    marginBottom: 10,
    paddingBottom: 30,
    //marginLeft: 10,
    marginLeft: 20,
    marginRight: 10,
    shadowColor: 'white',
    shadowOffset: {
      width: 1,
      height: 5,
    },
    borderWidth: 2,
    borderColor: '#9239FE',
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },

  header: {
    color: 'white',
    backgroundColor: '#9239FE',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    borderRadius: 7,
    paddingTop: 10,
    paddingBottom: 10,
  },
  body: {
    color: '#222',
    fontSize: 18,
    padding: 7,
    textAlign: 'left',
    paddingTop: 15,
    //paddingBottom: 15,
  },
  CarousalContainer: {
    // paddingTop: 80,
    // paddingTop: 15,
  },
  CarousalPagination: {
    paddingVertical: 0,
    //marginTop: 10,
    // marginTop: 0,
  },
  buttonStyle1: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  carousalPaginationDotStyle: {
    marginLeft: 15,
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 0,
    backgroundColor: 'black',
  },
});
