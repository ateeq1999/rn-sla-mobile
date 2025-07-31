import React from 'react';
import { Avatar, AvatarFallbackText } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { Badge, BadgeText } from '@/components/ui/badge';
import { Pressable } from '@/components/ui/pressable';
import { MapPin, Mail, Tag, Percent, Clock } from 'lucide-react-native';
import { Partner } from '@/types';

interface PartnerCardProps {
    partner: Partner;
    onPress?: (partner: Partner) => void;
    getInitials: (name: string) => string;
    formatDate: (dateString: string) => string;
}

export const PartnerCard: React.FC<PartnerCardProps> = ({
    partner,
    onPress,
    getInitials,
    formatDate
}) => {
    const handlePress = () => {
        onPress?.(partner);
    };

    const getTypeColor = (type: string | null) => {
        switch (type?.toLowerCase()) {
            case 'hotel':
                return 'bg-blue-100 text-blue-800';
            case 'restaurant':
                return 'bg-green-100 text-green-800';
            case 'retail':
                return 'bg-purple-100 text-purple-800';
            case 'service':
                return 'bg-orange-100 text-orange-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <Pressable onPress={handlePress}>
            <Card className="p-4 mb-3 bg-white rounded-2xl shadow-sm border border-gray-100">
                <VStack className="space-y-4" space='md'>
                    {/* Header with Avatar and Basic Info */}
                    <HStack className="items-center space-x-4" space='md'>
                        <Avatar className="w-12 h-12 bg-blue-500">
                            <AvatarFallbackText className="text-white text-sm font-bold">
                                {getInitials(partner.name)}
                            </AvatarFallbackText>
                        </Avatar>

                        <VStack className="flex-1" space='xs'>
                            <Heading className="text-lg text-gray-900" numberOfLines={1}>
                                {partner.name}
                            </Heading>
                            <HStack className="items-center space-x-2" space='sm'>
                                <Mail size={14} className="text-gray-500" />
                                <Text className="text-sm text-gray-600" numberOfLines={1}>
                                    {partner.email}
                                </Text>
                            </HStack>
                        </VStack>

                        {/* Discount Badge */}
                        {partner.discount && (
                            <Badge className="bg-green-100 px-2 py-1 rounded-full">
                                <BadgeText className="text-green-800 text-xs font-semibold">
                                    {partner.discount}% OFF
                                </BadgeText>
                            </Badge>
                        )}
                    </HStack>

                    {/* Details Row */}
                    <VStack className="space-y-2" space='md'>
                        {/* Location and Type */}
                        <HStack className="justify-between items-center" space='md'>
                            <HStack className="items-center space-x-2 flex-1" space='md'>
                                <MapPin size={14} className="text-gray-500" />
                                <Text className="text-sm text-gray-600" numberOfLines={1}>
                                    {partner.location || 'Location not specified'}
                                </Text>
                            </HStack>

                            {partner.type && (
                                <Badge className={`px-2 py-1 rounded-full ${getTypeColor(partner.type)}`}>
                                    <BadgeText className="text-xs font-medium capitalize">
                                        {partner.type}
                                    </BadgeText>
                                </Badge>
                            )}
                        </HStack>

                        {/* Description */}
                        {partner.description && (
                            <Text className="text-sm text-gray-700" numberOfLines={2}>
                                {partner.description}
                            </Text>
                        )}

                        {/* Created Date */}
                        <HStack className="items-center space-x-2" space='sm'>
                            <Clock size={12} className="text-gray-400" />
                            <Text className="text-xs text-gray-500">
                                Joined {formatDate(partner.createdAt)}
                            </Text>
                        </HStack>
                    </VStack>
                </VStack>
            </Card>
        </Pressable>
    );
};