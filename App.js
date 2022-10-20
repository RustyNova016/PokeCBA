import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import combatSysteme from "./vue/game/combatSysteme";
import victoire from "./vue/game/victoire";
import defaite from "./vue/game/defaite";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="combatSysteme">
        <Stack.Screen
          name="combatSysteme"
          component={combatSysteme}
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
          name="defaite"
          component={defaite}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
