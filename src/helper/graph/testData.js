export let testData = {
  nodes: [
    {key: 'case1', text: '主案', category: 'mainCase'},
    {key: 'oper1', text: '智能串并', category: 'oper', num: '2'},
    {key: 'oper2', text: '视频侦查', category: 'oper'},
    {key: 'oper3', text: '高危分析', category: 'oper'},
    {key: 'tel1', text: '1503423423', category: 'tel'},
    {key: 'file1', text: 'A123132321313', category: 'case'},
    {key: 'file2', text: 'A12313232fsdfsdf', category: 'case'},
    {key: 'person1', text: '陈森森', category: 'person'},
    {key: 'person2', text: '李思思', category: 'person'},
    {key: 'person3', text: '陈菲菲', category: 'person'},
    {key: 'car1', text: 'A2343243', category: 'car'}
  ],
  links: [
    {from: 'case1', to: 'car1', category: 'case', text: '可疑车辆'},
    {from: 'case1', to: 'oper1', category: 'case'},
    {from: 'case1', to: 'oper2', category: 'case'},
    {from: 'case1', to: 'oper3', category: 'case'},
    {from: 'case1', to: 'tel1', category: 'case'},
    {from: 'oper1', to: 'file1', category: 'oper'},
    {from: 'oper1', to: 'file2', category: 'oper'},
    {from: 'oper2', to: 'person3', category: 'oper', text: '可疑人员'},
    {from: 'oper3', to: 'person1', category: 'oper', text: '可疑人员'},
    {from: 'oper3', to: 'person2', category: 'oper', text: '可疑人员'}
  ]
};
