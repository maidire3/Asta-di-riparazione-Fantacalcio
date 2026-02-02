// Crediti iniziali Squadre
const creditiInizialiSquadre = {
  "AC Orazkhelia": 0,
  "Aston Villain": 0,
  "Bayer Leverkubo": 7,
  "FC Kame House": 0,
  "GiocatoriSempreCazzuti": 11,
  "One Pisa": 18,
  "Real Madrink": 2,
  "Woolferhampton": 3,
  "Yara FC": 16,
  "Ovo al tegamino": 9
};

// --- DEFAULT PLAYERS ---
const defaultPlayers = {
  "AC Orazkhelia": [{ nome: "Bravo*", crediti: 1, ruolo: "attaccanti" },
    {nome: "Ngonge*", crediti: 11, ruolo: "attaccanti"}
  ],
  "Aston Villain": [],
  "Bayer Leverkubo": [],
  "FC Kame House": [
    { nome: "Martinelli T.*", crediti: 1, ruolo: "portieri" },
    { nome: "Guendouzi*", crediti: 1, ruolo: "centrocampisti" },
    { nome: "Castellanos*", crediti: 141, ruolo: "attaccanti" },
    { nome: "Dzeko*", crediti: 2, ruolo: "attaccanti" }
  ],
  "GiocatoriSempreCazzuti": [{nome: "Cutrone*", crediti: 1, ruolo: "attaccanti"}],
  "One Pisa": [
    {nome: "stanciu*", crediti: 9, ruolo: "centrocampisti"},
    {nome: "Lucca*", crediti: 10, ruolo: "attaccanti"}
  ],
  "Real Madrink": [{ nome: "Lang*", crediti: 1, ruolo: "attaccanti" }],
  "Woolferhampton": [
    {nome: "Lovik*", crediti: 1, ruolo: "difensori"},
    {nome: "Vazquez*", crediti: 11, ruolo: "centrocampisti"},
    {nome: "Gronbaek*", crediti: 7, ruolo: "centrocampisti"}
  ],
  "Yara FC": [{nome: "Bailey*", crediti: 11, ruolo: "centrocampisti"}],
  "Ovo al tegamino": [{nome: "Carboni V.*", crediti: 6, ruolo:"centrocampisti"},
    {nome: "Mandas*", crediti: 6, ruolo: "portieri"}
  ]
};

// Df Players del primo SAVE
const primoSave = {
  "AC Orazkhelia": [
    {
      "nome": "Turati",
      "crediti": "1",
      "ruolo": "portieri"
    },
    {
      "nome": "Gatti",
      "crediti": "7",
      "ruolo": "difensori"
    },
    {
      "nome": "Zhegrova",
      "crediti": "34",
      "ruolo": "centrocampisti"
    },
    {
      "nome": "Collocolo",
      "crediti": "3",
      "ruolo": "centrocampisti"
    },
    {
      "nome": "Bravo*",
      "crediti": 1,
      "ruolo": "attaccanti"
    },
    {
      "nome": "Ngonge*",
      "crediti": "11",
      "ruolo": "attaccanti"
    },
    {
      "nome": "Lookman*",
      "crediti": "13",
      "ruolo": "attaccanti"
    }
  ],
  "Aston Villain": [
    {
      "nome": "Tavares",
      "crediti": "30",
      "ruolo": "difensori"
    },
    {
      "nome": "Joao Mario",
      "crediti": "5",
      "ruolo": "difensori"
    },
    {
      "nome": "Nicolussi Caviglia",
      "crediti": "1",
      "ruolo": "centrocampisti"
    },
    {
      "nome": "Gimenez",
      "crediti": "30",
      "ruolo": "attaccanti"
    },
    {
      "nome": "Vlahovic",
      "crediti": "40",
      "ruolo": "attaccanti"
    }
  ],
  "Bayer Leverkubo": [
    {
      "nome": "Biraghi",
      "crediti": "5",
      "ruolo": "difensori"
    },
    {
      "nome": "Dele-Bashiru",
      "crediti": "11",
      "ruolo": "centrocampisti"
    },
    {
      "nome": "Folorunsho",
      "crediti": "8",
      "ruolo": "centrocampisti"
    },
    {
      "nome": "Belotti",
      "crediti": "18",
      "ruolo": "attaccanti"
    }
  ],
  "FC Kame House": [
    {
      "nome": "Martinelli T.*",
      "crediti": 1,
      "ruolo": "portieri"
    },
    {
      "nome": "Angelino",
      "crediti": "32",
      "ruolo": "difensori"
    },
    {
      "nome": "Guendouzi*",
      "crediti": 1,
      "ruolo": "centrocampisti"
    },
    {
      "nome": "Castellanos*",
      "crediti": 141,
      "ruolo": "attaccanti"
    },
    {
      "nome": "Dzeko*",
      "crediti": 2,
      "ruolo": "attaccanti"
    }
  ],
  "GiocatoriSempreCazzuti": [
    {
      "nome": "Floriani Mussolini",
      "crediti": "4",
      "ruolo": "difensori"
    },
    {
      "nome": "Di Lorenzo",
      "crediti": "30",
      "ruolo": "difensori"
    },
    {
      "nome": "Sohm",
      "crediti": "4",
      "ruolo": "centrocampisti"
    },
    {
      "nome": "Camarda",
      "crediti": "12",
      "ruolo": "attaccanti"
    },
    {
      "nome": "Cutrone*",
      "crediti": "1",
      "ruolo": "attaccanti"
    }
  ],
  "One Pisa": [
    {
      "nome": "Siegrist",
      "crediti": "1",
      "ruolo": "portieri"
    },
    {
      "nome": "Olivera",
      "crediti": "2",
      "ruolo": "difensori"
    },
    {
      "nome": "stanciu*",
      "crediti": 9,
      "ruolo": "centrocampisti"
    },
    {
      "nome": "Maldini",
      "crediti": "6",
      "ruolo": "centrocampisti"
    },
    {
      "nome": "Lucca*",
      "crediti": 10,
      "ruolo": "attaccanti"
    },
    {
      "nome": "Ferguson",
      "crediti": "125",
      "ruolo": "attaccanti"
    }
  ],
  "Real Madrink": [
    {
      "nome": "Kossonou",
      "crediti": "2",
      "ruolo": "difensori"
    },
    {
      "nome": "Helgason",
      "crediti": "1",
      "ruolo": "centrocampisti"
    },
    {
      "nome": "Venturino",
      "crediti": "1",
      "ruolo": "centrocampisti"
    },
    {
      "nome": "Stengs",
      "crediti": "6",
      "ruolo": "centrocampisti"
    },
    {
      "nome": "Lang*",
      "crediti": 1,
      "ruolo": "attaccanti"
    },
    {
      "nome": "Dovbyk",
      "crediti": "36",
      "ruolo": "attaccanti"
    }
  ],
  "Woolferhampton": [
    {
      "nome": "Lovik*",
      "crediti": 1,
      "ruolo": "difensori"
    },
    {
      "nome": "Vazquez*",
      "crediti": 11,
      "ruolo": "centrocampisti"
    },
    {
      "nome": "El Aynaoui",
      "crediti": "3",
      "ruolo": "centrocampisti"
    },
    {
      "nome": "Gronbaek*",
      "crediti": "7",
      "ruolo": "centrocampisti"
    },
    {
      "nome": "Neres",
      "crediti": "6",
      "ruolo": "centrocampisti"
    }
  ],
  "Yara FC": [
    {
      "nome": "Israel",
      "crediti": "13",
      "ruolo": "portieri"
    },
    {
      "nome": "Cuadrado",
      "crediti": "1",
      "ruolo": "difensori"
    },
    {
      "nome": "Bailey*",
      "crediti": 11,
      "ruolo": "centrocampisti"
    },
    {
      "nome": "De Bruyne",
      "crediti": "90",
      "ruolo": "centrocampisti"
    },
    {
      "nome": "Nzola",
      "crediti": "13",
      "ruolo": "attaccanti"
    },
    {
      "nome": "Diao",
      "crediti": "1",
      "ruolo": "attaccanti"
    }
  ],
  "Ovo al tegamino": [
    {
      "nome": "Mandas*",
      "crediti": "6",
      "ruolo": "portieri"
    },
    {
      "nome": "Carboni V.*",
      "crediti": 6,
      "ruolo": "centrocampisti"
    },
    {
      "nome": "Fazzini",
      "crediti": "1",
      "ruolo": "centrocampisti"
    },
    {
      "nome": "Bernardeschi",
      "crediti": "2",
      "ruolo": "centrocampisti"
    },
    {
      "nome": "Pedro",
      "crediti": "1",
      "ruolo": "attaccanti"
    }
  ]
}