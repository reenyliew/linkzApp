//import all packages used in this screen
import React, { useState } from "react";
import { useEffect } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import firebase from "firebase";
import { Appbar } from "react-native-paper";

//main function
export default function ScheduleScreen({ navigation }) {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [hour, setHour] = useState("");
  const [schedule, setSchedule] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [countdownTime, setCountdownTime] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    // readData();
    let intervalId;
    if (isActive) {
      intervalId = setInterval(() => {
        // Get today's date and time
        var now = new Date().getTime();
        let combinedWords =
          month +
          " " +
          day +
          ", " +
          year +
          " " +
          hour +
          ":" +
          minutes +
          ":" +
          seconds;
        console.log(combinedWords);
        var countDownDate = new Date(combinedWords).getTime();
        // Find the distance between now and the count down date
        var distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        var min = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var sec = Math.floor((distance % (1000 * 60)) / 1000);

        setCountdownTime(days + "d " + hours + "h " + min + "m " + sec + "s");
        console.log(days, " ", hours, " ", min, " ", sec);
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [isActive]);

  //add new event to firebase
  const addScheduleToFirebase = () => {
    if (
      !schedule.trim() ||
      !day.trim() ||
      !month.trim() ||
      !year.trim() ||
      !hour.trim() ||
      !minutes.trim() ||
      !seconds.trim()
    ) {
      alert("Please enter title, date and time");
    } else if (
      schedule != null &&
      day != null &&
      month != null &&
      year != null &&
      hour != null &&
      minutes != null &&
      seconds != null
    ) {
      firebase
        .database()
        .ref(
          "Schedule/" +
            "2021-04-14" +
            "/" +
            "-MXeHTrsQP67QWMFdxgL" +
            "/" +
            schedule
        )
        .set({
          //Title: schedule,
          Day: day,
          Month: month,
          Year: year,
          Hour: hour,
          Minutes: minutes,
          Second: seconds,
        });
    }
  };

  //get data from database
  // const readData = () => {
  //   try {
  //     firebase
  //       .database()
  //       .ref("Schedule/" + "2021-04-14" + "/" + "-MXeHTrsQP67QWMFdxgL" + "/")
  //       .on("value", function (snapshop) {
  //         const items = [];
  //         snapshop.forEach((child1) => {
  //           items.push({
  //             Days: child1.val().Day,
  //             Months: child1.val().Month,
  //             Years: child1.val().Year,
  //             Hours: child1.val().Hour,
  //             Minutess: child1.val().Minutes,
  //             Seconds: child1.val().Second,
  //           });
  //           setDay(items[0].Days);
  //           setMonth(items[0].Months);
  //           setYear(items[0].Years);
  //           setHour(items[0].Hours);
  //           setMinutes(items[0].Minutess);
  //           setSeconds(items[0].Seconds);
  //         });
  //         //setData(items);

  //         //console.log("Im here", items);
  //       });
  //   } catch (error) {}
  //   //return data;
  // };

  return (
    <>
      <Appbar.Header style={styles.top}>
        <Appbar.Action icon="menu" onPress={() => navigation.openDrawer()} />
        <Appbar.Content
          title={<Text>Schedule</Text>}
          style={{ alignItems: "center" }}
        />
        <Appbar.Action
          icon="logout"
          onPress={() => navigation.navigate("Login")}
        />
      </Appbar.Header>
      <View style={styles.container}>
        <Image
          style={styles.icons}
          source={require("../assets/iconFamily.png")}
        />
        {/* <Text style={styles.titles}>Schedule</Text> */}

        <View style={styles.container}>
          <Text style={styles.textLabel}>Title</Text>
          <TextInput
            style={styles.inputField1}
            //placeholder="10"
            value={schedule}
            placeholderTextColor="#BEBEBE"
            onChangeText={(schedule) => setSchedule(schedule)}
          />
          <View style={styles.container1}>
            <Text style={styles.textLabel}>Day</Text>
            <Text style={styles.textLabel1}>Month</Text>
            <Text style={styles.textLabel2}>Year</Text>
          </View>
          <View style={styles.container2}>
            <TextInput
              style={styles.inputField}
              placeholder="10"
              value={day}
              placeholderTextColor="#BEBEBE"
              onChangeText={(day) => setDay(day)}
            />
            <TextInput
              style={styles.inputField2}
              placeholder="April"
              value={month}
              placeholderTextColor="#BEBEBE"
              onChangeText={(month) => setMonth(month)}
            />
            <TextInput
              style={styles.inputField3}
              placeholder="2021"
              value={year}
              placeholderTextColor="#BEBEBE"
              onChangeText={(year) => setYear(year)}
            />
          </View>
        </View>
        <View style={styles.container}>
          <View style={styles.container1}>
            <Text style={styles.textLabel}>Hour</Text>
            <Text style={styles.textLabel3}>Minutes</Text>
            <Text style={styles.textLabel4}>Seconds</Text>
          </View>
          <View style={styles.container2}>
            <TextInput
              style={styles.inputField}
              //placeholder=""
              value={hour}
              placeholderTextColor="#BEBEBE"
              onChangeText={(hour) => setHour(hour)}
            />
            <TextInput
              style={styles.inputField2}
              //placeholder=""
              value={minutes}
              placeholderTextColor="#BEBEBE"
              onChangeText={(minutes) => setMinutes(minutes)}
            />
            <TextInput
              style={styles.inputField3}
              //placeholder=""
              value={seconds}
              placeholderTextColor="#BEBEBE"
              onChangeText={(seconds) => setSeconds(seconds)}
            />
          </View>
        </View>
        <TouchableOpacity
          style={styles.btnDesign}
          onPress={() => {
            setIsActive(true);
            addScheduleToFirebase();
          }}
        >
          <Text style={styles.submitText}>Add</Text>
        </TouchableOpacity>
        <View style={styles.times}>
          <Text style={styles.word}>Task: {schedule}</Text>
          <Text style={styles.word1}>{countdownTime}</Text>
        </View>
      </View>
    </>
  );
}

//set the styles for all the elements
const styles = StyleSheet.create({
  top: {
    height: 20,
    paddingBottom: 27,
    backgroundColor: "#F1FCFD",
  },

  icons: {
    width: 120,
    height: 120,
    marginBottom: 30,
    marginTop: 30,
    alignSelf: "center",
  },

  container: {
    backgroundColor: "#F1FCFD",
  },

  container1: {
    backgroundColor: "#F1FCFD",
    flexDirection: "row",
  },

  container2: {
    backgroundColor: "#F1FCFD",
    flexDirection: "row",
  },

  btnDesign: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#96B4FF",
    marginLeft: "10%",
    marginTop: "5%",
    marginBottom: "5%",
  },

  times: {
    backgroundColor: "lightgrey",
    margin: 10,
    paddingBottom: 20,
    marginBottom: 50,
  },

  word: {
    alignSelf: "center",
    fontSize: 30,
    paddingTop: 30,
  },
  word1: {
    alignSelf: "center",
    fontSize: 20,
    paddingTop: 30,
  },

  titles: {
    height: 150,
    backgroundColor: "#96B4FF",
    padding: 50,
    paddingLeft: 100,
    margin: 10,
    fontSize: 30,
    alignItems: "center",
  },

  inputField1: {
    backgroundColor: "white",
    width: "80%",
    height: 40,
    marginBottom: 15,
    alignItems: "center",
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 1,
    marginLeft: 28,
    textAlign: "center",
    marginLeft: "10%",
  },

  inputField: {
    backgroundColor: "white",
    width: "15%",
    height: 40,
    marginBottom: 15,
    alignItems: "center",
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 1,
    marginLeft: 28,
    textAlign: "center",
    marginLeft: "10%",
  },

  inputField2: {
    backgroundColor: "white",
    width: "15%",
    height: 40,
    marginBottom: 17,
    alignItems: "center",
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 1,
    marginLeft: 28,
    textAlign: "center",
    marginLeft: "17%",
  },

  inputField3: {
    backgroundColor: "white",
    width: "15%",
    height: 40,
    marginBottom: 15,
    alignItems: "center",
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 1,
    marginLeft: 28,
    textAlign: "center",
    marginLeft: "18%",
  },

  textLabel: {
    color: "#8A8F9E",
    fontSize: 13,
    textTransform: "uppercase",
    marginLeft: "10%",
  },

  textLabel1: {
    color: "#8A8F9E",
    fontSize: 13,
    textTransform: "uppercase",
    marginLeft: "26%",
  },

  textLabel2: {
    color: "#8A8F9E",
    fontSize: 13,
    textTransform: "uppercase",
    marginLeft: "19%",
  },

  textLabel3: {
    color: "#8A8F9E",
    fontSize: 13,
    textTransform: "uppercase",
    marginLeft: "22%",
  },

  textLabel4: {
    color: "#8A8F9E",
    fontSize: 13,
    textTransform: "uppercase",
    marginLeft: "17%",
  },

  submitText: {
    alignItems: "center",
  },
});
