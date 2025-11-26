// FILE: src/components/Layout/Header/NotificationDrawer.tsx

import { Drawer, List, Avatar, Skeleton, Tooltip } from "antd";
import { useEffect, useRef } from "react";

import dayjs from "../../utils/dayjs";
import { NotificationType, useGetNotification } from "../../apis/siteDataApi";

interface Props {
  openNotifications: boolean;
  setOpenNotifications: (v: boolean) => void;
}

const NotificationDrawer = ({
  openNotifications,
  setOpenNotifications,
}: Props) => {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isPending } =
    useGetNotification({
      pageParams: { page: 0 },
    });

  const notifications = data?.pages.flatMap((p) => p.data) || [];

  useEffect(() => {
    if (!loadMoreRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && hasNextPage && !isFetchingNextPage)
        fetchNextPage();
    });

    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <Drawer
      title="اعلان‌ها"
      placement="left"
      open={openNotifications}
      onClose={() => setOpenNotifications(false)}
      width={500}
      footer={null}
      destroyOnClose
      styles={{ body: { padding: 0 } }}
    >
      <List
        itemLayout="horizontal"
        loading={isPending}
        dataSource={notifications}
        loadMore={
          <div ref={loadMoreRef}>
            {isFetchingNextPage && (
              <div style={{ padding: "0.5rem 1rem" }}>
                <Skeleton avatar title paragraph={{ rows: 1 }} active />
              </div>
            )}
          </div>
        }
        renderItem={(item: NotificationType) => (
          <List.Item className="cursor-pointer mx-2 py hover:bg-colorPrimary/20 transition">
            <List.Item.Meta
              avatar={
                <Avatar
                  size={45}
                  className="px-2"
                  src="https://i.pravatar.cc/300?img=22"
                />
              }
              title={
                <Tooltip title={item.title}>
                  <span className="font-medium line-clamp-1">{item.title}</span>
                </Tooltip>
              }
              description={<span>{dayjs(item.lastActive).fromNow()}</span>}
            />
          </List.Item>
        )}
      />
    </Drawer>
  );
};

export default NotificationDrawer;
