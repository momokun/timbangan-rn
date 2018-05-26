import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
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

  calculateAverage(){
    let sum = null;
    let countData = data.length;
    for (let i=0; i<countData; i++) {
      sum += data[i].weight;
    }

    let avg = sum / countData;
    let topAvg = avg+countData
    let bottomAvg = avg-countData

    return {'topAvg': topAvg, 'bottomAvg': bottomAvg}
  }

  render() {
    return (
      <View style={styles.container}>
        <VictoryChart width={Dimensions.get('window').width} style={{marginHorizontal: 16}} domain={{x: [1, 7], y: [this.calculateAverage().bottomAvg, this.calculateAverage().topAvg]}} theme={VictoryTheme.material}>
          <VictoryLine data={data} x="day" y="weight" />
        </VictoryChart>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5fcff"
  }
});