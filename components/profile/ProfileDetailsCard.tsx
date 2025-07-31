import React from 'react';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { VStack } from '@/components/ui/vstack';
import { Divider } from '@/components/ui/divider';
import { User, MapPin, Tag, Percent } from 'lucide-react-native';
import { ProfileDetailItem } from './ProfileDetailItem';

interface ProfileDetailsCardProps {
    id: string;
    location?: string;
    type?: string;
    discount?: number;
}

export const ProfileDetailsCard: React.FC<ProfileDetailsCardProps> = ({
    id,
    discount,
    location,
    type,
}) => {
    return (
        <Card className="p-6 mb-4 bg-white rounded-2xl shadow-sm border border-gray-100">
            <VStack className="space-y-6" space='lg'>
                <Heading className="text-xl text-gray-900">Profile Details</Heading>
                <Divider className="bg-gray-200" />

                <VStack className="space-y-4" space='md'>
                    <ProfileDetailItem
                        icon={<User size={18} className="text-blue-500" />}
                        label="User ID"
                        value={id}
                    />

                    <ProfileDetailItem
                        icon={<MapPin size={18} className="text-blue-500" />}
                        label="Location"
                        value={location || 'Not specified'}
                        valueStyle="text-sm text-gray-400 flex-1 text-right"
                    />

                    <ProfileDetailItem
                        icon={<Tag size={18} className="text-blue-500" />}
                        label="Type"
                        value={type || 'Not specified'}
                        valueStyle="text-sm text-gray-400 flex-1 text-right"
                    />

                    <ProfileDetailItem
                        icon={<Percent size={18} className="text-blue-500" />}
                        label="Discount"
                        value={discount ? `${discount}%` : 'Not applicable'}
                        valueStyle="text-sm text-gray-400 flex-1 text-right"
                    />
                </VStack>
            </VStack>
        </Card>
    );
};