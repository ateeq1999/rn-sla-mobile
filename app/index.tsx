import React from "react";
import { Button, ButtonText } from "@/components/ui/button";
import { router } from "expo-router";
import { SafeAreaView } from "@/components/ui/safe-area-view";
import { VStack } from "@/components/ui/vstack";

const index = () => {
    return (
        <SafeAreaView className="md:flex flex-col items-center justify-center md:w-full h-full">
            <VStack className="p-2 md:max-w-[440px] w-full" space="xl">
                {/* <Button
                    onPress={() => {
                        router.push("auth/splash-screen");
                    }}
                >
                    <ButtonText>SplashScreen</ButtonText>
                </Button> */}
                <Button
                    className="w-full"
                    onPress={() => {
                        router.push("(auth)/login");
                    }}
                >
                    <ButtonText>Sign in</ButtonText>
                </Button>
                <Button
                    onPress={() => {
                        router.push("(auth)/register");
                    }}
                >
                    <ButtonText>Sign up</ButtonText>
                </Button>
                <Button
                    onPress={() => {
                        router.push("/(authed)/home");
                    }}
                >
                    <ButtonText>Home</ButtonText>
                </Button>
            </VStack>
        </SafeAreaView>
    );
};

export default index;
