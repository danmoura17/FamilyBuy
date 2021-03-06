import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Modal, Alert } from "react-native";
import Colors from "../Colors";
import ToBuyModal from "./TobuyModal";

export default class ToBuyList extends React.Component {
  state = {
    showListVariable: false,
  };

  toggleListModel() {
    this.setState({ showListVariable: !this.state.showListVariable });
  }

  deleteList = () => {
    const list = this.props.list

    

    Alert.alert(
      "Atenção",
      `Deseja deletar a lista ${list.name} ?`,
      [
        {
          text: "Cancelar",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            this.props.deleteList(list);
          },
        },
      ],
      { cancelable: false }
    );
  };


  render() {
    const list = this.props.list;
    const completedCount = list.todos.filter((todo) => todo.completed).length;
    const remainingCount = list.todos.length - completedCount;

    return (
      <View>
        <Modal
          animationType="slide"
          visible={this.state.showListVariable}
          onRequestClose={() => this.toggleListModel()}
        >
          <ToBuyModal
            list={list}
            closeModal={() => this.toggleListModel()}
            updateList={this.props.updateList}
          />
        </Modal>
        <TouchableOpacity
          style={[styles.listContainer, { backgroundColor: list.color }]}
          onPress={() => this.toggleListModel()}
          onLongPress={() => this.deleteList()}
        >
          <Text style={styles.listTitle} numberOfLines={1}>
            {list.name}
          </Text>
          <View>
            <View style={{ alignItems: "center" }}>
              <Text style={styles.count}>{remainingCount}</Text>
              <Text style={styles.subtitle}>Não feito</Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text style={styles.count}>{completedCount}</Text>
              <Text style={styles.subtitle}>Feito</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 32,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginHorizontal: 12,
    alignItems: "center",
    width: 200,
  },
  listTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.white,
    marginBottom: 18,
  },
  count: {
    fontSize: 48,
    fontWeight: "200",
    color: colors.white,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.white,
  },
});
