import React, {Component} from 'react';
import {View, TextInput , Modal, Text} from 'react-native';
import Welcome from './screens/WelcomeScreen'
import {createSwitchNavigator, createAppContainer} from 'react-navigation';

import {DrawerNavig} from './components/AppDrawerNavigator'
export default class App extends React.Component
{
  
render(){
  return(
<AppContainer/>
  ); 
}
}

const switchNavig = createSwitchNavigator({
  WelcomeScreen :{screen : Welcome},
  Drawer :{screen : DrawerNavig}      
})
const AppContainer = createAppContainer(switchNavig);        