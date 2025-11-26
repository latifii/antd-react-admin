import { createContext, useContext, ReactNode } from 'react';
import { message as antdMessage } from 'antd';
import type { MessageInstance } from 'antd/es/message/interface';

const MessageApiContext = createContext<MessageInstance | null>(null);

const MessageProviderContent = ({ children }: { children: ReactNode }) => {
    const [messageApi, contextHolder] = antdMessage.useMessage();

    return (
        <MessageApiContext.Provider value={messageApi}>
            {contextHolder}
            {children}
        </MessageApiContext.Provider>
    );
};
export default MessageProviderContent


export const useMessageAnt = (): MessageInstance => {
    const context = useContext(MessageApiContext);
    if (context === null) {
        throw new Error('useMessageApi must be used within an AppMessageProvider');
    }
    return context;
};
