import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Col, Card, Spin } from "antd";
import { ApiRoutes } from "../config/ApiRoutes";
import { ApiHelper } from "../Helpers";

const BookDetail = (props) => {
  const params = useParams();
  const navigate = useNavigate();
  const { Meta } = Card;
  const [data, setData] = useState("");
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    if (!params?.id) navigate("/books");
    getBookDetail(params?.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getBookDetail = async (id) => {
    const response = await new ApiHelper().FetchFromServer(
      ApiRoutes.BOOK_DETAIL.service,
      ApiRoutes.BOOK_DETAIL.url + id,
      ApiRoutes.BOOK_DETAIL.method,
      ApiRoutes.BOOK_DETAIL.authenticate
    );
    if (response.code === 200 && !response?.data?.data?.error?.code) {
      setData(response.data.data);
      setLoader(false);
    } else {
      navigate("/books");
    }
  };
  return (
    <Col lg="24">
      {loader ? (
        <div className="loader">
          <Spin />
        </div>
      ) : (
        <Card
          hoverable
          cover={
            <img
              alt="example"
              src={
                data?.volumeInfo?.imageLinks?.thumbnail ||
                "https://media.istockphoto.com/vectors/no-image-available-icon-vector-id1216251206?s=612x612"
              }
            />
          }
        >
          <Meta title={data?.volumeInfo?.title} />
          <p>{data?.volumeInfo?.subtitle}</p>
          <p>Print Type: {data?.volumeInfo?.printType}</p>
          <p>Published Date: {data?.volumeInfo?.publishedDate}</p>
          <p>Publisher: {data?.volumeInfo?.publisher}</p>
        </Card>
      )}
    </Col>
  );
};
export default BookDetail;
