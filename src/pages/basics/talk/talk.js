import React, { useState } from "react"
import Layout from "../../../components/layout"
import * as contactStyles from "./talk.module.css"
import axios from 'axios';

const ipAddress = 'localhost';
// const ipAddress = '47.97.71.176';

/** 接口定义 */
const getJSONData = async () => {
  try {
    return new Promise(async (resolve, reject) => {
      const res = await axios.get(`http://${ipAddress}:9527/blog/talkBoard/getInfo`);
      if (res.status === 200) {
        resolve(res.data)
      } else {
        reject(null)
      }
    })
  } catch (error) {
    return Promise.reject('get api error')
  }
}

/** 添加接口 */
const addMessageData = async (params = { name: "冰上飞熊", message: "有问题，很有问题。" }) => {
  try {
    return new Promise(async (resolve, reject) => {
      const data = new URLSearchParams();
      data.append('name', params.name);
      data.append('message', params.message);
      const res = await axios.post(`http://${ipAddress}:9527/blog/talkBoard/addInfo`, data)
      if (res.status === 200 || res.status === 201) {
        resolve(res.data)
      } else {
        reject(null)
      }
    })
  } catch (error) {
    Promise.reject(new Error('error'))
  }
}

export default function Home() {
  /** 留言板上的数据 */
  const [talkBoardInfo, setTalkBoardInfo] = useState([{ message: '数据获取中...', name: '冰上飞熊', id: '11' }]);
  /** flag 标志数组，1 表示已获取到数据 */
  const [flagTalkBoard, setFlagTalkBoard] = useState(0);

  /** 获取数据之前和之后的渲染 */
  const TalkBoard = () => {
    console.log(contactStyles);
    const getTalkBoardElement = (data) => {
      return (
        <div className={contactStyles?.talkBoard}>
          <span className={contactStyles.talkBoardTitle}>
            留言板
          </span>
          {
            data.map(({ message, name, id }) => {
              return (
                <div key={id} className={contactStyles?.oneMeaasge}>
                  <message>
                    {message}
                  </message>
                  <name>
                    —— {name}
                  </name>
                </div>
              )
            })
          }
        </div>
      )

    }
    // 先查询数据，再渲染组件
    if (flagTalkBoard === 0) {
      setFlagTalkBoard(1);
      getJSONData().then((data) => {
        setTalkBoardInfo(data);
      }).catch(() => {
        setTalkBoardInfo([{ message: '数据获取失败', name: '冰上飞熊' }]);
      })
    } else {
      return getTalkBoardElement(talkBoardInfo);
    }
  }

  /** 表单提交 */
  const handleSubmit = (e) => {
    e.preventDefault();
    const params = {
      name: document.getElementById('name').value,
      message: document.getElementById('message').value,
    }
    if (params.message !== '' && params.name !== '') {
      addMessageData(params).then((res) => {
        window.location.reload();
      }).catch(() => {
        alert('添加失败')
      })
    } else {
      window.alert('不能提交空白啊！')
    }
  }

  return (
    <Layout>
      {TalkBoard()}
      <div className={contactStyles?.addMeaasge}>
        <input id="message" type="text" name="message" placeholder="请输入您的留言" autocomplete="off" />
        <button onClick={handleSubmit}>提交</button>
        <input id="name" type="text" name="name" placeholder="请输入您的姓名" autocomplete="off" defaultValue={'匿名'} />
      </div>
    </Layout>
  )
}
