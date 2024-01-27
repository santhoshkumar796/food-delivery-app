import { Stack } from "expo-router";

export default function Layout(){
  return(
    <Stack screenOptions={{headershown:false}} >
      <Stack.Screen name="index"/>
    </Stack>
  )
}