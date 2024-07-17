interface SeatingchartTypes {
  [key: string]: { [key: string]: { x: number; y: number } };
}

const SEATINGCHART: SeatingchartTypes = {
  1: {
    A1: { x: 50, y: 200 },
    A2: { x: 50, y: 250 },
    A3: { x: 50, y: 300 },
    A4: { x: 50, y: 350 },
    A5: { x: 50, y: 400 },
    B1: { x: 200, y: 400 },
    B2: { x: 250, y: 400 },
    B3: { x: 300, y: 400 },
    B4: { x: 350, y: 400 },
    C1: { x: 450, y: 400 },
    C2: { x: 500, y: 400 },
    C3: { x: 550, y: 400 },
    C4: { x: 600, y: 400 },
    D1: { x: 700, y: 400 },
    D2: { x: 700, y: 350 },
    D3: { x: 700, y: 300 },
    D4: { x: 700, y: 250 },
    D5: { x: 700, y: 200 },
    E1: { x: 200, y: 200 },
    E2: { x: 200, y: 250 },
    F1: { x: 300, y: 200 },
    F2: { x: 300, y: 250 },
    G1: { x: 500, y: 200 },
    G2: { x: 500, y: 250 },
    H1: { x: 600, y: 200 },
    H2: { x: 600, y: 250 },
    '4인용 스터디룸': { x: 509, y: 85 },
  },
};

export default SEATINGCHART;
