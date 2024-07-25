import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, PermissionsAndroid, Platform } from 'react-native';
import Voice from '@react-native-voice/voice';
import Color from '../Global/Color';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const VoiceSearch = ({ onSearch }) => {
  const [recognized, setRecognized] = useState('');
  const [started, setStarted] = useState('');
  const [results, setResults] = useState([]);
  const [micOn, setMicOn] = useState(false);

  useEffect(() => {
    requestMicrophonePermission();
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const requestMicrophonePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          {
            title: 'Microphone Permission',
            message: 'This app needs access to your microphone to perform voice search.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Microphone permission granted');
        } else {
          console.log('Microphone permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  const onSpeechStart = e => {
    console.log('onSpeechStart: ', e);
    setStarted('√');
  };

  const onSpeechRecognized = e => {
    console.log('onSpeechRecognized: ', e);
    setRecognized('√');
  };

  const onSpeechResults = e => {
    console.log('onSpeechResults: ', e);
    setResults(e.value);
    if (onSearch) {
      onSearch(e.value[0]);
    }
    setMicOn(false);
  };

  const onSpeechError = e => {
    console.log('onSpeechError: ', e);
    setMicOn(false);
  };

  const startRecognizing = async () => {
    try {
      Voice.onSpeechStart = onSpeechStart;
      Voice.onSpeechRecognized = onSpeechRecognized;
      Voice.onSpeechResults = onSpeechResults;
      Voice.onSpeechError = onSpeechError;

      await Voice.start('en-US');
      setRecognized('');
      setStarted('');
      setResults([]);
      setMicOn(true);
    } catch (e) {
      console.error(e);
      setMicOn(false);
    }
  };

  const stopRecognizing = async () => {
    try {
      await Voice.stop();
      setMicOn(false);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          if (!micOn) {
            startRecognizing();
          } else {
            stopRecognizing();
          }
        }}>
        <MCIcon
          color={Color.lightBlack}
          name={micOn ? 'microphone' : 'microphone-off'}
          size={20}
          style={{
            marginHorizontal: 5,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default VoiceSearch;
