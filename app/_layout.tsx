import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';
import CustomHeader from "../components/custom-header";
import {BottomSheetModalProvider} from "@gorhom/bottom-sheet";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'index',
};


export default function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
      <BottomSheetModalProvider>
          <Stack>
            <Stack.Screen name="index" options={{
                header: () => <CustomHeader />
            }} />
          </Stack>
      </BottomSheetModalProvider>
  );
}
