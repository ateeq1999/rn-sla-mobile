import React from 'react';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';

interface ProfileDetailItemProps {
    icon: React.ReactNode;
    label: string;
    value: string;
    valueStyle?: string;
}

export const ProfileDetailItem: React.FC<ProfileDetailItemProps> = ({
    icon,
    label,
    value,
    valueStyle = "text-sm text-gray-900 flex-1 text-right"
}) => {
    return (
        <HStack className="justify-between items-center" space='md'>
            <HStack className="space-x-3 items-center flex-1" space='sm'>
                {icon}
                <Text className="text-sm text-gray-600 font-medium">{label}</Text>
            </HStack>
            <Text className={valueStyle} numberOfLines={1}>
                {value}
            </Text>
        </HStack>
    );
};