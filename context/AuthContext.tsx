import { userService } from '@/services/user.service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { router } from 'expo-router';
import { LoginUserInput, RegisterUserInput, User } from '@/types/user';
import { authService } from '@/services/auth.service';

interface AuthContextProps {
    isLoggedIn: boolean;
    isLoadingAuth: boolean;
    login: (data: LoginUserInput) => Promise<void>;
    register: (data: RegisterUserInput) => Promise<void>;
    logout: VoidFunction;
    user: User | null;
}

const AuthContext = React.createContext({} as AuthContextProps);

export function useAuth() {
    return React.useContext(AuthContext);
}

export function AuthenticationProvider({ children }: React.PropsWithChildren) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoadingAuth, setIsLoadingAuth] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        async function checkIfLoggedIn() {
            const token = await AsyncStorage.getItem('token');
            const user = await AsyncStorage.getItem('user');

            if (token && user) {
                setIsLoggedIn(true);
                setUser(JSON.parse(user));
                router.replace('/(authed)/home');
            } else {
                setIsLoggedIn(false);
            }
        }

        checkIfLoggedIn();
    }, []);

    async function login(data: LoginUserInput) {
        try {
            setIsLoadingAuth(true);

            const response = await authService.login(data);

            if (response) {
                setIsLoggedIn(true);
                await AsyncStorage.setItem('token', response.data.token.token);
                await AsyncStorage.setItem('user', JSON.stringify(response.data.partner));
                setUser(response.data.partner);
                router.replace('/(authed)/home');
            }
        } catch (error) {
            console.error(error);
            setIsLoggedIn(false);
        } finally {
            setIsLoadingAuth(false);
        }
    }

    async function register(data: RegisterUserInput) {
        try {
            setIsLoadingAuth(true);

            const response = await authService.register(data);

            if (response) {
                setIsLoggedIn(true);
                await AsyncStorage.setItem('token', response.data.token.token);
                await AsyncStorage.setItem('user', JSON.stringify(response.data.partner));
                setUser(response.data.partner);
                router.replace('/(authed)/home');
            }
        } catch (error) {
            console.error(error);
            setIsLoggedIn(false);
        } finally {
            setIsLoadingAuth(false);
        }
    }

    async function logout() {
        setIsLoggedIn(false);
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('user');
    }

    return (
        <AuthContext.Provider
            value={{
                logout,
                isLoggedIn,
                isLoadingAuth,
                user,
                login,
                register,
            }}>
            {children}
        </AuthContext.Provider>
    );
}