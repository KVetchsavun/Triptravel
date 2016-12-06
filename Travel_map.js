import React, { Component } from 'react';
import {
  AlertIOS,
  Text,
  MapView,
  View,
  TouchableHighlight,
  StyleSheet,
  Linking,
  Dimensions
} from 'react-native';
var {height, width} = Dimensions.get('window');
export default class PlaceMap extends Component {
  constructor(props) {
    super(props);
    this.region = {
      latitude: 14.07568,
      longitude: 100.6152273,
      latitudeDelta: 7,
      longitudeDelta: 7,
      title: "My Location"
    }
    this.state = {
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }
    };
    this.onRegionChangeComplete = this.onRegionChangeComplete.bind(this);
  }
  onRegionChangeComplete(region) {
      this.setState({ region });
    }
  handleNavigation(la, lo) {
    const rla = this.region.latitude;
    const rlo = this.region.longitude;
    const url = `http://maps.apple.com/?saddr=${rla},${rlo}&daddr=${la},${lo}&dirflg=d`;
    return Linking.openURL(url);
  }

  render() {
    const { annotations } = this.props;
    annotations.forEach(annotation => {
      annotation.rightCalloutView = (
        <TouchableHighlight
          style={styles.button}
          onPress={this.handleNavigation.bind(this, annotation.latitude, annotation.longitude)}
        >
          <Text style={styles.buttonText}>Navigation</Text>
        </TouchableHighlight>
      );
    })
    return (
      <View style={styles.container}>
      <MapView
        style={styles.map}
        region={this.region}
        annotations={annotations}
        onRegionChangeComplete={this.onRegionChangeComplete}
      />
      <View style={styles.containers}>
          <Text style={styles.Texts}>
          Latitude: {this.state.region.latitude}{'\n'}
          Longitude: {this.state.region.longitude}{'\n'}
          </Text>
        </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  map: {
    width: width,
    height: height*2.2/3
  },
  button: {
    backgroundColor: 'red',
    padding: 5,
    margin: 5
  },
  buttonText: {
    fontSize: 12,
    color: 'white'
  },
  containers: {
    width: width,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'lightgray'
  },
  Texts:{
    padding: 5,
  }
});
