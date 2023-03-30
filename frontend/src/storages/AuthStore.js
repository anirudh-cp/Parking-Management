import create from 'zustand'
import { persist } from 'zustand/middleware'


const useUserStore = create(
    persist(
        (set, get) => ({
            token: "",
            name: "",
            plate: "",

            setToken: (token_) => set(state => ({ token: token_ })),
            
            setName: (name_) => set(state => ({ name: name_ })),
            setPlate: (plate_) => set(state => ({ plate: plate_ })),

            UserDeleteEverything: () => set(state => ({ token:"", name:"", plate:"" })),
        }),
        {
            name: 'user-storage',
            getStorage: () => sessionStorage,
        }
    )

);

export default useUserStore;