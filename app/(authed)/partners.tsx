import React, { useState, useMemo } from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import { Box } from '@/components/ui/box';
import { router } from 'expo-router';
import { useDebounce } from '@/hooks/useDebounce'; // You'll need to create this hook

// Import components
import { PartnersListHeader } from '@/components/partners/PartnersListHeader';
import { PartnerCard } from '@/components/partners/PartnerCard';
import { PaginationControls } from '@/components/partners/PaginationControls';
import { PartnersEmptyState } from '@/components/partners/PartnersEmptyState';
import { PartnersLoadingState } from '@/components/partners/PartnersLoadingState';
import { PartnersErrorState } from '@/components/partners/PartnersErrorState';

// Import hooks
import { usePartners } from '@/hooks/partners/usePartners';

// Import types
import { Partner } from '@/types';

const PartnersListPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [perPage] = useState(10);

    // Debounce search query to avoid too many API calls
    const debouncedSearchQuery = useDebounce(searchQuery, 500);

    // Fetch partners using TanStack Query
    const {
        data: partnersData,
        isLoading,
        isFetching,
        isError,
        error,
        refetch,
        isRefetching
    } = usePartners(currentPage, perPage, debouncedSearchQuery);

    // Extract partners and meta from the response
    const partners = partnersData?.data || [];
    const meta = partnersData?.meta;

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getInitials = (name: string) => {
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    };

    const handleRefresh = () => {
        refetch();
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        // No need to manually fetch - React Query will handle it automatically
    };

    const handlePartnerPress = (partner: Partner) => {
        router.push(`/partners/${partner.id}`);
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        setCurrentPage(1); // Reset to first page when searching
    };

    const handleFilter = () => {
        console.log('Filter pressed');
    };

    const handleAddPartner = () => {
        router.push('/partners/create');
    };

    const handleRetry = () => {
        refetch();
    };

    // Show error state
    if (isError) {
        return (
            <ScrollView className="flex-1 bg-slate-50">
                <Box className="flex-1 p-6">
                    <PartnersListHeader
                        totalPartners={0}
                        onFilter={handleFilter}
                        onAddPartner={handleAddPartner}
                        searchQuery={searchQuery}
                        isLoading={isFetching}
                    />
                    <PartnersErrorState
                        error={error as Error}
                        onRetry={handleRetry}
                        isRetrying={isRefetching}
                    />
                </Box>
            </ScrollView>
        );
    }

    const renderContent = () => {
        // Show loading state on initial load
        if (isLoading) {
            return <PartnersLoadingState />;
        }

        // Show empty state
        if (partners.length === 0) {
            return (
                <PartnersEmptyState
                    onAddPartner={handleAddPartner}
                    isSearching={!!debouncedSearchQuery}
                    searchQuery={debouncedSearchQuery}
                />
            );
        }

        // Show partners list
        return (
            <>
                {partners.map((partner) => (
                    <PartnerCard
                        key={partner.id}
                        partner={partner}
                        onPress={handlePartnerPress}
                        getInitials={getInitials}
                        formatDate={formatDate}
                    />
                ))}

                {meta && (
                    <PaginationControls
                        meta={meta}
                        onPageChange={handlePageChange}
                        isLoading={isFetching}
                    />
                )}
            </>
        );
    };

    return (
        <ScrollView
            className="flex-1 bg-slate-50"
            refreshControl={
                <RefreshControl
                    refreshing={isRefetching}
                    onRefresh={handleRefresh}
                    tintColor="#3B82F6" // Blue color for iOS
                    colors={['#3B82F6']} // Blue color for Android
                />
            }
        >
            <Box className="flex-1 p-6">
                <PartnersListHeader
                    totalPartners={meta?.total || 0}
                    onFilter={handleFilter}
                    onAddPartner={handleAddPartner}
                    searchQuery={searchQuery}
                    isLoading={isFetching}
                />

                {renderContent()}

                {/* Bottom Padding */}
                <Box className="h-8" />
            </Box>
        </ScrollView>
    );
};

export default PartnersListPage;
