import {UserFullData} from '@/components/types/user';
import {create} from 'zustand';

interface UserStore {
    selectedUser: UserFullData | null;
    selectUser: (user: UserFullData | null) => void;
}

export const useUserStore = create<UserStore>((set) => ({
    selectedUser: null,
    selectUser: (user) => set({selectedUser: user}),
}));
