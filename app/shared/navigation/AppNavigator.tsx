import { createNativeStackNavigator } from "@react-navigation/native-stack"
import LoginScreen from "../screens/Login"
import RegisterScreen from "../screens/Register"

export type TabParamList = {
    Login: any
    Register:any
}
const Stack = createNativeStackNavigator<TabParamList>()
export default function AppNavigator() {
    return (
        <Stack.Navigator initialRouteName="Register" screenOptions={{
            headerTitleStyle: { fontWeight: 'bold' },
        }}>
            <Stack.Screen
                name="Register"
                component={RegisterScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}