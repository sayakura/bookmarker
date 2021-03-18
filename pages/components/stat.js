import { Statistic, Layout, Row, Col } from 'antd'
const { Content } = Layout;

const { Countdown } = Statistic;
import { ResponsivePie } from '@nivo/pie'
import { ResponsiveBar } from '@nivo/bar'

const MyResponsiveBar = ({ data /* see data tab */ }) => (
    <ResponsiveBar
        data={data}
        keys={[ 'hot dog', 'burger', 'sandwich', 'kebab', 'fries', 'donut' ]}
        indexBy="week"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'nivo' }}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: '#38bcb2',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: '#eed312',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'week',
            legendPosition: 'middle',
            legendOffset: 32
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'food',
            legendPosition: 'middle',
            legendOffset: -40
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
        legends={[
            {
                dataFrom: 'keys',
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: 'left-to-right',
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
    />
  )
  


const MyResponsivePie = ({ data /* see data tab */ }) => (
    <ResponsivePie
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        data={data}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        colors={{ scheme: 'nivo' }}
        borderWidth={1}
        borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }}
        radialLabelsSkipAngle={10}
        radialLabelsTextColor="#333333"
        radialLabelsLinkColor={{ from: 'color' }}
        sliceLabelsSkipAngle={10}
        sliceLabelsTextColor="#333333"
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
      legends={[
          {
              anchor: 'bottom',
              direction: 'row',
              justify: false,
              translateX: 0,
              translateY: 56,
              itemsSpacing: 0,
              itemWidth: 100,
              itemHeight: 18,
              itemTextColor: '#999',
              itemDirection: 'left-to-right',
              itemOpacity: 1,
              symbolSize: 18,
              symbolShape: 'circle',
              effects: [
                  {
                      on: 'hover',
                      style: {
                          itemTextColor: '#000'
                      }
                  }
              ]
          }
        ]}
    />
)



const StatPage = ({ state }) => (
    <>
      <Content style={{ padding: '0 20px', minHeight: 280 }}>
      <Row gutter={16}>
        <Col span={12}>
          <Countdown title="Countdown" />
        </Col>
        <Col span={12}>
          <Countdown title="Million Seconds"  format="HH:mm:ss:SSS" />
        </Col>
        <Col span={24} style={{ marginTop: 32 }}>
          <Countdown title="Day Level" />
        </Col>
      </Row>
      <Row>
          <Col span={12}>
            <Content style={{ height: 500, width: 500}}>
              <MyResponsivePie  data={[
                    {
                      "id": "rust",
                      "label": "rust",
                      "value": 219,
                      "color": "hsl(135, 70%, 50%)"
                    },
                    {
                      "id": "scala",
                      "label": "scala",
                      "value": 325,
                      "color": "hsl(67, 70%, 50%)"
                    },
                    {
                      "id": "stylus",
                      "label": "stylus",
                      "value": 408,
                      "color": "hsl(299, 70%, 50%)"
                    },
                    {
                      "id": "elixir",
                      "label": "elixir",
                      "value": 110,
                      "color": "hsl(189, 70%, 50%)"
                    },
                    {
                      "id": "sass",
                      "label": "sass",
                      "value": 130,
                      "color": "hsl(335, 70%, 50%)"
                    }
                  ] } />
            </Content>
          </Col>
          <Col span={12}>
            <Content style={{ height: 500, width: 500}}>
              <MyResponsivePie  data={[
                    {
                      "id": "rust",
                      "label": "rust",
                      "value": 219,
                      "color": "hsl(135, 70%, 50%)"
                    },
                    {
                      "id": "scala",
                      "label": "scala",
                      "value": 325,
                      "color": "hsl(67, 70%, 50%)"
                    },
                    {
                      "id": "stylus",
                      "label": "stylus",
                      "value": 408,
                      "color": "hsl(299, 70%, 50%)"
                    },
                    {
                      "id": "elixir",
                      "label": "elixir",
                      "value": 110,
                      "color": "hsl(189, 70%, 50%)"
                    },
                    {
                      "id": "sass",
                      "label": "sass",
                      "value": 130,
                      "color": "hsl(335, 70%, 50%)"
                    }
                  ] } />
            </Content>
          </Col>
          <Col span={24}>
          <Content style={{ height: 1000, width: '100%'}}>
              <MyResponsiveBar data={[
              {
                "week": "AD",
                "hot dog": 74,
                "hot dogColor": "hsl(237, 70%, 50%)",
                "burger": 158,
                "burgerColor": "hsl(128, 70%, 50%)",
                "sandwich": 174,
                "sandwichColor": "hsl(20, 70%, 50%)",
                "kebab": 140,
                "kebabColor": "hsl(346, 70%, 50%)",
                "fries": 174,
                "friesColor": "hsl(200, 70%, 50%)",
                "donut": 15,
                "donutColor": "hsl(226, 70%, 50%)"
              },
              {
                "week": "AE",
                "hot dog": 60,
                "hot dogColor": "hsl(235, 70%, 50%)",
                "burger": 41,
                "burgerColor": "hsl(178, 70%, 50%)",
                "sandwich": 93,
                "sandwichColor": "hsl(209, 70%, 50%)",
                "kebab": 69,
                "kebabColor": "hsl(271, 70%, 50%)",
                "fries": 89,
                "friesColor": "hsl(121, 70%, 50%)",
                "donut": 180,
                "donutColor": "hsl(149, 70%, 50%)"
              },
              {
                "week": "AF",
                "hot dog": 10,
                "hot dogColor": "hsl(230, 70%, 50%)",
                "burger": 72,
                "burgerColor": "hsl(220, 70%, 50%)",
                "sandwich": 92,
                "sandwichColor": "hsl(146, 70%, 50%)",
                "kebab": 64,
                "kebabColor": "hsl(39, 70%, 50%)",
                "fries": 15,
                "friesColor": "hsl(126, 70%, 50%)",
                "donut": 80,
                "donutColor": "hsl(152, 70%, 50%)"
              },
              {
                "week": "AG",
                "hot dog": 160,
                "hot dogColor": "hsl(223, 70%, 50%)",
                "burger": 81,
                "burgerColor": "hsl(261, 70%, 50%)",
                "sandwich": 108,
                "sandwichColor": "hsl(261, 70%, 50%)",
                "kebab": 111,
                "kebabColor": "hsl(205, 70%, 50%)",
                "fries": 2,
                "friesColor": "hsl(291, 70%, 50%)",
                "donut": 15,
                "donutColor": "hsl(166, 70%, 50%)"
              },
              {
                "week": "AI",
                "hot dog": 22,
                "hot dogColor": "hsl(280, 70%, 50%)",
                "burger": 42,
                "burgerColor": "hsl(24, 70%, 50%)",
                "sandwich": 168,
                "sandwichColor": "hsl(130, 70%, 50%)",
                "kebab": 62,
                "kebabColor": "hsl(184, 70%, 50%)",
                "fries": 5,
                "friesColor": "hsl(9, 70%, 50%)",
                "donut": 161,
                "donutColor": "hsl(143, 70%, 50%)"
              },
              {
                "week": "AL",
                "hot dog": 198,
                "hot dogColor": "hsl(317, 70%, 50%)",
                "burger": 155,
                "burgerColor": "hsl(297, 70%, 50%)",
                "sandwich": 139,
                "sandwichColor": "hsl(136, 70%, 50%)",
                "kebab": 83,
                "kebabColor": "hsl(22, 70%, 50%)",
                "fries": 141,
                "friesColor": "hsl(336, 70%, 50%)",
                "donut": 132,
                "donutColor": "hsl(177, 70%, 50%)"
              },
              {
                "week": "AM",
                "hot dog": 74,
                "hot dogColor": "hsl(3, 70%, 50%)",
                "burger": 30,
                "burgerColor": "hsl(335, 70%, 50%)",
                "sandwich": 4,
                "sandwichColor": "hsl(69, 70%, 50%)",
                "kebab": 59,
                "kebabColor": "hsl(293, 70%, 50%)",
                "fries": 32,
                "friesColor": "hsl(124, 70%, 50%)",
                "donut": 155,
                "donutColor": "hsl(348, 70%, 50%)"
    }
                  ]} />
          </Content>
          </Col>
      </Row>
      
      </Content>
    </>
  );
  
export default StatPage;