import { Spin, theme } from 'antd'

interface InitialSusLoadingProps {
    className?: string;
}

const InitialSusLoading: React.FC<InitialSusLoadingProps> = ({ className }) => {

    const {
        token: { colorBgLayout }
    } = theme.useToken();

    return (
        <div className={`w-full h-full min-h-24 flex justify-center items-center z-50 init ${className}`}
            style={{ backgroundColor: colorBgLayout }}
        >
            <Spin size="large" />
        </div>
    )
}

export default InitialSusLoading