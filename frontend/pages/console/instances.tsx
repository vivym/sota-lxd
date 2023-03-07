import React from 'react'
import { Table, Space } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { ConsoleLayout } from '@/components/layout'
import { useUser } from '@/components/user'

interface BasicInfo {
  fingerprint: string
  region: string
  machine: string
}

interface Spec {
  cpu: string
}

interface SSHInfo {
  host: string
  port: string
  username: string
}

interface DataType {
  id: number
  basicInfo: BasicInfo
  status: string
  spec: Spec
  expireAt: Date
  sshInfo: SSHInfo
}

interface BasicInfoCellProps {
  info: BasicInfo
}

const BasicInfoCell: React.FC<BasicInfoCellProps> = ({ info }: BasicInfoCellProps) => (
  <div>
    <div>
      <span>{info.region}</span>
      <span>{info.machine}</span>
    </div>
    <span>{info.fingerprint}</span>
  </div>
)

interface StatusCellProps {
  status: string
}

const StatusCell: React.FC<StatusCellProps> = ({ status }: StatusCellProps) => (
  <div>{status}</div>
)

interface SpecCellProps {
  spec: Spec
}

const SpecCell: React.FC<SpecCellProps> = ({ spec }: SpecCellProps) => (
  <div>{spec.cpu}</div>
)

interface ExpireAtCellProps {
  expireAt: Date
}

const ExpireAtCell: React.FC<ExpireAtCellProps> = ({ expireAt }: ExpireAtCellProps) => (
  <div>{expireAt.toDateString()}</div>
)

interface ActionCellProps {
  record: DataType
}

const ActionCell: React.FC<ActionCellProps> = ({ record }: ActionCellProps) => (
  <Space>
    <a>开机</a>
    <a>更多</a>
  </Space>
)

const columns: ColumnsType<DataType> = [
  {
    title: '实例ID',
    dataIndex: 'basicInfo',
    key: 'id',
    render: (info: BasicInfo) => <BasicInfoCell info={info} />
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    render: (status: string) => <StatusCell status={status} />
  },
  {
    title: '规格',
    dataIndex: 'spec',
    key: 'spec',
    render: (spec: Spec) => <SpecCell spec={spec} />
  },
  {
    title: '到期时间',
    dataIndex: 'expireAt',
    key: 'expireAt',
    render: (expireAt: Date) => <ExpireAtCell expireAt={expireAt} />
  },
  {
    title: '操作',
    key: 'action',
    render: (_, record) => <ActionCell record={record} />
  },
]

export default function ConsoleInstances() {
  const data: DataType[] = [
    {
      id: 1,
      basicInfo: {
        fingerprint: '89783ca4c42841cda5cfbf824bb3f153',
        region: '北京一区',
        machine: '24',
      } as BasicInfo,
      status: '运行中',
      spec: {
        cpu: 'Intel',
      } as Spec,
      expireAt: new Date(),
      sshInfo: {
        host: '10.251.0.24',
        port: '22',
        username: 'vcg',
      } as SSHInfo,
    },
    {
      id: 2,
      basicInfo: {
        fingerprint: '89783ca4c42841cda5cfbf824bb3f153',
        region: '北京一区',
        machine: '29',
      } as BasicInfo,
      status: '运行中',
      spec: {
        cpu: 'Intel',
      } as Spec,
      expireAt: new Date(),
      sshInfo: {
        host: '10.251.0.29',
        port: '22',
        username: 'vcg',
      } as SSHInfo,
    },
  ]

  return (
    <ConsoleLayout>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={data}
      />
    </ConsoleLayout>
  )
}
