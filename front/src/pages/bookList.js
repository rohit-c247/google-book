import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, Space, Input, Pagination, Spin, Empty } from "antd";
import { ApiRoutes } from "../config/ApiRoutes";
import { ApiHelper } from "../Helpers";

const BookList = () => {
  const { Meta } = Card;
  const { Search } = Input;
  const [data, setData] = useState([]);
  const [offset, setOffset] = useState(1);
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(10);
  const [totalRecord, setTotalRecord] = useState(0);
  const [loader, setLoader] = useState(false);

  const onSearch = async (value, __a, page = offset, pageSize = limit) => {
    setLoader(true);
    if (value !== search) {
      page = 1;
    }
    setSearch(value);
    const response = await new ApiHelper().FetchFromServer(
      ApiRoutes.BOOKS.service,
      ApiRoutes.BOOKS.url,
      ApiRoutes.BOOKS.method,
      ApiRoutes.BOOKS.authenticate,
      { search: value, offset: page, limit: pageSize }
    );
    if (response.code === 200 && response?.data?.data?.totalItems) {
      setData(response.data.data.items);
      setTotalRecord(response?.data?.data?.totalItems);
    } else {
      setData([]);
      setTotalRecord(0);
    }
    setLoader(false);
  };
  const paginationBook = (page, pageSize) => {
    const pageNumber = limit !== pageSize ? 1 : page;
    setOffset(pageNumber);
    setLimit(pageSize);
    onSearch(search, "", page, pageSize);
  };
  return (
    <Row className="book">
      <Col className="box" lg={24}>
        <Space direction="vertical">
          <Search
            placeholder="input search text"
            onSearch={onSearch}
            enterButton
          />
        </Space>
      </Col>
      <Col className="box" lg={24}>
        <Row className="book-box">
          {loader ? (
            <div className="loader">
              <Spin />
            </div>
          ) : (
            <>
              {data &&
                data.map((book, key) => (
                  <Col className="box" key={key} xs={24} xl={6}>
                    <Link to={`/book/${book?.id}`}>
                      <Card
                        hoverable
                        style={{ width: 240 }}
                        cover={
                          <img
                            alt={book?.volumeInfo?.title}
                            src={
                              book?.volumeInfo?.imageLinks?.thumbnail ||
                              "https://media.istockphoto.com/vectors/no-image-available-icon-vector-id1216251206?s=612x612"
                            }
                          />
                        }
                      >
                        <Meta title={book?.volumeInfo?.title} />
                      </Card>
                    </Link>
                  </Col>
                ))}
              {totalRecord > 0 ? (
                <Col lg={24}>
                  <Pagination
                    defaultCurrent={offset}
                    defaultPageSize={limit}
                    total={totalRecord}
                    onChange={paginationBook}
                    pageSizeOptions={[10, 20, 30, 40]}
                  />
                </Col>
              ) : (
                <Col>
                  <Empty
                    description={
                      search
                        ? "No book available as per you search"
                        : "Please search book as per your need"
                    }
                  />
                </Col>
              )}
            </>
          )}
        </Row>
      </Col>
    </Row>
  );
};
export default BookList;
