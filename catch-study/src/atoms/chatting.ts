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

export const chattingName = atom<string | null>(null);

chattingName.onMount = setAtom => {
  const savedName = sessionStorage.getItem('chattingName');

  if (savedName) {
    setAtom(savedName);
  }
};

export const setChattingName = atom(null, (_, set, update: string | null) => {
  set(chattingName, update);
  if (update === null) {
    sessionStorage.removeItem('chattingName');
  } else {
    sessionStorage.setItem('chattingName', update);
  }
});
