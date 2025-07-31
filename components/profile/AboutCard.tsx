import React from 'react';
import { Card } from '@/components/ui/card';
import { Center } from '@/components/ui/center';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { Divider } from '@/components/ui/divider';
import { AlertCircle } from 'lucide-react-native';

interface AboutCardProps {
    description?: string | null;
}

export const AboutCard: React.FC<AboutCardProps> = ({ description }) => {
    if (description) {
        return (
            <Card className="p-6 mb-4 bg-white rounded-2xl shadow-sm border border-gray-100">
                <VStack className="space-y-4" space='lg'>
                    <Heading className="text-xl text-gray-900">About</Heading>
                    <Divider className="bg-gray-200" />
                    <Text className="text-base text-gray-700 leading-6">
                        {description}
                    </Text>
                </VStack>
            </Card>
        );
    }

    return (
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
    );
};