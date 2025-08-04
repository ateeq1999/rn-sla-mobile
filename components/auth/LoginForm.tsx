import React from "react";
import { Toast, ToastTitle, useToast } from "@/components/ui/toast";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { LinkText } from "@/components/ui/link";
import Link from "@unitools/link";
import {
    FormControl,
    FormControlError,
    FormControlErrorIcon,
    FormControlErrorText,
    FormControlLabel,
    FormControlLabelText,
} from "@/components/ui/form-control";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import {
    Checkbox,
    CheckboxIcon,
    CheckboxIndicator,
    CheckboxLabel,
} from "@/components/ui/checkbox";
import {
    ArrowLeftIcon,
    CheckIcon,
    EyeIcon,
    EyeOffIcon,
    Icon,
} from "@/components/ui/icon";
import { Button, ButtonText, ButtonIcon } from "@/components/ui/button";
import { Keyboard, KeyboardAvoidingView, Linking, Platform, ScrollView, TouchableWithoutFeedback } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertTriangle } from "lucide-react-native";
import { GoogleIcon } from "@/assets/auth/google";
import { Pressable } from "@/components/ui/pressable";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuthStore } from "@/store/authStore";
import { authService } from "@/services/auth.service";
import { router } from "expo-router";

const loginSchema = z.object({
    email: z.string().min(1, "Email is required").email(),
    password: z.string().min(1, "Password is required"),
    rememberme: z.boolean().optional(),
});

type LoginSchemaType = z.infer<typeof loginSchema>;

export default function LoginForm() {
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<LoginSchemaType>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: 'partner@partner.com',
            password: 'password'
        }
    });

    const { setToken, setUser } = useAuthStore()
    const [isLoading, setLoading] = React.useState(false)

    const toast = useToast();

    const onSubmit = async (data: LoginSchemaType) => {
        try {
            setLoading(true)

            const res = await authService.login({ email: data.email, password: data.password })
            console.log("auth res: ", res)

            if (res.data !== undefined) {
                console.log("auth success: ", res.data)
                await AsyncStorage.setItem('token', res.data.token.token);
                await AsyncStorage.setItem('user', JSON.stringify(res.data.user));

                // set auth state store
                setToken(res.data.token)
                setUser(res.data.user)

                // redirect to home screen
                router.push('(authed)/home')

                setLoading(false)

                // show toast
                toast.show({
                    placement: "bottom right",
                    render: ({ id }) => {
                        return (
                            <Toast nativeID={id} variant="solid" action="success">
                                <ToastTitle>Logged in successfully!</ToastTitle>
                            </Toast>
                        );
                    },
                });
            }
        } catch (error) {
            // show toast
            console.log(error)

            setLoading(false)

            toast.show({
                placement: "bottom right",
                render: ({ id }) => {
                    return (
                        <Toast nativeID={id} variant="solid" action="error">
                            <ToastTitle>{JSON.stringify(error)}</ToastTitle>
                        </Toast>
                    );
                },
            });
        } finally {
            setLoading(false)

            reset()
        }
    };

    const [showPassword, setShowPassword] = React.useState(false);

    const handleState = () => {
        setShowPassword((showState) => {
            return !showState;
        });
    };

    const handleKeyPress = () => {
        Keyboard.dismiss();
        handleSubmit(onSubmit)();
    };

    const signupWithGoogle = async () => {
        console.log('started google auth ')
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{
                flex: 1
            }}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView>
                    <VStack className="max-w-[440px] w-full p-4" space="xl">
                        <VStack className="md:items-center" space="xl">
                            <Pressable
                                onPress={() => {
                                    router.back();
                                }}
                            >
                                <Icon
                                    as={ArrowLeftIcon}
                                    className="md:hidden text-background-800"
                                    size="xl"
                                />
                            </Pressable>
                            <VStack>
                                <Heading className="md:text-center" size="4xl">
                                    Log in
                                </Heading>
                                <Text>Login to start using SLA APP</Text>
                            </VStack>
                        </VStack>
                        <VStack className="w-full">
                            <VStack space="2xl" className="w-full">
                                <FormControl
                                    isInvalid={!!errors?.email}
                                    className="w-full"
                                    size="lg"
                                >
                                    <FormControlLabel>
                                        <FormControlLabelText>Email</FormControlLabelText>
                                    </FormControlLabel>
                                    <Controller
                                        defaultValue=""
                                        name="email"
                                        control={control}
                                        rules={{
                                            validate: async (value) => {
                                                try {
                                                    await loginSchema.parseAsync({ email: value });
                                                    return true;
                                                } catch (error: any) {
                                                    return error.message;
                                                }
                                            },
                                        }}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <Input size="xl">
                                                <InputField
                                                    placeholder="Enter email"
                                                    value={value}
                                                    onChangeText={onChange}
                                                    onBlur={onBlur}
                                                    onSubmitEditing={handleKeyPress}
                                                    returnKeyType="done"
                                                />
                                            </Input>
                                        )}
                                    />
                                    <FormControlError>
                                        <FormControlErrorIcon as={AlertTriangle} />
                                        <FormControlErrorText>
                                            {errors?.email?.message}
                                        </FormControlErrorText>
                                    </FormControlError>
                                </FormControl>
                                {/* Label Message */}
                                <FormControl
                                    isInvalid={!!errors.password}
                                    className="w-full"
                                    size="lg"
                                >
                                    <FormControlLabel>
                                        <FormControlLabelText>Password</FormControlLabelText>
                                    </FormControlLabel>
                                    <Controller
                                        defaultValue=""
                                        name="password"
                                        control={control}
                                        rules={{
                                            validate: async (value) => {
                                                try {
                                                    await loginSchema.parseAsync({ password: value });
                                                    return true;
                                                } catch (error: any) {
                                                    return error.message;
                                                }
                                            },
                                        }}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <Input size="xl">
                                                <InputField
                                                    type={showPassword ? "text" : "password"}
                                                    placeholder="Enter password"
                                                    value={value}
                                                    onChangeText={onChange}
                                                    onBlur={onBlur}
                                                    onSubmitEditing={handleKeyPress}
                                                    returnKeyType="done"
                                                />
                                                <InputSlot onPress={handleState} className="pr-3">
                                                    <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
                                                </InputSlot>
                                            </Input>
                                        )}
                                    />
                                    <FormControlError>
                                        <FormControlErrorIcon as={AlertTriangle} />
                                        <FormControlErrorText>
                                            {errors?.password?.message}
                                        </FormControlErrorText>
                                    </FormControlError>
                                </FormControl>
                                <HStack className="w-full justify-between ">
                                    <Controller
                                        name="rememberme"
                                        defaultValue={false}
                                        control={control}
                                        render={({ field: { onChange, value } }) => (
                                            <Checkbox
                                                size="sm"
                                                value="Remember me"
                                                isChecked={value}
                                                onChange={onChange}
                                                aria-label="Remember me"
                                            >
                                                <CheckboxIndicator>
                                                    <CheckboxIcon as={CheckIcon} />
                                                </CheckboxIndicator>
                                                <CheckboxLabel>Remember me</CheckboxLabel>
                                            </Checkbox>
                                        )}
                                    />
                                    <Link href="/auth/forgot-password">
                                        <LinkText className="font-medium text-sm text-primary-700 group-hover/link:text-primary-600">
                                            Forgot Password?
                                        </LinkText>
                                    </Link>
                                </HStack>
                            </VStack>
                            <VStack className="w-full my-7 " space="lg">
                                <Button className="w-full" size="xl" onPress={handleSubmit(onSubmit)} isDisabled={isLoading}>
                                    <ButtonText className="font-medium">Log in</ButtonText>
                                </Button>
                                <Button
                                    variant="outline"
                                    action="secondary"
                                    className="w-full gap-1"
                                    onPress={signupWithGoogle}
                                    size="xl"
                                >
                                    <ButtonText className="font-medium">
                                        Continue with Google
                                    </ButtonText>
                                    <ButtonIcon as={GoogleIcon} />
                                </Button>
                            </VStack>
                            <HStack className="self-center" space="sm">
                                <Text size="md">Don't have an account?</Text>
                                <Link href="/auth/signup">
                                    <LinkText
                                        className="font-medium text-primary-700 group-hover/link:text-primary-600  group-hover/pressed:text-primary-700"
                                        size="md"
                                    >
                                        Sign up
                                    </LinkText>
                                </Link>
                            </HStack>
                        </VStack>
                    </VStack>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};
