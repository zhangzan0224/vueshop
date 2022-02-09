import { v4 as uuidv4 } from 'uuid'

// 要随机生成一个,而且每次执行都不变化,需要持久存储
export const getUUID = () => {
  let uuidToken = window.localStorage.getItem('UUID')
  if (!uuidToken) {
    // 如果没有,生成一个,并且存储
    uuidToken = uuidv4()
    window.localStorage.setItem('UUID', uuidToken)
  }
  return uuidToken
}
