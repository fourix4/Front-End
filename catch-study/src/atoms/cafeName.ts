import { atom } from 'jotai';

export const cafeName = atom<string | null>(null);

cafeName.onMount = setAtom => {
  const savedName = sessionStorage.getItem('cafeName');

  if (savedName) {
    setAtom(savedName);
  }
};

export const setCafeName = atom(null, (_, set, update: string | null) => {
  set(cafeName, update);
  if (update === null) {
    sessionStorage.removeItem('cafeName');
  } else {
    sessionStorage.setItem('cafeName', update);
  }
});
