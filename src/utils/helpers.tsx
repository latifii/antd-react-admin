import { Typography } from "antd";
import dayjs from "dayjs";
const { Text } = Typography;


export const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
}

export const upperFirst = (str: string) => {
    return str
        .split('-')
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ')
}

export const formatDateEmail = (date: string | Date): string => {
    const now = dayjs();
    const d = dayjs(date);

    return now.diff(d, 'hour') < 24
        ? d.format('h:mm A')
        : now.year() === d.year()
            ? d.format('MMM D')
            : d.format('MM/DD/YYYY');
};

export const noData = (str?: string) => {
    const data = str ? str : <Text type='secondary'>N/A</Text>
    return data
}

function binaryStringToBlob(binaryString: string, mimeType: string) {
    const byteArray = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
        byteArray[i] = binaryString.charCodeAt(i);
    }
    return new Blob([byteArray], { type: mimeType });
}

export const binaryToURL = (audioStr: string, mimeType: string) => {
    const blob = binaryStringToBlob(audioStr, mimeType);
    const url = URL.createObjectURL(blob);
    return url;
}