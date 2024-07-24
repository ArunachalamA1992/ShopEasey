import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity} from 'react-native';
import Voice from '@react-native-voice/voice';
import Color from '../Global/Color';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const VoiceSearch = ({onSearch}) => {
  const [recognized, setRecognized] = useState('');
  const [started, setStarted] = useState('');
  const [results, setResults] = useState([]);
  const [micOn, setMicOff] = useState(false);

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechRecognized = onSpeechRecognized;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechError = onSpeechError; // Add error callback

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechStart = e => {
    console.log('onSpeechStart: ', e); // Log the event
    setStarted('√');
  };

  const onSpeechRecognized = e => {
    console.log('onSpeechRecognized: ', e); // Log the event
    setRecognized('√');
  };

  const onSpeechResults = e => {
    console.log('onSpeechResults: ', e); // Log the event
    setResults(e.value);
    if (onSearch) {
      onSearch(e.value[0]);
    }
  };

  const onSpeechError = e => {
    console.log('onSpeechError: ', e); // Log the event
    setMicOff(false);
  };

  const startRecognizing = async () => {
    try {
      await Voice.start('en-US');
      setRecognized('');
      setStarted('');
      setResults([]);
      setMicOff(true);
    } catch (e) {
      console.error(e);
    }
  };

  const stopRecognizing = async () => {
    try {
      await Voice.stop();
      setMicOff(false);
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
      {results.length > 0 && <Text>{results[0]}</Text>}
    </View>
  );
};

export default VoiceSearch;
