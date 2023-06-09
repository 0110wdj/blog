/*
 * @description: 
 * @RGX/RBX: 
 * @Authored: LiuJie
 * @Date: 2022-04-27 12:54:43
 * @LastEditors: LiuJie 626796235@qq.com
 * @LastEditTime: 2023-05-01 14:56:19
 */
import React, { useState } from "react"
import Layout from "../../../components/layout"
import * as styles from "./kits.module.css"

export default function Home() {

  // 翻译
  const [hexWord, setHexWord] = useState('31 32');
  const [stringWord, setStringWord] = useState('12');

  // 生成
  const [left, setLeft] = useState('11 22 33 44 55 66 77 88');
  const [right, setRight] = useState('');

  /** 进制转换 */
  const [bin2, setBin2] = useState('10001');
  const [bin8, setBin8] = useState('21');
  const [bin10, setBin10] = useState('17');
  const [bin16, setBin16] = useState('11');

  /**
 * '31 32' --> '12'
 * @param {*} str 
 * @returns 
 */
  const toStrStr = (str) => {
    let lineString = str.split(/[(\r\n\s)\r\n\s]+/).join('')
    let tempStr = ''
    let arr = []
    for (let i = 0; i < lineString.length; i++) {
      if (i % 2 === 0) {
        tempStr = lineString.at(i)
      } else {
        tempStr += lineString.at(i)
        arr.push(tempStr)
      }
    }
    let charArr = []
    arr.forEach(item => {
      charArr.push(String.fromCharCode(parseInt(item, 16)))
    });
    return charArr.join('')
  }

  /**
  * '12' --> '31 32'
  * @param {*} str 
  * @returns 
  */
  const toHexStr = (str) => {
    let charArr = []
    for (let i = 0; i < str.length; i++) {
      let a = parseInt(str.charCodeAt(i), 10)
      charArr.push(a.toString(16))
    }
    return charArr.join(' ')
  }

  /**
 * '31 32' --> 'Tmsg.FData[x] = 0x31;\nTmsg.FData[x] = 0x32;'
 * @param {*} str 
 * @returns 
 */
  const createTmsg = (str) => {
    let arr = str.split(' ')
    let charArr = []
    let i = 0
    arr.forEach(item => {
      charArr.push(`Tmsg.FData[${i}] = 0x` + item + ';')
      i++
    });
    return charArr.join('\n')
  }

  /** 更新进制列表 */
  const transBin = (value, base) => {
    console.log('source:', value);
    if (!value) {
      setBin2(0)
      setBin8(0)
      setBin10(0)
      setBin16(0)
      return
    }
    let sum2, sum8, sum10, sum16
    switch (base) {
      case 2:
        sum10 = parseInt(value, 2)
        break;
      case 8:
        sum10 = parseInt(value, 8)
        break;
      case 10:
        sum10 = parseInt(value, 10);
        break;
      case 16:
        sum10 = parseInt(value, 16)
        break;
      default:
        break;
    }
    sum2 = parseInt(sum10).toString(2)
    sum8 = parseInt(sum10).toString(8)
    sum10 = parseInt(sum10).toString(10)
    sum16 = parseInt(sum10).toString(16)
    setBin2(sum2)
    setBin8(sum8)
    setBin10(sum10)
    setBin16(sum16)
  }
  return (
    <Layout>
      <div className={styles?.binConfig}>
        <h3>进制转换</h3>
        <div>
          <span>二进制:</span>
          <input onChange={(e) => { transBin(e?.target?.value, 2); }} value={bin2} />
        </div>
        <div>
          <span>八进制:</span>
          <input onChange={(e) => { transBin(e?.target?.value, 8); }} value={bin8} />
        </div>
        <div>
          <span>十进制:</span>
          <input onChange={(e) => { transBin(e?.target?.value, 10); }} value={bin10} />
        </div>
        <div>
          <span>十六进制:</span>
          <input onChange={(e) => { transBin(e?.target?.value, 16); }} value={bin16} />
        </div>
      </div>
      翻译 ASCII 码
      <div className={styles?.trans}>
        <code>
          <textarea rows="5" cols="33" onChange={(e) => { setHexWord(e?.target?.value) }} value={hexWord} />
        </code>
        <div style={{margin:'0 10px'}}>
          <button onClick={() => { setStringWord(toStrStr(hexWord)) }}>{'HEX ——> String'}</button>
          <button onClick={() => { setHexWord(toHexStr(stringWord)) }} >{'HEX <—— String'}</button>
        </div>
        <code>
          <textarea rows="5" cols="33" onChange={(e) => { setStringWord(e?.target?.value) }} value={stringWord} />
        </code>
      </div>
      {/* 报文脚本生成
      <div className={styles?.trans}>
        <div>
          <code>
            <input onChange={(e) => { setLeft(e?.target?.value) }} value={left} />
          </code>
        </div>
        <div>
          <button onClick={() => { setRight(createTmsg(left)) }}>{'createTmsg'}</button>
        </div>
        <code>
          <textarea rows="8" cols="33" value={right} />
        </code>
      </div> */}
    </Layout>
  )
}