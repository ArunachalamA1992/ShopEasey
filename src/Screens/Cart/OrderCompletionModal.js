import { useNavigation } from '@react-navigation/native';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { LottieCancelled, LottieCheck } from '../../Components/Lottie';
import { Manrope } from '../../Global/FontFamily';
import { Button } from 'react-native-paper';
import Color from '../../Global/Color';
import { useDispatch, useSelector } from 'react-redux';
import { setOrderCancelVisible, setOrderSuccessVisible } from '../../Redux';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const PostCompletedModal = ({ }) => {
  const orderSuccessModal = useSelector(
    state => state.OrderReducer.orderSuccessVisible,
  );
  const orderCancelVisible = useSelector(
    state => state.OrderReducer.orderCancelVisible,
  );
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <Modal
      transparent={true}
      visible={orderSuccessModal ? orderSuccessModal : orderCancelVisible}
      animationType={'fade'}>
      <View style={styles.OrderModalContainer}>
        <View style={styles.orderView}>
          <TouchableOpacity
            style={styles.closeModal}
            onPress={() => {
              if (orderSuccessModal) {
                dispatch(setOrderSuccessVisible(false));
              } else {
                dispatch(setOrderCancelVisible(false));
              }
            }}>
            <MCIcon name="close-circle" size={30} color={Color.red} />
          </TouchableOpacity>
          {orderSuccessModal ? <LottieCheck /> : <LottieCancelled />}
          <Text style={styles.orderStatus}>
            {orderSuccessModal
              ? 'Order placed successfully !'
              : 'Order Cancelled'}
          </Text>
          <Text style={styles.orderModalMsg}>
            {orderSuccessModal
              ? 'Your order has been placed successfully! Thank you for your purchase'
              : 'Your Order has been cancelled, You want to try again'}
          </Text>
          <TouchableOpacity
            style={{
              marginHorizontal: 10,
              borderRadius: 5,
              backgroundColor: Color.primary,
              borderColor: Color.lightgrey,
              borderWidth: 1,
              width: '100%',
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => {
              if (orderSuccessModal) {
                dispatch(setOrderSuccessVisible(false));
                navigation.navigate('MyOrders');
              } else {
                dispatch(setOrderCancelVisible(false));
              }
            }}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: Manrope.Bold,
                textAlign: 'center',
                color: Color.white,
              }}>
              View Order
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default PostCompletedModal;

const styles = StyleSheet.create({
  OrderModalContainer: {
    backgroundColor: Color.transparantBlack,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  orderView: {
    width: '100%',
    paddingVertical: 20,
    backgroundColor: Color.white,
    borderRadius: 10,
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  closeModal: { position: 'absolute', right: 10, top: 10 },
  orderStatus: {
    fontSize: 20,
    fontFamily: Manrope.Bold,
    textAlign: 'center',
    color: Color.black,
  },
  orderModalMsg: {
    fontSize: 14,
    fontFamily: Manrope.SemiBold,
    textAlign: 'center',
    marginVertical: 20,
    color: Color.cloudyGrey,
    textTransform: 'capitalize',
  },
  OrderModalButton: {
    backgroundColor: Color.primary,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
});
