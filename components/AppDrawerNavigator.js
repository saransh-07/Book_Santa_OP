import React, {Component} from 'react';
import {tabNavigator} from './BottomTabNavig';
import CustomSideBarMenu from './CustomSideBarMenu';
import {createDrawerNavigator} from 'react-navigation-drawer';
import Settings from '../screens/SettingScreen';
export const DrawerNavig = createDrawerNavigator({
 Home : {
   screen : tabNavigator
 },
 Settings :{
   screen : Settings
 }
},{
 contentComponent:CustomSideBarMenu
})