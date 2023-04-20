import { create } from 'zustand'

const initialStates = {
  login: false,
}

type ModalStates = typeof initialStates
type ModalActions = {
  setVisible: (name: keyof ModalStates, visible: boolean) => void
}

export const useModal = create<ModalStates & ModalActions>()((set) => ({
  ...initialStates,
  setVisible: (name, visible) => set({ [name]: visible }),
}))
