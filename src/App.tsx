import { useState, useEffect } from 'react'
import styles from './app.scss'
import img9kb from '@/assets/imgs/9kb.jpeg'
import img18kb from '@/assets/imgs/18kb.jpg'
import memberList from './test.json'

// 单个目标
// import(
//   /* webpackChunkName: "my-chunk-name" */ // 资源打包后的文件chunkname
//   /* webpackPrefetch: true */ // 开启prefetch预获取
//   /* webpackPreload: true */ // 开启preload预获取
//   './module'
// );

type Member = {
  name?: string
  age?: number
}

const App = () => {
  const [data, setData] = useState<Member[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(memberList as any)
      const json = await result.json()
      setData(json)
    }
    fetchData()
  }, [])

  return (
    <>
      <h2 className={styles.title}>Hello Word</h2>
      <img src={img9kb} alt='' />
      <img src={img18kb} alt='' />
      {data.map((item, index) => (
        <p key={index}>
          {item.name}---{item.age}
        </p>
      ))}
      <input />
      <p>12332sss22</p>
    </>
  )
}

export default App
