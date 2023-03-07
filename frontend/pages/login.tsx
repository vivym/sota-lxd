import { useState } from 'react'
import type { CSSProperties } from 'react'
import { Button, Checkbox, Divider, Space, Spin, Form, Input, message } from 'antd'
import {
  GithubOutlined,
  UserOutlined,
  LockOutlined,
  LoadingOutlined,
} from '@ant-design/icons'
import axios from 'axios'
import Router from 'next/router'
import { Logo } from '@/components/layout'
import { useUser } from '@/components/user'
import http from '@/libs/http'
import styles from '@/styles/Login.module.css'

const { Item } = Form

const iconStyles: CSSProperties = {
  color: 'rgba(0, 0, 0, 0.2)',
  fontSize: '20px',
  verticalAlign: 'middle',
  cursor: 'pointer',
}

interface LoginFormData {
  username: string
  password: string
  remember: boolean
}

export default function Login() {
  const { user } = useUser({
    redirectTo: '/console',
    redirectIfFound: true,
  })

  const [loading, setLoading] = useState(false)

  const [messageApi, contextHolder] = message.useMessage();

  const onLogin = async ({ username, password, remember }: LoginFormData) => {
    setLoading(true)
    const params = new URLSearchParams()
    params.append('grant_type', 'password')
    params.append('username', username)
    params.append('password', password)

    try {
      const rsp = await http.post('/api/login/access-token', params)
      messageApi.open({
        type: 'info',
        content: '登录成功',
      })
      Router.push('/console')
    } catch (e) {
      if (axios.isAxiosError(e) && e.response?.status == 400) {
        messageApi.open({
          type: 'error',
          content: e.response.data.detail,
        })
      } else {
        throw e
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.mainContainer}>
      {contextHolder}
      <div className={styles.loginContainer}>
        <Logo size="large" color="black" />
        <Spin spinning={loading} tip="登录中..." indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}>
          <Form
            name="login"
            style={{ width: '328px', marginTop: '40px' }}
            initialValues={{ remember: true }}
            onFinish={onLogin}
          >
            <Item
              name="username"
              rules={[{ required: true, message: '请输入用户名!' }]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="用户名"
                size="large"
              />
            </Item>
            <Item
              name="password"
              rules={[{ required: true, message: '请输入密码!' }]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="密码"
                size="large"
              />
            </Item>
            <Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>自动登录</Checkbox>
              </Form.Item>

              <a style={{ float: 'right' }} href="#">
                忘记密码
              </a>
            </Item>
            <Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                block
              >
                登录
              </Button>
            </Item>
          </Form>
        </Spin>
        <Divider plain>
          <span style={{ color: '#CCC', fontWeight: 'normal', fontSize: 14 }}>
            其他登录方式
          </span>
        </Divider>
        <Space align="center" size={24}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              height: 40,
              width: 40,
              border: '1px solid #D4D8DD',
              borderRadius: '50%',
            }}
          >
            <GithubOutlined style={{ ...iconStyles, color: '#111' }} />
          </div>
        </Space>
      </div>
    </div>
  )
}
