/**
 * @desc 旅游
 * @date 2020年4月3日11:38:55
 * @author veaba
 * */
export const travelRoutes = [
    {
        path: '/travel',
        children: [
            {
                path:'index'
            },
            {
                path:'airline'
            },
            {
                path:'boat'
            }
        ]
    }
];
