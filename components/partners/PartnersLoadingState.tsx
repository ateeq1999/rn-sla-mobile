import React from 'react';
import { VStack } from '@/components/ui/vstack';
import { Card } from '@/components/ui/card';
import { HStack } from '@/components/ui/hstack';
import { Box } from '@/components/ui/box';

export const PartnersLoadingState: React.FC = () => {
    return (
        <VStack className="space-y-3" space='sm'>
            {[1, 2, 3, 4, 5].map((item) => (
                <Card key={item} className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
                    <VStack className="space-y-4" space='md'>
                        <HStack className="items-center space-x-4" space='md'>
                            {/* Avatar skeleton */}
                            <Box className="w-12 h-12 bg-gray-200 rounded-full" />

                            <VStack className="flex-1 space-y-2" space='xs'>
                                {/* Name skeleton */}
                                <Box className="h-4 bg-gray-200 rounded w-3/4" />
                                {/* Email skeleton */}
                                <Box className="h-3 bg-gray-200 rounded w-1/2" />
                            </VStack>

                            {/* Badge skeleton */}
                            <Box className="h-6 w-16 bg-gray-200 rounded-full" />
                        </HStack>

                        {/* Description skeleton */}
                        <VStack className="space-y-2" space='xs'>
                            <Box className="h-3 bg-gray-200 rounded w-full" />
                            <Box className="h-3 bg-gray-200 rounded w-2/3" />
                        </VStack>
                    </VStack>
                </Card>
            ))}
        </VStack>
    );
};
