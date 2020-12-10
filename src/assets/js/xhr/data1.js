// 海关截获的全球各国入境信息展示

import xhr from './api';
const getData = (jd = "person_entry_disease_lxxgm", time = "2020-01-01,2020-03-01") => {
    let districtCode = jd + "," + time


    let p = {
        "classifyFilter": {
            "buildTree": false,
            "code": "0001",
            "codes": [],
            "fuzzyCode": "",
            "fuzzyCodes": [],
            "id": "",
            "ids": [],
            "parentId": "",
            "parentIds": [],
            "useCode": true,
            "useCodes": false,
            "useFuzzyCode": false,
            "useFuzzyCodes": false,
            "useId": false,
            "useIds": false,
            "useParentId": false,
            "useParentIds": false
        },
        "districtCode": districtCode,//疾病是接口返回的数据下拉框选取的和全球疫情数据不一样需要注意一下
        "isUnion": false
    }
    return xhr.post('/shanghaiexecute/execute', { ...p })
}
export default getData