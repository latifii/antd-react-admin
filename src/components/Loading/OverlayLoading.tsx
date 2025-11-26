import { Spin } from 'antd'

const OverlayLoading = () => {
    return (
        <>
            <div className={`flex justify-center items-center z-50 bg-black/25 top-0 left-0 w-screen fixed h-screen overflow-hidden`} >
                <Spin size="large" />
            </div>
        </>
    )
}

export default OverlayLoading