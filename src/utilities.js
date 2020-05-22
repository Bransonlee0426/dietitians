/* eslint-disable no-console */
/* eslint-disable no-useless-escape */
import messages from './toolbox/messages';

export default {
  data() {
    return {
    };
  },
  methods: {
    async $_promiseAll(APIsArray, res, err) {
      Promise.all(APIsArray).then(res).catch(err);
    },

    $_formatCheck(type, val) {
      switch (type) {
        case 'email':
        {
          const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return reg.test(val);
        }
        case 'password':
        {
          const reg = /^(?=.*[a-zA-Z]).{6,12}$/;
          return reg.test(val);
        }
        default:
          return '';
      }
    },
    $_messageBox(type) {
      const vm = this;
      // eslint-disable-next-line no-use-before-define
      const messageBoxData = msgType();
      return vm.$alert(
        `<img src= ${messageBoxData.imageurl} + class="messagebox_img"><div class="messagebox_words""> ${messageBoxData.message} </div>`, '', {
          dangerouslyUseHTMLString: true,
          closeOnClickModal: true,
          showCancelButton: false,
          showConfirmButton: false,
          showClose: false,
          center: true,
        },
      );
      function msgType() {
        // eslint-disable-next-line no-shadow
        const messageBoxData = {
          imageurl: '',
          message: '',
        };
        messages.popuptype.forEach((item) => {
          if (type === item.type) {
            messageBoxData.imageurl = item.imageurl;
            messageBoxData.message = item.message;
          }
        });
        return messageBoxData;
      }
    },
    $_msgContent(type) {
      let errMsg = '';
      messages.msg.forEach((item) => {
        if (type === item.type) {
          errMsg = item.message;
        }
      });
      return errMsg;
    },
    $_dishDataFormat(data) {
      const mydata = {
        dish_id: data.dish_id,
        dish_name: data.dish_name,
        id: data.id,
        restaurant_id: data.restaurant_id,
        restaurant_name: data.restaurant_name,
        全殼根莖份量: data.starch_products,
        低脂肉份量: data.low_meats,
        中脂肉份量: data.medium_meats,
        高脂肉份量: data.high_meats,
        全脂奶: data.dairy_products,
        蔬菜份量: data.vegetables,
        水果份量: data.fruits,
        油脂: data.fats,
        '精緻糖份量(0-2)': data.simple_sugars,
        '好油加成(0-2)': data.oils,
        '高纖餐星等(0-5)': data.high_fiber,
        '高鉀餐星等(0-5)': data.high_potassium,
        '舒壓餐星等(0-5)': data.relaxed_meal,
        醣類: data.sugar_gram,
        '蛋白質(公克)': data.protein_gram,
        '脂肪(公克)': data.fats_gram,
        '熱量(大卡)': data.calorie,
        '醣類(百分比)': data.sugar_percentage,
        '蛋白質(百分比)': data.protein_percentage,
        '脂肪(百分比)': data.fats_percentage,
      };
      return mydata;
    },
    $_dataParams(data) {
      const vm = this;
      const myParams = [];
      if (Array.isArray(data)) {
        data.forEach((item) => {
          const mydata = vm.$_dishDataFormat(item);
          myParams.push(mydata);
        });
        return myParams;
      }
      const mydata = vm.$_dishDataFormat(data);
      return mydata;
    },
    $_dataParamsForIngre(data) {
      const dishArr = [];
      data.forEach((ele) => {
        // 百分比
        const sugarPercentage = Math.round(
          (ele.sugar_gram * 4 / ele.calorie) * 100,
        ) || 0;
        const proteinPercentage = Math.round(
          (ele.protein_gram * 4 / ele.calorie) * 100,
        ) || 0;
        let fatsPercentage = Math.round(
          (ele.fats_gram * 9 / ele.calorie) * 100,
        ) || 0;
        const tatalPercentage = +(sugarPercentage) + +(proteinPercentage) + +(fatsPercentage);
        if (tatalPercentage !== 0) {
          if (tatalPercentage > 100) {
            const differences = tatalPercentage - 100;
            fatsPercentage -= differences;
          } else if (tatalPercentage < 100) {
            const differences = 100 - tatalPercentage;
            fatsPercentage += differences;
          }
        }
        const item = {
          dish_id: ele.dish_id,
          dish_name: ele.dish_name,
          id: ele.id,
          restaurant_id: ele.restaurant_id,
          restaurant_name: ele.restaurant_name,
          image_file: ele.image_file,
          foodIngre: [
            `全殼根莖份量: ${ele.starch_products}`,
            `低脂肉份量: ${ele.low_meats}`,
            `中脂肉份量: ${ele.medium_meats}`,
            `高脂肉份量: ${ele.high_meats}`,
            `全脂奶: ${ele.dairy_products}`,
            `蔬菜份量: ${ele.vegetables}`,
            `水果份量: ${ele.fruits}`,
            `油脂: ${ele.fats}`,
            `精緻糖份量(0-2): ${ele.simple_sugars}`,
            `好油加成(0-2): ${ele.oils}`,
          ],
          nutriIngre: [
            `醣類: ${ele.sugar_gram}g (${sugarPercentage}%)`,
            `蛋白質: ${ele.protein_gram}g (${proteinPercentage}%)`,
            `脂肪: ${ele.fats_gram}g (${fatsPercentage}%)`,
            `熱量: ${ele.calorie} 大卡`,
          ],
          additional: [
            `高纖餐星等(0-5): ${ele.high_fiber}`,
            `高鉀餐星等(0-5): ${ele.high_potassium}`,
            `舒壓餐星等(0-5): ${ele.relaxed_meal}`,
          ],
        };
        dishArr.push(item);
      });
      return dishArr;
    },
    $_isDataEmpty(data) {
      if (Array.isArray(data)) {
        if (data.length === 0) {
          return false;
        }
        return true;
      }
      if (!data) {
        return false;
      }
      return true;
    },
    // Message 訊息提示
    $_alertCheckFormEmpty(type) {
      const vm = this;
      let msg = '';
      messages.msg.forEach((item) => {
        if (type === item.type) {
          msg = item.message;
        }
      });
      vm.$message({
        message: msg,
        iconClass: 'no',
      });
    },
    $_successMessageBox(type, pathName) {
      const vm = this;
      let msg = '';
      messages.popuptype.forEach((item) => {
        if (type === item.type) {
          msg = item.message;
        }
      });
      vm.$alert(msg, {
        confirmButtonText: '確定',
        showCancelButton: false,
        showConfirmButton: false,
        showClose: true,
        closeOnClickModal: true,
        center: true,
        roundButton: true,
        callback: () => {
          if (pathName) {
            vm.$router.push({ name: pathName });
          }
        },
      });
    },
    $_doubleCheckMessageBox(type) {
      const vm = this;
      let msg = '';
      messages.popuptype.forEach((item) => {
        if (type === item.type) {
          msg = item.message;
        }
      });
      return vm.$confirm(msg, {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
      });
    },
  },
};
