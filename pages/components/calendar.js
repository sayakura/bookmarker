import { Calendar, Input, Button, Popover } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const content = (
    <div style={{ width: 300 }}>
        <TextArea placeholder="add a note" showCount maxLength={100}/>
        <Button icon={<PlusOutlined />} type="primary" type="dashed" block/>
    </div>
  );

function getListData(value) {
  let listData;
  switch (value.date()) {
    case 8:
      listData = [
        { type: 'warning', content: 'This is warning event.' },
        { type: 'success', content: 'This is usual event.' },
      ];
      break;
    case 10:
      listData = [
        { type: 'warning', content: 'This is warning event.' },
        { type: 'success', content: 'This is usual event.' },
        { type: 'error', content: 'This is error event.' },
      ];
      break;
    case 15:
      listData = [
        { type: 'warning', content: 'This is warning event' },
        { type: 'success', content: 'This is very long usual event。。....' },
        { type: 'error', content: 'This is error event 1.' },
        { type: 'error', content: 'This is error event 2.' },
        { type: 'error', content: 'This is error event 3.' },
        { type: 'error', content: 'This is error event 4.' },
      ];
      break;
    default:
  }
  return listData || [];
}

function dateCellRender(value) {
  const listData = getListData(value);
  return (
    <Popover content={content} trigger="click">
        <div style={{height: "100%", width: "100%", zIndex: "-10"}} ></div>
        {/* <ul className="events">
        {listData.map(item => (
            <li key={item.content}>
            <Badge status={item.type} text={item.content} />
            </li>
        ))}
        </ul> */}
    </Popover>
  );
}

function getMonthData(value) {
  if (value.month() === 8) {
    return 1394;
  }
}

function monthCellRender(value) {
  const num = getMonthData(value);
  return num ? (
    <div className="notes-month">
      <section>{num}</section>
      <span>Backlog number</span>
    </div>
  ) : null;
}

function onSelect(value) {
    console.log(value.format('YYYY-MM-DD'))
}
 
export const CustomCalendar = () => (
    <Calendar dateCellRender={dateCellRender} monthCellRender={monthCellRender} onSelect={onSelect} />
)