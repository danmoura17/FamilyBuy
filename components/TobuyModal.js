import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  TextInput,
  Keyboard
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import Colors from "../Colors";

export default class TobuyModal extends React.Component {
  state = {
    newTobuy: "",
  };

  toggleTobuyCompleted = (index) => {
    let list = this.props.list;
    list.items[index].completed = !list.items[index].completed;

    this.props.updateList(list);
  };

  addItem = () => {
    let list = this.props.list;
    list.items.push({title: this.state.newTobuy, completed: false});

    this.props.updateList(list);
    this.setState({newTobuy: ""});

    Keyboard.dismiss();
  }

  renderItem = (item, index) => {
    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity onPress={() => this.toggleTobuyCompleted(index)}>
          <Ionicons
            name={item.completed ? "ios-square" : "ios-square-outline"}
            size={24}
            color={Colors.gray}
            style={{ width: 32 }}
          />
        </TouchableOpacity>

        <Text
          style={[
            styles.item,
            {
              textDecorationLine: item.completed ? "line-through" : "none",
              color: item.completed ? Colors.gray : Colors.black,
            },
          ]}
        >
          {item.title}{" "}
        </Text>
      </View>
    );
  };

  render() {
    const list = this.props.list;

    const taskCount = list.items.length;
    const completedCount = list.items.filter((item) => item.completed).length;
    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <SafeAreaView style={styles.container}>
          <TouchableOpacity
            style={{ position: "absolute", top: 64, right: 32, zIndex: 10 }}
            onPress={this.props.closeModal}
          >
            <AntDesign name="close" size={24} color={Colors.black} />
          </TouchableOpacity>

          <View
            style={[
              styles.section,
              styles.header,
              { borderBottomColor: list.color },
            ]}
          >
            <View>
              <Text style={styles.title}>{list.name}</Text>
              <Text style={styles.taskCount}>
                {completedCount} de {taskCount} items
              </Text>
            </View>
          </View>

          <View style={[styles.section, { flex: 3 }]}>
            <FlatList
              data={list.items}
              renderItem={({ item, index }) => this.renderItem(item, index)}
              keyExtractor={(item) => item.title}
              contentContainerStyle={{
                paddingHorizontal: 32,
                paddingVertical: 64,
              }}
              showsVerticalScrollIndicator={false}
            />
          </View>

          <View style={[styles.section, styles.footer]}>
            <TextInput
              style={[styles.input, { borderColor: list.color }]}
              onChangeText={(text) => this.setState({ newTobuy: text })}
              value={this.state.newTobuy}
            />
            <TouchableOpacity
              style={[styles.addItem, { backgroundColor: list.color }]}
              onPress={() => this.addItem()}
            >
              <AntDesign name="plus" size={16} color={Colors.white} />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  section: {
    flex: 1,
    alignSelf: "stretch",
  },
  header: {
    justifyContent: "flex-end",
    marginLeft: 64,
    borderBottomWidth: 3,
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: Colors.black,
  },
  taskCount: {
    marginTop: 4,
    marginBottom: 16,
    color: Colors.gray,
    fontWeight: "600",
  },
  footer: {
    paddingHorizontal: 32,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: 48,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 6,
    marginRight: 8,
    paddingHorizontal: 8,
  },
  addItem: {
    borderRadius: 4,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  itemContainer: {
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  item: {
    color: Colors.black,
    fontWeight: "700",
    fontSize: 16,
  },
});
