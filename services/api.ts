import { Platform } from "react-native";
import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// const url = Platform.OS === "android" ? "http://192.168.10.41:3333" : "http://127.0.0.1:3333"
// const url = process.env.EXPO_PUBLIC_API_URL
const url = 'https://clean-hotels-allow.loca.lt'

const Api: AxiosInstance = axios.create({ baseURL: url + "/api" });

Api.interceptors.request.use(async config => {
    const token = await AsyncStorage.getItem("token");

    if (token) config.headers.set("Authorization", `Bearer ${token}`);

    return config;
});

Api.interceptors.response.use(
    async (res: AxiosResponse) => res.data,
    async (err: AxiosError) => Promise.reject(err)
);

export { Api };