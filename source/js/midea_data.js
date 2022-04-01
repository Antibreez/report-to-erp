export const MIDEA_OUTDOORS = {
  individual: {
    title: "V6i",
    units: {
      252: { name: "MV6-i252WV2GN1", modules: ["MV6-i252WV2GN1"], type: "v6i", maxIDU: 13, maxINDEX: 328 },
      280: { name: "MV6-i280WV2GN1", modules: ["MV6-i280WV2GN1"], type: "v6i", maxIDU: 16, maxINDEX: 364 },
      335: { name: "MV6-i335WV2GN1", modules: ["MV6-i335WV2GN1"], type: "v6i", maxIDU: 20, maxINDEX: 436 },
      400: { name: "MV6-i400WV2GN1", modules: ["MV6-i400WV2GN1"], type: "v6i", maxIDU: 23, maxINDEX: 520 },
      450: { name: "MV6-i450WV2GN1", modules: ["MV6-i450WV2GN1"], type: "v6i", maxIDU: 26, maxINDEX: 585 },
      500: { name: "MV6-i500WV2GN1", modules: ["MV6-i500WV2GN1"], type: "v6i", maxIDU: 29, maxINDEX: 650 },
      560: { name: "MV6-i560WV2GN1", modules: ["MV6-i560WV2GN1"], type: "v6i", maxIDU: 33, maxINDEX: 728 },
      615: { name: "MV6-i615WV2GN1", modules: ["MV6-i615WV2GN1"], type: "v6i", maxIDU: 36, maxINDEX: 800 },
      670: { name: "MV6-i670WV2GN1", modules: ["MV6-i670WV2GN1"], type: "v6i", maxIDU: 39, maxINDEX: 871 },
      730: { name: "MV6-i730WV2GN1", modules: ["MV6-i730WV2GN1"], type: "v6i", maxIDU: 43, maxINDEX: 949 },
      785: { name: "MV6-i785WV2GN1", modules: ["MV6-i785WV2GN1"], type: "v6i", maxIDU: 46, maxINDEX: 1021 },
      850: { name: "MV6-i850WV2GN1", modules: ["MV6-i850WV2GN1"], type: "v6i", maxIDU: 50, maxINDEX: 1105 },
      900: { name: "MV6-i900WV2GN1", modules: ["MV6-i900WV2GN1"], type: "v6i", maxIDU: 53, maxINDEX: 1170 },
    },
  },
  multi: {
    title: "V6",
    units: {
      950: { name: "MV6-950WV2GN1", modules: ["MV6-335WV2GN1", "MV6-615WV2GN1"], type: "v6", maxIDU: 56, maxINDEX: 1235, joint: "KJRT02E" },
      1015: {
        name: "MV6-1015WV2GN1",
        modules: ["MV6-400WV2GN1", "MV6-615WV2GN1"],
        type: "v6",
        maxIDU: 59,
        maxINDEX: 1320,
        joint: "KJRT02E",
      },
      1065: {
        name: "MV6-1065WV2GN1",
        modules: ["MV6-450WV2GN1", "MV6-615WV2GN1"],
        type: "v6",
        maxIDU: 63,
        maxINDEX: 1385,
        joint: "KJRT02E",
      },
      1120: {
        name: "MV6-1120WV2GN1",
        modules: ["MV6-335WV2GN1", "MV6-785WV2GN1"],
        type: "v6",
        maxIDU: 64,
        maxINDEX: 1456,
        joint: "KJRT02E",
      },
      1175: {
        name: "MV6-1175WV2GN1",
        modules: ["MV6-560WV2GN1", "MV6-615WV2GN1"],
        type: "v6",
        maxIDU: 64,
        maxINDEX: 1528,
        joint: "KJRT02E",
      },
      1230: {
        name: "MV6-1230WV2GN1",
        modules: ["MV6-615WV2GN1", "MV6-615WV2GN1"],
        type: "v6",
        maxIDU: 64,
        maxINDEX: 1599,
        joint: "KJRT02E",
      },
      1285: {
        name: "MV6-1285WV2GN1",
        modules: ["MV6-615WV2GN1", "MV6-670WV2GN1"],
        type: "v6",
        maxIDU: 64,
        maxINDEX: 1671,
        joint: "FQZHW-02N1E",
      },
      1345: {
        name: "MV6-1345WV2GN1",
        modules: ["MV6-615WV2GN1", "MV6-730WV2GN1"],
        type: "v6",
        maxIDU: 64,
        maxINDEX: 1749,
        joint: "FQZHW-02N1E",
      },
      1400: {
        name: "MV6-1400WV2GN1",
        modules: ["MV6-615WV2GN1", "MV6-785WV2GN1"],
        type: "v6",
        maxIDU: 64,
        maxINDEX: 1820,
        joint: "FQZHW-02N1E",
      },
      1460: {
        name: "MV6-1460WV2GN1",
        modules: ["MV6-730WV2GN1", "MV6-730WV2GN1"],
        type: "v6",
        maxIDU: 64,
        maxINDEX: 1898,
        joint: "FQZHW-02N1E",
      },
      1515: {
        name: "MV6-1515WV2GN1",
        modules: ["MV6-785WV2GN1", "MV6-730WV2GN1"],
        type: "v6",
        maxIDU: 64,
        maxINDEX: 1970,
        joint: "FQZHW-02N1E",
      },
    },
  },
  compact: {
    title: "Compact C-series",
    units: {
      220: { name: "MVUH220C-VA3i", modules: ["MVUH220C-VA3i"], type: "compact", maxIDU: 13, maxINDEX: 291 },
      280: { name: "MVUH280C-VA3i", modules: ["MVUH280C-VA3i"], type: "compact", maxIDU: 16, maxINDEX: 364 },
      335: { name: "MVUH335C-VA3i", modules: ["MVUH335C-VA3i"], type: "compact", maxIDU: 20, maxINDEX: 436 },
    },
  },
  atom: {
    title: "ATOM серия B",
    units: {
      80: { name: "MVUH80BT-VA1", modules: ["MVUH80BT-VA1"], type: "atom", maxIDU: 4, maxINDEX: 104 },
      100: { name: "MVUH100BT-VA1", modules: ["MVUH100BT-VA1"], type: "atom", maxIDU: 6, maxINDEX: 130 },
      120: { name: "MVUH120BT-VA1", modules: ["MVUH120BT-VA1"], type: "atom", maxIDU: 7, maxINDEX: 156 },
      140: { name: "MVUH140BT-VA1", modules: ["MVUH140BT-VA1"], type: "atom", maxIDU: 8, maxINDEX: 182 },
      160: { name: "MVUH160BT-VA1", modules: ["MVUH160BT-VA1"], type: "atom", maxIDU: 9, maxINDEX: 208 },
    },
  },
};

export const MIDEA_INDOORS = {
  general: {
    wall: {
      title: "Настенный",
      units: {
        22: { name: "MI2-22GDHN1", indx: 22, type: "wall" },
        28: { name: "MI2-28GDHN1", indx: 28, type: "wall" },
        36: { name: "MI2-36GDHN1", indx: 36, type: "wall" },
        45: { name: "MI2-45GDHN1", indx: 45, type: "wall" },
        56: { name: "MI2-56GDHN1", indx: 56, type: "wall" },
        71: { name: "MI2-71GDHN1", indx: 71, type: "wall" },
        80: { name: "MI2-80GDHN1", indx: 80, type: "wall" },
        90: { name: "MI2-90GDHN1", indx: 90, type: "wall" },
      },
    },
    cassette: {
      title: "Кассетный",
      units: {
        28: { name: "MI2-28Q4DHN1", indx: 28, type: "4w", panel: "T-MBQ4-01E" },
        36: { name: "MI2-36Q4DHN1", indx: 36, type: "4w", panel: "T-MBQ4-01E" },
        45: { name: "MI2-45Q4DHN1", indx: 45, type: "4w", panel: "T-MBQ4-01E" },
        56: { name: "MI2-56Q4DHN1", indx: 56, type: "4w", panel: "T-MBQ4-01E" },
        71: { name: "MI2-71Q4DHN1", indx: 71, type: "4w", panel: "T-MBQ4-01E" },
        80: { name: "MI2-80Q4DHN1", indx: 80, type: "4w", panel: "T-MBQ4-01E" },
        90: { name: "MI2-90Q4DHN1", indx: 90, type: "4w", panel: "T-MBQ4-01E" },
        100: { name: "MI2-100Q4DHN1", indx: 100, type: "4w", panel: "T-MBQ4-01E" },
        112: { name: "MI2-112Q4DHN1", indx: 112, type: "4w", panel: "T-MBQ4-01E" },
        140: { name: "MI2-140Q4DHN1", indx: 140, type: "4w", panel: "T-MBQ4-01E" },
      },
    },
    cassetteC: {
      title: "Кассетный 600х600",
      units: {
        22: { name: "MI2-22Q4CDHN1", indx: 22, type: "4wc", panel: "CE-MBQ4-03B5" },
        28: { name: "MI2-28Q4CDHN1", indx: 28, type: "4wc", panel: "CE-MBQ4-03B5" },
        36: { name: "MI2-36Q4CDHN1", indx: 36, type: "4wc", panel: "CE-MBQ4-03B5" },
        45: { name: "MI2-45Q4CDHN1", indx: 45, type: "4wc", panel: "CE-MBQ4-03B5" },
      },
    },
    twoWay: {
      title: "Кассетный 2-х поточный",
      units: {
        22: { name: "MI2-22Q2DHN1", indx: 22, type: "2w", panel: "CE-MBQ2-01" },
        28: { name: "MI2-28Q2DHN1", indx: 28, type: "2w", panel: "CE-MBQ2-01" },
        36: { name: "MI2-36Q2DHN1", indx: 36, type: "2w", panel: "CE-MBQ2-01" },
        45: { name: "MI2-45Q2DHN1", indx: 45, type: "2w", panel: "CE-MBQ2-01" },
        56: { name: "MI2-56Q2DHN1", indx: 56, type: "2w", panel: "CE-MBQ2-01" },
        71: { name: "MI2-71Q2DHN1", indx: 71, type: "2w", panel: "CE-MBQ2-01" },
      },
    },
    oneWay: {
      title: "Кассетный однопоточный",
      units: {
        18: { name: "MI2-18Q1DHN1", indx: 18, type: "1w", panel: "MBQ1-02D" },
        22: { name: "MI2-22Q1DHN1", indx: 22, type: "1w", panel: "MBQ1-02D" },
        28: { name: "MI2-28Q1DHN1", indx: 28, type: "1w", panel: "MBQ1-02D" },
        36: { name: "MI2-36Q1DHN1", indx: 36, type: "1w", panel: "MBQ1-02D" },
        45: { name: "MI2-45Q1DHN1", indx: 45, type: "1w", panel: "MBQ1-01D" },
        56: { name: "MI2-56Q1DHN1", indx: 56, type: "1w", panel: "MBQ1-01D" },
        71: { name: "MI2-71Q1DHN1", indx: 71, type: "1w", panel: "MBQ1-01D" },
      },
    },
    ductMedium: {
      title: "Канальный средненапорный",
      units: {
        22: { name: "MI2-22T2DHN1", indx: 22, type: "dm" },
        28: { name: "MI2-28T2DHN1", indx: 28, type: "dm" },
        36: { name: "MI2-36T2DHN1", indx: 36, type: "dm" },
        45: { name: "MI2-45T2DHN1", indx: 45, type: "dm" },
        56: { name: "MI2-56T2DHN1", indx: 56, type: "dm" },
        71: { name: "MI2-71T2DHN1", indx: 71, type: "dm" },
        80: { name: "MI2-80T2DHN1", indx: 80, type: "dm" },
        90: { name: "MI2-90T2DHN1", indx: 90, type: "dm" },
        112: { name: "MI2-112T2DHN1", indx: 112, type: "dm" },
        140: { name: "MI2-140T2DHN1", indx: 140, type: "dm" },
      },
    },
    ductMediumA: {
      title: "Канальный средненапорный",
      units: {
        22: { name: "MI2-22T2DHN1(A)", indx: 22, type: "dm(a)" },
        28: { name: "MI2-28T2DHN1(A)", indx: 28, type: "dm(a)" },
        36: { name: "MI2-36T2DHN1(A)", indx: 36, type: "dm(a)" },
        45: { name: "MI2-45T2DHN1(A)", indx: 45, type: "dm(a)" },
        56: { name: "MI2-56T2DHN1(A)", indx: 56, type: "dm(a)" },
        71: { name: "MI2-71T2DHN1(A)", indx: 71, type: "dm(a)" },
        90: { name: "MI2-90T2DHN1(A)", indx: 90, type: "dm(a)" },
        112: { name: "MI2-112T2DHN1(A)", indx: 112, type: "dm(a)" },
        140: { name: "MI2-140T2DHN1(A)", indx: 140, type: "dm(a)" },
        160: { name: "MI2-160T2DHN1(A)", indx: 160, type: "dm(a)" },
      },
    },
    ductHigh: {
      title: "Канальный высоконапорный",
      units: {
        71: { name: "MI2-71T1DHN1", indx: 71, type: "dh" },
        90: { name: "MI2-90T1DHN1", indx: 90, type: "dh" },
        112: { name: "MI2-112T1DHN1", indx: 112, type: "dh" },
        140: { name: "MI2-140T1DHN1", indx: 140, type: "dh" },
        160: { name: "MI2-160T1DHN1", indx: 160, type: "dh" },
        200: { name: "MI2-200T1DHN1", indx: 200, type: "dh" },
        250: { name: "MI2-250T1DHN1", indx: 250, type: "dh" },
        280: { name: "MI2-280T1DHN1", indx: 280, type: "dh" },
        400: { name: "MI2-400T1DHN1", indx: 400, type: "dh" },
        450: { name: "MI2-450T1DHN1", indx: 450, type: "dh" },
        560: { name: "MI2-560T1DHN1", indx: 560, type: "dh" },
      },
    },
    underCeiling: {
      title: "Напольно-потолочный",
      units: {
        36: { name: "MI2-36DLDHN1", indx: 36, type: "un" },
        45: { name: "MI2-45DLDHN1", indx: 45, type: "un" },
        56: { name: "MI2-56DLDHN1", indx: 56, type: "un" },
        71: { name: "MI2-71DLDHN1", indx: 71, type: "un" },
        80: { name: "MI2-80DLDHN1", indx: 80, type: "un" },
        90: { name: "MI2-90DLDHN1", indx: 90, type: "un" },
        112: { name: "MI2-112DLDHN1", indx: 112, type: "un" },
        140: { name: "MI2-140DLDHN1", indx: 140, type: "un" },
      },
    },
    console: {
      title: "Консольный",
      units: {
        22: { name: "MI2-22ZDHN1", indx: 22 },
        28: { name: "MI2-28ZDHN1", indx: 28 },
        36: { name: "MI2-36ZDHN1", indx: 36 },
        45: { name: "MI2-45ZDHN1", indx: 45 },
      },
    },
  },
  atom: {
    oneWay: {
      title: "Кассетный однопоточный",
      units: {
        18: { name: "MVN18T-VA1", indx: 18, type: "1w", panel: "MBQ1-02D" },
        22: { name: "MVN22T-VA1", indx: 22, type: "1w", panel: "MBQ1-02D" },
        28: { name: "MVN28T-VA1", indx: 28, type: "1w", panel: "MBQ1-02D" },
        36: { name: "MVN36T-VA1", indx: 36, type: "1w", panel: "MBQ1-02D" },
        45: { name: "MVN45T-VA1", indx: 45, type: "1w", panel: "MBQ1-01D" },
        56: { name: "MVN56T-VA1", indx: 56, type: "1w", panel: "MBQ1-01D" },
        71: { name: "MVN71T-VA1", indx: 71, type: "1w", panel: "MBQ1-01D" },
      },
    },
    cassette: {
      title: "Кассетный",
      units: {
        28: { name: "MVC28T-VA1", indx: 28, type: "4w", panel: "T-MBQ4-01E" },
        36: { name: "MVC36T-VA1", indx: 36, type: "4w", panel: "T-MBQ4-01E" },
        45: { name: "MVC45T-VA1", indx: 45, type: "4w", panel: "T-MBQ4-01E" },
        56: { name: "MVC56T-VA1", indx: 56, type: "4w", panel: "T-MBQ4-01E" },
        71: { name: "MVC71T-VA1", indx: 71, type: "4w", panel: "T-MBQ4-01E" },
        80: { name: "MVC80T-VA1", indx: 80, type: "4w", panel: "T-MBQ4-01E" },
        90: { name: "MVC90T-VA1", indx: 90, type: "4w", panel: "T-MBQ4-01E" },
        100: { name: "MVC100T-VA1", indx: 100, type: "4w", panel: "T-MBQ4-01E" },
        112: { name: "MVC112T-VA1", indx: 112, type: "4w", panel: "T-MBQ4-01E" },
        140: { name: "MVC140T-VA1", indx: 140, type: "4w", panel: "T-MBQ4-01E" },
      },
    },
    cassetteC: {
      title: "Кассетный 600х600",
      units: {
        15: { name: "MVS15T-VA1", indx: 15, type: "4wc", panel: "CE-MBQ4-03B5" },
        22: { name: "MVS22T-VA1", indx: 22, type: "4wc", panel: "CE-MBQ4-03B5" },
        28: { name: "MVS28T-VA1", indx: 28, type: "4wc", panel: "CE-MBQ4-03B5" },
        36: { name: "MVS36T-VA1", indx: 36, type: "4wc", panel: "CE-MBQ4-03B5" },
        45: { name: "MVS45T-VA1", indx: 45, type: "4wc", panel: "CE-MBQ4-03B5" },
      },
    },
    underCeiling: {
      title: "Напольно-потолочный",
      units: {
        36: { name: "MVX36T-VA1", indx: 36, type: "un" },
        45: { name: "MVX45T-VA1", indx: 45, type: "un" },
        56: { name: "MVX56T-VA1", indx: 56, type: "un" },
        71: { name: "MVX71T-VA1", indx: 71, type: "un" },
        80: { name: "MVX80T-VA1", indx: 80, type: "un" },
        90: { name: "MVX90T-VA1", indx: 90, type: "un" },
        112: { name: "MVX112T-VA1", indx: 112, type: "un" },
        140: { name: "MVX140T-VA1", indx: 140, type: "un" },
      },
    },
    ductMedium: {
      title: "Канальный средненапорный",
      units: {
        22: { name: "MVM22T-VA1", indx: 22, type: "dm" },
        28: { name: "MVM28T-VA1", indx: 28, type: "dm" },
        36: { name: "MVM36T-VA1", indx: 36, type: "dm" },
        45: { name: "MVM45T-VA1", indx: 45, type: "dm" },
        56: { name: "MVM56T-VA1", indx: 56, type: "dm" },
        71: { name: "MVM71T-VA1", indx: 71, type: "dm" },
        90: { name: "MVM90T-VA1", indx: 90, type: "dm" },
        112: { name: "MVM112T-VA1", indx: 112, type: "dm" },
        140: { name: "MVM140T-VA1", indx: 140, type: "dm" },
        160: { name: "MVM160T-VA1", indx: 160, type: "dm" },
      },
    },
    wall: {
      title: "Настенный",
      units: {
        22: { name: "MVW22T-VA1", indx: 22, type: "wall" },
        28: { name: "MVW28T-VA1", indx: 28, type: "wall" },
        36: { name: "MVW36T-VA1", indx: 36, type: "wall" },
        45: { name: "MVW45T-VA1", indx: 45, type: "wall" },
        56: { name: "MVW56T-VA1", indx: 56, type: "wall" },
        71: { name: "MVW71T-VA1", indx: 71, type: "wall" },
        80: { name: "MVW80T-VA1", indx: 80, type: "wall" },
        90: { name: "MVW90T-VA1", indx: 90, type: "wall" },
      },
    },
  },
};

export const MIDEA_PANELS = ["T-MBQ4-01E", "CE-MBQ4-03B5", "CE-MBQ2-01", "MBQ1-02D", "MBQ1-01D"];

export const MIDEA_CONTROLLERS = {
  wired: "WDC-86E/KD",
  infrared: "RM12F",
};
