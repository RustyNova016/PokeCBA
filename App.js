import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import FightSystem from "./vue/game/FightSystem";
import Victoire from "./vue/game/Victoire";
import Defeat from "./vue/game/Defeat";
import { useFonts } from "expo-font";

const Stack = createNativeStackNavigator();


export default function App() {


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="FightSystem">
        <Stack.Screen
          name="FightSystem"
          component={FightSystem}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Victoire"
          component={Victoire}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Defeat"
          component={Defeat}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
