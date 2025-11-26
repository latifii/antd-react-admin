import {
  Col,
  DatePicker,
  Descriptions,
  DescriptionsProps,
  Form,
  FormProps,
  Input,
  message,
  Result,
  Row,
  Select,
  Steps,
  theme,
  Typography,
} from "antd";
import React, { useState } from "react";
import { ButtonElm } from "../../components/Button/ButtonElm";
import { noData } from "../../utils/helpers";
import { FormFieldsType, useAddMultiPageForm } from "../../apis/formApi";
import { useSearchParams } from "react-router-dom";
import dayjs from "../../utils/dayjs";

const { Title, Text } = Typography;

interface StepDefinition {
  title: string;
  fields: string[];
}

const steps: StepDefinition[] = [
  {
    title: "اطلاعات کاربری",
    fields: ["fname", "lname", "dob", "email", "password", "confirmPassword"],
  },
  {
    title: "آدرس",
    fields: ["address1", "address2", "city", "state", "zip"],
  },
  {
    title: "شبکه‌های اجتماعی",
    fields: ["publicEmail", "bio"],
  },
  {
    title: "تایید نهایی",
    fields: [],
  },
];

const FormUserInfo = () => {
  return (
    <>
      <Title level={4}>درباره من</Title>
      <>
        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item
              label="نام"
              name="fname"
              rules={[
                { required: true, message: "لطفاً نام خود را وارد کنید" },
              ]}
            >
              <Input placeholder="مثال: علی" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              label="نام خانوادگی"
              name="lname"
              rules={[
                {
                  required: true,
                  message: "لطفاً نام خانوادگی خود را وارد کنید",
                },
              ]}
            >
              <Input placeholder="مثال: رضایی" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item label="تاریخ تولد" name="dob">
              <DatePicker
                style={{ width: "100%" }}
                placeholder="انتخاب تاریخ"
                disabledDate={(current) =>
                  current && current > dayjs().endOf("day")
                }
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item
              label="ایمیل"
              name="email"
              rules={[
                { required: true, message: "لطفاً ایمیل خود را وارد کنید" },
                { type: "email", message: "لطفاً یک ایمیل معتبر وارد کنید" },
              ]}
            >
              <Input placeholder="ali@example.com" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item
              label="رمز عبور"
              name="password"
              rules={[
                { required: true, message: "لطفاً رمز عبور را وارد کنید." },
                { min: 6, message: "رمز عبور باید حداقل ۶ کاراکتر باشد." },
                {
                  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,
                  message:
                    "رمز عبور باید حداقل شامل یک حرف بزرگ، یک حرف کوچک و یک عدد باشد.",
                },
              ]}
            >
              <Input.Password placeholder="رمز عبور" />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item
              label="تکرار رمز عبور"
              name="confirmPassword"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "لطفاً رمز عبور خود را تایید کنید!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("رمز عبور جدید وارد شده مطابقت ندارد!")
                    );
                  },
                }),
              ]}
            >
              <Input.Password placeholder="تکرار رمز عبور" />
            </Form.Item>
          </Col>
        </Row>
      </>
    </>
  );
};

const FormAddress = () => {
  return (
    <>
      <Title level={4}>آدرس سکونت</Title>
      <>
        <Form.Item
          label="آدرس اول"
          name="address1"
          rules={[
            { required: true, message: "لطفاً آدرس خیابان خود را وارد کنید" },
          ]}
        >
          <Input placeholder="خیابان اصلی، پلاک ۱" />
        </Form.Item>

        <Form.Item label="آدرس دوم" name="address2">
          <Input placeholder="واحد، طبقه و..." />
        </Form.Item>

        <div className="flex flex-col lg:flex-row justify-center items-center gap-x-3">
          <Form.Item
            label="شهر"
            name="city"
            className="w-full"
            rules={[{ required: true, message: "لطفاً شهر خود را وارد کنید" }]}
          >
            <Input placeholder="تهران" />
          </Form.Item>

          <div className="w-full flex flex-col md:flex-row justify-center items-center gap-x-3">
            <Form.Item
              label="استان"
              name="state"
              className="w-full"
              rules={[
                { required: true, message: "لطفاً استان خود را انتخاب کنید" },
              ]}
            >
              <Select
                placeholder="انتخاب استان"
                options={[
                  { label: "تهران", value: "tehran" },
                  { label: "اصفهان", value: "isfahan" },
                  { label: "فارس", value: "fars" },
                  { label: "خراسان رضوی", value: "khorasan_razavi" },
                ]}
              />
            </Form.Item>
            <Form.Item
              label="کد پستی"
              name="zip"
              className="w-full"
              rules={[
                { required: true, message: "لطفاً کد پستی را وارد کنید." },
              ]}
            >
              <Input placeholder="1234567890" />
            </Form.Item>
          </div>
        </div>
      </>
    </>
  );
};

const FormPgThree = () => {
  return (
    <>
      <Title level={4}>شبکه‌های اجتماعی</Title>

      <>
        <Form.Item
          label="ایمیل عمومی"
          name="publicEmail"
          rules={[
            { required: true, message: "لطفاً ایمیل را وارد کنید" },
            { type: "email", message: "لطفاً یک ایمیل معتبر وارد کنید" },
          ]}
        >
          <Input placeholder="از آدرسی استفاده کنید که زیاد از آن استفاده نمی‌کنید" />
        </Form.Item>

        <Form.Item label="بیوگرافی" name="bio">
          <Input.TextArea
            rows={4}
            className="[color-scheme:light] dark:[color-scheme:dark]"
            placeholder="چند کلمه درباره خودتان یا کاری که انجام می‌دهید بنویسید."
          />
        </Form.Item>
      </>
    </>
  );
};

const ConfirmDetails: React.FC<{ values: Partial<FormFieldsType> }> = ({
  values,
}) => {
  console.log(values);

  const items: DescriptionsProps["items"] = [
    {
      key: "fname",
      label: "نام",
      children: noData(values?.fname),
    },
    {
      key: "lname",
      label: "نام خانوادگی",
      children: noData(values?.lname),
    },
    {
      key: "dob",
      label: "تاریخ تولد",
      // فرمت تاریخ شمسی
      children: values?.dob
        ? dayjs(values.dob).format("YYYY/MM/DD")
        : noData(values?.dob),
    },
    {
      key: "email",
      label: "ایمیل حساب کاربری",
      children: noData(values?.email),
    },
    {
      key: "publicEmail",
      label: "ایمیل عمومی",
      span: "filled",
      children: noData(values?.publicEmail),
    },
    {
      key: "address1",
      label: "آدرس اول",
      span: "filled",
      children: noData(values?.address1),
    },
    {
      key: "address2",
      label: "آدرس دوم",
      span: "filled",
      children: noData(values?.address2),
    },
    {
      key: "city",
      label: "شهر",
      children: noData(values?.city),
    },
    {
      key: "state",
      label: "استان",
      children: noData(values?.state),
    },
    {
      key: "zip",
      label: "کد پستی",
      children: noData(values?.zip),
    },
    {
      key: "bio",
      label: "بیوگرافی",
      span: "filled",
      children: noData(values?.bio),
    },
  ];

  return (
    <>
      <Descriptions
        bordered
        title={<Title level={4}>تایید اطلاعات</Title>}
        layout="vertical"
        size="small"
        items={items}
      />
      <Text type="secondary" className="block mt-6">
        لطفاً اطلاعات بالا را بررسی کنید. برای تکمیل فرآیند روی دکمه{" "}
        <span className="font-semibold">تایید نهایی</span> کلیک کنید.
      </Text>
    </>
  );
};

const FormSuccessPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleGoBack = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("state");
    setSearchParams(params);
  };

  return (
    <div>
      <Result
        status="success"
        title="فرم با موفقیت ثبت شد!"
        subTitle="از ارسال اطلاعات شما سپاسگزاریم. جزئیات شما دریافت شد."
        extra={[
          <ButtonElm size="large" onClick={handleGoBack}>
            ثبت فرم جدید
          </ButtonElm>,
        ]}
      />
    </div>
  );
};

const FormErrorPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleGoBack = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("state");
    setSearchParams(params);
  };

  return (
    <div>
      <Result
        status="error"
        title="ثبت ناموفق بود"
        subTitle="خطایی در هنگام ارسال اطلاعات رخ داد. لطفاً ورودی‌های خود را بررسی کرده و دوباره تلاش کنید."
        extra={[
          <ButtonElm onClick={handleGoBack} size="large">
            تلاش مجدد
          </ButtonElm>,
        ]}
      />
    </div>
  );
};

const FormPg = () => {
  const {
    token: { colorBgContainer, borderRadiusLG, boxShadowTertiary },
  } = theme.useToken();

  const [form] = Form.useForm<FormFieldsType>();
  const formValues = Form.useWatch([], form);
  const [messageAnt, contextHolder] = message.useMessage();
  const [searchParams, setSearchParams] = useSearchParams();

  const successState = searchParams.get("state");

  const { mutate: addMutate, isPending: addPending } = useAddMultiPageForm();
  const [current, setCurrent] = useState(0);

  type StepStautsType = Record<number, "wait" | "process" | "finish" | "error">;
  const [stepStatuses, setStepStatuses] = useState<StepStautsType>({
    0: "process",
    1: "wait",
    2: "wait",
    3: "wait",
  });

  const next = async () => {
    const step = steps[current];
    const nextIndex = current + 1;
    try {
      await form.validateFields(step.fields);
      setStepStatuses((s) => ({
        ...s,
        [current]: "finish",
        [nextIndex]: "process",
      }));
    } catch {
      setStepStatuses((s) => ({
        ...s,
        [current]: "error",
        [nextIndex]: "process",
      }));
    }
    setCurrent(nextIndex);
  };

  const onChange = async (value: number) => {
    if (value > current) {
      for (let i = current; i < value; i++) {
        const step = steps[i];
        try {
          await form.validateFields(step.fields);
          setStepStatuses((s) => ({
            ...s,
            [i]: "finish",
          }));
        } catch {
          setStepStatuses((s) => ({
            ...s,
            [i]: "error",
          }));
        }
      }
    } else {
      for (let i = value + 1; i <= current; i++) {
        setStepStatuses((s) => ({
          ...s,
          [i]: "wait",
        }));
      }
    }
    setStepStatuses((s) => ({
      ...s,
      [value]: "process",
    }));
    setCurrent(value);

    /**
     * from index 0 to value, forEach, validate fields and mark the status
     *
     * if value > current
     * update from current to value
     * else from value to current, set to wait
     * keep value ===  process
     *
     */
  };

  const prev = () => {
    const prevIndex = current - 1;
    setStepStatuses((s) => ({
      ...s,
      [current]: "wait",
      [prevIndex]: "process",
    }));
    setCurrent(prevIndex);
  };

  const items = steps.map((s, i) => ({
    key: s.title,
    title: s.title,
    status: stepStatuses[i],
  }));

  const onFormFinish: FormProps<FormFieldsType>["onFinish"] = (values) => {
    addMutate(values, {
      onSuccess: () => {
        form.resetFields();
        const params = new URLSearchParams();
        params.set("state", "success");
        setSearchParams(params);
      },
      onError: () => {
        const params = new URLSearchParams();
        params.set("state", "error");
        setSearchParams(params);
      },
    });
  };

  const onFinishFailed: FormProps<FormFieldsType>["onFinishFailed"] = (
    values
  ) => {
    console.log(values);
    messageAnt.error("لطفاً تمام فیلدهای الزامی را پر کنید");
  };

  return (
    <>
      {contextHolder}

      <>
        {successState === "success" ? (
          <FormSuccessPage />
        ) : successState === "error" ? (
          <FormErrorPage />
        ) : (
          <Form
            form={form}
            layout="vertical"
            size="large"
            onFinish={onFormFinish}
            onFinishFailed={onFinishFailed}
          >
            <div className="max-w-4xl mx-auto">
              <div className="mt-8 mb-10 mx-auto lg:w-10/12">
                <Steps current={current} items={items} onChange={onChange} />
              </div>

              <div
                style={{
                  background: colorBgContainer,
                  boxShadow: boxShadowTertiary,
                  borderRadius: borderRadiusLG,
                }}
                className="flex-grow p-6 mt-6"
              >
                <div className={`${current === 0 ? "" : "hidden"}`}>
                  <FormUserInfo />
                </div>
                <div className={`${current === 1 ? "" : "hidden"}`}>
                  <FormAddress />
                </div>
                <div className={`${current === 2 ? "" : "hidden"}`}>
                  <FormPgThree />
                </div>
                <div className={`${current === 3 ? "" : "hidden"}`}>
                  <ConfirmDetails values={formValues} />
                </div>

                <div className="mt-6 flex justify-between items-center gap-3">
                  {/* {current > 0 && ( */}
                  <ButtonElm
                    disabled={!(current > 0)}
                    type="default"
                    size="large"
                    onClick={() => prev()}
                  >
                    قبلی
                  </ButtonElm>
                  {/* )} */}

                  {current < steps.length - 1 && (
                    <ButtonElm
                      type="primary"
                      size="large"
                      onClick={() => next()}
                    >
                      بعدی
                    </ButtonElm>
                  )}
                  {current === steps.length - 1 && (
                    <ButtonElm
                      loading={addPending}
                      type="primary"
                      size="large"
                      htmlType="submit"
                    >
                      تایید نهایی
                    </ButtonElm>
                  )}
                </div>
              </div>
            </div>
          </Form>
        )}
      </>
    </>
  );
};

export default FormPg;
