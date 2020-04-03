/**
 * @desc 研究
 * @date 2020年4月3日11:45:12
 * @author veaba
 * */
export const researchRoutes = [
    {
        path: '/research',
        children: [
            {
                path: 'index'
            },
            {
                path: 'vaccine'
            },
            {
                path: 'origin'
            },
            {
                path: 'paper'
            },
        ]
    }
];
