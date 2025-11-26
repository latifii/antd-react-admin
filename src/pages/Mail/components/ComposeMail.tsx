import {
  Modal,
  Form,
  Input,
  ConfigProvider,
  theme,
  Divider,
  Select,
  FormProps,
} from "antd";
import { FC, SetStateAction, useState } from "react";
import { ButtonElm } from "../../../components/Button/ButtonElm";
import QuillElm from "../../../components/QuillElm";

interface ComposeMailProps {
  openCompose: boolean;
  setOpenCompose: React.Dispatch<SetStateAction<boolean>>;
}
const ComposeMail: FC<ComposeMailProps> = ({ openCompose, setOpenCompose }) => {
  interface EmailFormProps {
    to: string[];
    cc?: string[];
    bcc?: string[];
    subject?: string;
    mail?: string;
  }

  const [form] = Form.useForm();

  const [emailRecipients, setEmailRecipients] = useState({
    cc: false,
    bcc: false,
  });

  const handleOk = () => {
    form.submit();
  };

  const onComposeFinish: FormProps<EmailFormProps>["onFinish"] = (values) => {
    console.log(values);
    setOpenCompose(false);
  };

  const handleCancel = () => {
    handleClose();
  };

  const handleClose = () => {
    setOpenCompose(false);
    setEmailRecipients({
      bcc: false,
      cc: false,
    });
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
          colorBgContainer: "rgba(255, 255, 255, 1)",
          colorBgLayout: "rgba(245, 245, 245, 1)",
          colorTextPlaceholder: "rgba(116, 119, 117, 1)",
        },
      }}
    >
      <Modal
        title={"پیام جدید"}
        open={openCompose}
        onOk={handleOk}
        okText={"ارسال"}
        cancelText={"لغو"}
        onCancel={handleCancel}
        centered
        width={550}
        height={600}
      >
        <Form<EmailFormProps>
          layout="horizontal"
          form={form}
          labelCol={{ span: 3 }}
          className="mt-4"
          onFinish={onComposeFinish}
          initialValues={{
            to: [],
            cc: [],
            bcc: [],
            subject: "",
            mail: "",
          }}
        >
          <div className="flex justify-start items-center gap-2">
            <Form.Item
              name="to"
              label={"گیرنده"}
              className="!m-0 w-full"
              rules={[
                { required: true, message: "لطفاً ایمیل گیرنده را وارد کنید" },
                {
                  validator: (_, value) =>
                    value?.every((email: string) =>
                      /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(email)
                    )
                      ? Promise.resolve()
                      : Promise.reject(
                          new Error("لطفاً ایمیل(های) معتبر وارد کنید")
                        ),
                },
              ]}
            >
              <Select
                mode="tags"
                placeholder="گیرنده"
                variant="borderless"
                tokenSeparators={[",", ";", " "]}
                aria-label="To"
              />
            </Form.Item>

            {!emailRecipients.cc && (
              <ButtonElm
                onClick={() =>
                  setEmailRecipients((prev) => ({
                    ...prev,
                    cc: true,
                  }))
                }
                type="text"
                className="!bg-transparent !p-0 hover:underline"
              >
                Cc
              </ButtonElm>
            )}

            {!emailRecipients.bcc && (
              <ButtonElm
                onClick={() =>
                  setEmailRecipients((prev) => ({
                    ...prev,
                    bcc: true,
                  }))
                }
                type="text"
                className="!bg-transparent !p-0 hover:underline"
              >
                Bcc
              </ButtonElm>
            )}
          </div>

          <Divider className="!m-1" />

          {emailRecipients.cc && (
            <>
              <Form.Item label={"رونوشت"} name="cc" className="!m-0">
                <Select
                  mode="tags"
                  placeholder="رونوشت (Cc)"
                  aria-label="Cc"
                  variant="borderless"
                  tokenSeparators={[",", ";", " "]}
                />
              </Form.Item>
              <Divider className="!m-1" />
            </>
          )}

          {emailRecipients.bcc && (
            <>
              <Form.Item label={"محرمانه"} name="bcc" className="!m-0">
                <Select
                  mode="tags"
                  placeholder="رونوشت مخفی (Bcc)"
                  aria-label="Bcc"
                  variant="borderless"
                  tokenSeparators={[",", ";", " "]}
                />
              </Form.Item>
              <Divider className="!m-1" />
            </>
          )}

          <Form.Item name="subject" className="!m-0">
            <Input
              className="!outline-none !border-none !border-transparent !shadow-none"
              aria-label="Subject"
              placeholder="موضوع"
            />
          </Form.Item>
          <Divider className="!m-1" />

          <Form.Item className="!mt-3" name="mail">
            <QuillElm
              aria-label="Email Body"
              placeholder="متن ایمیل خود را بنویسید..."
              className="h-20l ltr"
            />
          </Form.Item>
        </Form>
      </Modal>
    </ConfigProvider>
  );
};

export default ComposeMail;
