import React from 'react';
import { Avatar, AvatarFallbackText } from '@/components/ui/avatar';
import { Box } from '@/components/ui/box';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { HStack } from '@/components/ui/hstack';
import { Pressable } from '@/components/ui/pressable';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { Badge, BadgeText } from '@/components/ui/badge';
import { Edit, Mail } from 'lucide-react-native';

interface ProfileHeaderProps {
    name: string;
    email: string;
    id?: string;
    isEditing: boolean;
    onEditPress: () => void;
    getInitials: (name: string) => string;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
    name,
    email,
    isEditing,
    onEditPress,
    getInitials
}) => {
    return (
        <Card className="p-6 mb-4 bg-white rounded-2xl shadow-sm border border-gray-100">
            <VStack className="space-y-6 items-center" space='md'>
                <HStack className="justify-between w-full items-start">
                    <Box className="flex-1" />
                    <Pressable onPress={onEditPress}>
                        <Edit size={24} className="text-blue-500" />
                    </Pressable>
                </HStack>

                <Avatar className="w-20 h-20 bg-blue-500">
                    <AvatarFallbackText className="text-white text-xl font-bold">
                        {getInitials(name)}
                    </AvatarFallbackText>
                </Avatar>

                <VStack className="space-y-2 items-center">
                    <Heading className="text-2xl text-gray-900 text-center">
                        {name}
                    </Heading>
                    <HStack className="items-center space-x-2" space='md'>
                        <Mail size={16} className="text-gray-500" />
                        <Text className="text-base text-gray-600">
                            {email}
                        </Text>
                    </HStack>
                </VStack>

                {name && (
                    <Badge className="bg-green-100 px-3 py-1 rounded-full">
                        <BadgeText className="text-green-800">{name}</BadgeText>
                    </Badge>
                )}
            </VStack>
        </Card>
    );
};