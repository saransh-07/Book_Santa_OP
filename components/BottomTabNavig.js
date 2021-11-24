import React, {Component} from 'react';
import {Image} from 'react-native'
import {createBottomTabNavigator} from 'react-navigation-tabs';
import BookDonateScreen from '../screens/BookDonateScreen.js';
import BookRequestScreen from '../screens/BookRequestScreen';
import {stackNavig} from './StackNavigator'
export const tabNavigator = createBottomTabNavigator({
   RequestBooks:{
    screen : BookRequestScreen,
    navigationOptions : {
      tabBarIcon : <Image source ={require('../assets/request-book.png')} style ={{width:20,height:20}} />,
      tabBarLabel : "Request Book"
    }
  }, 
  DonateBooks : {
    screen : stackNavig,
    navigationOptions : {
      tabBarIcon : <Image source={require('../assets/request-list.png') } style={{width:20,height:20}} />,
      tabBarLabel : "Donate Books"
    }
  
  }
 
})