import React, {useState, useCallback} from 'react';
import {View, TextInput, Text} from 'react-native';
import RangeSlider from 'rn-range-slider';
import Thumb from './Slider/Thumb';
import Rail from './Slider/Rail';
import RailSelected from './Slider/RailSelected';
import Color from '../Global/Color';
import {Manrope} from '../Global/FontFamily';
import {useSelector} from 'react-redux';

const CustomRange = props => {
  const {
    low,
    setLow,
    high,
    setHigh,
    min,
    setMin,
    max,
    setMax,
    handleValueChange,
  } = props;

  const countryCode = useSelector(state => state.UserReducer.country);
  const [textInputLow, setTextInputLow] = useState(low.toString());
  const [textInputHigh, setTextInputHigh] = useState(high.toString());

  const handleTextInputLowChange = value => {
    const newLow = parseInt(value) || 0;
    if (newLow <= high) {
      setLow(newLow);
      setTextInputLow(value);
    } else {
      setLow(high);
      setTextInputLow(high.toString());
    }
  };

  const handleTextInputHighChange = value => {
    const newHigh = parseInt(value) || 0;
    r;
    if (newHigh >= low) {
      setHigh(newHigh);
      setTextInputHigh(value);
    } else {
      setHigh(low);
      setTextInputHigh(low.toString());
    }
  };

  const renderThumb = useCallback(() => <Thumb />, []);
  const renderRail = useCallback(() => <Rail />, []);
  const renderRailSelected = useCallback(() => <RailSelected />, []);

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 10,
        }}>
        <View
          style={{
            flex: 1,
            marginRight: 2,
          }}>
          <Text
            style={{
              fontSize: 14,
              color: Color.black,
              fontFamily: Manrope.Bold,
              marginVertical: 10,
              textTransform: 'uppercase',
            }}>
            Min
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: 'white',
              borderColor: 'gray',
              borderWidth: 1,
              paddingHorizontal: 10,
              borderRadius: 5,
            }}>
            <Text
              style={{
                color: Color.black,
                fontSize: 14,
                fontFamily: Manrope.SemiBold,
              }}>
              {countryCode?.symbol}
            </Text>
            <TextInput
              placeholder="Min"
              placeholderTextColor={Color.cloudyGrey}
              value={textInputLow}
              onChangeText={handleTextInputLowChange}
              style={{
                flex: 1,
                color: Color.black,
                fontSize: 14,
                fontFamily: Manrope.SemiBold,
              }}
            />
          </View>
        </View>
        <View
          style={{
            flex: 1,
            marginLeft: 2,
          }}>
          <Text
            style={{
              fontSize: 14,
              color: Color.black,
              fontFamily: Manrope.Bold,
              marginVertical: 10,
              textTransform: 'uppercase',
            }}>
            Max
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: 'white',
              borderColor: 'gray',
              borderWidth: 1,
              paddingHorizontal: 10,
              borderRadius: 5,
            }}>
            <Text
              style={{
                color: Color.black,
                fontSize: 14,
                fontFamily: Manrope.SemiBold,
              }}>
              {countryCode?.symbol}
            </Text>
            <TextInput
              placeholder="Max"
              placeholderTextColor={Color.cloudyGrey}
              value={textInputHigh}
              onChangeText={handleTextInputHighChange}
              style={{
                flex: 1,
                color: Color.black,
                fontSize: 14,
                fontFamily: Manrope.SemiBold,
              }}
            />
          </View>
        </View>
      </View>

      {/* Range slider */}
      {/* <RangeSlider
        style={{marginTop: 15}}
        min={min || 0}
        max={max || 100}
        step={1}
        low={low}
        high={high}
        renderThumb={renderThumb}
        renderRail={renderRail}
        renderRailSelected={renderRailSelected}
        onValueChanged={(low, high) => {
          setLow(low);
          setHigh(high);
          setTextInputLow(low.toString());
          setTextInputHigh(high.toString());
          handleValueChange(low, high);
        }}
      /> */}
    </View>
  );
};

export default CustomRange;
