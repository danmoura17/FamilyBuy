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
  Keyboard,
  Animated,
  Alert,
  Button,
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import Colors from "../Colors";
import { Swipeable } from "react-native-gesture-handler";

export default class ToBuyModal extends React.Component {
  state = {
    newToBuy: "",
  };

  toggleToBuyCompleted = (index) => {
    let list = this.props.list;
    list.todos[index].completed = !list.todos[index].completed;

    this.props.updateList(list);
  };

  addItem = () => {
    let list = this.props.list;

    if (!list.todos.some((item) => item.title === this.state.newToBuy)) {
      list.todos.push({ title: this.state.newToBuy, completed: false });
      this.props.updateList(list);
    }
    this.setState({ newToBuy: "" });

    Keyboard.dismiss();
  };

  deleteAllCheckedItems = () => {
    let list = this.props.list;
    Alert.alert(
      "Atenção",
      `Deseja deletar todos os itens feitos?`,
      [
        {
          text: "Cancelar",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            list.todos.forEach((element,index) => {
              if(element.completed == true){
                list.todos.splice(index, 1);
              }
            });
            this.props.updateList(list);
          },
        },
      ],
      { cancelable: false }
    );
  };

  deleteItem = (index) => {
    let list = this.props.list;
    Alert.alert(
      "Atenção",
      `Deseja deletar ${list.todos[index].title} ?`,
      [
        {
          text: "Cancelar",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            list.todos.splice(index, 1);

            this.props.updateList(list);
          },
        },
      ],
      { cancelable: false }
    );
  };



  renderItem = (item, index) => {
    return (
      <Swipeable
        renderRightActions={(_, dragX) => this.rightActions(dragX, index)}
      >
        <View style={styles.itemContainer}>
          <TouchableOpacity onPress={() => this.toggleToBuyCompleted(index)}>
            <Ionicons
              name={item.completed ? "ios-square" : "ios-square-outline"}
              size={24}
              color={Colors.gray}
              style={{ width: 32 }}
            />
          </TouchableOpacity>

          <Text
            behavior={Platform.OS == "ios" ? "" : "height"}
            style={[
              styles.item,
              {
                textDecorationLine: item.completed ? "line-through" : "none",
                color: item.completed ? Colors.gray : Colors.black,
              },
            ]}
          >
            {item.title}{""}
          </Text>
          <TouchableOpacity 
            style={styles.deletar}
            onPress={() => this.deleteItem(index)}
          >
            <Ionicons
              name={"ios-trash"}
              size={24}
              color={Colors.red}
              style={styles.deletar}
            />
          </TouchableOpacity>
        </View>
      </Swipeable>
    );
  };

  rightActions = (dragX, index) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0.9],
      extrapolate: "clamp",
    });

    const opacity = dragX.interpolate({
      inputRange: [-100, -20, 0],
      outputRange: [1, 0.9, 0],
      extrapolate: "clamp",
    });

    return (
      <TouchableOpacity onPress={() => this.deleteItem(index)}>
        <Animated.View style={[styles.deleteButton, { opacity: opacity }]}>
          <Animated.Text
            style={{
              color: colors.white,
              fontWeight: "800",
              transform: [{ scale }],
            }}
          >
            Deletar
          </Animated.Text>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  render() {
    const list = this.props.list;

    const taskCount = list.todos.length;
    const completedCount = list.todos.filter((item) => item.completed).length;
    return (
      <KeyboardAvoidingView style={{ flex: 1 }} 
      behavior={Platform.OS == "ios" ? "padding" : "height"}
       resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={styles.container}
      scrollEnabled={false}>
        <SafeAreaView style={styles.container}>
          <TouchableOpacity
            style={{ position: "absolute", top: 32, right: 32, zIndex: 10 }}
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
              <View style={[styles.cabecalho]}>
                <Text style={styles.title}>{list.name}</Text>
                <TouchableOpacity
                  style={[styles.addItem, { backgroundColor: list.color }]}
                  onPress={() => this.deleteAllCheckedItems()}>
                  <AntDesign name="bars" size={16} color={Colors.white} />
                </TouchableOpacity>
              </View>
              <Text style={styles.taskCount}>
                {completedCount} de {taskCount} items
              </Text>
            </View>


          </View>

          <View style={[styles.section, { flex: 3, marginVertical: 16 }]}>
            <FlatList
              data={list.todos}
              renderItem={({ item, index }) => this.renderItem(item, index)}
              keyExtractor={(item) => item.title}
              showsVerticalScrollIndicator={false}
            />
          </View>

          <View style={[styles.section, styles.footer]}>
            <TextInput
              style={[styles.input, { borderColor: list.color }]}
              onChangeText={(text) => this.setState({ newToBuy: text })}
              value={this.state.newToBuy}
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
    paddingTop: 16,
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
    paddingVertical: 16,
  },
  buttonCabecalho: {
    justifyContent: "flex-end",
    paddingVertical: 16,
  },
  cabecalho: {
    flexDirection: "row",
    paddingVertical: 16,
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
    paddingLeft: 32,
  },
  item: {
    color: Colors.black,
    fontWeight: "700",
    fontSize: 16,
  },
  deleteButton: {
    flex: 1,
    backgroundColor: colors.red,
    justifyContent: "center",
    alignItems: "center",
    width: 80,
  },
  deletar: {
    flex: 1,
    paddingRight: 15,
    alignSelf: "flex-end",
  },
});
