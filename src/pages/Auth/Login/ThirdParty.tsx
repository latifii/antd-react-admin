import { FcGoogle } from "react-icons/fc";
import { FaApple, FaFacebookF } from "react-icons/fa";
import { ButtonElm } from '../../../components/Button/ButtonElm'

const ThirdParty = () => {
    return (
        <div className="w-full mb-6 flex justify-center items-center gap-6">
            <ButtonElm
                title="Login with Facebook"
                aria-label="Login with Facebook"
                className="!p-5 md:!p-7 w-fit aspect-video"
                type="default"
            >
                <FaFacebookF size={20} color="#0765FE" />
            </ButtonElm>
            <ButtonElm
                title="Login with Apple"
                aria-label="Login with Apple"
                className="!p-5 md:!p-7 w-fit aspect-video"
                type="default"
            >
                <FaApple size={25} />
            </ButtonElm>
            <ButtonElm
                title="Login with Google"
                aria-label="Login with Google"
                className="!p-5 md:!p-7 w-fit aspect-video"
                type="default"
            >
                <FcGoogle size={25} />
            </ButtonElm>
        </div>
    )
}

export default ThirdParty