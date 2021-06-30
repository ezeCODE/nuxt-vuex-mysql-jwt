export default {

    head: {
        title: 'searchSkills',
        htmlAttrs: {
            lang: 'en'
        },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },

    serverMiddleware: [
        '~/server-middleware/delete',
        '~/server-middleware/update',
        '~/server-middleware/add',
        '~/server-middleware/read',
        '~/server-middleware/selfPost',
        '~/server-middleware/limit20'

    ],

    css: [
        './assets/styles/reset.css',
        './assets/styles/_screen.scss',
        './assets/styles/_tools.scss',
        './assets/styles/_cols.scss',
        './assets/styles/_buttons.scss',
        './assets/styles/_forms.scss',
        './assets/styles/_icons.scss',
        './assets/styles/_links.scss',
        './assets/styles/_paragraph.scss',
        './assets/styles/_index.scss'

    ],


    plugins: [
        { src: './plugins/mysql/connect.js', mode: 'server' },
        { src: './plugins/mysql/jwt/index.js', mode: 'client' }

    ],


    components: true,
    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [],


    modules: [
        // https://go.nuxtjs.dev/axios

    ],

    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    axios: {},

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {

        extend(config, { isDev, isClient }) {

            config.node = {
                fs: 'empty'
            }

            // ....
        }



    }
}