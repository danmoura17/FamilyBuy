import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import colors from "./Colors";
import tempData from "./tempData";
import ToBuyList from "./components/ToBuyList";
import AddListModal from "./components/AddListModal";

export default class App extends React.Component {
  state = {
    addToBuyVisible: false,
    lists: tempData
  };

  toggleAddToBuyModal() {
    this.setState({ addToBuyVisible: !this.state.addToBuyVisible });
  }

  renderList = list => {
    return <ToBuyList list={list} updateList={this.updateList}/>
  };

  addList = list => {
    this.setState({lists: [...this.state.lists, {...list, id: this.state.lists.length + 1, items: [] }]})
  };

  updateList = list => {
    this.setState({
      lists: this.state.lists.map( item => {
        return item.id === list.id ? list : item;
      })
    })
  };


  render() {
    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          visible={this.state.addToBuyVisible}
          onRequestClose={() => this.toggleAddToBuyModal()}
        >
          <AddListModal closeModal = {() => this.toggleAddToBuyModal()} addList={this.addList}/>
        </Modal>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.divider} />
          <Text style={styles.title}>
            Família Moura
            <Text style={{ fontWeight: "300", color: colors.blue }}> App </Text>
          </Text>
        </View>
        <View style={{ marginVertical: 48 }}>
          <TouchableOpacity
            style={styles.addList}
            onPress={() => this.toggleAddToBuyModal()}
          >
            <AntDesign name="plus" size={16} color={colors.blue} />
          </TouchableOpacity>

          <Text style={styles.add}> Adicionar lista</Text>
        </View>

        <View style={{ height: 275, paddingLeft: 32 }}>
          <FlatList
            data={this.state.lists}
            keyExtractor={(item) => item.name}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => this.renderList(item)}
            keyboardShouldPersistTaps="always"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  divider: {
    backgroundColor: colors.lightBlue,
    height: 1,
    flex: 1,
    alignSelf: "center",
  },
  title: {
    fontSize: 38,
    fontWeight: "800",
    color: colors.black,
    paddingHorizontal: 30,
  },
  addList: {
    borderWidth: 2,
    borderColor: colors.lightBlue,
    borderRadius: 4,
    padding: 34,
    alignItems: "center",
    justifyContent: "center",
  },
  add: {
    color: colors.blue,
    fontWeight: "600",
    fontSize: 14,
    marginTop: 8,
  },
});
