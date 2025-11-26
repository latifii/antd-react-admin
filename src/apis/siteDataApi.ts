import { useInfiniteQuery } from "@tanstack/react-query";
import { PageParamsType } from "./types";

export interface NotificationType {
  id: number;
  title: string;
  lastActive: string;
  isRead: boolean;
}

export type NotificationResponse = {
  data: NotificationType[];
  totalPage: number;
  totalData: number;
  pageNumber: number;
  hasNext: boolean;
};

export const getNotification = async (
  params: GetNotificationParams
): Promise<NotificationResponse> => {
  const notifications: NotificationType[] = [
    {
      id: 2660,
      title: "چای می‌خوری یا قهوه؟",
      lastActive: new Date(Date.now() - 1000).toISOString(),
      isRead: false,
    },
    {
      id: 23,
      title: "جمعه دیپلوی می‌کنی؟ خیلی شجاعی!",
      lastActive: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
      isRead: false,
    },
    {
      id: 21,
      title: "کدت داره فرار می‌کنه! سریع بگیرش قبل از اینکه باگ بشه!",
      lastActive: "2025-04-08T14:19:00Z",
      isRead: false,
    },
    {
      id: 27,
      title: "اخطار: کیبورد ممکن است حاوی آثار بهره‌وری باشد.",
      lastActive: "2025-04-08T14:03:00Z",
      isRead: true,
    },
    {
      id: 30,
      title: "کد جدید: با ۲۰۰٪ باگ بیشتر!",
      lastActive: "2025-04-08T13:40:00Z",
      isRead: false,
    },
    {
      id: 13,
      title: "رفکتور کامل شد. هیچ‌چیز کار نمی‌کنه، اما کد خوشگل‌تر شد.",
      lastActive: "2025-04-08T13:26:00Z",
      isRead: true,
    },
    {
      id: 20,
      title: "دستگاه قهوه رسماً یک dependency توسعه محسوب می‌شود.",
      lastActive: "2025-04-08T09:15:00Z",
      isRead: true,
    },
    {
      id: 18,
      title: "اخطار: کیبورد ممکن است حاوی آثار بهره‌وری باشد.",
      lastActive: "2025-04-08T05:08:00Z",
      isRead: true,
    },
    {
      id: 24,
      title: "بیلد با موفقیت شکست خورد!",
      lastActive: "2025-04-08T04:49:00Z",
      isRead: true,
    },
    {
      id: 8,
      title: "اخطار: کیبورد ممکن است حاوی آثار بهره‌وری باشد.",
      lastActive: "2025-04-08T01:10:00Z",
      isRead: true,
    },
    {
      id: 9,
      title: "پچ جدید: با ۲۰۰٪ باگ بیشتر!",
      lastActive: "2025-04-08T01:01:00Z",
      isRead: true,
    },
    {
      id: 17,
      title: "باگ‌ها رسماً به‌عنوان فیچر پذیرفته شدند!",
      lastActive: "2025-04-07T23:06:00Z",
      isRead: true,
    },
    {
      id: 9,
      title: "باگ‌ها رسماً به‌عنوان فیچر پذیرفته شدند!",
      lastActive: "2025-04-07T20:33:00Z",
      isRead: true,
    },
    {
      id: 25,
      title: "رفکتور کامل شد. هیچ‌چیز کار نمی‌کنه، اما کد خوشگل‌تر شد.",
      lastActive: "2025-04-07T17:48:00Z",
      isRead: false,
    },
    {
      id: 12,
      title: "اخطار: کیبورد ممکن است حاوی آثار بهره‌وری باشد.",
      lastActive: "2025-04-07T16:03:00Z",
      isRead: false,
    },
    {
      id: 28,
      title: "باگ‌ها رسماً به‌عنوان فیچر پذیرفته شدند!",
      lastActive: "2025-04-07T15:12:00Z",
      isRead: false,
    },
    {
      id: 2,
      title: "۴۰۴: انگیزه یافت نشد. ریست کردی؟",
      lastActive: "2025-04-07T05:10:00Z",
      isRead: false,
    },
    {
      id: 29,
      title: "پیغام کامیت: «یه چیزایی درست شد» — آینده خودت متنفر میشه.",
      lastActive: "2025-04-07T02:17:00Z",
      isRead: false,
    },
  ];

  const res: NotificationResponse = {
    data: notifications,
    totalPage: 2,
    totalData: notifications.length,
    pageNumber: 0,
    hasNext: true,
  };

  return new Promise((resolve) => setTimeout(() => resolve(res), 1500));
};

interface GetNotificationParams {
  pageParams: Pick<PageParamsType, "page">;
}

export const notificationPageSize = 20;

export const useGetNotification = ({ pageParams }: GetNotificationParams) => {
  const defaultPageParams: PageParamsType = {
    page: 1,
    pageSize: notificationPageSize,
  };

  const mergedPageParams = { ...defaultPageParams, ...pageParams };

  return useInfiniteQuery({
    queryKey: ["getNotification", mergedPageParams],
    queryFn: async ({ pageParam }) => {
      const pageParamsWithPage = { ...mergedPageParams, page: pageParam ?? 1 };
      const result = await getNotification({ pageParams: pageParamsWithPage });
      return result;
    },
    initialPageParam: mergedPageParams.page,
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.pageNumber + 1 : undefined,
  });
};
