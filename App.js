import React from "react";
import {
  StyleSheet, View, Dimensions, TouchableOpacity, Text, StatusBar, Platform, TouchableHighlight, Modal,
  TextInput
} from "react-native";
import {VictoryBar, VictoryChart, VictoryLine, VictoryTheme} from "victory-native";

const data = [
  { day: 'Sun', weight: 94 },
  { day: 'Mon', weight: 93.5 },
  { day: 'Tue', weight: 93.8 },
  { day: 'Wed', weight: 93.3 },
  { day: 'Thu', weight: 92.8 },
  { day: 'Fri', weight: 92.5 },
  { day: 'Sat', weight: 90.7 }
];

export default class App extends React.Component {

  constructor(){
    super();

    this.state = {
      isModalVisible : true
    };
  }

  setModalVisible(visible) {
    this.setState({isModalVisible: visible});
  }

  static calculateAverage(){
    let sum = null;
    let countData = data.length;
    for (let i=0; i<countData; i++) {
      sum += data[i].weight;
    }

    let avg = sum / countData;
    let topAvg = avg+countData;
    let bottomAvg = avg-countData;

    return {'topAvg': topAvg, 'bottomAvg': bottomAvg}
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content"/>
        <Modal
          style={styles.modalContainer}
          animationType="fade"
          transparent={true}
          visible={this.state.isModalVisible}
          onRequestClose={() => {
            alert('Modal has been closed.');
          }}>
          <View style={styles.modalContentContainer}>
            <View style={styles.modalInnerContainer}>
              <Text style={{marginVertical: 8}}>Tambah Berat Badan</Text>
              <TextInput
                style={styles.textInput}
                placeholder={'80'}
              />

              <TouchableOpacity style={[styles.buttonBg, {marginBottom: 8}]} onPress={() => {
                this.setModalVisible(!this.state.isModalVisible);
              }}>
                <Text style={{margin: 8}}>Simpan</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>


        <Text style={{marginTop: 32, fontSize: 16}}>Timbangan</Text>
        <VictoryChart width={Dimensions.get('window').width} style={{marginHorizontal: 16}} domain={{x: [1, 7], y: [App.calculateAverage().bottomAvg, App.calculateAverage().topAvg]}} theme={VictoryTheme.material}>
          <VictoryLine data={data} x="day" y="weight" />
        </VictoryChart>

        <TouchableOpacity style={styles.buttonBg} onPress={() => {this.setModalVisible(true);}}>
            <Text style={{margin: 8}}>Tambah Berat</Text>
        </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f5fcff"
  },
  buttonBg: {
    borderRadius: 4,
    borderColor: 'gray',
    borderWidth: 0.5
  },
  modalContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  modalContentContainer: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalInnerContainer: {
    backgroundColor: 'white',
    borderRadius: 4,
    alignItems: 'center',
    marginHorizontal: 32,
    justifyContent: 'space-between',
    position: 'absolute',
    left: 0,
    right: 0,
  },
  textInput: {
    width: 280,
    ...Platform.select({
      ios: {
        height: 32,
        paddingLeft: 8,
        marginBottom: 16,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 4
      },
      android: {
        marginBottom: 4,
      },
    }),
  }
});