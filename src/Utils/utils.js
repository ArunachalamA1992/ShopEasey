import {Text, TouchableOpacity, View} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import Color from '../Global/Color';

export const NetworkState = ({setNetInfo}) => {
  return (
    <View
      style={{
        position: 'absolute',
        top: 20,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        backgroundColor: Color.black,
        padding: 10,
        borderRadius: 10,
        width: '90%',
        marginHorizontal: 20,
        zIndex: 1,
      }}>
      <Text
        style={{
          flex: 1,
          fontSize: 14,
          fontWeight: '600',
          color: Color.white,
        }}>
        No Internet Connection
      </Text>
      <TouchableOpacity
        onPress={() => setNetInfo()}
        style={{marginHorizontal: 20, alignItems: 'flex-end'}}>
        <Text style={{fontSize: 14, fontWeight: '600', color: Color.primary}}>
          Retry
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export const NetCheck = async setLoading => {
  return await NetInfo.fetch().then(state => {
    return setLoading(state.isConnected);
  });
};
