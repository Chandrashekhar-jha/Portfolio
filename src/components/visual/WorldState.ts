/**
 * WORLD STATE & SCROLL PROGRESS MATRIX
 * Chandrashekhar Jha — Portfolio 3D Developer World
 */

export interface WorldSectionState {
  sectionIndex: number;
  sectionName: 'opening' | 'identity' | 'projects' | 'engineering' | 'lab' | 'background' | 'contact';
  structureDensity: number;
  architectureVisible: boolean;
  bugActive: boolean;
  cameraZ: number;
  cameraY: number;
  cameraX: number;
}

export const getSectionStateFromProgress = (progress: number): WorldSectionState => {
  // Clamp progress between 0 and 1
  const p = Math.max(0, Math.min(1, progress));

  if (p < 0.14) {
    // 01 — Opening (0.00 - 0.14)
    return {
      sectionIndex: 1,
      sectionName: 'opening',
      structureDensity: 0.15 + p * 1.5,
      architectureVisible: false,
      bugActive: false,
      cameraX: 0,
      cameraY: 2,
      cameraZ: 14 - p * 10,
    };
  } else if (p < 0.28) {
    // 02 — Identity (0.14 - 0.28)
    const local = (p - 0.14) / 0.14;
    return {
      sectionIndex: 2,
      sectionName: 'identity',
      structureDensity: 0.35 + local * 0.25,
      architectureVisible: true,
      bugActive: false,
      cameraX: Math.sin(local * Math.PI) * 1.5,
      cameraY: 2 + local * 1,
      cameraZ: 12.6 - local * 2.6,
    };
  } else if (p < 0.52) {
    // 03 — Projects (0.28 - 0.52)
    const local = (p - 0.28) / 0.24;
    return {
      sectionIndex: 3,
      sectionName: 'projects',
      structureDensity: 0.6 + local * 0.3,
      architectureVisible: true,
      bugActive: false,
      cameraX: Math.cos(local * Math.PI) * 2,
      cameraY: 3 + local * 1.5,
      cameraZ: 10 - local * 2,
    };
  } else if (p < 0.68) {
    // 04 — Engineering Architecture (0.52 - 0.68)
    const local = (p - 0.52) / 0.16;
    return {
      sectionIndex: 4,
      sectionName: 'engineering',
      structureDensity: 0.9,
      architectureVisible: true,
      bugActive: false,
      cameraX: 0,
      cameraY: 4.5 - local * 1,
      cameraZ: 8,
    };
  } else if (p < 0.80) {
    // 05 — Lab / Experiments & "THE BUG" (0.68 - 0.80)
    const local = (p - 0.68) / 0.12;
    // Bug triggers around local 0.3 to 0.7
    const bugActive = local >= 0.25 && local <= 0.65;
    return {
      sectionIndex: 5,
      sectionName: 'lab',
      structureDensity: 0.75,
      architectureVisible: true,
      bugActive,
      cameraX: Math.sin(local * Math.PI * 2) * 2.5,
      cameraY: 3.5 + Math.cos(local * Math.PI) * 1,
      cameraZ: 8.5 + local * 1.5,
    };
  } else if (p < 0.90) {
    // 06 — Background / Proof (0.80 - 0.90)
    const local = (p - 0.80) / 0.10;
    return {
      sectionIndex: 6,
      sectionName: 'background',
      structureDensity: 0.85,
      architectureVisible: true,
      bugActive: false,
      cameraX: 0,
      cameraY: 3.5,
      cameraZ: 10 + local * 4,
    };
  } else {
    // 07 — Terminal / Contact & FINAL REVEAL (0.90 - 1.00)
    const local = (p - 0.90) / 0.10;
    return {
      sectionIndex: 7,
      sectionName: 'contact',
      structureDensity: 1.0,
      architectureVisible: true,
      bugActive: false,
      cameraX: 0,
      cameraY: 5 + local * 3,
      cameraZ: 14 + local * 8, // Dramatic camera pull-back revealing full connected system
    };
  }
};
