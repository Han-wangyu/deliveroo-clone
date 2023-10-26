import {Stack, useNavigation} from 'expo-router';
import {TouchableOpacity, useColorScheme} from 'react-native';
import CustomHeader from "../components/custom-header";
import {BottomSheetModalProvider} from "@gorhom/bottom-sheet";
import filter from "./(modal)/filter";
import {Ionicons} from "@expo/vector-icons";
import Colors from "../constants/Colors";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'index',
};


export default function RootLayoutNav() {
    const navigation = useNavigation();

  return (
      <BottomSheetModalProvider>
          <Stack>
            <Stack.Screen name="index" options={{
                header: () => <CustomHeader />
            }} />
              <Stack.Screen name={"(modal)/filter"} options={{
                  presentation: "modal",
                  headerTitle: 'Filter',
                  headerShadowVisible: false,
                  headerLeft: () => (
                      <TouchableOpacity onPress={() => { navigation.goBack() }}>
                            <Ionicons name={'close-outline'} size={28} color={Colors.primary} />
                      </TouchableOpacity>
                  )
              }}  />
          </Stack>
      </BottomSheetModalProvider>
  );
}
