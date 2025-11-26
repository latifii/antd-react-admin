import { useCallback, useMemo, useState } from "react";
import {
  Image,
  Input,
  Popconfirm,
  Select,
  Space,
  Table,
  Tag,
  theme,
  Tooltip,
  Typography,
} from "antd";
import { EyeOutlined, WarningOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import CustomTable from "../../components/Table/CustomTable";
import { noData } from "../../utils/helpers";
import { FcInfo } from "react-icons/fc";
import { ButtonElm } from "../../components/Button/ButtonElm";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline, MdPowerSettingsNew } from "react-icons/md";

const { Text, Title } = Typography;
const { Search } = Input;

const sKey = {
  All: "all",
  Active: "active",
  Inactive: "inactive",
  "Out of Stock": "out_of_stock",
  Discontinued: "discontinued",
} as const;

const sKeyLabels: Record<string, string> = {
  all: "همه",
  active: "فعال",
  inactive: "غیرفعال",
  out_of_stock: "ناموجود",
  discontinued: "توقف تولید",
};

const productAdjectives = [
  "هوشمند",
  "پیشرفته",
  "کلاسیک",
  "مدرن",
  "حرفه‌ای",
  "زیبا",
  "اقتصادی",
];
const productNouns = [
  "دوربین 4K",
  "گوشی موبایل",
  "ابزار دقیق",
  "لوازم جانبی",
  "پوشاک ورزشی",
  "گجت",
  "کریستال آبی",
];
const vendorNames = [
  "بازرگانی قهوه",
  "چای برتر",
  "تامین کالای باباجی",
  "توزیع گوستاوو",
  "فروشگاه آبی زرد",
];
const categoryNames = [
  "الکترونیک",
  "مد و پوشاک",
  "خانه و آشپزخانه",
  "ورزش و سفر",
  "اسباب‌بازی",
];

interface Product {
  id: number;
  title: string;
  image_url: string;
  vendor: string;
  phone: string;
  email: string;
  start: string | null;
  end: string | null;
  category: string;
  detail: string;
  status: boolean;
  is_featured: boolean;
  is_popular: boolean;
  cat_info: { title: string };
  warehouse_info: { warehouse: string };
  stock: number;
  rating: number;
  orders: number;
  productState: "active" | "inactive" | "discontinued";
}

const fakeProducts: Product[] = Array.from({ length: 22 }, (_, index) => {
  function randomFromArray<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
  }

  const productName = `${randomFromArray(productNouns)} ${randomFromArray(
    productAdjectives
  )}`;
  const vendorName = randomFromArray(vendorNames);
  const categoryName = randomFromArray(categoryNames);

  const stock = Math.floor(Math.random() * 10000);
  const rating = Number((Math.random() * 5).toFixed(1));
  const orders = Math.floor(Math.random() * 10000);

  let productState: "active" | "inactive" | "discontinued";
  if (index % 5 === 0) productState = "discontinued";
  else if (index % 3 === 0) productState = "inactive";
  else productState = "active";

  const res = {
    id: index + 69420,
    title: productName,
    image_url: `https://picsum.photos/150?random=${index + 1}`,
    vendor: vendorName,
    phone: `0912${Math.floor(1000000 + Math.random() * 9000000)}`,
    email: `contact@test.com`,
    start: dayjs().subtract(index, "day").toISOString(),
    end: index % 7 === 0 ? dayjs().add(index, "day").toISOString() : null,
    category: categoryName,
    detail: `توضیحات دقیق برای محصول ${productName}. لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.`,
    status: index % 2 === 0,
    is_featured: index % 3 === 0,
    is_popular: index % 4 === 0,
    cat_info: { title: categoryName },
    warehouse_info: { warehouse: `انبار شماره ${(index % 3) + 1}` },
    stock,
    rating,
    orders,
    productState,
  };
  return res;
});

const TablesPg: React.FC = () => {
  const [searchKey, setSearchKey] = useState<string>(sKey.All);
  const [searchVal, setSearchVal] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  const {
    token: { colorBgContainer, colorText, borderRadiusLG, boxShadow },
  } = theme.useToken();

  const searchByOptions = Object.keys(sKey).map((key) => ({
    label: sKeyLabels[sKey[key as keyof typeof sKey]], // استفاده از لیبل فارسی
    value: sKey[key as keyof typeof sKey],
  }));

  const totalData = fakeProducts.length;

  const fullDateFormat = useCallback(
    (date: string | undefined): string | null => {
      return date ? dayjs(date).format("YYYY/MM/DD HH:mm") : null;
    },
    []
  );

  const displayData = useMemo(() => {
    const lowerCaseSearch = searchVal?.toLowerCase();

    return fakeProducts.filter((data) => {
      if (searchKey !== sKey.All && data.productState !== searchKey) {
        return false;
      }

      const formattedStart = data.start ? fullDateFormat(data.start) : null;
      const formattedEnd = data.end ? fullDateFormat(data.end) : null;

      const fieldsToCheck = [
        data.id.toString(),
        data.title.toLowerCase(),
        formattedStart || "",
        formattedEnd || "",
        data.detail.toLowerCase(),
        data.vendor.toLowerCase(),
        data.email.toLowerCase(),
        data.phone.toLowerCase(),
        data.warehouse_info.warehouse.toLowerCase(),
        data.category.toLowerCase(),
      ];

      return fieldsToCheck.some((field) => field.includes(lowerCaseSearch));
    });
  }, [searchVal, searchKey, fullDateFormat]);

  const changeSearchParams = (value: string) => {
    setSearchKey(value);
    setCurrentPage(1);
  };

  const columns = [
    {
      title: "ردیف",
      width: 80,
      align: "center",
      dataIndex: "id",
      sorter: (a: Product, b: Product) => a.id - b.id,
      render: (text: number) => (
        <Text type="secondary">
          #<Text>{text.toLocaleString("fa-IR").replace(/,/g, "")}</Text>
        </Text>
      ),
    },
    {
      title: "محصول",
      // width: 250,
      align: "right", // راست‌چین برای نام محصول
      dataIndex: "title",
      render: (name: string, record: Product) => (
        <div className="mx-auto w-full flex justify-between items-center gap-3">
          {record.image_url ? (
            <div className="w-14 flex-shrink-0">
              <Image
                src={record.image_url}
                alt="Product"
                className="w-full aspect-square rounded object-cover"
                preview={{ mask: <EyeOutlined /> }}
              />
            </div>
          ) : null}
          <div className="flex-grow flex flex-col gap-0.5 text-right">
            <Text strong>{name}</Text>
            <Text type="secondary" className="text-xs">
              {record.email}
            </Text>
          </div>
        </div>
      ),
    },
    {
      title: "فروشنده",
      width: 200,
      align: "center",
      render: (record: Product) => (
        <div className="cell-center">
          <div className="flex flex-col items-center">
            <Text strong>{record.vendor}</Text>
            <Text type="secondary">{record.phone}</Text>
          </div>
        </div>
      ),
    },
    {
      title: "زمان‌بندی",
      width: 220,
      align: "center",
      render: (record: Product) => (
        <div className="w-full flex flex-col gap-1 text-sm">
          <div className="flex justify-between items-center">
            <Text type="secondary">از:</Text>
            {record.start ? (
              <Text>{fullDateFormat(record.start)}</Text>
            ) : (
              <Text type="secondary">---</Text>
            )}
          </div>
          <div className="flex justify-between items-center">
            <Text type="secondary">تا:</Text>
            {record.end ? (
              <Text>{fullDateFormat(record.end)}</Text>
            ) : (
              <Text type="secondary">---</Text>
            )}
          </div>
        </div>
      ),
    },
    {
      title: "موجودی و فروش",
      width: 180,
      align: "center",
      render: (record: Product) => {
        const isOrdersExceed = record.orders > record.stock;

        return (
          <div className={`w-full flex flex-col gap-1`}>
            <div className="flex justify-between items-center">
              <Text type="secondary">موجودی:</Text>
              <Text>{record.stock.toLocaleString("fa-IR")}</Text>
            </div>
            <div className="flex justify-between items-center">
              <Text type="secondary">سفارش‌ها:</Text>
              <div className="flex items-center gap-1">
                <Text type={isOrdersExceed ? "danger" : undefined}>
                  {record.orders.toLocaleString("fa-IR")}
                </Text>
                {isOrdersExceed && (
                  <Tooltip title="سفارش‌ها بیشتر از موجودی است">
                    <WarningOutlined style={{ color: "#FAAD14" }} />
                  </Tooltip>
                )}
              </div>
            </div>
          </div>
        );
      },
    },
    {
      title: "دسته‌بندی",
      width: 150,
      align: "center",
      dataIndex: ["cat_info", "title"],
      render: (category: string) => <Text>{category}</Text>,
    },
    Table.EXPAND_COLUMN,
    {
      title: "توضیحات",
      width: 250,
      align: "center",
      dataIndex: "detail",
      render: (detail: string) => (
        <div className="cell-center">
          <div
            className="text-center w-full line-clamp-3 text-xs"
            dangerouslySetInnerHTML={{ __html: detail }}
          />
        </div>
      ),
    },
    {
      title: "انبار",
      width: 200,
      align: "center",
      dataIndex: ["warehouse_info", "warehouse"],
      render: (store: string) =>
        store ? (
          <div className="cell-center">
            <Space>
              <div>{store}</div>
              <Tooltip title={"مشاهده جزئیات"}>
                <FcInfo size={20} className="cursor-pointer duration-300" />
              </Tooltip>
            </Space>
          </div>
        ) : (
          noData()
        ),
    },
    {
      title: "وضعیت",
      width: 120,
      align: "center",
      dataIndex: "status",
      render: (status: boolean) => (
        <div className="cell-center">
          {status ? (
            <Tag color="green">فعال</Tag>
          ) : (
            <Tag color="red">غیرفعال</Tag>
          )}
        </div>
      ),
    },
    {
      title: "ویژه",
      width: 120,
      align: "center",
      dataIndex: "is_featured",
      render: (featured: boolean) => (
        <div className="cell-center">
          {featured ? (
            <Tag color="green">بله</Tag>
          ) : (
            <Tag color="orange">خیر</Tag>
          )}
        </div>
      ),
    },
    {
      title: "پرفروش",
      width: 120,
      align: "center",
      dataIndex: "is_popular",
      render: (popular: boolean) => (
        <div className="cell-center">
          {popular ? (
            <Tag color="green">بله</Tag>
          ) : (
            <Tag color="orange">خیر</Tag>
          )}
        </div>
      ),
    },
    {
      title: "امتیاز",
      width: 100,
      align: "center",
      dataIndex: "rating",
      render: (rating: number) => (
        <div className="cell-center">
          <Tag
            color={rating >= 4 ? "green" : "orange"}
            style={{ direction: "ltr" }}
          >
            {rating} ★
          </Tag>
        </div>
      ),
    },
    {
      title: "عملیات",
      // fixed: 'right',
      width: 150,
      align: "center",
      render: (record: Product) => {
        switch (record.productState) {
          case "active":
            return (
              <div className="cell-center">
                <Space size="small">
                  <Tooltip title="ویرایش">
                    <ButtonElm style={{ padding: "0 5px" }} type="text">
                      <CiEdit size={20} className="text-blue-600" />
                    </ButtonElm>
                  </Tooltip>
                  <Tooltip title="حذف">
                    <Popconfirm
                      title="حذف محصول"
                      description="آیا از حذف این محصول اطمینان دارید؟"
                      okText="بله"
                      cancelText="خیر"
                    >
                      <ButtonElm style={{ padding: "0 5px" }} type="text">
                        <MdDeleteOutline size={20} className="text-red-500" />
                      </ButtonElm>
                    </Popconfirm>
                  </Tooltip>
                  <Tooltip title="غیرفعال‌سازی">
                    <Popconfirm
                      title="غیرفعال کردن محصول"
                      description="آیا از غیرفعال کردن این محصول اطمینان دارید؟"
                      okText="بله"
                      cancelText="خیر"
                    >
                      <ButtonElm style={{ padding: "0 5px" }} type="text">
                        <MdPowerSettingsNew
                          size={20}
                          className="text-red-500"
                        />
                      </ButtonElm>
                    </Popconfirm>
                  </Tooltip>
                </Space>
              </div>
            );
          case "inactive":
            return (
              <div className="cell-center">
                <Space size="small">
                  <Tooltip title="فعال‌سازی">
                    <ButtonElm style={{ padding: "0 5px" }} type="text">
                      <Popconfirm
                        title="فعال کردن محصول"
                        description="آیا از فعال کردن این محصول اطمینان دارید؟"
                        okText="بله"
                        cancelText="خیر"
                      >
                        <MdPowerSettingsNew
                          size={20}
                          className="text-green-500"
                        />
                      </Popconfirm>
                    </ButtonElm>
                  </Tooltip>
                  <Tooltip title="حذف">
                    <Popconfirm
                      title="حذف محصول"
                      description="آیا از حذف این محصول اطمینان دارید؟"
                      okText="بله"
                      cancelText="خیر"
                    >
                      <ButtonElm style={{ padding: "0 5px" }} type="text">
                        <MdDeleteOutline
                          size={20}
                          className="cursor-pointer text-red-500"
                        />
                      </ButtonElm>
                    </Popconfirm>
                  </Tooltip>
                </Space>
              </div>
            );
          case "discontinued":
          default:
            return <Text type="secondary">بدون عملیات</Text>;
        }
      },
    },
  ];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchVal(e.target.value);
  };

  return (
    <>
      <div
        style={{
          background: colorBgContainer,
          boxShadow: boxShadow,
          borderRadius: borderRadiusLG,
        }}
        className="flex-grow"
      >
        <div className="flex justify-between flex-wrap items-center gap-3 p-6">
          <Title level={4} className="text-right" style={{ color: colorText }}>
            جدول محصولات
          </Title>
          <Space className="flex-wrap">
            <Space>
              <Text strong>فیلتر بر اساس:</Text>
              <Select
                className="w-32"
                placeholder="انتخاب کنید..."
                onChange={changeSearchParams}
                value={searchKey}
                options={searchByOptions}
                // جهت دراپ داون
                style={{ textAlign: "right" }}
              />
            </Space>
            <Search
              placeholder="جستجوی محصولات..."
              onChange={handleSearch}
              onSearch={(val) => setSearchVal(val)}
              className="w-full md:w-72"
              allowClear
            />
          </Space>
        </div>
        <div>
          <CustomTable
            columns={columns}
            loading={false}
            dataSource={displayData}
            scroll={{ x: columns.length * 160, y: "80vh" }}
            expandable={{
              columnWidth: 30,
              expandedRowRender: (record: Product) => (
                <div className="cell-center">
                  <div
                    className="text-center w-full"
                    dangerouslySetInnerHTML={{ __html: record.detail }}
                  />
                </div>
              ),
            }}
            totalData={totalData}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            pageSize={pageSize}
            setPageSize={setPageSize}
          />
        </div>
      </div>
    </>
  );
};

export default TablesPg;
