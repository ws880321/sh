// 海关截获的全球各国入境信息展示

import xhr from './api';
const getData = (params) => {
    let p = {
        "classifyFilter": {
            "buildTree": false,
            "code": "0006",
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
        "districtCode": "流感,2020-10-27,2020-10-30",
        "isUnion": false
    }
    return xhr.post('/shanghaiexecute/execute', {...p })
}
export default getData