<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from "axios"
import jwt_decode from "jwt-decode"
import { ElLoading, ElMessage } from 'element-plus'
import ClipboardJS from  "clipboard"

console.log(useRouter())
console.log(useRoute().name)
console.log(useRoute().query)
document.title=useRoute().query.title as string
const props = defineProps({
    foo: String
})
interface loginInfo {
    loginNo: string,
    roleId: string,
    password: string,
    grant_type: string,
    scope: string,
    mobile?: string,
    mobilePassword?: string

}
new ClipboardJS('.btn');

const accountId = ref("")
const password = ref("")
const roleId = ref("")
const jsonObj = ref<any>(null)
const jsonStr = ref("")
const type = ref("1")


const getToken = (defultAccount?: string, defultPassWord?: string, defultRoleId?: string) => {
    let loginNo = defultAccount ? defultAccount : accountId.value;
    let loginPassword = defultPassWord ? defultPassWord : password.value;
    let loginRoleId = defultRoleId ? defultRoleId : roleId.value;
    let obj: loginInfo = {
        loginNo: loginNo && loginNo.length > 0 ? loginNo : "",
        roleId: loginRoleId.trim(),
        password: loginPassword && loginPassword.length > 0 ? loginPassword : "",
        grant_type: "username_password",
        scope: "webApp"
    }
    if (loginNo.trim().length == 11) { //判断是不是手机号登录
        obj["mobile"] = loginNo
        obj["mobilePassword"] = loginPassword
        obj["grant_type"] = "username_password"

    }
    let loading: any
    loading = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)',
    })
    axios({
        method: 'post',
        url: type.value == "1" ? 'https://retail.upbuy.com.cn/route/retailauth/oauth/token' : 'https://retailsit.upbuy.com.cn/route/retailauth/oauth/token',
        data: obj,
        transformRequest: [
            function (data) {
                let ret = ''
                for (let it in data) {
                    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                }
                ret = ret.substring(0, ret.lastIndexOf('&'));
                return ret
            }
        ],
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            "Authorization": type.value == "1" ? "Basic d2ViQXBwOndlcC1wZWMtKg==" : "Basic d2ViQXBwOjEyMzQ1Ng=="
        },
    }).then(
        (res) => {

            if (res?.data?.code == "200") {
                if (res?.data?.data?.tokens?.value) {
                    let decoded: any = jwt_decode(res.data.data.tokens.value);
                    if (!decoded?.userComGroupVo || decoded?.userComGroupVo.length <= 0) {
                        ElMessage({
                            message: 'token解析userComGroupVo异常',
                            type: 'warning',
                        })
                        return false
                    }
                    if (decoded?.userComGroupVo[0]?.roles && decoded?.userComGroupVo[0]?.roles.length > 0) {
                        let obj = {
                            token: res.data.data.tokens.value,
                            userinfo: {
                                loginNo: decoded.loginNo,
                                userName: decoded.user_name,
                                userId: decoded.userId,
                                userComGroupVo: decoded.userComGroupVo,
                                clientId: decoded.client_id,
                                comGroupName: decoded.userComGroupVo[0].comGroupName,
                                comGroup: decoded.userComGroupVo[0].comGroup,
                                roleId: decoded.userComGroupVo[0].roles[0].roleId,
                                roleName: decoded.userComGroupVo[0].roles[0].roleName,
                                grant_type: decoded.grantType,
                                mobile: decoded.mobile,
                            },
                            themeColor: 'EB6E00',
                        }
                        jsonObj.value = syntaxHighlight(obj);
                        jsonStr.value = JSON.stringify(JSON.stringify(obj))
                    } else {
                        ElMessage({
                            message: 'token解析异常',
                            type: 'warning',
                        })
                        jsonObj.value = null;
                        jsonStr.value = ""
                    }
                } else {
                    ElMessage({
                        message: res?.data?.message,
                        type: 'warning',
                    })
                    jsonObj.value = null;
                    jsonStr.value = ""

                }

            } else {
                ElMessage({
                    message: "token接口获取存在异常，可以使用f12查看具体问题",
                    type: 'warning',
                })
                jsonObj.value = null;
                jsonStr.value = ""
            }
            setTimeout(() => {
                loading.close()
            }, 500)
        }
    ).catch(() => {
        setTimeout(() => {
            loading.close()
        }, 500)
        jsonObj.value = null;
        jsonStr.value = ""
    })
}

//json 格式化函数
const syntaxHighlight = (json: any) => {
    if (typeof json != 'string') {
        json = JSON.stringify(json, undefined, 2);
    }
    json = json.replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
        function (match: any) {
            var cls = 'number';
            if (/^"/.test(match)) {
                if (/:$/.test(match)) {
                    cls = 'key';
                } else {
                    cls = 'string';
                }
            } else if (/true|false/.test(match)) {
                cls = 'boolean';
            } else if (/null/.test(match)) {
                cls = 'string';
            }
            return `<span class=${cls} style=${cls == "string" ? "white-space:pre-wrap;word-break:break-all" : ""}>${match}</span>`;
        });
}


</script>

<template>
    <div class="getToken">
        <div class="getTokenInputInfo">
            <div class="getTokenInputInfoMain">
                <div class="getTokenInputInfoMainBody">
                    <span style="width: 80px;">账号：</span>
                    <el-input v-model="accountId" placeholder="请输入账号" />
                </div>

            </div>
            <div class="getTokenInputInfoMain">
                <div class="getTokenInputInfoMainBody">
                    <span style="width: 80px;">密码：</span>
                    <el-input v-model="password" placeholder="请输入密码" />
                </div>

            </div>
            <div class="getTokenInputInfoMain">
                <div class="getTokenInputInfoMainBody">
                    <span style="width: 80px;">角色id：</span>
                    <el-input v-model="roleId" placeholder="请输入角色id" />
                </div>

            </div>

        </div>
        <div class="operate">
            <el-button @click="getToken">查看数据</el-button>
            <el-button @click="getToken('330006080554', '191225', '1009')">查看330006080554数据</el-button>
            <el-switch v-model="type" class="getTokenType" active-text="正式环境" inactive-text="测试环境" active-value="1"
                inactive-value="2" />
        </div>
        <div class="jsonInfo">
            <div class="jsonInfoLeft">
                <p style="margin-bottom: 10px;color: brown;">
                    json数据用于直观查看数据
                </p>
                <!-- <pre v-html="jsonObj">
				</pre> -->
                <div class="jsonInfoLeftInfo" v-html="jsonObj">

                </div>
                <!-- <div v-html="123"></div> -->
            </div>
            <div class="jsonInfoRight">
                <p style="margin-bottom: 10px;color: brown;">
                    string数据，用于给webview页面直接给userInfo字段赋值

                    <el-button class="btn" data-clipboard-target=".jsonStr">复制</el-button>
                </p>
                <div class="jsonStr">
                    {{ jsonStr }}
                </div>
            </div>
        </div>
    </div>

</template>

<style scoped>
.getTokenInputInfoMain {
    display: flex;
    justify-content: center;
    padding-top: 15px;
}

.getTokenInputInfoMainBody {
    display: flex;
    width: 50%;
    align-items: center;

}

.getTokenInputInfo {
    width: 1190px;
    margin: 0 auto;
}

.operate {
    padding-top: 15px;
    display: flex;
    justify-content: center;
}

.getTokenType {
    margin-left: 10px;
}

.jsonInfo {
    display: flex;
    justify-content: space-between;
    padding: 10px 20px 0 20px;
}

.jsonInfoLeft {
    padding: 10px;
    width: 50%;
    overflow: auto;
}

.jsonInfoLeftInfo {
    display: block;
    font-family: monospace;
    white-space: pre;
    margin: 1em 0px;
}

.jsonInfoRight {
    padding: 10px;
    width: 50%;
    overflow: auto;
    word-break: break-all;
}

.string {
    white-space: pre-wrap;
    word-break: break-all;
}

@media (max-width: 1200px) {
    .getTokenInputInfo {
        width: 1190px;
    }
}

@media (max-width: 992px) {
    .getTokenInputInfo {
        width: 970px;
    }
}

@media (max-width: 768px) {
    .getTokenInputInfo {
        width: 750px;
    }
}
</style>
