import { useMutation } from "@tanstack/react-query";
import { useMessageAnt } from "../context/MessageContext";

export interface FormFieldsType {
  fname: string;
  lname: string;
  dob?: string;
  email: string;
  password: string;
  confirmPassword: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zip: string;
  publicEmail: string;
  bio?: string;
}

const addMultiPageForm = async (body: FormFieldsType) => {
  // const url = `/post`;
  // const response = await axiosTokenless.post(url, body);
  return new Promise((resolve) =>
    setTimeout(() => {
      console.log(body);
      const res = null;
      resolve(res);
    }, 2000)
  );
};

export const useAddMultiPageForm = () => {
  const messageAnt = useMessageAnt();
  return useMutation<unknown, unknown, FormFieldsType>({
    mutationFn: addMultiPageForm,
    onSuccess: () => {
      messageAnt.success(`با موفقیت ارسال شد`);
    },
    onError: (err) => {
      const msg =
        typeof err === "string"
          ? err
          : "An unknown error occurred. Please try again.";
      messageAnt.error(msg);
    },
  });
};
