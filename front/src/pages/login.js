import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Col, message } from "antd";
import GoogleLogin from "react-google-login";
import { ApiRoutes } from "../config/ApiRoutes";
import { ApiHelper, setUserData, getToken } from "../Helpers";
import { AppConfig } from "../config/AppConfig";

const Login = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (getToken() !== "" && getToken() !== null) {
      navigate("/books");
    }
    // eslint-disable-next-line
  }, []);
  const responseGoogle = async (data) => {
    if (data?.profileObj) {
      const response = await new ApiHelper().FetchFromServer(
        ApiRoutes.LOGIN.service,
        ApiRoutes.LOGIN.url,
        ApiRoutes.LOGIN.method,
        ApiRoutes.LOGIN.authenticate,
        undefined,
        {
          providerId: data?.profileObj?.googleId,
          firstName: data?.profileObj?.familyName,
          lastName: data?.profileObj?.givenName,
          email: data?.profileObj?.email,
          loginType: "google",
          profileImage: data?.profileObj?.imageUrl,
        }
      );
      if (response.code === 200) {
        response.data.data.token = response.data.token;
        setUserData(response.data.data);
        navigate("/books");
      } else {
        message.error({
          content: response.messages || response.error,
          duration: 2,
        });
      }
    } else {
      message.error({
        content: data?.error || "Try Again.",
        duration: 2,
      });
    }
  };
  return (
    <Col lg="24">
      <GoogleLogin
        clientId={AppConfig.GOOGLE_CLIENT_ID}
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
    </Col>
  );
};
export default Login;
