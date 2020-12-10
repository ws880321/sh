// 海关截获的全球各国入境信息展示

import xhr from './api2';
const getData = (jd = "流感", time = "2020-10-27,2020-10-30") => {
    let districtCode = jd + "," + time
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
        "districtCode": districtCode,
        "isUnion": false
    }
    return xhr.post('/shanghaiexecute/execute', {...p })
}
const jb = () => {
    return xhr.get('/Quarantine/findDiseaseTypes?key=shwj-828874x242')
}
const d1 = (name, startTime, endTime) => {
    return xhr.get(`/Quarantine/findGlobalQuarantineTotal?name=${name}&startTime=${startTime}&endTime=${endTime}&key=shwj-828874x242`)
}

export { jb, d1 }