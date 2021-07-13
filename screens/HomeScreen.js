//import all packages used in this screen
import React, { useState } from "react";
import {
  StyleSheet,
  Image,
  View,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
} from "react-native";
import { Calendar } from "react-native-calendars";
import Clipboard from "expo-clipboard";
import { Appbar } from "react-native-paper";

//main function
export default function HomeScreen({ route, navigation }) {
  const [selected, setSelected] = useState("");
  //get username from previous screen
  const { myusername, GROUPID } = route.params;
  console.log(GROUPID);

  //copy text to clipboard
  const copyGroupID = () => {
    Clipboard.setString(GROUPID);
    ToastAndroid.show("COPIED GROUP ID: " + GROUPID, ToastAndroid.SHORT);
  };

  const onDayPress = (day) => {
    setSelected(day.dateString); //, day.year, "-", day.month, "-", day.day);
    // Target date
    var date1 = new Date(day.dateString);
    // Current date
    var date2 = new Date();

    // Calculate time difference
    var diffTime = date1 - date2;
    // Calculate number of days between two dates
    var diffDays = diffTime / (1000 * 3600 * 24);
    // Set result equal to ceiling of date difference so it can get the correct days
    let result = Math.ceil(diffDays);
    // If result smaller than 0
    if (result < 0) {
      // Display the string "Event is over"
      result = "Event is over";
    }
    console.log("diff days: ", result);

    var getseldate = day.dateString;
    navigation.navigate("Event", {
      myusername: myusername,
      eventDate: getseldate,
      GROUPID: GROUPID,
      Datediff: result,
    });
  };

  //display icon and calendar
  return (
    <>
      <Appbar.Header style={styles.top}>
        <Appbar.Action icon="menu" onPress={() => navigation.openDrawer()} />
        <Appbar.Content
          title={<Text>Home</Text>}
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
        <Calendar
          style={styles.calendarDesign}
          // Enable horizontal scrolling, default = false
          horizontal={true}
          // Enable paging on horizontal, default = false
          pagingEnabled={true}
          // Set custom calendarWidth.
          calendarHeight={700}
          //set calendar theme
          onDayPress={onDayPress}
          theme={{
            backgroundColor: "#ffffff",
            calendarBackground: "#ffffff",
            textSectionTitleColor: "black",
            textSectionTitleDisabledColor: "#d9e1e8",
            selectedDayBackgroundColor: "#00adf5",
            selectedDayTextColor: "#ffffff",
            todayTextColor: "#00adf5",
            dayTextColor: "black",
            textDisabledColor: "#d9e1e8",
            dotColor: "#00adf5",
            selectedDotColor: "#ffffff",
            arrowColor: "black",
            disabledArrowColor: "#d9e1e8",
            monthTextColor: "black",
            indicatorColor: "blue",
            textDayFontFamily: "monospace",
            textMonthFontFamily: "monospace",
            textDayHeaderFontFamily: "monospace",
            textDayFontWeight: "300",
            textMonthFontWeight: "bold",
            textDayHeaderFontWeight: "300",
            textDayFontSize: 16,
            textMonthFontSize: 16,
            textDayHeaderFontSize: 16,
          }}
          markedDates={{
            [selected]: {
              selected: true,
              disableTouchEvent: true,
              selectedColor: "lightblue",
              selectedTextColor: "darkgreen",
            },
          }}
        />

        <View style={styles.bottom}>
          <Text style={styles.bottomcontenttitle}>GROUP ID</Text>
          <Text style={styles.bottomcontent}>
            Press the text below to copy group id.
          </Text>
          <Text
            style={styles.bottomcontentgroupid}
            onPress={() => {
              copyGroupID();
            }}
          >
            {GROUPID}
          </Text>
          {/* </TouchableOpacity> */}
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
  container: {
    backgroundColor: "#F1FCFD",
    flex: 1,
  },
  calendarDesign: {
    width: "100%",
    backgroundColor: "#96B4FF",
  },

  icons: {
    width: 120,
    height: 120,
    marginBottom: 30,
    marginTop: 30,
    alignSelf: "center",
  },

  bottomcontenttitle: {
    fontSize: 15,
    fontWeight: "bold",
  },

  bottomcontent: {
    fontSize: 13,
    color: "#FF0000",
    fontFamily: "monospace",
    fontWeight: "bold",
  },

  bottomcontentgroupid: {
    fontSize: 19,
    backgroundColor: "#DEFFEF",
    borderWidth: 0.3,
    borderColor: "black",
    height: 40,
    width: 340,
    textAlign: "center",
    fontFamily: "monospace",
    textAlignVertical: "center",
  },

  bottom: {
    flex: 0.3,
    backgroundColor: "lightgrey",
    borderWidth: 0.5,
    margin: 10,
    paddingBottom: 20,
    alignItems: "center",
    fontFamily: "monospace",
  },
});
