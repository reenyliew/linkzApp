//import all packages used in this screen
import React, { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  Text,
  ToastAndroid,
  Alert,
  StatusBar,
  Pressable,
  Modal,
  Card,
  Button,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Clipboard from "expo-clipboard";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import * as firebase from "firebase";
import { LogBox } from "react-native";
const { width, height } = Dimensions.get("window");

LogBox.ignoreLogs(["Warning: ..."]);
LogBox.ignoreAllLogs();

//main function
export default function InitialScreen({ route, navigation }) {
  //pass param from LoginScreen
  const { myusername } = route.params;

  //set groupid to public static
  const [datagnid, setDataGNID] = useState([]);

  //copy text to clipboard
  copyToClipboard = () => {
    Clipboard.setString(datagnid);
    ToastAndroid.show(datagnid, ToastAndroid.SHORT);
  };

  const navigateToSettingScreen = () => {
    navigation.navigate("Setting", { myusername: myusername });
  };

  //get groupid from user input
  const [gID, setGID] = useState("");
  const [gName, setGName] = useState("");

  const joinFamily = () => {
    if (!gID.trim()) {
      //if the textinput is empty # alert mesage
      alert("Please enter a valid group id");
    } else if (gID != null) {
      var ref = firebase.database().ref("Group/GroupMember/");
      var refInfo = ref.child(gID);
      var query = refInfo;
      query.once("value", function (snapshot) {
        if (snapshot.exists()) {
          var refValidateUserInfo = ref.child(gID + "/" + myusername);
          var queryValidateUserInfo = refValidateUserInfo;
          queryValidateUserInfo.once("value", function (snapshotvalidate) {
            if (snapshotvalidate.exists()) {
              alert("You are already a member of this group");
            } else {
              firebase
                .database()
                .ref("Group/GroupMember/" + gID + "/" + myusername)
                .set({
                  Member: myusername,
                  Role: "User",
                  GroupID: gID,
                });
              alert("You have joined the group!");
              console.log("IM HERE=>" + myusername);
              var username = myusername;
              navigation.navigate("Home", {
                myusername: username,
                GROUPID: gID,
              });
              setGID("");
              setGName("");
            }
          });
        } else {
          alert("GROUP ID NOT FOUND");
        }
      });
    }
  };

  const createFamily = () => {
    var groupid;

    if (!gName.trim()) {
      alert("Invalid Group Name");
    } else if (gName != null) {
      var ref = firebase.database().ref("Group/GroupList/");
      var query = ref.orderByChild("GroupName").equalTo(gName);
      query.once("value", function (snapshot) {
        if (snapshot.exists()) {
          alert("This Group Name has been taken!");
        } else {
          firebase.database().ref("Group/GroupList/").push({
            GroupName: gName,
          });

          var query1 = ref.orderByChild("GroupName").equalTo(gName);
          query1.once("value", function (snapshot2) {
            snapshot2.forEach(function (child2) {
              groupid = child2.key;

              console.log(groupid);

              //set groupid to public static
              setDataGNID(groupid);

              //Whoever create group will auto assign to admin role
              firebase
                .database()
                .ref("Group/GroupMember/" + groupid + "/" + myusername)
                .set({
                  Member: myusername,
                  Role: "Admin",
                  GroupID: groupid,
                });

              //Alert if it is done
              Alert.alert(
                "Status",
                "Your group is ready! \nGroup ID: " + groupid + "",
                [
                  {
                    text: "COPY",
                    onPress: this.copyToClipboard,
                    style: "cancel",
                  },
                  { text: "OK" },
                ]
              );
            });
          });

          setGID("");
          setGName("");
          var username = myusername;
          navigation.navigate("Home", { myusername: username, GROUPID: gID });
        }
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.view9}></View>

      <View style={styles.view1}>
        <TouchableOpacity onPress={navigateToSettingScreen}>
          {/* <Image
            style={styles.setting}
            source={require("../assets/Settings-icon.png")}
          /> */}
        </TouchableOpacity>
      </View>

      <View style={styles.view2}>
        <Image
          style={styles.icons}
          source={require("../assets/iconFamily.png")}
        />
        <Text>Username:{myusername}</Text>
      </View>

      <View style={styles.view3}>
        <TextInput
          style={styles.TextInput}
          placeholder="Group ID #JoinGroup"
          placeholderTextColor="#BEBEBE"
          value={gID}
          onChangeText={(gID) => setGID(gID)}
        />
      </View>

      <View style={styles.view4}>
        <TouchableOpacity style={styles.joinbutton} onPress={joinFamily}>
          <Text style={styles.loginText}>JOIN GROUP</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.view7}></View>

      <View style={styles.view5}>
        <TextInput
          style={styles.TextInput}
          placeholder="Group Name #CreateGroup"
          placeholderTextColor="#BEBEBE"
          value={gName}
          onChangeText={(gName) => setGName(gName)}
        />
      </View>

      <View style={styles.view6}>
        <TouchableOpacity style={styles.joinbutton} onPress={createFamily}>
          <Text style={styles.loginText}>CREATE GROUP</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.view8}></View>
    </View>
  );
}

//set the styles for all the elements
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F1FCFD",
    flexDirection: "column",
    flex: 1,
    alignItems: "stretch",
    justifyContent: "center",
  },

  view9: {
    flex: 0.5,
  },

  view1: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
  },

  view2: {
    flex: 3.5,
    alignItems: "center",
    justifyContent: "center",
  },

  view7: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },

  view3: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },

  view4: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },

  view5: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },

  view6: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },

  view8: {
    flex: 1,
  },

  joinbutton: {
    width: 300,
    height: 50,
    backgroundColor: "#96B4FF",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  icons: {
    width: 100,
    height: 100,
    // marginBottom: "20%",
    // marginTop: "1%",
    // alignSelf: "center",
  },

  setting: {
    width: 50,
    height: 50,
    marginRight: 15,
  },

  testtext: {
    width: 100,
    height: 100,
  },

  TextInput: {
    width: 300,
    height: 50,
    backgroundColor: "white",
    borderRadius: 10,
    textAlign: "center",
    borderColor: "black",
    borderWidth: 1,
  },

  inputField: {
    backgroundColor: "white",
    width: "90%",
    height: 40,
    marginBottom: 15,
    alignItems: "center",
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 1,
    marginLeft: 20,
  },
});
