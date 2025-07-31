import React from 'react';
import { Button, ButtonText } from '@/components/ui/button';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import { PaginationMeta } from '@/types';

interface PaginationControlsProps {
    meta: PaginationMeta;
    onPageChange: (page: number) => void;
    isLoading?: boolean;
}

export const PaginationControls: React.FC<PaginationControlsProps> = ({
    meta,
    onPageChange,
    isLoading = false
}) => {
    const { currentPage, lastPage, total, perPage } = meta;

    const startItem = (currentPage - 1) * perPage + 1;
    const endItem = Math.min(currentPage * perPage, total);

    if (lastPage <= 1) {
        return null; // Don't show pagination if there's only one page
    }

    return (
        <HStack className="justify-between items-center mt-6 px-2" space='md'>
            <Text className="text-sm text-gray-600">
                Showing {startItem}-{endItem} of {total}
            </Text>

            <HStack className="space-x-2" space='xs'>
                <Button
                    className="bg-gray-100 rounded-lg px-3"
                    size='sm'
                    onPress={() => onPageChange(currentPage - 1)}
                    isDisabled={currentPage <= 1 || isLoading}
                >
                    <HStack className="items-center space-x-1" space='xs'>
                        <ChevronLeft size={16} className="text-gray-600" />
                        <ButtonText className="text-gray-600 text-sm">Prev</ButtonText>
                    </HStack>
                </Button>

                <Text className="text-sm text-gray-600 px-3 py-2">
                    {currentPage} of {lastPage}
                </Text>

                <Button
                    className="bg-gray-100 rounded-lg px-3"
                    size='sm'
                    onPress={() => onPageChange(currentPage + 1)}
                    isDisabled={currentPage >= lastPage || isLoading}
                >
                    <HStack className="items-center space-x-1" space='xs'>
                        <ButtonText className="text-gray-600 text-sm">Next</ButtonText>
                        <ChevronRight size={16} className="text-gray-600" />
                    </HStack>
                </Button>
            </HStack>
        </HStack>
    );
};