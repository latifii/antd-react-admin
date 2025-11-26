import { FloatButton } from 'antd'
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { SunOutlined, MoonOutlined, PushpinFilled, PushpinOutlined } from '@ant-design/icons';
import { toggleNavStick, toggleTheme } from '../../redux/slices/themeSlice';

export const FloatTheme = () => {
    const dispatch = useAppDispatch();
    const lightTheme = useAppSelector((state) => state.themeSlice.lightTheme);

    const handleTheme = (checked: boolean) => {
        dispatch(toggleTheme(!checked));
    };

    return (
        <FloatButton
            tooltip={lightTheme ? "Dark Mode" : "Light Mode"}
            onClick={() => handleTheme(lightTheme)}
            icon={lightTheme ? <MoonOutlined /> : <SunOutlined />}
        />
    )
}

export const FloatPinNav = () => {

    const dispatch = useAppDispatch();
    const navStick = useAppSelector((state) => state.themeSlice.navStick);

    const handleNav = (checked: boolean) => {
        dispatch(toggleNavStick(checked));
    };

    return (
        <FloatButton
            tooltip={navStick ? "Unpin Navbar" : "Pin Navbar"}
            onClick={() => handleNav(!navStick)}
            icon={navStick ? <PushpinFilled /> : <PushpinOutlined />}
        />
    )
}