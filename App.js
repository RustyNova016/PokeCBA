import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import fightSystem from "./vue/game/fightSystem";
import victoire from "./vue/game/victoire";
import defeat from "./vue/game/defeat";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="fightSystem">
        <Stack.Screen
          name="fightSystem"
          component={fightSystem}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="victoire"
          component={victoire}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="defeat"
          component={defeat}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
