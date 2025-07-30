import { Avatar, AvatarFallbackText } from '@/components/ui/avatar';
import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Center } from '@/components/ui/center';
import { Divider } from '@/components/ui/divider';
import { Heading } from '@/components/ui/heading';
import { HStack } from '@/components/ui/hstack';
import { Icon } from '@/components/ui/icon';
import { Pressable } from '@/components/ui/pressable';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { Badge, BadgeText } from '@/components/ui/badge';
import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import {
    Edit,
    Mail,
    User,
    MapPin,
    Tag,
    Percent,
    AlertCircle,
    Calendar
} from 'lucide-react-native';
import { useAuthStore } from '@/store/authStore';
import { useAuth } from '@/context/AuthContext';
import { router } from 'expo-router';
import { authService } from '@/services/auth.service';

const ProfilePage = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setLoading] = useState(false)
    const { user } = useAuthStore()
    const { logout } = useAuth()

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getInitials = (name: string) => {
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    };

    const onLogout = async () => {
        try {
            setLoading(true)

            const res = await authService.partnerLogout()

            if (res.code === 1001) {
                logout()

                router.push('/(auth)/login')

                setLoading(false)
            }
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    return (
        <ScrollView className='flex-1 bg-slate-50'>
            {user && (
                <Box className='flex-1 p-6'>
                    {/* Header Section */}
                    <Card className="p-6 mb-4 bg-white rounded-2xl shadow-sm border border-gray-100">
                        <VStack className="space-y-6 items-center" space='md'>
                            <HStack className="justify-between w-full items-start">
                                <Box className="flex-1" />
                                <Pressable onPress={() => setIsEditing(!isEditing)}>
                                    <Edit size={24} className="text-blue-500" />
                                </Pressable>
                            </HStack>

                            <Avatar className="w-20 h-20 bg-blue-500">
                                <AvatarFallbackText className="text-white text-xl font-bold">
                                    {getInitials(user.name)}
                                </AvatarFallbackText>
                            </Avatar>

                            <VStack className="space-y-2 items-center">
                                <Heading className="text-2xl text-gray-900 text-center">
                                    {user.name}
                                </Heading>
                                <HStack className="items-center space-x-2" space='md'>
                                    <Mail size={16} className="text-gray-500" />
                                    <Text className="text-base text-gray-600">
                                        {user.email}
                                    </Text>
                                </HStack>
                            </VStack>

                            {user.name && (
                                <Badge className="bg-green-100 px-3 py-1 rounded-full">
                                    <BadgeText className="text-green-800">{user.name}</BadgeText>
                                </Badge>
                            )}
                        </VStack>
                    </Card>

                    {/* Profile Details */}
                    <Card className="p-6 mb-4 bg-white rounded-2xl shadow-sm border border-gray-100">
                        <VStack className="space-y-6" space='lg'>
                            <Heading className="text-xl text-gray-900">Profile Details</Heading>
                            <Divider className="bg-gray-200" />

                            <VStack className="space-y-4" space='md'>
                                {/* ID */}
                                <HStack className="justify-between items-center" space='md'>
                                    <HStack className="space-x-3 items-center flex-1" space='sm'>
                                        <User size={18} className="text-blue-500" />
                                        <Text className="text-sm text-gray-600 font-medium">User ID</Text>
                                    </HStack>
                                    <Text className="text-sm text-gray-900 flex-1 text-right" numberOfLines={1}>
                                        {user.id}
                                    </Text>
                                </HStack>

                                {/* Location */}
                                <HStack className="justify-between items-center">
                                    <HStack className="space-x-3 items-center flex-1" space='sm'>
                                        <MapPin size={18} className="text-blue-500" />
                                        <Text className="text-sm text-gray-600 font-medium">Location</Text>
                                    </HStack>
                                    <Text className="text-sm text-gray-400 flex-1 text-right">
                                        {user?.location || 'Not specified'}
                                    </Text>
                                </HStack>

                                {/* Type */}
                                <HStack className="justify-between items-center">
                                    <HStack className="space-x-3 items-center flex-1" space='sm'>
                                        <Tag size={18} className="text-blue-500" />
                                        <Text className="text-sm text-gray-600 font-medium">Type</Text>
                                    </HStack>
                                    <Text className="text-sm text-gray-400 flex-1 text-right">
                                        {user.type || 'Not specified'}
                                    </Text>
                                </HStack>

                                {/* Discount */}
                                <HStack className="justify-between items-center" space='lg'>
                                    <HStack className="space-x-3 items-center flex-1" space='sm'>
                                        <Percent size={18} className="text-blue-500" />
                                        <Text className="text-sm text-gray-600 font-medium">Discount</Text>
                                    </HStack>
                                    <Text className="text-sm text-gray-400 flex-1 text-right">
                                        {user.discount ? `${user.discount}%` : 'Not applicable'}
                                    </Text>
                                </HStack>
                            </VStack>
                        </VStack>
                    </Card>

                    {/* Description */}
                    {user.description ? (
                        <Card className="p-6 mb-4 bg-white rounded-2xl shadow-sm border border-gray-100">
                            <VStack className="space-y-4" space='lg'>
                                <Heading className="text-xl text-gray-900">About</Heading>
                                <Divider className="bg-gray-200" />
                                <Text className="text-base text-gray-700 leading-6">
                                    {user.description}
                                </Text>
                            </VStack>
                        </Card>
                    ) : (
                        <Card className="p-6 mb-4 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                            <Center>
                                <VStack className="space-y-3 items-center" space='lg'>
                                    <AlertCircle size={32} className="text-gray-400" />
                                    <Text className="text-sm text-gray-500 text-center">
                                        No description available. Add one to tell others about yourself.
                                    </Text>
                                </VStack>
                            </Center>
                        </Card>
                    )}

                    {/* Account Information */}
                    <Card className="p-6 mb-4 bg-white rounded-2xl shadow-sm border border-gray-100">
                        <VStack className="space-y-6" space='lg'>
                            <Heading className="text-xl text-gray-900">Account Information</Heading>
                            <Divider className="bg-gray-200" />

                            <VStack className="space-y-4" space='lg'>
                                <HStack className="justify-between items-start" space='md'>
                                    <HStack className="space-x-3 items-center flex-1" space='sm'>
                                        <Calendar size={18} className="text-green-500" />
                                        <Text className="text-sm text-gray-600 font-medium">Created</Text>
                                    </HStack>
                                    <Text className="text-sm text-gray-900 flex-1 text-right">
                                        {formatDate(user.createdAt)}
                                    </Text>
                                </HStack>

                                <HStack className="justify-between items-start" space='md'>
                                    <HStack className="space-x-3 items-center flex-1" space='sm'>
                                        <Calendar size={18} className="text-yellow-500" />
                                        <Text className="text-sm text-gray-600 font-medium">Updated</Text>
                                    </HStack>
                                    <Text className="text-sm text-gray-900 flex-1 text-right">
                                        {formatDate(user.updatedAt)}
                                    </Text>
                                </HStack>
                            </VStack>
                        </VStack>
                    </Card>

                    {/* Action Buttons */}
                    <VStack className="space-y-3" space='lg'>
                        <Button className="bg-blue-500 rounded-2xl" size='xl'>
                            <ButtonText className="text-white font-semibold">Edit Profile</ButtonText>
                        </Button>

                        <Button className="bg-transparent border-2 border-blue-500 rounded-2xl" size='xl'>
                            <ButtonText className="text-blue-500 font-semibold">Share Profile</ButtonText>
                        </Button>

                        <Button className="bg-red-600 rounded-2xl" size='xl' onPress={onLogout} isDisabled={isLoading}>
                            <ButtonText className="text-white font-semibold">Logout</ButtonText>
                        </Button>
                    </VStack>

                    {/* Bottom Padding */}
                    <Box className="h-8" />
                </Box>
            )}
        </ScrollView>
    );
};

export default ProfilePage;