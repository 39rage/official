// 【全アルバムのリスト】
const allAlbums = [
    {
        id: "first-step", 
        title: "First step",
        subtitle: "1st Mini Album",
        img: "https://fromtheasia.com/wp-content/uploads/NCG63.jpg",
        desc: "初めて作った5曲がまとまってます。<br>デモ曲のようなミニアルバム。",
        booth: "https://casbgcasbg.booth.pm/items/2691899",
        tracksCount: "5 Tracks"
    },
    {
        id: "deep-upbeat", 
        title: "Deep Upbeat",
        subtitle: "1st Single",
        img: "https://fromtheasia.com/wp-content/uploads/NCG93-1.jpg",
        desc: "ひたすらに眠たい曲を作りました。<br>おまけはちょっとオシャレにしたバージョンです。",
        booth: "https://casbgcasbg.booth.pm/items/2691947",
        tracksCount: "2 Tracks"
    },
    {
        id: "at-the-beach", 
        title: "At the beach",
        subtitle: "2nd Single",
        img: "https://fromtheasia.com/wp-content/uploads/NCG111.jpg",
        desc: "優しく切なく",
        booth: "https://casbgcasbg.booth.pm/items/2691982",
        tracksCount: "3 Tracks"
    },
    {
        id: "mystic-moon", 
        title: "Mystic Moon",
        subtitle: "3rd Single",
        img: "https://fromtheasia.com/wp-content/uploads/NCG210-scaled.jpg",
        desc: "最近やってるゲームの影響でチャイニーズミュージックにトライした結果",
        booth: "https://casbgcasbg.booth.pm/items/2692032",
        tracksCount: "3 Tracks"
    },
    {
        id: "boogie-night", 
        title: "Boogie Night",
        subtitle: "4th Single",
        img: "https://fromtheasia.com/wp-content/uploads/NCG99-2.jpg",
        desc: "ロックが作りたかっただけなんや...",
        booth: "https://casbgcasbg.booth.pm/items/2692935",
        tracksCount: "3 Tracks"
    },
    {
        id: "true-love", 
        title: "True Love",
        subtitle: "5th Single",
        img: "https://fromtheasia.com/wp-content/uploads/NCG82.jpg",
        desc: "本当の愛ってなんだろう<br>安心してくださいただのしっとり曲です",
        booth: "https://casbgcasbg.booth.pm/items/2692943",
        tracksCount: "3 Tracks"
    }
];

// 【全曲のリスト】
const allTracks = [
    // --- First step ---
    { title: "British Brixton", file: "2020102923 British_Brixton-100_C.mp3", albumId: "first-step" },
    { title: "Accelerate Afghanistan", file: "2020103012 Accelerate_Afghanistan_TH-102_Cm.mp3", albumId: "first-step" },
    { title: "AABS 80s", file: "2020103014 AABS_80s-128_Cm.mp3", albumId: "first-step" },
    { title: "Altered Afterburner AYB", file: "2020103018 Altered_Afterburner_AYB-129_Csm.mp3", albumId: "first-step" },
    { title: "Alternating synth layers", file: "2020103111 Alternating_synth_layers-125_Dm.mp3", albumId: "first-step" },
    
    // --- Deep Upbeat ---
    { title: "Deep Upbeat EP", file: "2020110114 Deep_Upbeat_EP-60_D.mp3", albumId: "deep-upbeat" },
    { title: "Deep Upbeat Dense Alert", file: "2020110114_2 Deep_Upbeat_Dense_Alert-60_D.mp3", albumId: "deep-upbeat" },

    // --- At the beach ---
    { title: "Ambition Christy", file: "2020110912 Ambition_Christy-80_Csm.mp3", albumId: "at-the-beach" },
    { title: "Ocean Blue", file: "2020110913 Ocean_Blue-90_B.mp3", albumId: "at-the-beach" },
    { title: "Tropical Air", file: "2020111710 Tropical_Air-100_C.mp3", albumId: "at-the-beach" },

    // --- Mystic Moon ---
    { title: "Mystic Moon QGN", file: "2020111319 Mystic_Moon_QGN-110_B.mp3", albumId: "mystic-moon" },
    { title: "Celestial Ageless CDM Dizi", file: "2020112622 Celestial_Ageless_CDM_Dizi-130_B.mp3", albumId: "mystic-moon" },
    { title: "Mystic Moon Nines Technicolor", file: "2021011320 Mystic_Moon_Nines_Technicolor-150_B.mp3", albumId: "mystic-moon" },

    // --- Boogie Night ---
    { title: "Boogie Right Wah Power", file: "2020120819 Boogie_Right_Wah_Power-115_E.mp3", albumId: "boogie-night" },
    { title: "Disco Jesse", file: "2021011318 Disco_Jesse-120_D.mp3", albumId: "boogie-night" },
    { title: "Riff Right Ready Zak", file: "2021011419 Riff_Right_Ready_Zak-125_C.mp3", albumId: "boogie-night" },

    // --- True Love ---
    { title: "Twilight True Love", file: "2021011421 Twilight_True_Love-98_Em.mp3", albumId: "true-love" },
    { title: "Missing You", file: "2021011620 Missing_You-102_Ebm.mp3", albumId: "true-love" },
    { title: "Hand in Hand", file: "2021011910 Hand_in_Hand-78_D.mp3", albumId: "true-love" }
];
