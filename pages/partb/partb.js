const app = getApp()
Page({
  data: {
    selectShow: false,
    table_values: [
      { "name": "1.最高教育水平" },
      { "name": "2.最高教育院校1" },
      { "name": "3.最高教育毕业时间1" },
      { "name": "4.最高教育专业1" },
      { "name": "5.最高教育院校2*" },
      { "name": "6.最高教育毕业时间2*" },
      { "name": "7.最高教育专业2*" },
      { "name": "8.授权机构1*" },
      { "name": "9.证书名称1*" },
      { "name": "10.获取日期1*" },
      { "name": "11.授权机构2*" },
      { "name": "12.证书名称2*" },
      { "name": "13.获取日期2*" }
    ],
    index: 0,
    selectData: ['副学士','学士','硕士','博士']
  }
})