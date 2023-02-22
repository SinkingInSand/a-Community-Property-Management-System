import React from "react";
import { useState, useEffect } from "react";
import { Button, Form, Typography, Layout, message} from "antd";
import Sider from "antd/lib/layout/Sider";
import { getAnnouncements,getDiscussions } from "../utils";
import Paragraph from "antd/lib/skeleton/Paragraph";
import PostForm from "./PostForm";
const { Title } = Typography;
const {Content} = Layout;

const AnnouncementForm = (props) => {
  console.log("Announcement Form Is Admin? = ", props.isAdmin);
  const [isAdmin, setAdmin] = useState(props.isAdmin);
  const [announcements, setAnnouncements] = useState([]);
  const [loadingAnnouncements, setLoadingAnnouncements] = useState(false);
  const [discussions, setDiscussions] = useState([]);
  const [loadingDiscussions, setLoadingDiscussions, isRepliable] = useState(false);



  const renderDeletButton = () => {
    if (isAdmin) {
      return (
      <div>
      <Button type="" style={{background:"lightblue"}}>Edit</Button>
      <Button type="" style={{background:"pink"}}>Delete</Button>

      </div>
      )
    }
  };
  console.log(getAnnouncements())


//   const announcements = () => {
//     console.log(getAnnouncements())

  useEffect(() => {
      setLoadingAnnouncements(true);
      getAnnouncements()
      
        .then((data) => {
          setAnnouncements(data);
        })
        .catch((err) => {
          message.error(err.message);
        })
        .finally(() => {
          setLoadingAnnouncements(false);
        });

    }, []);

    useEffect(() => {
      setLoadingDiscussions(true);
      getDiscussions()
        .then((data) => {
          setDiscussions(data);
        })
        .catch((err) => {
          message.error(err.message);
        })
        .finally(() => {
          setLoadingDiscussions(false);
        });
    },[]) //can we get discussion and announcement at once

    console.log("Announcements: ", announcements[0]);
// ;  }
  return (
    // <p>Announcement Form</p>
    <>
      <Form
      >
        <Title level={3}>Annoucements: </Title>
        {announcements.map(
          (item) => {
            return <><Form.Item className="postItem">
              <Title level={3}>{item.title}</Title>
              <p>{item.content}</p>
              <p>{item.timestamp.month}</p>
              {renderDeletButton(false)}
            </Form.Item>
            </>
          }
        )}
        <p></p>
        <Title level={3}>Discussions: </Title>
        {discussions.map(
          (item) => {
            return <><Form.Item className="postItem">
              <Title level={3}>{"Subject: " + item.subject}</Title>
              <p>{item.content}</p>
              <p>{item.timestamp.month}</p>
              {renderDeletButton()}
              <Button type="" style={{background:"lightgreen"}}>Reply</Button>
    
            </Form.Item>
            </>
          }
        )}

      </Form>
      {/* <Button
        className="floatPost"
        icon={<FileTextOutlined />}
        description="Create Post"
        // shape="square"
      >Create Post</Button> */}
      {isAdmin && <PostForm />}
    </>
  );
};


export default AnnouncementForm;

/*import { Button, Card, List, message, Select, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { addItemToCart, getMenus, getRestaurants } from "../utils";
import { PlusOutlined } from "@ant-design/icons";

const { Option } = Select;

const AddToCartButton = ({ itemId }) => {
  const [loading, setLoading] = useState(false);

  const AddToCart = () => {
    setLoading(true);
    addItemToCart(itemId)
      .then(() => message.success(`Successfully add item`))
      .catch((err) => message.error(err.message))
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Tooltip title="Add to shopping cart">
      <Button
        loading={loading}
        type="primary"
        icon={<PlusOutlined />}
        onClick={AddToCart}
      />
    </Tooltip>
  );
};

const FoodList = () => {
  const [foodData, setFoodData] = useState([]);
  const [curRest, setCurRest] = useState();
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingRest, setLoadingRest] = useState(false);

  useEffect(() => {
    setLoadingRest(true);
    getRestaurants()
      .then((data) => {
        setRestaurants(data);
      })
      .catch((err) => {
        message.error(err.message);
      })
      .finally(() => {
        setLoadingRest(false);
      });
  }, []);

  useEffect(() => {
    if (curRest) {
      setLoading(true);
      getMenus(curRest)
        .then((data) => {
          setFoodData(data);
        })
        .catch((err) => {
          message.error(err.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [curRest]);

  return (
    <>
      <Select
        value={curRest}
        onSelect={(value) => setCurRest(value)}
        placeholder="Select a restaurant"
        loading={loadingRest}
        style={{ width: 300 }}
        onChange={() => {}}
      >
        {restaurants.map((item) => {
          return <Option value={item.id}>{item.name}</Option>;
        })}
      </Select>
      {curRest && (
        <List
          style={{ marginTop: 20 }}
          loading={loading}
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 4,
            lg: 4,
            xl: 3,
            xxl: 3,
          }}
          dataSource={foodData}
          renderItem={(item) => (
            <List.Item>
              <Card
                title={item.name}
                extra={<AddToCartButton itemId={item.id} />}
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  style={{ height: 340, width: "100%", display: "block" }}
                />
                {`Price: ${item.price}`}
              </Card>
            </List.Item>
          )}
        />
      )}
    </>
  );
};

export default FoodList;

*/