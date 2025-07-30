import { View, Text, KeyboardAvoidingView, TouchableWithoutFeedback, ScrollView, Keyboard } from 'react-native'
import React from 'react'
import { VStack } from '@/components/ui/vstack'
import { Button, ButtonText } from '@/components/ui/button'
import { router } from 'expo-router'

const Home = () => {
    return (
        <KeyboardAvoidingView style={{ flex: 1 }}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView className='bg-slate-50' style={{ flex: 1 }}>
                    <VStack className='max-w-[440px] w-full h-full p-20' space='lg'>
                        <Text>Home Page</Text>
                        <Button onPress={() => router.push('/(authed)/profile')}>
                            <ButtonText>Profile Page</ButtonText>
                        </Button>
                        <Button onPress={() => router.push('/(authed)/scan')}>
                            <ButtonText>Scan Page</ButtonText>
                        </Button>
                    </VStack>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}
export default Home
