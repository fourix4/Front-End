import { atom } from 'jotai';

export const chattingRoomId = atom<number | null>(null);

chattingRoomId.onMount = setAtom => {
  const savedRoomId = sessionStorage.getItem('chattingRoomId');

  if (savedRoomId) {
    setAtom(parseInt(savedRoomId, 10));
  }
};

export const setChattingRoomId = atom(null, (_, set, update: number | null) => {
  set(chattingRoomId, update);
  if (update === null) {
    sessionStorage.removeItem('chattingRoomId');
  } else {
    sessionStorage.setItem('chattingRoomId', update.toString());
  }
});
