import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { Box } from '@/components/ui/box';
import { useAuthStore } from '@/store/authStore';
import { useAuth } from '@/context/AuthContext';
import { router } from 'expo-router';
import { authService } from '@/services/auth.service';

// Import the new reusable components
import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { ProfileDetailsCard } from '@/components/profile/ProfileDetailsCard';
import { AboutCard } from '@/components/profile/AboutCard';
import { AccountInfoCard } from '@/components/profile/AccountInfoCard';
import { ProfileActions } from '@/components/profile/ProfileActions';

const ProfilePage = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const { user } = useAuthStore();
    const { logout } = useAuth();

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getInitials = (name: string) => {
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    };

    const onLogout = async () => {
        try {
            setLoading(true);

            const res = await authService.partnerLogout();

            if (res.code === 1001) {
                logout();
                router.push('/(auth)/login');
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const handleEditProfile = () => {
        // Add edit profile logic here
        console.log('Edit profile pressed');
    };

    const handleShareProfile = () => {
        // Add share profile logic here
        console.log('Share profile pressed');
    };

    return (
        <ScrollView className='flex-1 bg-slate-50'>
            {user && (
                <Box className='flex-1 p-6'>
                    <ProfileHeader
                        email={user.email}
                        name={user.name}
                        isEditing={isEditing}
                        onEditPress={() => setIsEditing(!isEditing)}
                        getInitials={getInitials}
                    />

                    <ProfileDetailsCard
                        id={user.id}
                    />

                    <AboutCard description={null} />

                    <AccountInfoCard
                        createdAt={user.createdAt}
                        updatedAt={user.updatedAt}
                        formatDate={formatDate}
                    />

                    <ProfileActions
                        onEditProfile={handleEditProfile}
                        onShareProfile={handleShareProfile}
                        onLogout={onLogout}
                        isLoading={isLoading}
                    />

                    {/* Bottom Padding */}
                    <Box className="h-8" />
                </Box>
            )}
        </ScrollView>
    );
};

export default ProfilePage;