import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import ReceiverDetails from '../screens/ReceiverDetails';
import BookDonateScreen from '../screens/BookDonateScreen';
import MyDonation from '../screens/MyDonationScreen'
export const stackNavig = createStackNavigator({
  BookDonate:{
    screen : BookDonateScreen,
    navigationOptions:{
      headerShown:false
    }
  },
  BookReceive:{
    screen : ReceiverDetails,
      navigationOptions:{
      headerShown:false
    }
},
MyDonation:{
  screen : MyDonation,
  navigationOptions:{
    headerShown:false
  }

}
 
},{initialRouteName:'BookDonate',
})