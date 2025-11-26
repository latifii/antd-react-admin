import React, { useState } from "react";
import {
  Avatar,
  ConfigProvider,
  Input,
  Pagination,
  Popover,
  TableColumnsType,
  TableProps,
  theme,
  Typography,
} from "antd";
// import { formatDateEmail } from '../../../utils/helpers';
import { FaStar, FaRegStar } from "react-icons/fa";
import { useAppDispatch } from "../../../redux/store";
import { FileOutlined, PictureOutlined } from "@ant-design/icons";
import { useSearchParams } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6"; // آیکون بازگشت را برای RTL تغییر دادم
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
import { TiArrowSortedDown } from "react-icons/ti";
import { LuForward, LuReply } from "react-icons/lu";
// تغییر: استفاده از dayjs تنظیم شده برای جلالی
import dayjs from "../../../utils/dayjs";
import { ButtonElm } from "../../../components/Button/ButtonElm";
import { MailType, storeActiveMail } from "../../../redux/slices/mailSlice";
import CustomTable from "../../../components/Table/CustomTable";
import { TbReload } from "react-icons/tb";

const { Search } = Input;
const { Text, Title } = Typography;

const MailListing: React.FC = () => {
  const {
    token: { boxShadowSecondary, colorBorder, borderRadius },
  } = theme.useToken();

  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const mailId = searchParams.get("mailId");

  // ترجمه داده‌های نمونه به فارسی
  const emailData: MailType[] = [
    {
      id: 1,
      key: 1,
      sender: "علی رضایی",
      email: "ali.rezaei@example.com",
      subject: "یادآوری جلسه",
      message:
        "جلسه فردا ساعت ۳ بعدازظهر را فراموش نکنید. بیایید در مورد برنامه‌های تعطیلات آخر هفته صحبت کنیم.",
      time: "2024-12-05 10:00:00",
      tag: "کاری",
      isRead: true,
      starred: true,
    },
    {
      id: 2,
      key: 2,
      sender: "سارا احمدی",
      email: "sara.ahmadi@example.com",
      subject: "برنامه تعطیلات",
      message:
        "بیایید برای آخر هفته برنامه‌ریزی کنیم. پیشنهاد من رفتن به شمال است.",
      time: "2024-12-05 09:30:00",
      tag: "شخصی",
      isRead: true,
      starred: false,
    },
    {
      id: 3,
      key: 3,
      sender: "آمازون",
      email: "no-reply@amazon.com",
      subject: "تایید سفارش",
      message:
        "سفارش شما ارسال شده و به زودی به دستتان می‌رسد. کد پیگیری مرسوله در این ایمیل موجود است.",
      time: "2024-12-04 15:45:00",
      tag: "خرید",
      isRead: false,
      starred: false,
      attachments: [
        {
          attachmentId: "image1",
          type: "image/jpeg",
          url: "https://via.placeholder.com/150",
        },
        {
          attachmentId: "doc1",
          type: "application/pdf",
          url: "/path/to/invoice.pdf",
        },
      ],
    },
    {
      id: 4,
      key: 4,
      sender: "گیت‌هاب",
      email: "support@github.com",
      subject: "هشدار امنیتی",
      message:
        "یک ورود جدید به حساب کاربری شما شناسایی شد. لطفاً اگر شما نبودید رمز عبور خود را تغییر دهید.",
      time: "2024-12-04 20:00:00",
      tag: "امنیت",
      isRead: true,
      starred: true,
    },
    {
      id: 5,
      key: 5,
      sender: "مریم کاظمی",
      email: "maryam.k@example.com",
      subject: "به‌روزرسانی پروژه",
      message:
        "طرح‌های جدید پروژه آماده بررسی هستند. لطفاً نظرات خود را تا پایان روز ارسال کنید.",
      time: "2024-12-03 18:30:00",
      tag: "کاری",
      isRead: false,
      starred: false,
    },
    {
      id: 6,
      key: 6,
      sender: "لینکدین",
      email: "notifications@linkedin.com",
      subject: "درخواست ارتباط جدید",
      message:
        "شما یک درخواست ارتباط جدید از طرف محمد دارید. پروفایل او را بررسی کنید.",
      time: "2024-12-03 08:15:00",
      tag: "اجتماعی",
      isRead: false,
      starred: false,
    },
    {
      id: 7,
      key: 7,
      sender: "زهرا عباسی",
      email: "zahra.abbasi@example.com",
      subject: "جشن تولد",
      message:
        "شما به جشن تولد من در روز جمعه دعوت شده‌اید. خوشحال می‌شوم حضور داشته باشید.",
      time: "2024-12-02 16:00:00",
      tag: "شخصی",
      isRead: true,
      starred: true,
    },
    {
      id: 8,
      key: 8,
      sender: "پی‌پال",
      email: "service@paypal.com",
      subject: "دریافت وجه",
      message:
        "شما مبلغ ۵۰۰ دلار دریافت کردید. جزئیات تراکنش در حساب کاربری شما موجود است.",
      time: "2024-12-02 11:45:00",
      tag: "مالی",
      isRead: true,
      starred: false,
    },
  ];

  // const emailDatam: MailType[] = []
  const totalData = emailData?.length;
  const isPending = false;

  const [, setSearchVal] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);

  const handleMailDetail = (record: MailType) => {
    dispatch(storeActiveMail(record));
    const currentParams = new URLSearchParams(searchParams);
    currentParams.set("mailId", record.id?.toString());
    // navigate(`?${currentParams.toString()}`);
    setSearchParams(currentParams);
  };

  const starTheMail = (
    isStarred: boolean,
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    e.stopPropagation();
    console.log(isStarred);
  };

  const columns: TableColumnsType<MailType> = [
    {
      title: "فرستنده", // Sender -> فرستنده
      width: 230,
      dataIndex: "sender",
      key: "sender",
      ellipsis: true,
      align: "start",
      render: (text, data) => (
        <div>
          <div className="flex-grow flex justify-start items-center gap-2">
            {data.starred ? (
              <ButtonElm
                type="text"
                className="!rounded-full !aspect-square !p-1.5"
                onClick={(e) => starTheMail(false, e)}
              >
                <FaStar size={17} fill="gold" className="cursor-pointer" />
              </ButtonElm>
            ) : (
              <ButtonElm
                type="text"
                className="!rounded-full !aspect-square !p-1.5"
                onClick={(e) => starTheMail(true, e)}
              >
                <FaRegStar size={17} className="text-gray-400 cursor-pointer" />
              </ButtonElm>
            )}
            {data.isRead ? (
              <Text type="secondary" strong>
                {text}
              </Text>
            ) : (
              <Text strong>{text}</Text>
            )}
          </div>
        </div>
      ),
    },
    {
      title: "موضوع", // Subject -> موضوع
      dataIndex: "subject",
      key: "subject",
      ellipsis: true,
      align: "start",
      render: (text: string, data) => (
        <div className="w-full">
          {data.isRead ? (
            <Text ellipsis type="secondary">
              <Text>{text}</Text> - <Text type="secondary">{data.message}</Text>
            </Text>
          ) : (
            <Text ellipsis strong type="secondary">
              <Text>{text}</Text> - <Text type="secondary">{data.message}</Text>
            </Text>
          )}
          {data.attachments && data.attachments?.length > 0 && (
            <div className="attachments mt-2 flex justify-start items-center gap-3">
              {data.attachments.map((attachment, index) => (
                <a
                  style={{ borderColor: colorBorder }}
                  key={index}
                  href={attachment.url ?? undefined}
                  onClick={(e) => e.stopPropagation()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border px-3 py-1 max-w-40 rounded-full flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap"
                >
                  {attachment.type?.startsWith("image") ? (
                    <PictureOutlined className="text-lg text-blue-500" />
                  ) : (
                    <FileOutlined className="text-lg text-green-500" />
                  )}
                  <span className="text-sm overflow-hidden text-ellipsis whitespace-nowrap block">
                    {attachment.url?.split("/").pop()}
                  </span>
                </a>
              ))}
            </div>
          )}
        </div>
      ),
    },
    {
      title: "تاریخ", // Date -> تاریخ
      width: 120,
      dataIndex: "time",
      key: "time",
      ellipsis: true,
      align: "end",
      render: (time: string, data) => {
        // اطمینان از نمایش تاریخ شمسی
        const dateDisplay = dayjs(time).format("YYYY/MM/DD");
        return (
          <>
            {data.isRead ? (
              <Text type="secondary">{dateDisplay}</Text>
            ) : (
              <Text>{dateDisplay}</Text>
            )}
          </>
        );
      },
    },
  ];

  const rowSelection: TableProps<MailType>["rowSelection"] = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: MailType[]) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchVal(e.target.value);
  };

  const height = document.documentElement.clientHeight - 85 - 39;

  const handleReload = () => {
    // recall the table api
    // reload();
    // throttle the reload to about 2000ms
  };

  return (
    <div>
      <div className="flex justify-between items-center my-4">
        <div className="flex-grow flex justify-start items-center gap-2 mr-4">
          <ButtonElm
            className="h-full !bg-transparent"
            type={"text"}
            onClick={handleReload}
            aria-label="بازخوانی"
            title="بازخوانی"
          >
            <TbReload className="opacity-60" size={20} />
          </ButtonElm>

          <Search
            placeholder="جستجو در نام یا جزئیات"
            onChange={handleSearch}
            onSearch={(val) => setSearchVal(val)}
            size="large"
            className="max-w-2xl"
            allowClear
          />
        </div>
        {!mailId && (
          <div className="flex-shrink-0 mr-4">
            <Pagination
              simple
              showSizeChanger
              defaultCurrent={1}
              current={currentPage}
              pageSize={pageSize}
              total={totalData}
              onChange={(page, size) => {
                setCurrentPage(page);
                setPageSize(size);
              }}
              size="small"
            />
          </div>
        )}
      </div>

      {!mailId ? (
        <div
          className="bg-colorBgContainer table-height overflow-hidden h-full"
          style={{ borderRadius: borderRadius }}
        >
          <CustomTable
            columns={columns}
            loading={isPending}
            dataSource={emailData}
            scroll={{ x: "100%", y: height }}
            rowSelection={{ ...rowSelection }}
            pageExist={false}
            style={{ boxShadow: boxShadowSecondary }}
            className="h-full"
            rowClassName={(record) =>
              `${record.isRead ? "" : "bg-colorPrimary/10"} cursor-pointer`
            }
            onRow={(record) => ({
              onClick: () => handleMailDetail(record),
            })}
          />
        </div>
      ) : (
        <MailDetail key={mailId} height={height} />
      )}
    </div>
  );
};

export default MailListing;

/**MailDetail************************************************************************************************************************** */

interface MailDetailProps {
  height: number;
}

const MailDetail: React.FC<MailDetailProps> = ({ height }) => {
  // const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const navigateToListingMail = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete("mailId");
    setSearchParams(newParams);
  };

  // داده‌های نمونه برای جزئیات ایمیل
  const emailData = {
    from: { name: "کافه گربه", email: "coffee.cat@example.com" },
    to: "me@example.com",
    date: "2025-04-20T04:20:00Z",
    subject: "قهوه من کجاست؟! ☕",
    mailedBy: "dev.mail.com",
    signedBy: "auth.dev.com",
    content: `
            <div style="font-family: 'Vazirmatn', Arial, sans-serif; margin: 0 auto; background-color: #FFF; direction: rtl; text-align: right;">
                <p>سلام،</p>
                <p>فقط می‌خواستم پیگیری کنم که سفارش قهوه من چی شد؟ بی‌صبرانه منتظرم!</p>
                <img src="https://preview.redd.it/0xjhfignbbla1.jpg?width=640&crop=smart&auto=webp&s=1bb1758adb1cbba5acacec2efd581d0bfd709829" width="500" alt="Anime character" style="margin-top: 10px;" />
                <p>با تشکر</p>
            </div>
        `,
  };

  const emailDetails = [
    { header: "پاسخ به:", content: "کافه گربه <reply@memes.com>" },
    { header: "به:", content: "me@example.com" },
    {
      header: "تاریخ:",
      content: dayjs(emailData.date).format("D MMMM YYYY، HH:mm"),
    },
    { header: "موضوع:", content: "قهوه من کجاست؟! ☕" },
    { header: "ارسال شده توسط:", content: "tea.com" },
    { header: "امضا شده توسط:", content: "tea.com" },
    { header: "امنیت:", content: "رمزنگاری استاندارد (TLS)" },
  ];

  const popoverContent = (
    <div className="p-2 rounded-lg">
      <table className="w-full">
        <tbody>
          {emailDetails.map((detail, index) => (
            <tr key={index}>
              <td className="text-right pl-3 whitespace-nowrap">
                <Text type="secondary">{detail.header}</Text>
              </td>
              <td className="text-right font-medium" dir="ltr">
                {detail.content}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div
      style={{ backgroundColor: colorBgContainer }}
      className="table-height rounded-lg flex flex-col justify-start items-start"
    >
      <div className="flex items-center justify-between w-full">
        <div className="flex justify-center items-center">
          <ButtonElm
            type="text"
            title="بازگشت"
            size="large"
            className="py-5 !rounded-none"
            onClick={navigateToListingMail}
          >
            {/* تغییر آیکون برای RTL: فلش به راست یعنی بازگشت به لیست */}
            <FaArrowRight />
          </ButtonElm>
        </div>

        <div className="flex justify-center items-center gap-3">
          <Text type="secondary">۲ از ۱,۲۸۶</Text>

          <div>
            <ButtonElm
              type="text"
              title="جدیدتر"
              size="large"
              className="py-5 !rounded-none"
            >
              <MdOutlineArrowBackIos />
            </ButtonElm>
            <ButtonElm
              type="text"
              title="قدیمی‌تر"
              size="large"
              className="py-5 !rounded-none"
            >
              <MdOutlineArrowForwardIos />
            </ButtonElm>
          </div>
        </div>
      </div>

      <ConfigProvider
        theme={{
          algorithm: theme.defaultAlgorithm,
          token: {
            colorTextDescription: "#5E5E5E",
          },
        }}
      >
        <div
          className="bg-white overflow-auto flex-grow p-4 w-full rounded-b-lg"
          style={{ height }}
        >
          {/* Subject and Sender */}
          <Title level={3} className="pl-16 m-0 text-right">
            {emailData.subject}
          </Title>

          <div className="flex items-center justify-between mb-4">
            <div className="flex justify-start items-center gap-3.5">
              <Avatar src={"https://i.pravatar.cc/300?img=40"} size={50}>
                H
              </Avatar>
              <div>
                <Text className="!font-semibold">{emailData.from.name}</Text>
                <Text type="secondary" className="text-xs">
                  {" "}
                  &lt;{emailData.from.email}&gt;
                </Text>
                <br />

                <div className="flex justify-start items-center flex-grow gap-1">
                  <Text className="text-xs" type="secondary">
                    به {emailData.to}
                  </Text>

                  <Popover
                    content={popoverContent}
                    title={null}
                    trigger="click"
                    destroyTooltipOnHide
                    placement="bottomLeft"
                  >
                    <ButtonElm
                      title="نمایش جزئیات"
                      aria-label="Show details"
                      type="text"
                      className="!p-0 !w-fit !h-fit"
                    >
                      <TiArrowSortedDown size={15} />
                    </ButtonElm>
                  </Popover>
                </div>
              </div>
            </div>
            <Text type="secondary" className="text-xs">
              {/* فرمت تاریخ شمسی */}
              {dayjs(emailData.date).format("D MMMM YYYY، HH:mm")}
            </Text>
          </div>

          {/* Email Content */}
          <div className="pl-0 lg:pl-16">
            <div
              className="bg-white mt-10 overflow-auto text-right"
              style={{ scrollbarWidth: "thin" }}
            >
              {/* check out react letter and sanitize */}
              {/* <pre className="text-gray-800 whitespace-pre-wrap">{emailData.content}</pre> */}
              {emailData.content && (
                <div
                  className="text-gray-800"
                  dangerouslySetInnerHTML={{ __html: emailData.content }}
                />
              )}
            </div>

            <div className="mt-10 flex justify-start items-center gap-3">
              <ButtonElm
                type="default"
                icon={<LuReply className="text-lg" />}
                className="!bg-white"
              >
                پاسخ
              </ButtonElm>
              <ButtonElm
                type="default"
                icon={<LuForward className="text-lg" />}
                className="!bg-white"
              >
                ارسال
              </ButtonElm>
            </div>
          </div>
        </div>
      </ConfigProvider>
    </div>
  );
};
