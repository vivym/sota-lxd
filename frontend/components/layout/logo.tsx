import {
  AntCloudOutlined,
} from '@ant-design/icons'
import styles from './logo.module.css'

type LoginType = 'small' | 'middle' | 'large'

export default function Logo({ size, color } : { size?: LoginType, color?: string }) {
  size = size || 'middle'
  color = color || 'white'

  let iconSize = '40px', fontSize = '24px'
  switch (size) {
    case 'small':
      iconSize = '20px'
      fontSize = '16px'
      break
    case 'middle':
      iconSize = '40px'
      fontSize = '24px'
      break
    case 'large':
      iconSize = '60px'
      fontSize = '42px'
      break
  }

  return (
    <div className={styles.logo}>
      <AntCloudOutlined style={{ fontSize: iconSize, color }} />
      <span style={{ fontSize, color, marginLeft: '5px' }}>SotaLXD</span>
    </div>
  )
}
