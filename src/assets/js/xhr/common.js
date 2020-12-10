// 海关截获的全球各国入境信息展示

import xhr from './api';
const jb = (params) => {
    let p = {
        "classifyFilter": {
            "buildTree": false,
            "code": "0007",
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
        "districtCode": "",
        "isUnion": false
    }
    return xhr.post('/shanghaiexecute/execute', { ...p })
}

const zm = (params) => {
    let p = {
        "classifyFilter": {
            "buildTree": false,
            "code": "0008",
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
        "districtCode": "流感",
        "isUnion": false
    }
    return xhr.post('/shanghaiexecute/execute', { ...p })
}
export { jb, zm }