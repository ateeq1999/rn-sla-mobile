import React from 'react';
import { Card } from '@/components/ui/card';
import { Center } from '@/components/ui/center';
import { VStack } from '@/components/ui/vstack';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Button, ButtonText } from '@/components/ui/button';
import { Users, Plus } from 'lucide-react-native';
import { HStack } from '../ui/hstack';

interface PartnersEmptyStateProps {
    onAddPartner?: () => void;
    isSearching?: boolean;
    searchQuery?: string;
}

export const PartnersEmptyState: React.FC<PartnersEmptyStateProps> = ({
    onAddPartner,
    isSearching = false,
    searchQuery
}) => {
    return (
        <Card className="p-8 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
            <Center>
                <VStack className="space-y-4 items-center max-w-sm" space='md'>
                    <Users size={48} className="text-gray-400" />

                    <VStack className="space-y-2 items-center" space='xs'>
                        <Heading className="text-xl text-gray-900 text-center">
                            {isSearching ? 'No partners found' : 'No partners yet'}
                        </Heading>
                        <Text className="text-gray-600 text-center">
                            {isSearching
                                ? `No partners match "${searchQuery}". Try adjusting your search.`
                                : 'Start building your partner network by adding your first partner.'
                            }
                        </Text>
                    </VStack>

                    {onAddPartner && !isSearching && (
                        <Button
                            className="bg-blue-500 rounded-xl mt-2"
                            onPress={onAddPartner}
                        >
                            <HStack className="items-center space-x-2" space='xs'>
                                <Plus size={16} className="text-white" />
                                <ButtonText className="text-white font-medium">
                                    Add First Partner
                                </ButtonText>
                            </HStack>
                        </Button>
                    )}
                </VStack>
            </Center>
        </Card>
    );
};