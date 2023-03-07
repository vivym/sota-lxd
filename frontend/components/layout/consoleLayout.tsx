import type { ReactElement } from 'react'
import { Layout, Menu } from 'antd'
import {
  DesktopOutlined,
  FileOutlined,
  KeyOutlined,
  PieChartOutlined,
  UserOutlined,
} from '@ant-design/icons'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { MainLayout } from '@/components/layout'
import { useUser } from '@/components/user'

const { Sider, Content } = Layout

export default function ConsoleLayout({ children } : { children: ReactElement }) {
  const { user } = useUser({
    redirectTo: '/login',
  })

  const router = useRouter()
  const pathname = router.pathname.split('/')
  const menuSelectedKey = pathname.length <= 2 ? 'index' : pathname[2]

  return (
    <MainLayout>
      <Layout style={{ height: 'calc(100vh - 64px)' }}>
        <Sider theme="light" width={200} collapsible>
          <Menu
            mode="inline"
            style={{ height: '100%' }}
            defaultSelectedKeys={[menuSelectedKey]}
            items={[
              {
                key: 'index',
                icon: <PieChartOutlined />,
                label: <Link href="/console">主页</Link>,
              },
              {
                key: 'instances',
                icon: <DesktopOutlined />,
                label: <Link href="/console/instances">实例</Link>,
              },
              {
                key: 'images',
                icon: <FileOutlined />,
                label: <Link href="/console/images">镜像</Link>,
              },
              {
                key: 'keys',
                icon: <KeyOutlined />,
                label: <Link href="/console/keys">密钥</Link>,
              },
              {
                key: 'account',
                icon: <UserOutlined />,
                label: <Link href="/console/account">账户</Link>,
              },
            ]}
          />
        </Sider>
        <Content>{children}</Content>
      </Layout>
    </MainLayout>
  )
}
