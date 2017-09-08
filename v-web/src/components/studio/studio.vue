<template>
 <div class="all">
<!--   按钮-->
    <div>
        <el-button @click="studio_add_btn" icon="plus">添加</el-button> 
            <el-select v-model="studio_search_text" size='5' filterable placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        <el-input v-model="studio_search_input" style="width:200px;"></el-input>
         <el-tooltip :content="reminderMsg" placement="top" effect="light">
        <el-button type="" icon="search" @click='studio_search_type'>搜索</el-button>
         </el-tooltip> 
         <el-button style="margin-left: 0px" type="" icon="close" @click='studio_close_all' :disabled="on_off" >关闭</el-button>   
         <el-button icon="delete" @click='studio_delete_all' :disabled="on_off_delete">批量删除</el-button>   
    </div>
<!--    新增框-->
    <div :class="op_div?'':'op-div'">
         <el-autocomplete
          v-model="studio_op_input"
          :fetch-suggestions="querySearch"
          placeholder="请输入内容"
           @select="handleSelect"
           :disabled="amend_studio_name"
        ><template slot="prepend">影院名:</template></el-autocomplete>
          <el-input style="width:217px" placeholder="请输入内容" v-model="studio_add_name">
            <template slot="prepend">影厅名:</template>
          </el-input>
          <el-button icon="upload2" @click='studio_op_commit'>提交</el-button>
    </div>
<!--    显示列表-->
   <div v-cloak>
    <el-table ref="multipleTable" :data="studio_value.rows" border tooltip-effect="dark" style="width: 100%;" height='400' @selection-change="handleSelectionChange">
<!--       多选框-->
        <el-table-column type="selection" width="55">
        </el-table-column>
        
        <el-table-column prop="value" label="影院名" width="212">
        </el-table-column>
        
         <el-table-column prop="studio_name" label="影厅名" width="212">
        </el-table-column>
        
        <el-table-column prop="theaterChain_id" label="影院_id" width="212" show-overflow-tooltip>
        </el-table-column>
        <el-table-column  label="操作" width="212">
         <template scope="scope" >
            <el-button @click="studio_btn_remove(scope.row._id)" type="text">删除</el-button>
            <el-button @click="studio_btn_amend(scope.row)" type="text">修改</el-button>
          </template>
        </el-table-column>
    </el-table>
    </div>
    <div class="block">
        <el-pagination
     
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage1"
          :page-size="rows"
          layout="prev, pager, next, jumper"
          :total="studio_value.total">
        </el-pagination>
  </div>
</div>
</template>

<script>
    import {
        STUDIO_FIRST_GAIN_VALUE,
        THEATER_FIRST_GAIN_VALUE,
        STUDIO_ADD_COMMIT,
        STUDIO_FIRST_SEARCH_VALUE,
        STUDIO_SEARCH_TEARTER_VALUE,
        STUDIO_SEARCH_STUDIO_VALUE,
        STUDIO_DELETE_VALUE,
        STUDIO_AMEND_VALUE,
        STUDIO_DELETE_MORE
    } from '../../store/modules/studiostore';
    export default {
        beforeMount(){
            this.$store.dispatch({
                type:STUDIO_FIRST_GAIN_VALUE,
                val:{page:this.page,rows:this.rows}
            })
	       }, 
        data(){
            return {
                op_div:false,
               options: [{
                  value: '联合查询',
                  label: '联合查询'
                }, {
                  value: '影院名',
                  label: '影院名'
                }, {
                  value: '影厅名',
                  label: '影厅名'
                }],
                studio_search_text:"",
                studio_search_input:"",
                reminderMsg:"搜索信息不能为空",
                on_off_delete:true,
                studio_add_name:'',
                studio_op_input:'',
                restaurants:  [],
                add_studio_theater:[],
                on_off:true,
                studio_amend_id:"",
                studio_amend_seat:[],
                amend_studio_name:false,
                currentPage1:1,
                page:1,
                rows:9,
                ids:[]
            }
        },
        methods: {
//            分页
            handleCurrentChange(val) {
                 this.$store.dispatch({
                    type:STUDIO_FIRST_GAIN_VALUE,
                    val:{page:val,rows:this.rows}

                })
            },
//            增加/修改/删除 操作
            studio_add_btn(event){
                 this.$store.dispatch({
                type:THEATER_FIRST_GAIN_VALUE
            })
                this.op_div=true;
                this.on_off=false;
                this.amend_studio_name=false;
                 this.studio_add_name='';
                this.studio_op_input=''
            },
//            提交按钮
            studio_op_commit(){
                if(this.studio_add_name && !this.amend_studio_name && this.add_studio_theater.value==this.studio_op_input){
                     let obj={};
                    obj.id=this.add_studio_theater._id;
                    obj.theaterChain_name=this.add_studio_theater.value;
                    obj.studio_name=this.studio_add_name;
                    obj.seat=this.seatNum();
                    this.$store.dispatch({
                        type:STUDIO_ADD_COMMIT,
                        obj
                    })
                }
                if(this.amend_studio_name){
                    let newObj={};
                    newObj.studio_name=this.studio_add_name;
                    newObj._id=this.studio_amend_id;
                    this.$store.dispatch({
                        type:STUDIO_AMEND_VALUE,
                        newObj
                    });
                }
            },
            querySearch(queryString, cb) {
                //调用影院数据
                this.theaterChain_value;
                var restaurants = this.restaurants;
                var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
                // 调用 callback 返回建议列表的数据
                cb(results);
              },
             createFilter(queryString) {
                return (restaurant) => {
                  return (restaurant.value.indexOf(queryString.toLowerCase()) === 0);
                };
              },
              handleSelect(item) {
                  this.add_studio_theater=item;
              },
            studio_delete_all(){
               if(this.ids.length>0){
                   this.$store.dispatch({
                       type:STUDIO_DELETE_MORE,
                       ids:this.ids
                   })
               }
                this.on_off_delete=true;
            },
//            内容区列表
            handleSelectionChange(msg){
               
                if(msg.length>0){
                     let ids=[];
                        msg.map((item)=>{
                            ids.push(item._id)
                        })
                        this.ids=ids;
                     this.on_off_delete=false;
                }else{
                     this.on_off_delete=true;
                }
               
            },
//            生成座位
            seatNum(){
                var arr=[]
                var seat=[]
                for(let i=0;i<10;i++){
                    arr=[]
                    for(let j=0;j<10;j++){
                        arr.push({
                            "row":i+1,
                            "list":j+1,
                            "byname":`${i+1}排-${j+1}列`,
                            "ispitch":false
                        })
                    }
                    seat.push(arr)
                }
                return seat
            },
            studio_search_type(){
                if(this.studio_search_input && this.studio_search_text){
                    this.on_off=false;
                    this.reminderMsg="搜索中...";
                    switch(this.studio_search_text){
                        case '联合查询':
                            let studio_search_msg = this.studio_search_input.split(",")
                            if(studio_search_msg.length==2){
                                this.$store.dispatch({
                                    type:STUDIO_FIRST_SEARCH_VALUE,
                                    val:{value:studio_search_msg[0],studio_name:studio_search_msg[1]}
                                })
                            }else{
                                this.reminderMsg='请输入影院名和影厅名(逗号隔开)'
                            }
                            break;
                        case '影院名':
                            this.$store.dispatch({
                                type:STUDIO_SEARCH_TEARTER_VALUE,
                                val:{value:this.studio_search_input}
                            })
                            break;
                        default:
                            this.$store.dispatch({
                                type:STUDIO_SEARCH_STUDIO_VALUE,
                                val:{studio_name:this.studio_search_input}
                           })
                    }
                }
            },
            studio_btn_remove(id){
                this.$store.dispatch({
                    type:STUDIO_DELETE_VALUE,
                    id
                })
            },
            studio_btn_amend(val){
                this.on_off=false;
                this.amend_studio_name=true;
                this.op_div=true;
                this.studio_amend_seat=val.studio_seat;
                this.studio_add_name=val.studio_name;
                this.studio_op_input=val.value;
                this.studio_amend_id=val._id
            },
            studio_close_all(){
                 this.amend_studio_name=false;
                this.op_div=false;
                this.on_off=true;
                this.studio_search_text="";
                this.studio_search_input="";
                if(this.reminderMsg=="搜索中..."){
                     this.$store.dispatch({
                          type:STUDIO_FIRST_GAIN_VALUE
                    })
                     this.reminderMsg="搜索信息不能为空";
                    this.studio_add_name="";
                    this.studio_op_input=""
                }
            }
        },
        computed:{
            studio_value(){
                
              return this.$store.state.studio.studio_manage_value
            },
            theaterChain_value(){
                this.restaurants=this.$store.state.studio.theaterChain_manage_value
            }
         }
    }

</script>

<style scoped>
    .op-div{
        display: none;
    }
    .block{
        text-align: center
    }
    [v-cloak]{
        display: none
    }
</style>
