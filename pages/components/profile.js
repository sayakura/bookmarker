import {  Row, Col, Space, Avatar, Divider, Descriptions, Badge, Calendar, Card, Typography, Statistic, Layout } from 'antd'
import { HomeOutlined, ArrowUpOutlined, AntDesignOutlined, HighlightOutlined, LikeOutlined } from '@ant-design/icons';
const { Title, Paragraph,  } = Typography;
const { Content } = Layout;
import { CustomCalendar } from '../components/calendar'
import moment from 'moment'

const ProfilePage = ({ state }) => (
    <>
      <Content style={{ padding: '0 20px', minHeight: 280 }}>
        <Row justify="middle" className="row-with-background" >
          <Col span={24} align="center" >
            <Space direction="vertical" size="large">
              <Avatar
                style={{border : 'white 5px solid'}}
                size={{ xs: 200, sm: 200, md: 200, lg: 200, xl: 200, xxl: 200 }}
                src="https://rs.0.gaoshouyou.com/i/89/62/6b891f957562845f59941e8417cfda90.png"
                icon={<AntDesignOutlined />}
                />
              <Title >{ state.username || state.name }</Title>
            </Space>
            <Paragraph
                editable={{
                  icon: <HighlightOutlined />,
                  tooltip: 'click to edit text',
                }} 
                >wo zhen shi cao le ni de 🐎 </Paragraph>
          </Col>
        </Row>
        <Divider><HomeOutlined /></Divider>
        <Row>
          <Col span={1}></Col>
          <Col span={22}>
            <Space direction="vertical" size="large">
              <Descriptions title="Profile" bordered>
                <Descriptions.Item label="Status" span={3}>
                  <Badge status="processing" text="fighting......!!!" />
                </Descriptions.Item>
                <Descriptions.Item label="Total AC">{state.total_ac}</Descriptions.Item>
                <Descriptions.Item label="Chain">{state.chain}</Descriptions.Item>
                <Descriptions.Item label="Last Submission">{moment(state.last_submission).fromNow()}</Descriptions.Item>
                <Descriptions.Item label="Description">
                  {state.avator}
                </Descriptions.Item>
              </Descriptions>
              <Card title="Recent Activity" >
                <CustomCalendar /> 
                { /*<Calendar fullscreen={false} bordered/> */ }
              </Card>
              <Row gutter={16}> 
                <Col span={12} >
                  <Card>
                    <Statistic
                      title="Active"
                      value={11.28}
                      precision={2}
                      valueStyle={{ color: '#3f8600' }}
                      prefix={<ArrowUpOutlined />}
                      suffix="%"
                    />
                  </Card>
                </Col>
                <Col span={12} >
                  <Card>
                    <Statistic title="Likes" value={1128} prefix={<LikeOutlined />} />
                  </Card>
                </Col>
              </Row>
            </Space>
          </Col>
          <Col span={1}></Col>
        </Row>
      </Content>
    </>
    );

export default ProfilePage;