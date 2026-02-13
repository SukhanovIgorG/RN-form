import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Форма</Text>
      </View>
      <TextInput style={styles.input} placeholder="ФИО" />
      <TextInput style={styles.input} placeholder="email" />
      <TextInput style={styles.input} placeholder="телефон" />
      <TextInput style={styles.input} placeholder="пол" />
      <TouchableOpacity style={styles.button}>
        <Text>Отправить</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    marginVertical: 8,
  },
  button: {
    backgroundColor: "#ccc",
    padding: 8,
    borderRadius: 4,
    alignItems: "center",
  },
});
