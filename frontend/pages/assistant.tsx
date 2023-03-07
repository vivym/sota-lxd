import { Avatar, Layout, List } from 'antd'
import { MainLayout } from '@/components/layout'
import styles from '@/styles/Home.module.css'

const { Sider, Content } = Layout

export default function Home() {
  const data: any[] = [
    {
      title: '2333'
    },
    {
      title: '2333'
    },
    {
      title: '2333'
    },
    {
      title: '2333'
    },
  ]

  return (
    <MainLayout>
      <Layout style={{ height: 'calc(100vh - 64px)' }}>
        <Sider theme="light" width={300}>
          <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item, index) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src={`https://joesch.moe/api/v1/random?key=${index}`} />}
                  title={<a href="https://ant.design">{item.title}</a>}
                  description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                />
              </List.Item>
            )}
          />
        </Sider>
        <Content style={{ backgroundColor: 'white', margin: '20px' }}>

        </Content>
      </Layout>
    </MainLayout>
  )
}
