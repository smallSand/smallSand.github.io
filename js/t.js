JAF.ajaxSend({
		action: "getCifInfo.do",
		params: paramInfo+'requestType=CIF_API_GET_FINDBYID',
		dataType: "json",
		method  : "POST",
		success : function(res){
		console.log(res);
		},
		error : function(erro){
			console.log(erro);
		}
	});