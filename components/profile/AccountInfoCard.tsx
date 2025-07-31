import React from 'react';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { VStack } from '@/components/ui/vstack';
import { Divider } from '@/components/ui/divider';
import { Calendar } from 'lucide-react-native';
import { ProfileDetailItem } from './ProfileDetailItem';

interface AccountInfoCardProps {
    createdAt: string;
    updatedAt: string;
    formatDate: (dateString: string) => string;
}

export const AccountInfoCard: React.FC<AccountInfoCardProps> = ({
    createdAt,
    updatedAt,
    formatDate
}) => {
    return (
        <Card className="p-6 mb-4 bg-white rounded-2xl shadow-sm border border-gray-100">
            <VStack className="space-y-6" space='lg'>
                <Heading className="text-xl text-gray-900">Account Information</Heading>
                <Divider className="bg-gray-200" />

                <VStack className="space-y-4" space='lg'>
                    <ProfileDetailItem
                        icon={<Calendar size={18} className="text-green-500" />}
                        label="Created"
                        value={formatDate(createdAt)}
                    />

                    <ProfileDetailItem
                        icon={<Calendar size={18} className="text-yellow-500" />}
                        label="Updated"
                        value={formatDate(updatedAt)}
                    />
                </VStack>
            </VStack>
        </Card>
    );
};