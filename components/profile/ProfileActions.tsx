import React from 'react';
import { Button, ButtonText } from '@/components/ui/button';
import { VStack } from '@/components/ui/vstack';

interface ProfileActionsProps {
    onEditProfile?: () => void;
    onShareProfile?: () => void;
    onLogout: () => void;
    isLoading: boolean;
}

export const ProfileActions: React.FC<ProfileActionsProps> = ({
    onEditProfile,
    onShareProfile,
    onLogout,
    isLoading
}) => {
    return (
        <VStack className="space-y-3" space='lg'>
            <Button
                className="bg-blue-500 rounded-2xl"
                size='xl'
                onPress={onEditProfile}
            >
                <ButtonText className="text-white font-semibold">Edit Profile</ButtonText>
            </Button>

            <Button
                className="bg-transparent border-2 border-blue-500 rounded-2xl"
                size='xl'
                onPress={onShareProfile}
            >
                <ButtonText className="text-blue-500 font-semibold">Share Profile</ButtonText>
            </Button>

            <Button
                className="bg-red-600 rounded-2xl"
                size='xl'
                onPress={onLogout}
                isDisabled={isLoading}
            >
                <ButtonText className="text-white font-semibold">Logout</ButtonText>
            </Button>
        </VStack>
    );
};