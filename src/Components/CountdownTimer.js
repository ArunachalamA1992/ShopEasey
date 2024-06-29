import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Color from '../Global/Color';
import {Manrope} from '../Global/FontFamily';

const CountdownTimer = ({days, hours, minutes, seconds}) => {
  const initialTime =
    days * 24 * 60 * 60 + hours * 60 * 60 + minutes * 60 + seconds;
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = seconds => {
    const days = Math.floor(seconds / (24 * 60 * 60));
    const hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((seconds % (60 * 60)) / 60);
    const remainingSeconds = seconds % 60;

    return {
      days: String(days).padStart(2, '0'),
      hours: String(hours).padStart(2, '0'),
      minutes: String(minutes).padStart(2, '0'),
      seconds: String(remainingSeconds).padStart(2, '0'),
    };
  };

  const time = formatTime(timeLeft);

  return (
    <View style={styles.container}>
      <Text style={styles.timerText}>Ends In:</Text>
      <View style={styles.timerContainer}>
        <View style={styles.timeBox}>
          <Text style={styles.timeText}>{time.days}</Text>
        </View>
        <Text style={styles.colon}> : </Text>
        <View style={styles.timeBox}>
          <Text style={styles.timeText}>{time.hours}</Text>
        </View>
        <Text style={styles.colon}> : </Text>
        <View style={styles.timeBox}>
          <Text style={styles.timeText}>{time.minutes}</Text>
        </View>
        <Text style={styles.colon}> : </Text>
        <View style={styles.timeBox}>
          <Text style={styles.timeText}>{time.seconds}</Text>
        </View>
      </View>
    </View>
  );
};

export const SellerCountdownTimer = ({days, hours, minutes, seconds}) => {
  const initialTime =
    days * 24 * 60 * 60 + hours * 60 * 60 + minutes * 60 + seconds;
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = seconds => {
    const days = Math.floor(seconds / (24 * 60 * 60));
    const hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((seconds % (60 * 60)) / 60);
    const remainingSeconds = seconds % 60;

    return {
      days: String(days).padStart(2, '0'),
      hours: String(hours).padStart(2, '0'),
      minutes: String(minutes).padStart(2, '0'),
      seconds: String(remainingSeconds).padStart(2, '0'),
    };
  };

  const time = formatTime(timeLeft);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Color.white,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text
        style={{
          fontSize: 14,
          color: Color.black,
          fontFamily: Manrope.ExtraBold,
        }}>
        Ends In
      </Text>
      <View style={styles.timerContainer}>
        <View
          style={{
            borderRadius: 5,
            padding: 7,
          }}>
          <Text
            style={{
              fontSize: 24,
              color: Color.primary,
              fontFamily: Manrope.ExtraBold,
            }}>
            {time.days}
          </Text>
        </View>
        <Text style={styles.colon}> : </Text>
        <View
          style={{
            borderRadius: 5,
            padding: 7,
          }}>
          <Text
            style={{
              fontSize: 24,
              color: Color.primary,
              fontFamily: Manrope.ExtraBold,
            }}>
            {time.hours}
          </Text>
        </View>
        <Text style={styles.colon}> : </Text>
        <View
          style={{
            borderRadius: 5,
            padding: 7,
          }}>
          <Text
            style={{
              fontSize: 24,
              color: Color.primary,
              fontFamily: Manrope.ExtraBold,
            }}>
            {time.minutes}
          </Text>
        </View>
        <Text style={styles.colon}> : </Text>
        <View
          style={{
            borderRadius: 5,
            padding: 7,
          }}>
          <Text
            style={{
              fontSize: 24,
              color: Color.primary,
              fontFamily: Manrope.ExtraBold,
            }}>
            {time.seconds}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
    padding: 10,
  },
  timerText: {
    fontSize: 14,
    color: Color.lightBlack,
    fontFamily: Manrope.Bold,
    marginBottom: 5,
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeBox: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Color.cloudyGrey,
    padding: 7,
    paddingHorizontal: 12,
  },
  timeText: {
    fontSize: 14,
    color: Color.black,
    fontFamily: Manrope.Bold,
  },
  colon: {
    fontSize: 14,
    color: Color.black,
    fontFamily: Manrope.Bold,
    marginHorizontal: 3,
  },
});

export default CountdownTimer;
