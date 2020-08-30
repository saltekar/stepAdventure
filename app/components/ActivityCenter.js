import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Animated
} from "react-native";
import { Pedometer } from "expo-sensors";
import Bar from "../components/Bar";

import colors from "../config/colors";

class ActivityCenter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pastStepCount: 0,
      days: [],
      dates: []
    };

    this.getWalkingData();
  }

  getWalkingData() {
    for (var i = 0; i < 7; i++) {
      const end = new Date();
      const start = new Date();
      start.setHours(0, 0, 0, 0);
      end.setHours(24, 0, 0, 0);

      end.setDate(end.getDate() - i);
      start.setDate(start.getDate() - i);

      this.state.dates.push(start.getMonth() + 1 + "/" + start.getDate());

      Pedometer.getStepCountAsync(start, end).then(
        result => {
          this.state.days.push(result.steps);
          this.setState({ pastStepCount: result.steps });
        },
        error => {
          this.setState({
            pastStepCount: "Could not get stepCount: " + error
          });
        }
      );
    }
  }

  render() {
    if (this.state.days.length == 7) {
      global.max = Math.max.apply(Math, this.state.days);
    }

    return (
      <View style={styles.activity}>
        <Bar title="Today" width={this.state.days[0]} max={global.max} />
        <Bar
          title={this.state.dates[1]}
          width={this.state.days[1]}
          max={global.max}
        />
        <Bar
          title={this.state.dates[2]}
          width={this.state.days[2]}
          max={global.max}
        />
        <Bar
          title={this.state.dates[3]}
          width={this.state.days[3]}
          max={global.max}
        />
        <Bar
          title={this.state.dates[4]}
          width={this.state.days[4]}
          max={global.max}
        />
        <Bar
          title={this.state.dates[5]}
          width={this.state.days[5]}
          max={global.max}
        />
        <Bar
          title={this.state.dates[6]}
          width={this.state.days[6]}
          max={global.max}
        />
      </View>
    );
  }
}

export default ActivityCenter;

const styles = StyleSheet.create({
  activity: {
    flex: 2,
    flexDirection: "column",
    justifyContent: "space-evenly"
  },

  barTitle: {
    marginTop: -20
  }
});
