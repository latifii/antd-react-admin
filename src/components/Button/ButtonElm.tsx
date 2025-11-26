import { Button, ButtonProps } from 'antd';
import { FC } from 'react';


export const ButtonElm: FC<ButtonProps> = ({
    type = 'primary',
    className = '',
    children,
    ...rest
}) => {
    return (
        <Button
            type={type}
            className={`${className} cursor-pointer duration-200`}
            {...rest}
        >
            {children}
        </Button>
    );
};