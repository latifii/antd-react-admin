export interface PageParamsType {
    page: number;
    pageSize: number;
}

export interface Attachment {
    attachmentId: string;
    type: 'image/jpeg' | 'audio/mpeg' | 'audio/ogg; codecs=opus' | 'video/mp4' | 'application/pdf' | 'image/gif';
    url: string | null;
    previewUrl?: string | null;
    name?: string | null;
    caption?: string | null;
    hashCode?: null | string;
}