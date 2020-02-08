// input 输入类型，一般分析为从疫区来，即来自武汉，be_input=>被输入，other其他
enum ReportType {
    input,
    be_input,
    other
}

// 状态枚举, mid=>中危/重，high=>危重
enum ReportStatus {
    mid,
    high
}

declare namespace ReportInterface {
    interface insert {
        githubName: string,         // 提交报告者的名称,理论上不应该存在相同的
        name?: string,              // 名字，可能为空
        sex?: number,               // 性别,1男 -1女
        age?: number,               // 年龄
        country: string,            // 国家，*必填
        province: string,           // 省级市，*必填
        city: string,               // 城市，必填
        newsUrl: string,            // 新闻地址，*必填
        report?: string,            // 报告机构
        desc?: string,              // 描述
        from?: string,              // 从哪来
        to?: string,                // 到哪去
        type?: ReportType           // 输入性还是其他类型
        hospital?: string,          // 就诊医院
        org?: string,               // 报告的卫生机构
        hide_hour: number,          // 潜伏期，单位：小时
        isConfirm?: string,         // 是否确认
        isDead?: boolean,           // 是否陨落
        isCure?: boolean,           // 是否治愈
        isSuspected?: boolean,      // 是否是疑似
        status?: ReportStatus,      // 表示危急
        reportDate: number | string // 确认日期，年月日，时分秒自动补0,*必填
        // 用于计数，循环插入，四项至少存在一项
        count?: number,
        dead?: number,
        cure?: number,
        suspected?: number
    }

    interface update {

    }

    interface apply {
        _id: string,                 // 报告id
    }
}

export {
    ReportInterface
}
