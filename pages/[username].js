import Head from 'next/head'
import React from 'react';
import axios from 'axios'
// import styles from '../styles/Home.module.css'

import dynamic from "next/dynamic";
import { Layout, Menu, Breadcrumb, Spin, Alert } from 'antd';
import {  HomeOutlined, UserOutlined, AreaChartOutlined, FormOutlined, PaperClipOutlined, ControlOutlined } from '@ant-design/icons';
import PostPage from './components/post'
import StatPage from './components/stat'
import ProfilePage from './components/profile'
import ConfigPage from './components/config'

axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
axios.defaults.baseURL = 'http://127.0.0.1:3001/';

const { Header, Content, Sider } = Layout;



const NoSSRComponent = dynamic(() => import('./components/bookmark'), {
  ssr: false,
});

// const pages = {
//   profile: ProfilePage,
//   stat: StatPage,
//   post: PostPage, 
//   bookmark: BookmarkPage,
//   config: ConfigPage
// }

const Loading = () => (
    <Content style={{width: "100%", padding: "10px"}}>
        <Spin tip="Loading...">
            <Alert
                style={{height: "500px"}}
                type="info"
                />
        </Spin>
    </Content>
)

// const Page = ({ value }) => {
//   const { currentPage, pageState } = value
//   const DisplayPage = pages[currentPage]
//   return <DisplayPage state={pageState[currentPage]} />;
// }

class Home extends React.Component {
  state = {
    intervalId: null, 
    loaded: false,
    username: '',
    currentPage : 'bookmark',
    pageState: {
      profile: {
          username: ''
      },
      stat: {
        radialChartData : [{angle: 10, label : 'mido'}, {angle: 5, label : 'kura'}, {angle: 2, label : 'haodelan'}]
      },
      post: {},
      bookmark: {},
      config: {}
    },
  }
  static getInitialProps({query}) {
    return { query }
  }
  static getDerivedStateFromProps(props, state) {
        if (state.loaded) return state;
        const username = props.query.username || "kura";
        return {
            loaded: false,
            username,
            pageState: { profile: { username }, bookmark: { owner: username } }
        };
  }
  async componentDidMount() {
    const loadUser = async (intervalId) => {
      try {
        const { data } = await axios.get(`v1/users/${this.state.username}`);
        const { name, avator, last_submission, total_ac, chain, last_bookmark_modified  } = data;
        this.setState({
          loaded: true, 
          pageState: {
              profile: {
                  name, avator, last_submission, total_ac, chain 
              },
              bookmark: {
                  owner: name,
                  last_bookmark_modified,
              }
          }
        });
        clearInterval(this.state.intervalId);
      }catch(err) {
          console.error(`Fail to load user, will try again`);
          console.log(err)
      }
    }
    const intervalId = setInterval(loadUser.bind(this), 5000);
    this.setState({
      intervalId
    });
    loadUser();
  }
  MenuOnclick = ({ key }) => {
    this.setState({
      currentPage: key
    });
  }
  render() {
    return (
      <div>
        <Head>
          <title>Test</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Layout style={{minHeight: '100vh'}}>
          <Header className="header">
            <div className="logo" />
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
              <Menu.Item  icon={ <HomeOutlined /> }key="1">Home</Menu.Item>
            </Menu>
          </Header>
          <Content style={{ padding: '0 50px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>{this.state.username}</Breadcrumb.Item>
            </Breadcrumb>
            <Layout className="site-layout-background" style={{ padding: '24px 0', minHeight: '80vh' }}>
              {/*<Sider className="site-layout-background" width={200}>
                 <Menu
                  mode="inline"
                  defaultSelectedKeys={['1']}
                  defaultOpenKeys={['sub1']}
                  style={{ height: '100%' }}
                  onClick={this.MenuOnclick}
                >
                  <Menu.Item  icon={<UserOutlined />} key="profile">Profile</Menu.Item> */}
                  {/* <Menu.Item  icon={<AreaChartOutlined />} key="stat">Stat</Menu.Item>
                  <Menu.Item  icon={<FormOutlined />} key="post">Post</Menu.Item> */}
                  {/* <Menu.Item  icon={<PaperClipOutlined />} key="bookmark">Bookmark</Menu.Item>
                  <Menu.Item  icon={<ControlOutlined />} key="config">Config</Menu.Item>
                </Menu>
              </Sider> */}
              
              { this.state.loaded ? 
                <NoSSRComponent /> : <Loading />
              }
            </Layout>
          </Content>
        </Layout>
      </div>
    )
  }
}

export default Home;

