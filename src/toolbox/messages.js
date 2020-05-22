const popuptype = [{
  type: 'mail',
  imageurl: '"https://i.bmp.ovh/imgs/2019/07/76efb4655647be8e.png"',
  message: '重設密碼信件已寄到您的信箱！',
}, {
  type: 'password-update-ok',
  imageurl: '"https://i.bmp.ovh/imgs/2019/07/5bea87bd064d335e.png"',
  message: '您的密碼已成功更新！',
}, {
  type: 'successAddRecommendSet',
  message: '已成功新增推薦套餐資料!',
}, {
  type: 'successUpdateRecommendSet',
  message: '已成功更新推薦套餐資料!',
}, {
  type: 'successDeleteRecommendSet',
  message: '已成功刪除推薦套餐資料!',
}, {
  type: 'checkDeleteRecommendSet',
  message: '請確認是否刪除此推薦套餐？',
}, {
  type: 'checkLeaveRecommendSet',
  message: '請確認是否取消編輯推薦套餐？',
}];

const msg = [{
  type: 'errorPassword',
  message: '您輸入的帳號或密碼錯誤，請再確認一次。',
}, {
  type: 'accountNoExist',
  message: '您輸入的帳號不存在，請再確認一次。',
}, {
  type: 'passwordConfirm',
  message: '您輸入的密碼不一致，請再確認一次。',
}, {
  type: 'emailFormat',
  message: '您輸入的Email格式錯誤，請再確認一次。',
}, {
  type: 'vertifyExpired',
  message: 'Oops！您的驗證碼已失效，請重新取得驗證碼。',
}, {
  type: 'systemErr',
  message: 'Sorry！驗證系統有問題，請再試一次。',
}, {
  type: 'errEmail',
  message: 'Email錯誤請重新驗證',
}, {
  type: 'mustFillIn',
  message: '請檢查必填欄位是否均已填寫!',
}, {
  type: 'atLeastOneDish',
  message: '請⾄少選擇⼀道菜餚!',
}];

export default {
  popuptype,
  msg,
};
