import { login } from "@/api/auth";
import { useAuth } from "@/store/authStore";
import { QueryOptions } from "@tanstack/react-query";


export const LoginMutationOptions = {
    mutationFn: () => login(email, password),
    onSuccess: (data) => {
        console.log('SUccess: ', data);
        if (data.user && data.token) {
            setUser(data.user);
            setToken(data.token);
        }
    },
    onError: () => {
        console.log('Error');
    },
} as QueryOptions
