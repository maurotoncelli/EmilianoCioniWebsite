import { atom } from 'nanostores';

interface OverlayState {
  isOpen: boolean;
  workId: string | null;
}

export const overlayStore = atom<OverlayState>({
  isOpen: false,
  workId: null
});








