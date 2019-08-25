node {

    // 项目信息
    def PROJECT_PATH = '/ops/server/Vue-zgg-crm/'

    // 发布服务器
    def APP1 = 'root@192.168.91.111'

    stage("deploy - APP1") {
        echo '开始发布'
        def appServer = "${APP1}"
        sh "ssh -tt ${appServer} \"cd ${PROJECT_PATH} && git checkout . && git pull && npm run build:prod\""
    }
    
}

