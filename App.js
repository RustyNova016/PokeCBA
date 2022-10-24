import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import FightPVE from "./vue/game/FightPVE";
import Victory from "./vue/game/Victory";
import Defeat from "./vue/game/Defeat";
import { useFonts } from "expo-font";

const Stack = createNativeStackNavigator();

export default function App() {
  
  // VARIABLES POLICE
  const [fontsLoaded] = useFonts({
    SHPinscher: require("./assets/fonts/SHPinscher-Regular.otf"),
  });

  return (
    <NavigationContainer>
      {fontsLoaded && ( // On vérifie le chargement de la police avant affichage
        <Stack.Navigator initialRouteName="FightPVE">
          <Stack.Screen
            name="FightPVE"
            component={FightPVE}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Victory"
            component={Victory}
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
      )}
    </NavigationContainer>
  );
}
