import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { partnerService } from '@/services/partner.service';
import { Partner } from '@/types';

// Query Keys
export const partnersKeys = {
    all: ['partners'] as const,
    lists: () => [...partnersKeys.all, 'list'] as const,
    list: (page: number, perPage: number, search?: string) =>
        [...partnersKeys.lists(), { page, perPage, search }] as const,
    details: () => [...partnersKeys.all, 'detail'] as const,
    detail: (id: string) => [...partnersKeys.details(), id] as const,
};

// Custom hook for fetching partners list
export const usePartners = (
    page: number = 1,
    perPage: number = 10,
    search?: string
) => {
    return useQuery({
        queryKey: partnersKeys.list(page, perPage, search),
        queryFn: () => partnerService.index(page, perPage, search),
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
        retry: 3,
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
        select: (data) => data.data, // Extract the data property from response
    });
};

// Custom hook for fetching single partner
export const usePartner = (id: string) => {
    return useQuery({
        queryKey: partnersKeys.detail(id),
        queryFn: () => partnerService.show(id),
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        enabled: !!id, // Only run query if id is provided
        select: (data) => data.data,
    });
};

// Custom hook for creating partner
export const useCreatePartner = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (partnerData: Partial<Partner>) => partnerService.store(partnerData),
        onSuccess: (data) => {
            // Invalidate and refetch partners list
            queryClient.invalidateQueries({ queryKey: partnersKeys.lists() });

            // Optionally add the new partner to the cache
            if (data.data) {
                queryClient.setQueryData(
                    partnersKeys.details(),
                    data
                );
            }
        },
        onError: (error) => {
            console.error('Error creating partner:', error);
        },
    });
};

// Custom hook for updating partner
export const useUpdatePartner = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: Partial<Partner> }) =>
            partnerService.update(id, data),
        onSuccess: (data, variables) => {
            // Invalidate partners list
            queryClient.invalidateQueries({ queryKey: partnersKeys.lists() });

            // Update the specific partner in cache
            if (data.data) {
                queryClient.setQueryData(
                    partnersKeys.detail(variables.id),
                    data
                );
            }
        },
        onError: (error) => {
            console.error('Error updating partner:', error);
        },
    });
};

// Custom hook for deleting partner
export const useDeletePartner = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => partnerService.destroy(id),
        onSuccess: (_, deletedId) => {
            // Remove the deleted partner from all relevant queries
            queryClient.invalidateQueries({ queryKey: partnersKeys.lists() });
            queryClient.removeQueries({ queryKey: partnersKeys.detail(deletedId) });
        },
        onError: (error) => {
            console.error('Error deleting partner:', error);
        },
    });
};