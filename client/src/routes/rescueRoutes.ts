/**
 * @desc 医疗救援行动
 * @date 2020年4月3日11:45:12
 * @author veaba
 * */
export const rescueRoutes = [
    {
        path: '/rescue',
        children: [
            {
                path: 'index'
            },
            {
                path: 'to-italy'
            },
            {
                path: 'to-serbia'
            },
        ]
    }
];
