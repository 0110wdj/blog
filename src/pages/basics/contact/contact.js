/*
 * @description: 
 * @RGX/RBX: 
 * @Authored: LiuJie
 * @Date: 2022-04-27 12:54:43
 * @LastEditors: LiuJie 626796235@qq.com
 * @LastEditTime: 2023-06-20 14:50:24
 */
import React, { useState } from "react"
import Layout from "../../../components/layout"
import * as contactStyles from "./contact.module.css"

// const ipAddress = '47.97.71.176';
const ipAddress = '127.0.0.1';

/** 接口定义 */
const getJSONData = async () => {
  try {
    return fetch(`http://${ipAddress}:9527/blog/talkBoard/getInfo?token=tokendiyhiahiahiasoeasy`).then(
      (res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          return {
            code: 2,
          }
        }
      }
    )
  } catch (error) {
    Promise.reject(new Error('error'))
  }
}

/** 添加接口 */
const addMessageData = async (params = { name: "冰上飞熊", message: "有问题，很有问题。" }) => {
  try {

    return fetch(`http://${ipAddress}:9527/blog/talkBoard/addInfo`, {
      method: 'POST',
      body: JSON.stringify({
        'token': 'tokendiyhiahiahiasoeasy',
        name: params.name,
        message: params.message,
      })
    })
      .then(response => response.status === 200 ? response.json() : Promise.reject(new Error('error')))
  } catch (error) {
    Promise.reject(new Error('error'))
  }
}

export default function Home() {
  /** 留言板上的数据 */
  const [talkBoardInfo, setTalkBoardInfo] = useState([{ message: '数据获取中...', name: '冰上飞熊', id: '11' }]);
  /** flag 标志数组 */
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
    if (flagTalkBoard === 0) {
      setFlagTalkBoard(1);
      getJSONData().then((res) => {
        const { code, body } = res;
        if (code === 1) {
          setTalkBoardInfo(body);
        } else {
          setTalkBoardInfo([{ message: '数据获取失败', name: '冰上飞熊' }]);
        }
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
        const { code, body } = res;
        if (code === 1 && body) {
          window.location.reload();
        }
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
