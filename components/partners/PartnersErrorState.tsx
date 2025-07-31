import React from 'react';
import { Card } from '@/components/ui/card';
import { Center } from '@/components/ui/center';
import { VStack } from '@/components/ui/vstack';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Button, ButtonText } from '@/components/ui/button';
import { AlertTriangle, RefreshCw } from 'lucide-react-native';
import { HStack } from '../ui/hstack';

interface PartnersErrorStateProps {
    error: Error;
    onRetry: () => void;
    isRetrying?: boolean;
}

export const PartnersErrorState: React.FC<PartnersErrorStateProps> = ({
    error,
    onRetry,
    isRetrying = false
}) => {
    return (
        <Card className="p-8 bg-red-50 rounded-2xl border border-red-200">
            <Center>
                <VStack className="space-y-4 items-center max-w-sm" space='md'>
                    <AlertTriangle size={48} className="text-red-500" />

                    <VStack className="space-y-2 items-center" space='xs'>
                        <Heading className="text-xl text-red-900 text-center">
                            Something went wrong
                        </Heading>
                        <Text className="text-red-700 text-center">
                            {error.message || 'Failed to load partners'}
                        </Text>
                    </VStack>

                    <Button
                        className="bg-red-500 rounded-xl mt-2"
                        onPress={onRetry}
                        isDisabled={isRetrying}
                    >
                        <HStack className="items-center space-x-2" space='xs'>
                            <RefreshCw size={16} className="text-white" />
                            <ButtonText className="text-white font-medium">
                                {isRetrying ? 'Retrying...' : 'Try Again'}
                            </ButtonText>
                        </HStack>
                    </Button>
                </VStack>
            </Center>
        </Card>
    );
};
