import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import FightPVE from "./vue/game/FightPVE/FightPVE";
import Victory from "./vue/game/Victory/Victory";
import Connexion from "./vue/login/Connexion";
import ForgotPassword from "./vue/login/ForgotPassword";
import Register from "./vue/login/Register";
import Defeat from "./vue/game/Defeat/Defeat";
import { useFonts } from "expo-font";
import {DarkBlueBackground} from "./vue/game/FightPVE/CSS";

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
            name="Connexion"
            component={Connexion}
            options={{
              headerShown: false,
            }}
          /><Stack.Screen
            name="Register"
            component={Register}
            options={{
              headerShown: false,
            }}
          /><Stack.Screen
            name="ForgotPassword"
            component={ForgotPassword}
            options={{
              headerShown: false,
            }}
          /><Stack.Screen
            name="FightPVE"
            component={FightPVE}
            options={{
              headerShown: false,

              statusBarColor: DarkBlueBackground,

              navigationBarHidden: false,
              navigationBarColor: DarkBlueBackground
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
