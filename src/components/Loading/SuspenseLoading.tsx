import { Spin } from 'antd'

interface SuspenseLoadingProps {
    className?: string;
}

const SuspenseLoading: React.FC<SuspenseLoadingProps> = ({ className }) => {

    return (
        <div className={`w-full h-full min-h-24 flex justify-center items-center z-50 ${className}`}>
            <Spin size="large" />
        </div>
    )
}

export default SuspenseLoading