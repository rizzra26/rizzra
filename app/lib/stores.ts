import { create } from 'zustand';

interface State {
  now: Date;
  updateNow: () => void;
}

export const useStore = create<State>((set) => ({
  now: new Date(),
  updateNow: () => {
    set({ now: new Date() });
  }
}));

// Set up a periodic update for `now`
export const startNowUpdate = () => {
  const interval = setInterval(() => {
    useStore.getState().updateNow();
  }, 1000);

  return () => clearInterval(interval);
};
