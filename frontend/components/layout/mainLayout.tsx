import { ReactElement, useState } from 'react'
import { Layout, Menu, Popover, Space } from 'antd'
import {
  CaretUpOutlined,
  CaretDownOutlined,
} from '@ant-design/icons'
import Head from 'next/head'
import Link from 'next/link'
import { useUser } from '@/components/user'
import Logo from './logo'
import styles from './mainLayout.module.css'

const { Header, Content } = Layout

const HeaderRight = () => {
  const { user } = useUser()

  const [popoverOpened, setPopoverOpened] = useState(false)

  if (user?.isLoggedIn) {
    const popoverContent = <></>

    return (
      <Space size="large">
        <Link href="/console" style={{ color: 'white' }}>控制台</Link>
        <Popover
          placement="bottomRight"
          title={user.username}
          content={popoverContent}
          onOpenChange={setPopoverOpened}
        >
          <span style={{ color: 'white' }}>{user.username}</span>
          {
            popoverOpened ? (
              <CaretUpOutlined style={{ color: 'white' }} />
            ) : (
              <CaretDownOutlined style={{ color: 'white' }} />
            )
          }
        </Popover>
      </Space>
    )
  } else {
    return <Link href="/login" style={{ color: 'white' }}>登录</Link>
  }
}

export default function MainLayout({ children } : { children: ReactElement }) {
  return (
    <>
      <Head>
        <title>Sota LXD</title>
        <meta name="description" content="Sota LXD" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Header className={styles.header}>
          <div className={styles.left}>
            <Logo />
            <Menu
              style={{ marginLeft: '20px' }}
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={[]}
              items={[
                {
                  key: 'market',
                  label: <Link href="/market">算力市场</Link>
                },
                {
                  key: 'datasets',
                  label: <Link href="/datasets">数据集</Link>
                },
                {
                  key: 'models',
                  label: <Link href="/models">模型</Link>
                },
                {
                  key: 'knowledge',
                  label: <Link href="/knowledge">知识库</Link>
                },
                {
                  key: 'assistant',
                  label: <Link href="/assistant">AI助手</Link>
                },
              ]}
            />
          </div>
          <HeaderRight />
        </Header>
        <Content>{children}</Content>
      </Layout>
    </>
  )
}
