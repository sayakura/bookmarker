import { List, Avatar, Space } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import { Content } from 'antd/lib/layout/layout';

const listData = [];

for (let i = 0; i < 23; i++) {
  listData.push({
    href: 'https://ant.design',
    title: `Post name ${i}`,
    description:
      '07/31/2020',
    content:
      ' ????? ????? ????? ????? ????? ????? ????? ????? ????? ',
  });
}

const Post = () => (
    <Content >
        <List
            itemLayout="vertical"
            size="large"
            pagination={{
            onChange: page => {
                console.log(page);
            },
            pageSize: 10,
            }}
            dataSource={listData}
       
            renderItem={item => (
                <List.Item
                    key={item.title}
                    actions={[
                        <StarOutlined />,
                        <LikeOutlined />,
                        <MessageOutlined />,
                    ]}
                >
                <List.Item.Meta
                    title={<a href={item.href}>{item.title}</a>}
                    description={item.description}
                />
                {item.content}
            </List.Item>
            )}
        />
    </Content>
);


const PostPage = ({ state }) => (
    <>
      <Content style={{ padding: '0 20px', minHeight: 280 }}>
        <Post />
      </Content>
    </>
  );

export default PostPage;