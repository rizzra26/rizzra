import { create } from 'zustand';

interface State {
  now: Date;
  fastNow: Date;
  updateNow: () => void;
  updateFastNow: () => void;
}

export const useStore = create<State>((set) => ({
  now: new Date(),
  fastNow: new Date(),

  updateNow: () => {
    set({ now: new Date() });
  },

  updateFastNow: () => {
    if (typeof window !== 'undefined') {
      let id = requestAnimationFrame(function update() {
        set({ fastNow: new Date() });
        id = requestAnimationFrame(update);
      });

      return () => cancelAnimationFrame(id);
    }
  },
}));

// Set up a periodic update for `now`
export const startNowUpdate = () => {
  const interval = setInterval(() => {
    useStore.getState().updateNow();
  }, 1000);

  return () => clearInterval(interval);
};

// Set up fast updates for `fastNow` using requestAnimationFrame
export const startFastNowUpdate = () => {
  const cancelAnimationFrameFunc = useStore.getState().updateFastNow();
  return cancelAnimationFrameFunc;
};
