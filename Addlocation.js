import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  TabBarIOS,
  StyleSheet,
  View,
  TouchableHighlight
} from 'react-native';
import TravelMap from './Travel_map';
import AddTravel from './add_Travel';

class Addlocation extends Component {

  constructor() {
    super();
    this.state = {
      selectedTab: 0,
      annotations: [
        {
          title: 'Wat Phra Kaew',
          latitude: 13.751485,
          longitude: 100.4921415
        },
        {
          title: 'สนามหลวง',
          latitude: 13.7548538,
          longitude: 100.4908047
        },
        {
          title: 'เกาะพีพี',
          latitude: 7.7526506,
          longitude: 98.7390926
        },
        {
          title: 'เกาะเสม็ด',
          latitude: 12.5523373,
          longitude: 101.4209973
        },
        {
          title: 'เกาะหลีเป๊ะ',
          latitude: 6.4877047,
          longitude: 99.2886962
        },
        {
          title: 'ดอยสุเทพ',
          latitude: 18.8163889,
          longitude: 98.8897557
        },
        {
          title: 'เขื่อนป่าสักชลสิทธิ์ ',
          latitude: 14.861389,
          longitude: 101.0639223
        },
        {
          title: 'เขาค้อ',
          latitude: 16.6813889,
          longitude: 100.9353113
        }
      ]
    };
  }

  handleTabPress(tab){
    this.setState({ selectedTab: tab })
  }

  handleAddPlace(annotation) {
    const annotations = this.state.annotations.slice();
    annotations.push(annotation);
    this.setState({ annotations });
  }

  render() {
    return (
      <View style={[styles.container]}>

      <TabBarIOS>
        <TabBarIOS.Item
          systemIcon="favorites"
          selected={this.state.selectedTab === 0}
          onPress={this.handleTabPress.bind(this, 0)}
        >
        <TravelMap annotations={this.state.annotations}/>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Place"
          icon={require('./assets/pin.png')}
          selected={this.state.selectedTab === 1}
          onPress={this.handleTabPress.bind(this, 1)}
        >
          <AddTravel onAddTravel={this.handleAddPlace.bind(this)} />
        </TabBarIOS.Item>
      </TabBarIOS>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    paddingTop:65,
    flex: 1
  },
  text: {
    textAlign: 'center',
    color: '#333333',
    marginTop: 50,
  },
  view: {
    backgroundColor: '#fed',
    flex: 1
  }
});

export default Addlocation;
