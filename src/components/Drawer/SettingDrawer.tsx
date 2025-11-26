import { ColorPicker, Drawer, Form, Slider, Switch, theme } from "antd";
import {
  colorWheelImg,
  darkSelectImg,
  defaultSelectImg,
  leafSelectImg,
  purpleJellySelect,
  systemSelectImg,
} from "../../assets";
import {
  AllThemeType,
  BgImgType,
  customColors,
  customTheme,
  setAlpha,
  setBgImg,
  setBorderRadius,
  setCompactMode,
  setPrimaryColor,
  ThemeValuesType,
  toggleNavStick,
  togglePreset,
  toggleTheme,
} from "../../redux/slices/themeSlice";
import { AggregationColor } from "antd/es/color-picker/color";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useEffect, useState } from "react";
import { toggleSettingsDrawer } from "../../redux/slices/tempSlice";
import { shallowEqual } from "react-redux";

const presetColorList = Array.from(
  new Set(Object.values(customColors).map(({ color }) => color?.toLowerCase()))
);

const bgImgByColor = new Map<string, BgImgType>(
  Object.values(customColors).map((c) => [c.color.toLowerCase(), c.bgImg])
);

interface PreBuiltThemeType {
  label: string;
  key: AllThemeType;
  imgSrc: string;
  value: ThemeValuesType;
}

const themeOptions: PreBuiltThemeType[] = [
  {
    label: "سیستمی",
    key: "system",
    imgSrc: systemSelectImg,
    value: customTheme.system,
  },
  {
    label: "روشن",
    key: "light",
    imgSrc: defaultSelectImg,
    value: customTheme.light,
  },
  {
    label: "تاریک",
    key: "dark",
    imgSrc: darkSelectImg,
    value: customTheme.dark,
  },
  {
    label: "سبز",
    key: "greenLeaf",
    imgSrc: leafSelectImg,
    value: customTheme.greenLeaf,
  },
  // {
  //   label: "شکوفه",
  //   key: "blossom",
  //   imgSrc: blossomSelectImg,
  //   value: customTheme.blossom,
  // },
  {
    label: "آبی ژله‌ای",
    key: "blueJelly",
    imgSrc: purpleJellySelect,
    value: customTheme.blueJelly,
  },
];

const presets = [
  { label: "پیش‌فرض‌ها", key: "Preset", colors: presetColorList },
];

const SettingDrawer: React.FC = () => {
  const {
    token: { borderRadius },
  } = theme.useToken();

  const dispatch = useAppDispatch();

  const {
    alpha,
    navStick,
    lightTheme,
    compactMode,
    primaryColor,
    settingsDrawer,
    borderRadiusState,
  } = useAppSelector(
    (s) => ({
      alpha: s.themeSlice.alpha,
      navStick: s.themeSlice.navStick,
      lightTheme: s.themeSlice.lightTheme,
      compactMode: s.themeSlice.compactMode,
      presetTheme: s.themeSlice.presetTheme,
      primaryColor: s.themeSlice.primaryColor,
      settingsDrawer: s.tempSlice.settingsDrawer,
      borderRadiusState: s.themeSlice.borderRadius,
    }),
    shallowEqual
  );

  const [localRadius, setLocalRadius] = useState(borderRadiusState);
  const [localAlpha, setLocalAlpha] = useState(alpha);
  const [localColor, setLocalColor] = useState<string>(primaryColor);

  useEffect(() => setLocalRadius(borderRadiusState), [borderRadiusState]);
  useEffect(() => setLocalAlpha(alpha), [alpha]);
  useEffect(() => setLocalColor(primaryColor), [primaryColor]);

  const onClose = () => dispatch(toggleSettingsDrawer(false));

  const handleNav = (checked: boolean) => dispatch(toggleNavStick(checked));
  const handleTheme = (checked: boolean) => dispatch(toggleTheme(!checked));
  const handleCompactMode = (checked: boolean) =>
    dispatch(setCompactMode(checked));

  const handleColorChange = (newColor: AggregationColor) => {
    setLocalColor("#" + newColor.toHex());
  };

  const onColorChangeComplete = (colorObj: AggregationColor | string) => {
    const newColor =
      colorObj instanceof AggregationColor ? "#" + colorObj.toHex() : colorObj;
    setLocalColor(newColor);

    const newBgImg = bgImgByColor.get(newColor?.toLowerCase()) ?? "";
    dispatch(setPrimaryColor(newColor));
    dispatch(setBgImg(newBgImg));
  };

  const handlePreBuiltTheme = (v: PreBuiltThemeType) => {
    dispatch(toggleTheme(v.value.lightTheme));
    dispatch(setPrimaryColor(v.value.primary.color));
    dispatch(setBgImg(v.value.primary.bgImg));
    dispatch(setBorderRadius(v.value.borderRadius));
    dispatch(setCompactMode(v.value.compact));
    dispatch(setAlpha(v.value.alpha));
    dispatch(togglePreset(v.key));
  };

  return (
    <Drawer
      title={"تنظیمات ظاهر"}
      placement="left"
      size="default"
      onClose={onClose}
      open={settingsDrawer}
      destroyOnClose
      classNames={{ body: `[color-scheme:light] dark:[color-scheme:dark]` }}
    >
      <Form.Item layout="vertical" label="انتخاب تم">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(80px,1fr))] gap-4">
          {themeOptions.map((option) => {
            const check =
              customTheme[option.key].lightTheme === lightTheme &&
              customTheme[option.key].compact === compactMode &&
              customTheme[option.key].borderRadius === localRadius &&
              customTheme[option.key].alpha === localAlpha &&
              customTheme[option.key].primary.color === localColor;

            const isSelected =
              "theme" in localStorage
                ? check && option.key !== "system"
                : option.key === "system" && check;

            return (
              <div
                key={option.key}
                className="cursor-pointer flex flex-col justify-center items-center gap-0.5"
                onClick={() => handlePreBuiltTheme(option)}
              >
                <div
                  style={{ borderRadius: borderRadius }}
                  className={`overflow-hidden border-2 duration-200 ${
                    isSelected ? "border-colorPrimary" : "border-transparent"
                  }`}
                >
                  <img
                    style={{ borderRadius: borderRadius - 1 }}
                    className="p-0.5"
                    src={option.imgSrc}
                    alt={option.label}
                  />
                </div>
                <span>{option.label}</span>
              </div>
            );
          })}
        </div>
      </Form.Item>

      <Form.Item layout="vertical" label="رنگ اصلی">
        <div className="flex gap-1 flex-wrap">
          {presetColorList.map((color) => {
            const selected = localColor?.toLowerCase() === color?.toLowerCase();
            return (
              <div
                key={color}
                className={`border-2 rounded-full p-0.5 cursor-pointer ${
                  selected ? "border-colorPrimary" : "border-transparent"
                }`}
              >
                <div
                  onClick={() => onColorChangeComplete(color)}
                  className="size-6 rounded-full"
                  style={{ backgroundColor: color }}
                />
              </div>
            );
          })}

          <ColorPicker
            presets={presets}
            value={localColor}
            onChange={handleColorChange}
            onChangeComplete={onColorChangeComplete}
            disabledAlpha
            placement="top"
          >
            <div
              className={`border-2 rounded-full p-0.5 cursor-pointer ${
                !presetColorList.includes(primaryColor.toLowerCase())
                  ? "border-colorPrimary"
                  : "border-transparent"
              }`}
            >
              <img
                className="size-6 rounded-full"
                src={colorWheelImg}
                alt="color Wheel"
              />
            </div>
          </ColorPicker>
        </div>
      </Form.Item>

      <Form.Item
        layout="vertical"
        label="شفافیت"
        help="برای پس‌زمینه یک‌دست عدد 1 بگذارید. هنگام استفاده از تصویر، مقدار 0.5 مناسب است."
        className="!pb-6 !mb-0"
      >
        <Slider
          onChange={(v) => setLocalAlpha(v)}
          onChangeComplete={(v) => dispatch(setAlpha(v))}
          value={localAlpha}
          min={0}
          max={1}
          step={0.01}
          tooltip={{ formatter: (value) => `${value}` }}
        />
      </Form.Item>

      <Form.Item layout="vertical" label="گردی گوشه‌ها">
        <Slider
          onChange={(v) => setLocalRadius(v)}
          onChangeComplete={(v) => dispatch(setBorderRadius(v))}
          value={localRadius}
          min={0}
          max={20}
        />
      </Form.Item>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <Form.Item layout="vertical" label="تم تاریک" valuePropName="checked">
          <Switch onChange={handleTheme} checked={!lightTheme} />
        </Form.Item>

        <Form.Item
          layout="vertical"
          label="ثابت کردن نوار بالا"
          valuePropName="checked"
        >
          <Switch onChange={handleNav} checked={navStick} />
        </Form.Item>

        <Form.Item layout="vertical" label="حالت فشرده" valuePropName="checked">
          <Switch onChange={handleCompactMode} checked={compactMode} />
        </Form.Item>
      </div>
    </Drawer>
  );
};

export default SettingDrawer;
