/**
 * 配置菜单
 * 	示例：
 *	配置基本参数
 *	var config = {
 *		//配置菜单的MenuBoxId
 *		menuBoxId: "#menuBox01",
 *		//是否可以打开多个上级菜单
 *		multiple: true,
 *		//初始化打开的菜单数组
 *		openIndex: [1, 3, 5]
 *	}
 *	menuBox.init(config);
 * 
 * @author DarkRanger
 * http: //www.cnblogs.com/wrcold520/
 */

! function($) {
	if($ == undefined) {
		throw new Error("please put your jquery.js top of menuBox.js!")
	}
	var menuBox = function() {};
	//要配置的menuBox的菜单id
	menuBox.menuBoxId = undefined;
	//是否可以显示多个上级菜单的子菜单
	menuBox.multiple = false;
	//默认关闭所有一级菜单
	menuBox.openIndex = [];

	//menuBox初始化方法
	menuBox.init = function(config) {
		
		var cntMenuBox = new menuBox();
		
		//定义上级菜单spMenu数组
		var spMenus;

		if(config.menuBoxId == undefined) {
			throw new Error("your config has not 'menuBoxId', please make sure your menuBox is existed!");
		} else {
			cntMenuBox.menuBoxId = $(config.menuBoxId) ? config.menuBoxId : undefined;
		}

		if(config.multiple == undefined) {
			console.warn("your config has not 'multiple', default value is false which means you can open only one spMenu at the same time!");
		} else {
			cntMenuBox.multiple = config.multiple;
		}

		if(config.openIndex == undefined) {
			console.warn("your config has not 'openIndex', default value is a Array which's length is 0!");
		} else if(!config.openIndex instanceof Array) {
			throw new Error("your config 'openIndex' should be a number Array");
		} else {
			cntMenuBox.openIndex = unique(config.openIndex, false);
		}

		//确定对应的menuBox
		cntMenuBox.menuBoxId = config.menuBoxId;
		//是否打开其他某一个的时候关闭其他选项
		var closeOthers = !cntMenuBox.multiple;
		//初始化点击事件
		initClickEvent(cntMenuBox, closeOthers);
		//确定上级菜单数组
		spMenus = $(cntMenuBox.menuBoxId + " .spMenu");
		//打开传入的数组
		for(var i in cntMenuBox.openIndex) {
			var index = cntMenuBox.openIndex[i];
			var spMenu = spMenus[index];
			if(spMenu) {
				openSpMenu(cntMenuBox.menuBoxId, index);
				if(!cntMenuBox.multiple) {
					break;
				}
			}
		}
	}

	function unique(arr) {
		var result = [],
			hash = {};
		for(var i = 0, elem;
			(elem = arr[i]) != null; i++) {
			if(!hash[elem]) {
				result.push(elem);
				hash[elem] = true;
			}
		}
		return result;
	}

	//初始化点击事件
	function initClickEvent(menuBox, closeOthers) {
		$(menuBox.menuBoxId + " .spMenu").on("click", function() {
			var cntSpMenu$ = $(this);
			//要切换的元素
			cntSpMenu$.next().slideToggle();
			cntSpMenu$.parent().toggleClass("active")

			var cntSpMenu = cntSpMenu$['context'];
			if(closeOthers == true) {
				var spMenus = $(menuBox.menuBoxId + " .spMenu");
				$.each(spMenus, function(index, spMenu) {
					if(cntSpMenu != spMenu) {
						closeSpMenu(menuBox.menuBoxId, index);
					}
				});
			}
		});
	}

	//打开某一个item
	function openSpMenu(menuBoxId, index) {
		//要切换的元素
		var spItem = $(menuBoxId + " .spMenu:eq(" + index + ")");
		spItem.next().slideDown();
		spItem.parent().addClass("active")
	}
	//关闭某一个item
	function closeSpMenu(menuBoxId, index) {
		//要切换的元素
		var spItem = $(menuBoxId + " .spMenu:eq(" + index + ")");
		spItem.next().slideUp();
		spItem.parent().removeClass("active")
	}
	//切换某一个item
	function toggleSpMenu(menuBoxId, index) {
		//要切换的元素
		var spItem = $(menuBoxId + " .spMenu:eq(" + index + ")");
		spItem.next().slideToggle();
		spItem.parent().toggleClass("active")
	}

	window.menuBox = menuBox;
}($);