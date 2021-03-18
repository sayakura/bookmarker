import { List, Avatar, Space, Divider } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import { Content } from 'antd/lib/layout/layout';
import { Form, Input, Button } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

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

const Tags = () => {
    const onFinish = values => {
        console.log('Received values of form:', values);
    };
    return (
        <Form name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
            <Form.List name="users">
                {(fields, { add, remove }) => (
                <>
                    {fields.map(field => (
                        <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                            <Form.Item
                                {...field}
                                    name={[field.name, 'first']}
                                    fieldKey={[field.fieldKey, 'first']}
                                    rules={[{ required: true, message: 'Missing first name' }]}
                                >
                                <Input placeholder="..." style={{width: "480px"}}/>
                            </Form.Item>
                            <MinusCircleOutlined onClick={() => remove(field.name)} />
                        </Space>
                    ))}
                    <Form.Item>
                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                        Add Tag
                    </Button>
                    </Form.Item>
                </>
                )}
            </Form.List>
            <Form.Item>
                <Button type="primary" htmlType="submit" block>
                Submit
                </Button>
            </Form.Item>
        </Form>
    )
}

const Demo = () => {
    return (
        <>
            <Content style={{width: "500px"}}>
                <Tags />
                <Divider />
                <Tags />
            </Content>
        </>
    );
};

const ConfigPage = ({ state }) => (
    <>
      <Content style={{ padding: '0 20px', minHeight: 280 }}>
        <Demo />
      </Content>
    </>
);



  
export default ConfigPage;