 		var gridObj;
 		var citynodes = [];  
 		var zTreeDemo;
 		var boxindex;
 		
        $(function () {
        	gridObj = $.fn.bsgrid.init('searchTable', {
                url: 'templet/getData.do',
                // autoLoad: false,
                ajaxType: 'GET',
                stripeRows: true,
                pageSizeSelect: true,
                displayBlankRows: true,
                multiSort: true, // multi column sort support, default false
                pageSize: 10,
                event: {
                    customRowEvents: {
                        click: function (record, rowIndex, trObj, options) {
                        	trObj[0].children[0].children[0].checked=!trObj[0].children[0].children[0].checked; //角色联动
                        }
                    }
                }
            });
           
        });
      
		//数据表格
		function fieldoperate(record, rowIndex, colIndex, options) {
        	switch (colIndex) {
        	case 3:
        		if(record.mode==0)return '纯外部参数';
        		else if(record.mode==1)return '纯数据源参数';
        		else if(record.mode==2)return '外部参数混合数据源参数';
        	case 7:
				return record.status==1?'禁用':'可用';
			}
        }	
		//删除
		function deleteObj(){
			var index=gridObj.getCheckedRowsIndexs();
			console.log(index);
			if(index!=-1){
				parent.layer.alert(index+'');
			}else{
				parent.layer.alert("请选择一条数据！");
			}
			//checkbox
//			var indexary=gridObj.getCheckedRowsIndexs();
//			if(indexary&&indexary.length==1){
//				var objary=gridObj.getCheckedValues(0);
//				parent.layer.alert(objary[0].id);
//			}else{
//				parent.layer.alert("请选择一条数据！");
//			}
		}	
		//查看
		function showObj(id){
			parent.layer.alert(id+'');
		}
		//修改
		function updateobj() {
			var index=gridObj.getSelectedRowIndex();
			if(index!=-1){
				var obj= gridObj.getRecord(index);
				boxindex = parent.layer.open({
					btn: ['提交','取消'],
					title: '修改模板信息',
					maxmin: true,
					type: 2,
					content: 'templet.do?goEdit&id='+obj.id,
					area: ['800px', '500px'],
					yes: function(index,layero){
						var iframeWin = parent.window[layero.find('iframe')[0]['name']];
						var data=iframeWin.getfromdata();
						//表单联动
			        	$.ajax({
			        		url:'templet/editTemplet.do',
			        		type:'POST',
			        		data:data,
			        		success:function(data){
			        			if(data){
			        				parent.layer.msg("编辑成功！")
			        				parent.layer.close(boxindex);
			        				gridObj.refreshPage();
			        				gridObj.refreshPage();
			        			}else{
			        				parent.layer.msg("系统错误，请稍后重试！")
			        			}
			        		}
			        	});
					}
				});
			}else{
				parent.layer.alert("请选择一条数据！");
			}
		}
		//搜索
		function searchobj() {
			var serachfiled=$("[name=serachfiled]").val()+"";
			var systemcode=$('[name=systemcode]').val();
			var typecode=$('[name=typecode]').val();
			var keyword=$("[name=keyword]").val();
	        if(!serachfiled||serachfiled==""){
	        	parent.layer.alert('请正确选择查询项');
	        	return false;
	        }
	        var param=serachfiled+"="+keyword+(systemcode.length>0?'&systemid='+systemcode:'')+(typecode.length>0?'&type='+typecode:'');
	        gridObj.search(param);
		}
		//添加
		function addobj() {
			boxindex = parent.layer.open({
				btn: ['提交','取消'],
				title: '新增模板信息',
				maxmin: true,
				type: 2,
				content: 'templet.do?goEdit',
				area: ['800px', '500px'],
				yes: function(index,layero){
					var iframeWin = parent.window[layero.find('iframe')[0]['name']];
					var data=iframeWin.getfromdata();
					//表单联动
		        	$.ajax({
		        		url:'templet/editTemplet.do',
		        		type:'POST',
		        		data:data,
		        		success:function(data){
		        			if(data){
		        				parent.layer.msg("新增成功！")
		        				parent.layer.close(boxindex);
		        				gridObj.refreshPage();
		        				gridObj.refreshPage();
		        			}else{
		        				parent.layer.msg("系统错误，请稍后重试！")
		        			}
		        		}
		        	});
				}
			});
		}
		//查询历史版本
		function history(){
			var index=gridObj.getSelectedRowIndex();
			if(index!=-1){
				var obj= gridObj.getRecord(index);
				boxindex = parent.layer.open({
					title: '历史版本查询',
					maxmin: true,
					type: 2,
					content: 'templet.do?goHistory&id='+obj.id,
					area: ['800px', '500px'],
				});
			}else{
				parent.layer.alert("请选择一条数据！");
			}
		}
		
		function params(){
			var index=gridObj.getSelectedRowIndex();
			if(index!=-1){
				var obj= gridObj.getRecord(index);
				boxindex = parent.layer.open({
					title: '参数查询',
					maxmin: true,
					type: 2,
					content: 'templet.do?goParams&id='+obj.id,
					area: ['800px', '500px'],
				});
			}else{
				parent.layer.alert("请选择一条数据！");
			}
		}
		
		function invocation(){
			var index=gridObj.getSelectedRowIndex();
			if(index!=-1){
				var obj= gridObj.getRecord(index);
				boxindex = parent.layer.open({
					btn: ['提交','取消'],
					title: '调用显示',
					maxmin: true,
					type: 2,
					content: 'templet.do?goInvocation&id='+obj.id,
					area: ['800px', '500px'],
					yes: function(index,layero){
						var iframeWin = parent.window[layero.find('iframe')[0]['name']];
						var data=iframeWin.getfromdata();
						//表单联动
			        	$.ajax({
			        		url:'',
			        		type:'POST',
			        		data:data,
			        		success:function(data){
			        			if(data){
			        				parent.layer.msg("新增成功！")
			        				parent.layer.close(boxindex);
			        				gridObj.refreshPage();
			        				gridObj.refreshPage();
			        			}else{
			        				parent.layer.msg("系统错误，请稍后重试！")
			        			}
			        		}
			        	});
					}
				});
			}else{
				parent.layer.alert("请选择一条数据！");
			}
		}
		
		/**其他**/
		//元素初始化
		layui.config({
			base: '/yuhi-admin-web/resource/plugins/layui/modules/'
		});
		layui.use(['laydate','upload'], function() {
//			var form = layui.form(),
//				layer = layui.layer,
//				layedit = layui.layedit,
//				laydate = layui.laydate;
//			创建一个编辑器
//			layui.upload({
//				url:'',
//				elem: '#test',
//				title: '请上传文件',
//				ext:'jpg|png|gif',
//				//type: 'file',
//				success:function(res,input){
//					
//				}
//			});
		});
		
		//工具方法
		function getMyDate(str){  
            var oDate = new Date(str),  
            oYear = oDate.getFullYear(),  
            oMonth = oDate.getMonth()+1,  
            oDay = oDate.getDate(),  
            oHour = oDate.getHours(),  
            oMin = oDate.getMinutes(),  
            oSen = oDate.getSeconds(),  
            oTime = oYear +'-'+ getzf(oMonth) +'-'+ getzf(oDay) +' '+ getzf(oHour) +':'+ getzf(oMin) +':'+getzf(oSen);//最后拼接时间  
            return oTime;  
        };  
        //补0操作  
        function getzf(num){  
            if(parseInt(num) < 10){  
                num = '0'+num;  
            }  
            return num;  
        }  
		