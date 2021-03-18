import { Avatar, List, Card, Layout, Tag, Modal, Button, Select, Divider, Space, Typography, Input, message, Popconfirm, Affix, Row, Col } from 'antd';
import { EditOutlined, DeleteOutlined, CheckOutlined, ExclamationCircleOutlined, PlusOutlined, AntDesignOutlined, HighlightOutlined, HomeOutlined } from '@ant-design/icons';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios'
import Highlight from 'react-highlight.js';
import _ from 'lodash';
import { get, set } from '../../utils/ls';
import moment from 'moment'
import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css';
import { sub } from 'date-fns';

const { Option } = Select;
const { confirm } = Modal;
const { Title, Paragraph,  Text, Link } = Typography;
const { Content } = Layout;
const { Meta } = Card;
const { TextArea } = Input;
const time = moment();

axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
axios.defaults.baseURL = 'http://127.0.0.1:3001/';

const problemTags = [<Option key="Array">Array</Option>, <Option key="Tree">Tree</Option>, <Option key="Graph">Graph</Option>];


const BookmarkFilter = ({ onChange, option }) => {
  const [ selectedOptions, setSelectedOptions ] = useState({ ...option });

  const handleTimeValue = (value) => {
    const newOptions = { ...selectedOptions };
    newOptions.time.value = value;
    setSelectedOptions(newOptions);
  }
  const handleTimeUnit = (value) => {
    const newOptions = { ...selectedOptions };
    newOptions.time.unit = value;
    setSelectedOptions(newOptions);
  }
  const handleTagsChange = (value) => {
    const newOptions = { ...selectedOptions };
    newOptions.tags = value;
    setSelectedOptions(newOptions);
    console.log(newOptions)
  }

  useEffect(() => {
    onChange(selectedOptions);
  }, [selectedOptions])

  return (
    <>
      <Space direction="vertical" size="small">
        <Space size="small">
          <Text> Not yet reviewed for </Text>
          <Select defaultValue={option.time.value} style={{ width: 80 }} onChange={handleTimeValue} >
            <Option value="1">1</Option>
            <Option value="2">2</Option>
            <Option value="3">3</Option>
            <Option value="4">4</Option>
            <Option value="5">5</Option>
            <Option value="6">6</Option>
            <Option value="7">7</Option>
            <Option value="8">8</Option>
            <Option value="9">9</Option>
            <Option value="10">10</Option>
            <Option value="11">11</Option>
            <Option value="12">12</Option>
          </Select>
  
          <Select defaultValue={option.time.unit} style={{ width: 120 }} onChange={handleTimeUnit}>
            <Option value="hour">hour</Option>
            <Option value="day">day</Option>
            <Option value="week">week</Option>
            <Option value="month">month</Option>
          </Select>
        </Space>
        <Space size="small">
          <Text> Category: </Text>
          <Select mode="multiple" style={{ width:'500px' }} placeholder="Array, Tree..." defaultValue={option.tags} onChange={handleTagsChange}> 
            {problemTags}
          </Select>
        </Space>
      </Space>
    </>
  )
}

const BookmarkPage = () => {
  const [ selectedBookmark, setSelectedBookmark ] = useState([]);
  const [ unselectedBookmark, setUnselectedBookmark ] = useState([]);
  const bookmark = useRef([]);
  const [ modalTitle, setModalTitle ] = useState("Edit Bookmark");
  const [ modalUsage, setModalUsage ] = useState("Edit");
  const [ state, setState ] = useState({});
  const [ showBookmarkEditModal, setShowBookmarkModal ] = useState(false);
  const [ currentEditBookmark, setCurrentEditBookmark ] = useState({});
  const [ defaultOptions, setDefaultOptions ] = useState(get('bookmark_options') || {
    time: { value : "1", unit: "day" },
    tags: []
  });

  const [ _init, _setInit ] = useState(async function (){
    let data = [];
    const lastBookmarkModified = get('last_bookmark_modified');
    const { name, avator, last_submission, total_ac, chain, last_bookmark_modified  } =  await axios.get(`v1/users/kura`);
    // testing purpose
    setState({
      owner: name || "kura",
      username: name || "kura",
      last_bookmark_modified,
    });
    const state = {
      owner: name || "kura",
      username: name || "kura",
      last_bookmark_modified,
    }

    if (lastBookmarkModified !== state.last_bookmark_modified) {
      const res = await axios.get(`v1/bookmark/getBookmarks/${state.owner}`);
      data = res.data;
      set('last_bookmark_modified', state.last_bookmark_modified);
      set('bookmark_data', data);
    } else 
      data = get('bookmark_data');

    bookmark.current =  data;
    const opts = get('bookmark_options') || defaultOptions;
    console.log(opts)
    filterOnChange(opts);
    return null;
  });

  function filterOnChange(options = defaultOptions) {
    const _bookmark = bookmark.current;

    const val = options.time.value; 
    const unit = options.time.unit;
    const thatDay = sub(new Date(), {
      [`${unit}s`] : val
    });

    const [ notReviewed, reviewed ] = _.partition(_bookmark, b => {
      return moment(b.lastVisited).isSameOrBefore(thatDay);
    });

    if (options.tags.length > 0) {
      const comparator = (a, b) => {
        let scoreA = _.intersection(options.tags, a.tags).length;
        let scoreB = _.intersection(options.tags, b.tags).length;
  
        if (scoreA == scoreB)
          return moment(a.lastVisited).isSameOrBefore(b.lastVisited) ? -1 : 1;
        return scoreB - scoreA;
      };
      notReviewed.sort(comparator);
      reviewed.sort(comparator);
    }

    setSelectedBookmark(notReviewed);
    setUnselectedBookmark(reviewed);
    set('bookmark_options', options);
    setDefaultOptions(options);
  }

  function confirmReview() {
    const _bookmark = bookmark.current;
    const idx = _.findIndex(_bookmark, { id : this.id });
    _bookmark[idx].lastVisited = Date.now();
    message.success("Bookmark reviewed!");
    axios.post('v1/bookmark/updateBookmark', {
      id: this.id,
      owner: this.owner,
      lastVisited: Date.now()
    });
    updateBookmark(_bookmark);
  }

  function updateBookmark(_bookmark, options=defaultOptions) {
    bookmark.current = _bookmark;
    filterOnChange(options);
  }

  function showBookmarkEditModalHandler() {
    console.log(this)
    setShowBookmarkModal(true);
    setModalUsage("Edit");
    setModalTitle("Edit Bookmark");
    setCurrentEditBookmark(this);
  }

  function showDeleteConfirm(){
    const item = this;
    let _bookmark = bookmark.current;
    confirm({
      title: 'Are you sure to delete this bookmark?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        _bookmark = _bookmark.filter(b => b.id != item.id);
        updateBookmark(_bookmark);
        console.log(item.id);
        axios.post('v1/bookmark/deleteBookmark', {
          id: item.owner, 
          bookmarkId: item.id
        })
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  async function handleModalOk() {
    currentEditBookmark.owner = state.owner;
    const _bookmark = bookmark.current;
    let copy = [];
    if (modalUsage == "Edit") {
      const idx = _.findIndex(_bookmark, { id : currentEditBookmark.id });
      if (idx == -1) return ;
      copy = _.cloneDeep(_bookmark);
      copy[idx] = currentEditBookmark;
     
      await axios.post('v1/bookmark/updateBookmark', {
        ...currentEditBookmark
      });
    } else if (modalUsage == 'Add') {
      copy = _.cloneDeep(_bookmark);
      await axios.post('v1/bookmark/addBookmark', {
        ...currentEditBookmark
      });
      copy.push(currentEditBookmark);
    }
    bookmark.current = copy;
    updateBookmark(copy);
    message.success("Successfully Saved!")
    setShowBookmarkModal(false);
  }

  function handleModalCancel() {
    setShowBookmarkModal(false);
    setCurrentEditBookmark({});
  }
  
  function onModalTagsChangeHandler(val) {
    setCurrentEditBookmark({...currentEditBookmark, tags: [...val] });
  }

  function onModalTextAreaChangeHandler(e) { 
    const val = e.target.value;
    setCurrentEditBookmark({...currentEditBookmark, content: val });
  }

  function onModalTitleChangeHandler(e) {
    const val = e.target.value;
    setCurrentEditBookmark({...currentEditBookmark, title: val });
  }

  function onModalOriginChangeHandler(e) {
    const val = e.target.value;
    setCurrentEditBookmark({...currentEditBookmark, origin: val });
  }

  function onModalLanguageChange(val) {
    setCurrentEditBookmark({...currentEditBookmark, language: val });
  }

  function addBookmarkHandler(e) {
    setModalUsage("Add");
    setModalTitle("Add Bookmark");
    setCurrentEditBookmark({
      owner: "",
      origin: "",
      content: "",
      lastVisited: Date.now(),
      language: "Javascript",
      tags: [],
      title: "",
    });
    setShowBookmarkModal(true);
  }

  function throttle(fn) {
    return _.throttle(fn, 100);
  }

  return (
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
              >hello</Paragraph>
        </Col>
      </Row>
      <Divider><HomeOutlined /></Divider>
      <Modal title={modalTitle} visible={showBookmarkEditModal} onOk={handleModalOk} onCancel={handleModalCancel} width={1000} maskClosable={false}>
        <Space direction="vertical" style={{width:"100%"}}>
            <Text>Title: </Text>
            <Input value={currentEditBookmark.title} onChange={throttle(onModalTitleChangeHandler)} allowClear />
            <Text>Source: </Text>
            <Input addonBefore="https://" value={currentEditBookmark.origin}  onChange={throttle(onModalOriginChangeHandler)}/>
            <Text>Code: </Text>
            <TextArea rows={4} value={currentEditBookmark.content} onChange={throttle(onModalTextAreaChangeHandler)} allowClear/>
            <PerfectScrollbar>
              <Highlight language={currentEditBookmark.language || "Javascript"}>
                  { currentEditBookmark.content }
              </Highlight>
            </PerfectScrollbar>
            <Text>Language: </Text>
            <Select
              value={currentEditBookmark.language || "Javascript"}
              defaultValue="Javascript"
              style={{ width: "100%" }}
              placeholder="Select a language"
              onChange={onModalLanguageChange}
            >
              <Option value="Javascript">Javascript</Option>
              <Option value="C++">C++</Option>
              <Option value="Python">Python</Option>
            </Select>
            <Text>Category: </Text>
            <Select mode="multiple" style={{ width: '100%' }} placeholder="Array, Tree..." defaultValue={currentEditBookmark.tags} value={currentEditBookmark.tags} onChange={onModalTagsChangeHandler}> 
                {problemTags}
              </Select>
          </Space>
      </Modal>

      <BookmarkFilter onChange={filterOnChange} option={defaultOptions}/>
      <Divider> Not yet review </Divider>
      <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 1,
            md: 1,
            lg: 2,
            xl: 2,
            xxl: 3,
          }}
          dataSource={selectedBookmark}
          renderItem={item => (
            <List.Item>
                <Card
                    hoverable={true}
                    bodyStyle={ {
                      minHeight: "300px"
                    }
                    }
                    actions={[
                      <Popconfirm
                        title="Mark this bookmark reviewed?"
                        onConfirm={confirmReview.bind(item)}
                        okText="Yes"
                        cancelText="No"
                      >
                        <CheckOutlined key="check" />
                      </Popconfirm>,
                      <EditOutlined key="edit" onClick={showBookmarkEditModalHandler.bind(item)} />,
                      <Button type="text" onClick={showDeleteConfirm.bind(item)} danger>
                        <DeleteOutlined key="delete" />
                      </Button>,
                    ]}
                    >
                    <Meta
                      title={<Link style={{color: "black" }} href={item.origin} target="_blank">{item.title}</Link>}
                      description={`Last visited: ${ moment(item.lastVisited).fromNow() || 'never' } -  ${item.language || 'Javascript'}`}
                    />
                      <Highlight style={{ height: "150px" }} language={item.language || 'Javascript'}>
                        { item.content }
                      </Highlight>
                    <List dataSource={item.tags}
                        renderItem={
                          tag => (
                              <Tag> {tag} </Tag>
                          ) 
                        }> 
                    </List>
                </Card>
            </List.Item>
          )}
      />
      <Divider> Reviewed </Divider>
      <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 1,
            md: 1,
            lg: 2,
            xl: 2,
            xxl: 3,
          }}
          dataSource={unselectedBookmark}
          renderItem={item => (
            <List.Item>
              <Card
                    hoverable={true}
                    bodyStyle={ {
                      minHeight: "300px"
                    }
                    }
                    actions={[
                      <EditOutlined key="edit" onClick={showBookmarkEditModalHandler.bind(item)} />,
                      <Button type="text" onClick={showDeleteConfirm.bind(item)} danger>
                        <DeleteOutlined key="delete" />
                      </Button>,
                    ]}
                    >
                    <Meta
                      title={<Link style={{color: "black" }} href={item.origin} target="_blank">{item.title}</Link>}
                      description={`Last visited: ${ moment(item.lastVisited).fromNow() || 'never' } -  ${item.language || 'Javascript'}`}
                    />
                      <Highlight style={{ height: "150px" }} language={item.language || 'Javascript'}>
                        { item.content }
                      </Highlight>
                    <List dataSource={item.tags}
                        renderItem={
                          tag => (
                              <Tag> {tag} </Tag>
                          ) 
                        }> 
                    </List>
                </Card>
            </List.Item>
          )}
      />
      <Affix style={{float: "right"}} offsetBottom={50}>
        <Button shape="circle" icon={<PlusOutlined  />} type="primary" size="large" onClick={addBookmarkHandler}/>
      </Affix>
    </Content>
  );
};


export default BookmarkPage;