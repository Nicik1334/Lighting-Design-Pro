/**
 * 数字
 */
export const REG_NUMBER: string = '.*\\d+.*';
/**
 * 小写字母
 */
export const REG_UPPERCASE: string = '.*[A-Z]+.*';
/**
 * 大写字母
 */
export const REG_LOWERCASE: string = '.*[a-z]+.*';

/**
 * 特殊符号(~!@#$%^&*()_+|<>,.?/:;'[]{}\)
 */
export const REG_SYMBOL: string = '.*[~!@#$%^&*()_+|<>,.?/:;\'\\[\\]{}"]+.*';

/**
 * 中文
 */
export const REG_CHINESE = '.*[\u4E00-\u9FA5]|[\uFE30-\uFFA0]+.*';

export const STATUS_TEXT = {
  1: '非常弱',
  2: '弱',
  3: '一般',
  4: '强',
  5: '非常强',
};

/**
 * 长度
 * @param str
 */
const length = (str: string) => {
  if (str.length < 5) {
    return 5;
  } else if (str.length < 8) {
    return 10;
  } else {
    return 25;
  }
};

/**
 * 字母
 * @param str
 */
const letters = (str: string) => {
  let count1 = 0,
    count2 = 0;
  for (let i = 0; i < str.length; i++) {
    if (str.charAt(i) >= 'a' && str.charAt(i) <= 'z') count1++;
    if (str.charAt(i) >= 'A' && str.charAt(i) <= 'Z') count2++;
  }
  if (count1 == 0 && count2 == 0) return 0;
  if (count1 != 0 && count2 != 0) return 20;
  return 10;
};

/**
 * 数字
 * @param str
 */
const numbers = (str: string) => {
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    if (str.charAt(i) >= '0' && str.charAt(i) <= '9') count++;
  }
  if (count == 0) return 0;
  if (count == 1) return 10;
  return 20;
};
/**
 * 符号
 * @param str
 */
const symbols = (str: string) => {
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    if (
      (str.charCodeAt(i) >= 0x21 && str.charCodeAt(i) <= 0x2f) ||
      (str.charCodeAt(i) >= 0x3a && str.charCodeAt(i) <= 0x40) ||
      (str.charCodeAt(i) >= 0x5b && str.charCodeAt(i) <= 0x60) ||
      (str.charCodeAt(i) >= 0x7b && str.charCodeAt(i) <= 0x7e)
    ) {
      count++;
    }
  }
  if (count == 0) return 0;
  if (count == 1) return 10;
  return 25;
};

/**
 * 得分机制
 * @param str
 */
const rewards = (str: string) => {
  const letter = letters(str); //字母
  const number = numbers(str); //数字
  const symbol = symbols(str); //符号
  if (letter > 0 && number > 0 && symbol == 0) return 2; //字母和数字
  if (letter == 10 && number > 0 && symbol > 0) return 3; //字母、数字和符号
  if (letter == 20 && number > 0 && symbol > 0) return 5; //大小写字母、数字和符号
  return 0;
};
/**
 * 最终评分
 * @param str
 */
export const level = (str: string) => {
  const lengths = length(str); //长度
  const letter = letters(str); //字母
  const number = numbers(str); //数字
  const symbol = symbols(str); //符号
  const reward = rewards(str); //奖励
  const sum = lengths + letter + number + symbol + reward;
  if (sum >= 80) {
    return STATUS_TEXT[5]; //非常安全
  } else if (sum >= 60) {
    return STATUS_TEXT[4]; //非常强
  } else if (sum >= 40) {
    return STATUS_TEXT[3]; //一般
  } else if (sum >= 25) {
    return STATUS_TEXT[2]; //弱
  } else {
    return STATUS_TEXT[1]; //非常弱
  }
};
