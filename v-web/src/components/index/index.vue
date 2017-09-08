<template>
    <el-row>
        <el-col class="header" :span="24" >
            <h1>猫眼电影后台管理系统</h1>
        </el-col>
        <el-col class="left" :span="6">
          <el-menu default-active="2" class="el-menu-vertical-demo">
             <el-menu-item class="select_btn"  @click="clickbtn('/index')" index="1"><i class="el-icon-menu"></i>首页</el-menu-item>
              <el-menu-item class="select_btn" @click="clickbtn('/movie')" index="2"><i class="el-icon-menu"></i>电影信息</el-menu-item>
              <el-menu-item class="select_btn" @click="clickbtn('/theaterChain')" index="3"><i class="el-icon-menu"></i>影院信息</el-menu-item>
              <el-menu-item class="select_btn" @click="clickbtn('/studio')" index="4"><i class="el-icon-setting"></i>影厅信息</el-menu-item>
              <el-menu-item class="select_btn" @click="clickbtn('/movieMsg')" index="5"><i class="el-icon-setting"></i>排片信息</el-menu-item>
              <el-menu-item class="select_btn" @click="clickbtn('/information')" index="6"><i class="el-icon-setting"></i>资讯管理</el-menu-item>
    </el-menu>
        </el-col>
        <el-col class="right" :span="18">
            <router-view></router-view>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        

        methods:{
            clickbtn(url){
                this.$router.push(url)
            }
        }

    }
    
</script>

<style scoped>
    .select_btn{
        background-color: #E6E6FA;
        color: #828282;
    }
    .header{
        color: #F8F8FF;
        border: 5px solid #AB82FF;
        height: 100px;
        background-image: url(../../assets/10010055_172148547127_2.jpg);
        background-size:100%;
    }
    .header>h1{
        margin-left: 40px;
    }
    .left{
        height: 527px;
        background-color: #9FB6CD;
    }
    .right{
         height: 600px;
        background-image: url(../../assets/9885883_185208037000_2_01.png);
        background-repeat: no-repeat;
        background-size:100%;
/*        overflow: hidden*/
    }
</style>