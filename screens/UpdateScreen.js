//import all packages
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import * as firebase from "firebase";

//main function
export default function UpdateScreen() {
  //initialize and configure all variables
  const [data, setData] = useState([]);

  //display list from database
  const renderItem = ({ item }) => {
    return <Text style={styles.cardContent}>{item}</Text>;
  };

  //get data from database
  const readInfo = () => {
    try {
      firebase
        .database()
        .ref("/users/")
        .on("value", function (snapshop) {
          const items = [];
          snapshop.forEach((child1) => {
            items.push(
              child1.val().Email,
              child1.val().FirstName,
              child1.val().LastName,
              child1.val().Password,
              child1.val().Phone
            );
          });
          setData(items);
        });
    } catch (error) {}
    return data;
  };

  //get the data after changes
  useEffect(() => {
    readInfo();
  }, []);

  //display icons, text and flatlist
  return (
    <View style={styles.container}>
      <Image
        style={styles.icons}
        source={require("../assets/iconFamily.png")}
      />

      <View>
        <Text style={styles.informationWord}>Information</Text>
      </View>

      <FlatList
        style={styles.flat}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

//set styles for all elements
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  icons: {
    top: 5,
    marginBottom: 10,
    marginTop: 20,
  },

  cardContent: {
    fontSize: 20,
    marginTop: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#96B4FF",
    width: 250,
    height: 40,
    padding: 5,
    marginHorizontal: 18,
    marginVertical: 10,
  },

  informationWord: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 20,
  },
});
