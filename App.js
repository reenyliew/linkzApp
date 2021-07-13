//Import all packages
import * as React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import InitialScreen from "./screens/InitialScreen";
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import TodoScreen from "./screens/TodoScreen";
import EventScreen from "./screens/EventScreen";
import ScheduleScreen from "./screens/ScheduleScreen";
import { Ionicons, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import firebase from "./configFiles/config";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

// const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function CustomDrawerContent({ navigation }) {
  return (
    <View style={styles.container}>
      {/* <Image style={styles.icons} source={require("./assets/iconFamily.png")} /> */}
      <TouchableOpacity
        style={styles.labelStyle}
        onPress={() => {
          navigation.navigate("Home");
        }}
      >
        <Ionicons style={styles.icon} name="home" size={24} color="black" />
        <Text style={styles.textStyle}> Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.labelStyle}
        onPress={() => {
          navigation.navigate("User Profile");
        }}
      >
        <FontAwesome
          style={styles.icon}
          name="user-circle-o"
          size={24}
          color="black"
        />
        <Text style={styles.textStyle}> User Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.labelStyle}
        onPress={() => {
          navigation.navigate("To Do List");
        }}
      >
        <FontAwesome
          style={styles.icon}
          name="list-alt"
          size={24}
          color="black"
        />
        <Text style={styles.textStyle}> To do list</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.labelStyle}
        onPress={() => {
          navigation.navigate("Schedule");
        }}
      >
        <MaterialIcons
          style={styles.icon}
          name="schedule"
          size={24}
          color="black"
        />
        <Text style={styles.textStyle}> Schedule</Text>
      </TouchableOpacity>
    </View>
  );
}

//Main function
const MyStack = () => {
  return (
    //Configure every screen name and initial route for the app
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Login"
        headerMode="screen"
        drawerStyle={{ width: 170, backgroundColor: "#F1FCFD" }}
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen
          name="Login"
          component={LoginScreen}
          options={{ swipeEnabled: false }}
        />
        <Drawer.Screen
          name="Initial"
          component={InitialScreen}
          options={{ swipeEnabled: false }}
        />
        <Drawer.Screen
          name="Register"
          component={RegisterScreen}
          options={{ swipeEnabled: false }}
        />
        <Drawer.Screen
          name="Home"
          component={HomeScreen}
          options={{ swipeEnabled: false }}
        />
        <Drawer.Screen
          name="User Profile"
          component={ProfileScreen}
          options={{ swipeEnabled: false }}
        />
        <Drawer.Screen
          name="To Do List"
          component={TodoScreen}
          options={{ swipeEnabled: false }}
        />
        {/* <Drawer.Screen name="Update" component={UpdateScreen} /> */}
        <Drawer.Screen
          name="Event"
          component={EventScreen}
          options={{ swipeEnabled: false }}
        />
        {/* <Drawer.Screen name="Setting" component={SettingScreen} /> */}
        <Drawer.Screen
          name="Schedule"
          component={ScheduleScreen}
          options={{ swipeEnabled: false }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;

//styles for all elements
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F1FCFD",
  },

  labelStyle: {
    height: 80,
    //backgroundColor: "#F1FCFD",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingRight: 20,
  },

  icons: {
    margin: 20,
  },

  icon: {
    position: "absolute",
    left: 10,
  },

  textStyle: {
    fontSize: 20,
    position: "absolute",
    left: 40,
  },
});
