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
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Форма</Text>
        <TextInput style={styles.input} placeholder="ФИО" />
        <TextInput style={styles.input} placeholder="email" />
        <TextInput style={styles.input} placeholder="телефон" />
        <TextInput style={styles.input} placeholder="пол" />
      </View>
      <TouchableOpacity style={styles.button}>
        <Text>Отправить</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "space-between",
    height: "100%",
  },
  formContainer: {
    flex: 1,
    gap: 8,
    alignItems: "center",
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
    width: "100%",
  },
  button: {
    backgroundColor: "#ccc",
    padding: 8,
    borderRadius: 4,
    alignItems: "center",
    width: "100%",
  },
});
