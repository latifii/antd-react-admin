import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { bgMainImg, blossomImg, blueJellyImg, leafImg } from '../../assets';

export const customColors = {
    system: {
        bgImg: "",
        color: "#1677FF",
        img: bgMainImg
    },
    light: {
        bgImg: "",
        color: "#1677FF",
        img: bgMainImg
    },
    dark: {
        bgImg: "",
        color: "#1677FF",
        img: bgMainImg
    },
    blossom: {
        bgImg: "blossom-bg",
        color: "#ED4192",
        img: blossomImg
    },
    greenLeaf: {
        bgImg: "leaf-bg",
        color: "#00B96B",
        img: leafImg
    },
    blueJelly: {
        bgImg: "blueJelly-bg",
        color: "#5A54F9",
        img: blueJellyImg
    }
} as const;

export const imgFileByBgClass = new Map<BgImgType, string>(
    Object.values(customColors).map((c) => [c.bgImg, c.img])
);

export type AllThemeType = keyof typeof customColors;
export type BgImgType = '' | 'blueJelly-bg' | 'blossom-bg' | 'leaf-bg';
export interface ThemeValuesType {
    lightTheme: boolean;
    primary: {
        bgImg: BgImgType;
        color: string;
    };
    borderRadius: number;
    alpha: number;
    compact: boolean;
};

export const customTheme: Record<AllThemeType, ThemeValuesType> = {
    system: {
        lightTheme: window.matchMedia('(prefers-color-scheme: light)').matches,
        primary: customColors.system,
        borderRadius: 6,
        compact: false,
        alpha: 1,
    },
    light: {
        lightTheme: true,
        primary: customColors.light,
        borderRadius: 6,
        compact: false,
        alpha: 1,
    },
    dark: {
        lightTheme: false,
        primary: customColors.dark,
        borderRadius: 6,
        compact: false,
        alpha: 1,
    },
    blossom: {
        lightTheme: true,
        primary: customColors.blossom,
        borderRadius: 10,
        compact: false,
        alpha: 0.5,
    },
    greenLeaf: {
        lightTheme: true,
        primary: customColors.greenLeaf,
        borderRadius: 6,
        compact: false,
        alpha: 0.5,
    },
    blueJelly: {
        lightTheme: false,
        primary: customColors.blueJelly,
        borderRadius: 6,
        compact: false,
        alpha: 0.7,
    },
} as const;

export interface ThemeState {
    presetTheme: AllThemeType;
    lightTheme: boolean;
    navStick: boolean;

    primaryColor: string;
    bgImg: BgImgType
    borderRadius: number;
    compactMode: boolean;
    alpha: number;
}

const {
    lightTheme: systemLight,
    primary: { color: systemColor, bgImg: systemBgImg },
    borderRadius: systemRadius,
    compact: systemCompact,
    alpha: systemAlpha,
} = customTheme.system;

// const isLightThemeFlag = localStorage.getItem('theme') === 'light' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: light)').matches);
const isLightThemeFlag = localStorage.getItem('theme') === 'light';

const initialState: ThemeState = {
    presetTheme: !('theme' in localStorage)
        ? 'system'
        : isLightThemeFlag
            ? 'light'
            : 'dark',
    lightTheme: systemLight,
    navStick: false,
    primaryColor: systemColor,
    bgImg: systemBgImg,
    borderRadius: systemRadius,
    compactMode: systemCompact,
    alpha: systemAlpha,
};


const themeSlice = createSlice({
    name: 'themeSlice',
    initialState,
    reducers: {
        togglePreset: (state, action: PayloadAction<AllThemeType>) => {
            state.presetTheme = action.payload;
            if (action.payload === "system") {
                localStorage.removeItem('theme');
            }
        },
        toggleTheme: (state, action: PayloadAction<boolean>) => {
            state.lightTheme = action.payload;
            localStorage.setItem('theme', state.lightTheme ? 'light' : 'dark');
            document.documentElement.classList.toggle('dark', !state.lightTheme);
        },
        toggleNavStick: (state, action: PayloadAction<boolean>) => {
            state.navStick = action.payload;
        },
        setPrimaryColor: (state, action: PayloadAction<string>) => {
            state.primaryColor = action.payload;
        },
        setBgImg: (state, action: PayloadAction<BgImgType>) => {
            state.bgImg = action.payload;
        },
        setBorderRadius: (state, action: PayloadAction<number>) => {
            state.borderRadius = action.payload;
        },
        setCompactMode: (state, action: PayloadAction<boolean>) => {
            state.compactMode = action.payload;
        },
        setAlpha: (state, action: PayloadAction<number>) => {
            state.alpha = action.payload;
        },
    }
});

export const {
    togglePreset,
    toggleTheme,
    toggleNavStick,
    setPrimaryColor,
    setBgImg,
    setBorderRadius,
    setCompactMode,
    setAlpha,
} = themeSlice.actions;

export default themeSlice.reducer;
