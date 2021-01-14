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

/*
Activity Center shows user's steps counts for past week.
Located from home screen.
*/
class ActivityCenter extends React.Component {
  constructor(props) {
    super(props);
    global.max = 0;
    global.avg = 0;

    this.state = {
      pastStepCount: 0,
      days: [],
      dates: []
    };

    this.getWalkingData();
  }

  // Gets walking data for past 7 days.
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

      var total = 0;
      for (var i = 1; i < this.state.days.length; i++) {
        total += this.state.days[i];
      }
      global.avg = total / this.state.days.length;
      global.avg = Math.round(global.avg);
    }

    return (
      <View style={{ flex: 1 }}>
        <View style={styles.dailyAvg}>
          <Text style={styles.dailyStepsTitle}>Average Daily Steps:</Text>
          <Text style={styles.steps}>{global.avg}</Text>
        </View>

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
      </View>
    );
  }
}

export default ActivityCenter;

const styles = StyleSheet.create({
  activity: {
    flex: 5,
    flexDirection: "column",
    justifyContent: "space-evenly"
  },

  barTitle: {
    marginTop: -20
  },
  dailyAvg: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center"
  },

  dailyStepsTitle: {
    fontSize: 38,
    color: colors.primary
  },
  steps: {
    fontSize: 30,
    color: colors.primary
  }
});
