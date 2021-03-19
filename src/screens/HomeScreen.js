/* Nas telas (ex: página de perfil) conectamos as informações dos reducers passadas pelo Provider do redux */

import React from 'react';
import {SafeAreaView, Text, StyleSheet, Animated, Easing} from 'react-native';
import {connect} from 'react-redux';

const Home = (props) => {
  let image = new Animated.Value(0);

  Animated.loop(
    Animated.timing(image, {
      toValue: 1,
      duration: 7000,
      easing: Easing.linear,
      useNativeDriver: true,
    }),
  ).start();

  const spin = image.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <SafeAreaView style={styles.container}>
      <Animated.Image
        source={require('../assets/redux-react.png')}
        style={[styles.image, {transform: [{rotate: spin}]}]}
      />
      <Text style={styles.title}>{props.title}</Text>
      <Text style={styles.description}>{props.description}</Text>
    </SafeAreaView>
  );
};

/* Essa função pega as informações do state do reducer e transforma em props para a Tela. Em outras palavras faz a leitura dos dados. */
const mapStateToProps = (state) => {
  return {
    title: state.example.title /* prop title */,
    description: state.example.description /* prop description */,
  };
};

/* Essa função executa ações de acordo com os dados passados no dispatch para o state do reducer. Em outras palavras faz a escrita dos dados. Essas ações(métodos) se transformam em props para a tela. */
const mapDispatchToProps = (dispatch) => {
  return {
    /* prop setTitle() */
    setTitle: (title) => dispatch({type: 'SET_TITLE', payload: {title: title}}),
    /* prop setDescription() */
    setDescription: (description) =>
      dispatch({type: 'SET_DESCRIPTION', payload: {description: description}}),
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#222',
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    marginVertical: 20,
    color: '#0033ff',
  },
  description: {
    fontSize: 20,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  image: {
    width: 130,
    height: 120,
  },
});

/* o export deve ser agora no connect, seguido da execução da tela */
export default connect(mapStateToProps, mapDispatchToProps)(Home);
