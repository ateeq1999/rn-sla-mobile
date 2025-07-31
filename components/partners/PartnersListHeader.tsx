import React from 'react';
import { TextInput } from 'react-native';
import { Button, ButtonText } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { Pressable } from '@/components/ui/pressable';
import { Search, Filter, Plus } from 'lucide-react-native';

interface PartnersListHeaderProps {
    totalPartners: number;
    onSearchTextChange?: (text: string) => void;
    onFilter?: () => void;
    onAddPartner?: () => void;
    searchQuery?: string;
    isLoading: boolean;
}

export const PartnersListHeader: React.FC<PartnersListHeaderProps> = ({
    totalPartners,
    onSearchTextChange,
    onFilter,
    onAddPartner,
    searchQuery = '',
    isLoading,
}) => {
    return (
        <VStack className="space-y-4 mb-6" space="md">
            {/* Title and Add Button */}
            <HStack className="justify-between items-center" space="md">
                <VStack space="xs">
                    <Heading className="text-2xl text-gray-900">Partners</Heading>
                    <Text className="text-sm text-gray-600">
                        {totalPartners} {totalPartners === 1 ? 'partner' : 'partners'} found
                    </Text>
                </VStack>

                {onAddPartner && (
                    <Button
                        className="bg-blue-500 rounded-xl px-4"
                        size="sm"
                        onPress={onAddPartner}
                        disabled={isLoading}
                    >
                        <HStack className="items-center space-x-2" space="xs">
                            <Plus size={16} className="text-white" />
                            <ButtonText className="text-white font-medium">Add</ButtonText>
                        </HStack>
                    </Button>
                )}
            </HStack>

            {/* Search and Filter */}
            <HStack className="space-x-3" space="sm">
                <HStack className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3 items-center space-x-2">
                    <Search size={18} className="text-gray-500" />
                    <TextInput
                        className="flex-1 text-gray-900 font-medium"
                        placeholder="Search partners..."
                        placeholderTextColor="#9CA3AF"
                        value={searchQuery}
                        onChangeText={onSearchTextChange}
                        editable={!isLoading}
                    />
                </HStack>

                <Pressable
                    className="bg-gray-50 rounded-xl p-3 border border-gray-200"
                    onPress={onFilter}
                    disabled={isLoading}
                >
                    <Filter size={18} className="text-gray-500" />
                </Pressable>
            </HStack>
        </VStack>
    );
};
