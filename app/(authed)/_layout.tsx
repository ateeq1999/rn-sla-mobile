import { Redirect, Stack } from 'expo-router';
import { useAuthStore } from '@/store/authStore';

export default function AppLayout() {
    const { token } = useAuthStore();

    if (!token) {
        return <Redirect href="/(auth)/login" />;
    }

    return <Stack screenOptions={{ headerShown: false }} />;
}