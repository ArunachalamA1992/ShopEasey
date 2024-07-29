import React, {Component, createRef} from 'react';
import {Animated, View, Image, TouchableOpacity} from 'react-native';
import Color from '../../Global/Color';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {scr_width} from '../../Utils/Dimensions';

export default class ImageSlider extends Component {
  constructor(props) {
    super(props);
    this.flatlistRef = createRef();
    this.state = {
      images: [],
      animScrollBarOpacityVal: new Animated.Value(1),
      animScrollXVal: new Animated.Value(0),
      scrollXVal: 0,
      width: 0,
      currentIndex: 0,
    };
  }

  componentDidMount() {
    const {images, width} = this.props;
    const {animScrollXVal} = this.state;
    const scrollXVal = animScrollXVal.interpolate({
      inputRange: [0, width * (images?.length - 1)],
      outputRange: [0, (width / images?.length) * (images?.length - 1)],
      extrapolate: 'clamp',
    });
    this.setState({images, scrollXVal, width});
  }

  setImageRef = node => {
    if (node) {
      this.imageRef = node;
    }
  };

  nextPress = () => {
    const {currentIndex, images} = this.state;
    const nextIndex = currentIndex + 1;
    if (nextIndex < images?.length) {
      this.flatlistRef.current.scrollToIndex({
        animated: true,
        index: nextIndex,
      });
      this.setState({currentIndex: nextIndex});
    }
  };

  backPress = () => {
    const {currentIndex} = this.state;
    const prevIndex = currentIndex - 1;
    if (prevIndex >= 0) {
      this.flatlistRef.current.scrollToIndex({
        animated: true,
        index: prevIndex,
      });
      this.setState({currentIndex: prevIndex});
    }
  };

  render() {
    const {showModal} = this.props;
    const {images, animScrollBarOpacityVal, animScrollXVal, scrollXVal, width} =
      this.state;

    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'flex-start',
          backgroundColor: Color.white,
        }}>
        <View style={{height: 300, marginVertical: 0, zIndex: 1}}>
          <Animated.FlatList
            ref={this.flatlistRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={10}
            data={images}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => (
              <TouchableOpacity key={index} onPress={() => showModal(index)}>
                <Image
                  source={{uri: item?.image}}
                  resizeMode="contain"
                  style={{flex: 1, width: scr_width, height: '100%'}}
                />
              </TouchableOpacity>
            )}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: animScrollXVal}}}],
              {useNativeDriver: true},
            )}
          />
          {images?.length > 1 && (
            <>
              <TouchableOpacity
                onPress={this.backPress}
                style={{
                  borderRadius: 50,
                  position: 'absolute',
                  left: 20,
                  top: 140,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Ionicons
                  name="chevron-back"
                  size={30}
                  color={images?.length == 0 ? Color.cloudyGrey : Color.black}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this.nextPress}
                style={{
                  borderRadius: 50,
                  position: 'absolute',
                  right: 20,
                  top: 140,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Ionicons
                  name="chevron-forward"
                  size={30}
                  color={Color.black}
                />
              </TouchableOpacity>
            </>
          )}
          {images?.length > 0 && (
            <Animated.View style={{width: width / 5, height: 3}}>
              <Animated.View
                style={{
                  backgroundColor: '#E5E5E5',
                  opacity: animScrollBarOpacityVal,
                }}>
                <Animated.View
                  style={{
                    backgroundColor: Color.primary,
                    width: width / images?.length,
                    height: 3,
                    transform: [{translateX: scrollXVal}],
                  }}
                />
              </Animated.View>
            </Animated.View>
          )}
        </View>
      </View>
    );
  }
}
