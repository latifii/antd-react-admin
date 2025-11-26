import { useState, useMemo } from "react";
import { Badge } from "antd";
import { FaBell } from "react-icons/fa";

import NotificationDrawer from "./NotificationDrawer";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import {
  notificationPageSize,
  useGetNotification,
} from "../../apis/siteDataApi";
import { updateLatestNotification } from "../../redux/slices/storageSlice";
import { ButtonElm } from "../Button/ButtonElm";

const Notification = () => {
  const dispatch = useAppDispatch();
  const [openNotifications, setOpenNotifications] = useState(false);

  const { data } = useGetNotification({ pageParams: { page: 0 } });
  const notifications = useMemo(
    () => data?.pages.flatMap((p) => p.data) || [],
    [data]
  );

  const latestNotify = useAppSelector(
    (state) => state.storageSlice.latestNotification
  );

  const count = useMemo(() => {
    let c = 0;
    for (let i = 0; i < notifications.length; i++) {
      if (latestNotify?.id === notifications[i].id) break;
      if (!notifications[i].isRead) c++;
    }
    return c;
  }, [notifications, latestNotify]);

  const onOpen = () => {
    setOpenNotifications(true);
    if (notifications.length > 0) {
      dispatch(
        updateLatestNotification({
          id: notifications[0].id,
          time: notifications[0].lastActive,
        })
      );
    }
  };

  return (
    <>
      <ButtonElm
        type="text"
        className="!p-1 hover:!bg-transparent"
        onClick={onOpen}
      >
        <Badge count={count} overflowCount={notificationPageSize - 1}>
          <FaBell size={20} />
        </Badge>
      </ButtonElm>

      <NotificationDrawer
        openNotifications={openNotifications}
        setOpenNotifications={setOpenNotifications}
      />
    </>
  );
};

export default Notification;
