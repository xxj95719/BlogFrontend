import React from 'react'
import { Tabs, List, Avatar, Icon, Card, Button } from 'antd'
import style from './Home.scss'
import request from '@/utils/request'

const TabPane = Tabs.TabPane
const { Meta } = Card
class Home extends React.Component {
  state = {
    articleList: [],
    projectList: []
  }
  _renderIconText({ type, text }) {
    return (
      <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
      </span>
    )
  }
  async componentWillMount() {
    let projectList = []
    for (let i = 0; i < 23; i++) {
      projectList.push({
        alt: 'example',
        avatar: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
        title: `Europe Street beat ${i}`,
        description: 'www.instagram.com'
      })
    }
    this.setState({ projectList })
    const { data } = await request({
      url: '/getArticleList'
    })

    if (data.success) {
      this.setState({ articleList: data.data })
    }
  }
  changeTab(key) {
    console.log(key)
  }
  _renderList = () => {
    return (
      <Tabs onChange={this.changeTab} type="line">
        <TabPane tab="文章" key="1">
          <List
            itemLayout="vertical"
            size="large"
            pagination={{
              onChange: page => {
                console.log(page)
              },
              pageSize: 3
            }}
            dataSource={this.state.articleList}
            renderItem={item => (
              <List.Item
                key={item.title}
                actions={[
                  this._renderIconText({ type: 'star-o', text: 156 }),
                  this._renderIconText({ type: 'like-o', text: 152 }),
                  this._renderIconText({ type: 'message', text: 2 })
                ]}
                extra={<img width={272} alt="logo" src={item.coverImg} />}
              >
                <List.Item.Meta
                  avatar={<Avatar src={item.coverImg} />}
                  title={<a href={item.href}>{item.title}</a>}
                />
                {item.content}
              </List.Item>
            )}
          />
        </TabPane>
        <TabPane tab="项目" key="2">
          <List
            grid={{
              gutter: 16,
              xs: 1,
              sm: 1,
              md: 1,
              lg: 1,
              xl: 2,
              xxl: 2
            }}
            pagination={{
              onChange: page => {
                console.log(page)
              },
              pageSize: 4
            }}
            dataSource={this.state.projectList}
            renderItem={item => (
              <List.Item>
                <Card
                  hoverable
                  cover={
                    <img
                      className={style['cover-img']}
                      alt={item.alt}
                      src={item.avatar}
                    />
                  }
                >
                  <Meta title={item.title} description={item.content} />
                </Card>
              </List.Item>
            )}
          />
        </TabPane>
      </Tabs>
    )
  }
  render() {
    return (
      <div className={style.home}>
        {this._renderList()}
        <Button
          type="primary"
          className={style.write}
          onClick={() => this.props.history.push('/AddArticle')}
        >
          写文章
        </Button>
      </div>
    )
  }
}

export default Home
