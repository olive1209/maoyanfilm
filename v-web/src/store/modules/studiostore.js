import axios from 'axios';
/*********************************ACTIONS*********************************************/
//render之前获取第一次数据
export const STUDIO_FIRST_GAIN_VALUE='FIRST_GAIN_VALUE';
//第一次获取影院的数据
export const THEATER_FIRST_GAIN_VALUE='THEATER_FIRST_GAIN_VALUE';
//增加影厅
export const STUDIO_ADD_COMMIT='STUDIO_ADD_COMMIT';
export const STUDIO_FIRST_SEARCH_VALUE='STUDIO_FIRST_SEARCH_VALUE';
export const STUDIO_SEARCH_TEARTER_VALUE='STUDIO_SEARCH_TEARTER_VALUE';
export const STUDIO_SEARCH_STUDIO_VALUE='STUDIO_SEARCH_STUDIO_VALUE';
export const STUDIO_DELETE_VALUE='STUDIO_DELETE_VALUE';
export const STUDIO_AMEND_VALUE='STUDIO_AMEND_VALUE';
export const STUDIO_RENDER_COMMIT='STUDIO_RENDER_COMMIT';
export const STUDIO_DELETE_MORE='STUDIO_DELETE_MORE';
STUDIO_FIRST_SEARCH_VALUE

/*********************************MUTATIONS*********************************************/
//改变验证状态
export const STUDIO_FIRST_DISPOSE_VALUE='STUDIO_FIRST_DISPOSE_VALUE';
export const THEARTER_FIRST_DISPOSE_VALUE='THEARTER_FIRST_DISPOSE_VALUE';
STUDIO_SEARCH_STUDIO_VALUE
const store = ({
    state:{
        studio_manage_value:[],
        theaterChain_manage_value:[],
        page:0,
        rows:0
    },
    mutations:{
        [STUDIO_FIRST_DISPOSE_VALUE](state,obj){
            state.studio_manage_value=obj.value;
            state.page=obj.value.curpage;
            state.rows=obj.value.eachpage;
        },
        [THEARTER_FIRST_DISPOSE_VALUE](state,obj){
            let arr=[];
            let val=[];
            let all={}
          for(let i=0;i<obj.value.length;i++){
                val=[...val,obj.value[i].name];
                arr.push(obj.value[i]._id)
            }
            state.theaterChain_manage_value=obj.value
        }
    },
    actions:{
        async [STUDIO_FIRST_GAIN_VALUE]({ commit },obj){
             let studio_first_value = await axios.get('http://127.0.0.1:3000/studio/find',{params:obj.val})
             commit({
                 type:STUDIO_FIRST_DISPOSE_VALUE,
                 value:studio_first_value.data
             })
        },
         async [STUDIO_RENDER_COMMIT]({ commit ,state }){
             let studio_every_value = await axios.get('http://127.0.0.1:3000/studio/find',{params:{page:state.page,rows:state.rows}})
             commit({
                 type:STUDIO_FIRST_DISPOSE_VALUE,
                 value:studio_every_value.data
             })
        },
        async [THEATER_FIRST_GAIN_VALUE]({commit}){
            let theater_first_value = await axios.post('http://127.0.0.1:3000/theaterChain/find',{})
             commit({
                 type:THEARTER_FIRST_DISPOSE_VALUE,
                 value:theater_first_value.data
             })
        },
       async [STUDIO_FIRST_SEARCH_VALUE]({commit,state},obj){
            let studio_search_value = await axios.get('http://127.0.0.1:3000/studio/find',{params:{value:obj.val.value,studio_name:obj.val.studio_name,findType:"exact",page:state.page,rows:state.rows}})
            commit({
                type:STUDIO_FIRST_DISPOSE_VALUE,
                value:studio_search_value.data
            }) 
        },
        async [STUDIO_ADD_COMMIT](state,obj){
            let flage=Math.random().toString(16).substring(2);
            let studio_add={};
            let seat={};
            studio_add.value=obj.obj.theaterChain_name;
            studio_add.studio_name=obj.obj.studio_name;
            studio_add.theaterChain_id=obj.obj.id;
            studio_add.flage=flage;
            studio_add.studio_seat=obj.obj.seat;
//            存入增加影厅
            let studio_check_add_value = await axios.get('http://127.0.0.1:3000/studio/add',{params:studio_add});
//            查找当前flage影厅
            let find_seat_add_value = await axios.get('http://127.0.0.1:3000/studio/find',{params:{flage:studio_add.flage,findType:"exact"}});
//            座位存入seating集合
            let save_seat_add=await axios.get('http://127.0.0.1:3000/seating/add',{params:{studio_id:find_seat_add_value.data[0]._id,studio_seat:studio_add.studio_seat}});
             state.dispatch({
                     type:STUDIO_RENDER_COMMIT,
            })
        },
        async [STUDIO_SEARCH_TEARTER_VALUE]({commit,state},obj){
             let {value}=obj.val;
             let studio_search_tearter_value = await axios.get('http://127.0.0.1:3000/studio/find',{params:{value,page:state.page,rows:state.rows}});
              commit({
                type:STUDIO_FIRST_DISPOSE_VALUE,
                value:studio_search_tearter_value.data
            }) 
        },
         async [STUDIO_SEARCH_STUDIO_VALUE]({commit,state},obj){
             let {studio_name}=obj.val;
             let studio_search_studio_value = await axios.get('http://127.0.0.1:3000/studio/find',{params:{studio_name,page:state.page,rows:state.rows}});
              commit({
                type:STUDIO_FIRST_DISPOSE_VALUE,
                value:studio_search_studio_value.data
            }) 
        },
        async [STUDIO_DELETE_VALUE]({dispatch},obj){
             let studio_delete_value = await axios.get('http://127.0.0.1:3000/studio/del',{params:{_id:obj.id}});
            let seat_delete_more=await axios.get("http://127.0.0.1:3000/seating/del",{params:{studio_id:obj.id}});
                if(studio_delete_value.data=='suc'){
                    dispatch({
                        type:STUDIO_RENDER_COMMIT
                    }) 
                }
        },
         async [STUDIO_AMEND_VALUE]({dispatch},obj){
             let studio_amend_value = await axios.get('http://127.0.0.1:3000/studio/update',{params:obj.newObj});
                if(studio_amend_value.data=='suc'){
                    dispatch({
                        type:STUDIO_RENDER_COMMIT
                    }) 
                }
        },
        async [STUDIO_DELETE_MORE]({dispatch},{ids}){
            let studio_delete_more=await axios.get("http://127.0.0.1:3000/studio/del",{params:{ids}});
            for(let i=0;i<ids.length;i++){
                let seat_delete_more=await axios.get("http://127.0.0.1:3000/seating/del",{params:{studio_id:ids[i]}});
            }
            dispatch({
                type:STUDIO_RENDER_COMMIT
            })
        }
    }
})
 
export default store