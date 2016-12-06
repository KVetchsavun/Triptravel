import React, {Component} from 'react';
import {Navigator, StatusBar, TouchableHighlight, ScrollView, AppRegistry, StyleSheet, Image, Text, View} from 'react-native';
import Realm from 'realm';
var realm;
import Addlocation from './Addlocation.js';
import Trip from './Trip.js';
import AddTrip from './AddTrip.js';

const routes = [
  {
    title: 'Trip List',
    index: 0
  }, {
    title: 'AddTrip',
    index: 1
  }, {
    title: 'Location',
    index: 2
  }
]


class First extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor="purple"
          barStyle="light-content"
        />
        <Navigator
          initialRoute={routes[0]}
          initialRouteStack={routes}
          renderScene={
            (route, navigator) => {
              switch (route.index) {
                case 0: return (<Trip navigator={navigator} route={routes[route.index]} {...route.passProps}></Trip>);
                case 1: return (<AddTrip navigator={navigator} route={routes[route.index]} {...route.passProps}></AddTrip>);
                case 2: return (<Addlocation navigator={navigator} route={routes[route.index]} {...route.passProps}></Addlocation>);
              }
            }
          }
          configureScene={
            (route, routeStack) =>
              Navigator.SceneConfigs.FloatFromBottom
          }
          navigationBar={
           <Navigator.NavigationBar
             routeMapper={{
               LeftButton: (route, navigator, index, navState) => {
                 if (route.index == 0){
                   return null;
                 }
                 if(route.index == 1){
                   return (
                     <TouchableHighlight onPress={()=>navigator.push({index: 0})}>
                       <Text style={styles.navigationBarText}>Back</Text>
                     </TouchableHighlight>
                   )
                 }
                 return (
                   <TouchableHighlight onPress={()=>navigator.pop()}>
                     <Text style={styles.navigationBarText}>Back</Text>
                   </TouchableHighlight>
                 )
               },
               RightButton: (route, navigator, index, navState) => {
                 if (route.index == 0){
                 return (
                   <TouchableHighlight onPress={()=>navigator.push({index: 1})}>
                     <Text style={styles.navigationBarText}>AddTrip</Text>
                   </TouchableHighlight>
                 )}


                 if (route.index == 1){
                 return (
                   <TouchableHighlight onPress={()=>navigator.push({index: 2})}>
                     <Text style={styles.navigationBarText}>WatchLocation</Text>
                   </TouchableHighlight>
                 )}
                 return null;
               },
               Title: (route, navigator, index, navState) =>
                 { return (<Text style={[styles.navigationBarText, styles.titleText]}>{routes[route.index].title}</Text>); },
               }
              }
             style={styles.navigationBar}
           />
        }
      />
    </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  navigationBar:{
    backgroundColor: 'black',
  },
  navigationBarText:{
    color: 'white',
    padding: 10,
    fontSize: 15
  },
  titleText:{
    fontSize: 20,
    paddingTop:5
  }
});
AppRegistry.registerComponent('TripTravel', () => First);
