$(function() {
	var $dashboardMain = $("#dashboard-main");
	var $dashboardMenu = $("#dashboard-menu");
	var onMenuStatusChange = function() {
		var menuHeight = $dashboardMenu.find(".sidebar-body").height();
		if (menuHeight > 550) {
			$dashboardMain.css("min-height", (menuHeight + 50) + "px");
		} else {
			$dashboardMain.removeAttr("style");
		}
	};
	$dashboardMenu.find(".list-group .parent-menu-title").bind("click",
			function() {
				var $this = $(this);
				var $parentMenuBox = $this.parent();
				var $subItemUl = $this.next(".sub-menu-group");
				if ($parentMenuBox.hasClass("closed")) {
					// 子菜单已隐藏，现在要打开
					$parentMenuBox.addClass("opened").removeClass("closed");
					$parentMenuBox.removeClass("active");
					$this.find(".right-icon")
							.removeClass("glyphicon-chevron-down")
							.addClass("glyphicon-chevron-up");
				} else {
					$parentMenuBox.addClass("closed").removeClass("opened");
					$this.find(".right-icon")
							.removeClass("glyphicon-chevron-up")
							.addClass("glyphicon-chevron-down");
					if ($subItemUl.find(".list-group-item.active").length > 0) {
						// 子菜单列表中，有处于active的
						$parentMenuBox.addClass("active");
					} else {
						$parentMenuBox.removeClass("active");
					}
				}
				onMenuStatusChange();
			});
	// 收藏/取消收藏方法-start
	$(".do-mark").bind("click", function() {
		var $this = $(this);
		if ($this.hasClass("clicking")) {
			return;
		}
		$this.addClass("clicking");
		var targetId = $this.attr("data-target-id");
		var isRemoveFav = $this.hasClass("marked");
		util.ajax("/a/sys/fav-" + (isRemoveFav ? "remove" : "save"), "favType="
						+ pg.FAV_TYPE + "&targetId=" + targetId,
				function(json) {
					$this.removeClass("clicking");
					if (json.success) {
						util.tips.suc(json.msg);
						var originalTitle = $this.attr("title");
						$this.attr("title", $this.attr("data-opp-title")).attr(
								"data-opp-title", originalTitle);
						if (isRemoveFav) {
							$this.removeClass("marked");
							if (typeof(pg.afterRemoveFavorite) == "function") {
								// 如果已定义取消收藏后的回调方法，则直接调用这个方法
								pg.afterRemoveFavorite(targetId, json, $this);
							} else if (pg.IS_MARKED_PAGE) {
								// 在已收藏页，采用默认的移除效果
								$this.parents("tr:eq(0)").fadeOut("normal",
										function() {
											$(this).remove();
										});
							}
						} else {
							$this.addClass("marked");
						}
					} else {
						util.tips.err(util.getJsonErrorMsg(json));
					}
				}, function() {
					$this.removeClass("clicking");
				});
	});
	// 收藏/取消收藏方法-end
	// 弹出用户的处理详情-start
	$(".showUserHistory").bind("click", function() {
		var module = "admin_history";
		var $this = $(this);
		if ($this.hasClass("clicking")) {
			return;
		}
		var userId = $this.attr("data-userManager-id");
		var dataId = $this.attr("data-id");
		if (dataId == null) {
			dataId = userId;
		}
		var popoverObj = $this;
		if ($this.attr("data-popover-target") != null) {
			var $popoverTarget = $this.parents($this
					.attr("data-popover-target"));
			if (util.isJqHasDom($popoverTarget)) {
				popoverObj = $popoverTarget;
			}
		}
		var me = popoverObj[0];
		$(".userManager-history-popovered").each(function() {
					if (this !== me) {
						var $th = $(this);
						$th.removeClass("userManager-history-popovered")
								.popover("destroy");
					}
				})
		if (popoverObj.hasClass("userManager-history-popovered")) {
			popoverObj.removeClass("userManager-history-popovered").popover("destroy");
			// popoverObj.popover('toggle');
			// var $popoverBox = popoverObj.data('bs.popover').$tip;
			// if (util.isJqHasDom($popoverBox)
			// && (!util.isJqHasDom($popoverBox.find(".popover-close")))) {
			// $popoverBox
			// .find(".popover-title")
			// .prepend('<button type="button" class="close popover-close fs20"
			// data-dismiss="popover" aria-hidden="true"
			// onclick="$(\'.userManager-history-popovered-'
			// + dataId
			// + '\').popover(\'hide\')">×</button>&nbsp;');
			// }
			return;
		}
		$this.addClass("clicking");
		var op = {
			title : r.msg.findModule(module, "history.title"),
			animation : false,
			placement : "right",
			trigger : "manual",
			container : 'body',
			template : '<div class="popover" role="tooltip"><div class="arrow"></div><div class="popover-content w50"></div></div>',
			html : true,
			content : util.tips.loadingMsgInner
		};
		popoverObj.popover(op).popover('show');
		util.ajax("/a/history/userManager-find", "userId=" + userId, function(json) {
			$this.removeClass("clicking");
			popoverObj.popover('destroy');
			if (json.success) {
				var content = [];
				var array = json.array;
				content.push('<div class="historys-box fs13">');
				for (var i = 0; i < array.length; i++) {
					var bean = array[i];
					content.push('<div class="history-info">');
					content.push('<dl class="dl-horizontal">');
					content.push('<dt class="history-label">');
					content.push(r.msg.findModule(module, "history.admin."
									+ bean.isUserAdmin));
					content.push('</dt>');
					content.push('<dd>');
					if (bean.isSystem == 1) {
						content.push('<span class="label label-danger">');
						content.push((bean.operatorName
								? bean.operatorName
								: "&nbsp;"));
						content.push('</span>');
					} else {
						content.push((bean.operatorName
								? bean.operatorName
								: "&nbsp;"));
					}
					content.push('</dd>');
					content.push('</dl>');
					// 处理时间
					content.push('<dl class="dl-horizontal">');
					content.push('<dt class="history-label">');
					content.push(r.msg
							.findModule(module, "history.operateTime"));
					content.push('</dt>');
					content.push('<dd>');
					content.push(util.date.format(new Date(bean.operateTime),
							util.cons.date.minuteFormat));
					content.push('</dd>');
					content.push('</dl>');
					// 处理方式
					content.push('<dl class="dl-horizontal">');
					content.push('<dt class="history-label">');
					content.push(r.msg
							.findModule(module, "history.operateDesc"));
					content.push('</dt>');
					content.push('<dd>');
					content.push((bean.operateDesc
							? bean.operateDesc
							: "&nbsp;"));
					content.push('</dd>');
					content.push('</dl>');
					if (bean.operateReason != null && bean.operateReason != "") {
						// 处理原因
						content.push('<dl class="dl-horizontal">');
						content.push('<dt class="history-label">');
						content.push(r.msg.findModule(module,
								"history.operateReason"));
						content.push('</dt>');
						content.push('<dd>');
						content.push(bean.operateReason);
						content.push('</dd>');
						content.push('</dl>');
					}
					content.push('</div>');
				}
				content.push('</div>');
				var popoverId = "userManager-history-popovered-" + dataId;
				var popoverId4Btn = "btn-" + popoverId;
				var op2 = {
					title : r.msg.findModule(module, "history.title"),
					placement : "right",
					trigger : "manual",
					container : 'body',
					html : true,
					content : content.join("")
				};
				popoverObj.addClass("userManager-history-popovered");
				popoverObj.popover(op2).popover('show').addClass(popoverId);
				$this.addClass(popoverId4Btn);
				var $popoverBox = popoverObj.data('bs.popover').$tip;
				$popoverBox
						.find(".popover-title")
						.prepend('<button type="button" class="close popover-close fs20" data-dismiss="popover" aria-hidden="true" onclick="$(\'.'
								+ popoverId + '\').click()">×</button>&nbsp;');
			} else {
				util.tips.err(util.getJsonErrorMsg(json));
			}
		}, function() {
			popoverObj.popover('destroy');
			$this.removeClass("clicking");
		});
	});
	// 弹出用户的处理详情-end
	// 弹出作品的处理详情-start
	$(".showWorkHistory").bind("click", function() {
		var module = "admin_history";
		var $this = $(this);
		if ($this.hasClass("clicking")) {
			return;
		}
		var drawingId = $this.attr("data-drawing-id");
		var dataId = $this.attr("data-id");
		if (dataId == null) {
			dataId = drawingId;
		}
		var popoverObj = $this;
		if ($this.attr("data-popover-target") != null) {
			var $popoverTarget = $this.parents($this
					.attr("data-popover-target"));
			if (util.isJqHasDom($popoverTarget)) {
				popoverObj = $popoverTarget;
			}
		}
		var me = popoverObj[0];
		$(".work-history-popovered").each(function() {
					if (this !== me) {
						var $th = $(this);
						$th.removeClass("work-history-popovered")
								.popover("destroy");
					}
				})
		if (popoverObj.hasClass("work-history-popovered")) {
			popoverObj.removeClass("work-history-popovered").popover("destroy");
			// popoverObj.popover('toggle');
			// var $popoverBox = popoverObj.data('bs.popover').$tip;
			// if (util.isJqHasDom($popoverBox)
			// && (!util.isJqHasDom($popoverBox.find(".popover-close")))) {
			// $popoverBox
			// .find(".popover-title")
			// .prepend('<button type="button" class="close popover-close fs20"
			// data-dismiss="popover" aria-hidden="true"
			// onclick="$(\'.work-history-popovered-'
			// + dataId
			// + '\').popover(\'hide\')">×</button>&nbsp;');
			// }
			return;
		}
		$this.addClass("clicking");
		var op = {
			title : r.msg.findModule(module, "history.title"),
			animation : false,
			placement : "right",
			trigger : "manual",
			container : 'body',
			template : '<div class="popover" role="tooltip"><div class="arrow"></div><div class="popover-content w50"></div></div>',
			html : true,
			content : util.tips.loadingMsgInner
		};
		popoverObj.popover(op).popover('show');
		util.ajax("/a/history/work-find", "drawingId=" + drawingId, function(
				json) {
			$this.removeClass("clicking");
			popoverObj.popover('destroy');
			if (json.success) {
				var content = [];
				var array = json.array;
				content.push('<div class="historys-box fs13">');
				for (var i = 0; i < array.length; i++) {
					var bean = array[i];
					content.push('<div class="history-info">');
					content.push('<dl class="dl-horizontal">');
					content.push('<dt class="history-label">');
					content.push(r.msg.findModule(module, "history.admin."
									+ bean.isUserAdmin));
					content.push('</dt>');
					content.push('<dd>');
					if (bean.isSystem == 1) {
						content.push('<span class="label label-danger">');
						content.push((bean.operatorName
								? bean.operatorName
								: "&nbsp;"));
						content.push('</span>');
					} else {
						content.push((bean.operatorName
								? bean.operatorName
								: "&nbsp;"));
					}

					content.push('</dd>');
					content.push('</dl>');
					// 处理时间
					content.push('<dl class="dl-horizontal">');
					content.push('<dt class="history-label">');
					content.push(r.msg
							.findModule(module, "history.operateTime"));
					content.push('</dt>');
					content.push('<dd>');
					content.push(util.date.format(new Date(bean.operateTime),
							util.cons.date.minuteFormat));
					content.push('</dd>');
					content.push('</dl>');
					// 处理方式
					content.push('<dl class="dl-horizontal">');
					content.push('<dt class="history-label">');
					content.push(r.msg
							.findModule(module, "history.operateDesc"));
					content.push('</dt>');
					content.push('<dd>');
					content.push((bean.operateDesc
							? bean.operateDesc
							: "&nbsp;"));
					content.push('</dd>');
					content.push('</dl>');
					if (bean.operateReason != null && bean.operateReason != "") {
						// 处理原因
						content.push('<dl class="dl-horizontal">');
						content.push('<dt class="history-label">');
						content.push(r.msg.findModule(module,
								"history.operateReason"));
						content.push('</dt>');
						content.push('<dd>');
						content.push(bean.operateReason);
						content.push('</dd>');
						content.push('</dl>');
					}
					content.push('</div>');
				}
				content.push('</div>');
				var popoverId = "work-history-popovered-" + dataId;
				var popoverId4Btn = "btn-" + popoverId;
				var op2 = {
					title : r.msg.findModule(module, "history.title"),
					placement : "right",
					trigger : "manual",
					container : 'body',
					html : true,
					content : content.join("")
				};
				popoverObj.addClass("work-history-popovered");
				popoverObj.popover(op2).popover('show').addClass(popoverId);
				$this.addClass(popoverId4Btn);
				var $popoverBox = popoverObj.data('bs.popover').$tip;
				$popoverBox
						.find(".popover-title")
						.prepend('<button type="button" class="close popover-close fs20" data-dismiss="popover" aria-hidden="true" onclick="$(\'.'
								+ popoverId4Btn
								+ '\').click()">×</button>&nbsp;');
			} else {
				util.tips.err(util.getJsonErrorMsg(json));
			}
		}, function() {
			popoverObj.popover('destroy');
			$this.removeClass("clicking");
		});
	});
	// 弹出作品的处理详情-end

	// 弹出评论的处理详情-start
	$(".showCommentHistory").bind("click", function() {
		var module = "admin_history";
		var $this = $(this);
		if ($this.hasClass("clicking")) {
			return;
		}
		var commentId = $this.attr("data-comment-id");
		var dataId = $this.attr("data-id");
		if (dataId == null) {
			dataId = commentId;
		}
		var popoverObj = $this;
		if ($this.attr("data-popover-target") != null) {
			var $popoverTarget = $this.parents($this
					.attr("data-popover-target"));
			if (util.isJqHasDom($popoverTarget)) {
				popoverObj = $popoverTarget;
			}
		}
		var me = popoverObj[0];
		$(".comment-history-popovered").each(function() {
			if (this !== me) {
				var $th = $(this);
				$th.removeClass("comment-history-popovered").popover("destroy");
			}
		})
		if (popoverObj.hasClass("comment-history-popovered")) {
			popoverObj.removeClass("comment-history-popovered")
					.popover("destroy");
			// popoverObj.popover('toggle');
			// var $popoverBox = popoverObj.data('bs.popover').$tip;
			// if (util.isJqHasDom($popoverBox)
			// && (!util.isJqHasDom($popoverBox.find(".popover-close")))) {
			// $popoverBox
			// .find(".popover-title")
			// .prepend('<button type="button" class="close popover-close fs20"
			// data-dismiss="popover" aria-hidden="true"
			// onclick="$(\'.comment-history-popovered-'
			// + dataId
			// + '\').popover(\'hide\')">×</button>&nbsp;');
			// }
			return;
		}
		$this.addClass("clicking");
		var op = {
			title : r.msg.findModule(module, "history.title"),
			animation : false,
			placement : "right",
			trigger : "manual",
			container : 'body',
			template : '<div class="popover" role="tooltip"><div class="arrow"></div><div class="popover-content w50"></div></div>',
			html : true,
			content : util.tips.loadingMsgInner
		};
		popoverObj.popover(op).popover('show');
		util.ajax("/a/history/comment-find", "commentId=" + commentId,
				function(json) {
					$this.removeClass("clicking");
					popoverObj.popover('destroy');
					if (json.success) {
						var content = [];
						var array = json.array;
						content.push('<div class="historys-box fs13">');
						for (var i = 0; i < array.length; i++) {
							var bean = array[i];
							content.push('<div class="history-info">');
							content.push('<dl class="dl-horizontal">');
							content.push('<dt class="history-label">');
							content.push(r.msg.findModule(module,
									"history.admin." + bean.isUserAdmin));
							content.push('</dt>');
							content.push('<dd>');
							if (bean.isSystem == 1) {
								content
										.push('<span class="label label-danger">');
								content.push((bean.operatorName
										? bean.operatorName
										: "&nbsp;"));
								content.push('</span>');
							} else {
								content.push((bean.operatorName
										? bean.operatorName
										: "&nbsp;"));
							}

							content.push('</dd>');
							content.push('</dl>');
							// 处理时间
							content.push('<dl class="dl-horizontal">');
							content.push('<dt class="history-label">');
							content.push(r.msg.findModule(module,
									"history.operateTime"));
							content.push('</dt>');
							content.push('<dd>');
							content.push(util.date.format(
									new Date(bean.operateTime),
									util.cons.date.minuteFormat));
							content.push('</dd>');
							content.push('</dl>');
							// 处理方式
							content.push('<dl class="dl-horizontal">');
							content.push('<dt class="history-label">');
							content.push(r.msg.findModule(module,
									"history.operateDesc"));
							content.push('</dt>');
							content.push('<dd>');
							content.push((bean.operateDesc
									? bean.operateDesc
									: "&nbsp;"));
							content.push('</dd>');
							content.push('</dl>');
							if (bean.operateReason != null
									&& bean.operateReason != "") {
								// 处理原因
								content.push('<dl class="dl-horizontal">');
								content.push('<dt class="history-label">');
								content.push(r.msg.findModule(module,
										"history.operateReason"));
								content.push('</dt>');
								content.push('<dd>');
								content.push(bean.operateReason);
								content.push('</dd>');
								content.push('</dl>');
							}
							content.push('</div>');
						}
						content.push('</div>');
						var popoverId = "comment-history-popovered-" + dataId;
						var popoverId4Btn = "btn-" + popoverId;
						var op2 = {
							title : r.msg.findModule(module, "history.title"),
							placement : "right",
							trigger : "manual",
							container : 'body',
							html : true,
							content : content.join("")
						};
						popoverObj.addClass("comment-history-popovered");
						popoverObj.popover(op2).popover('show')
								.addClass(popoverId);
						$this.addClass(popoverId4Btn);
						var $popoverBox = popoverObj.data('bs.popover').$tip;
						$popoverBox
								.find(".popover-title")
								.prepend('<button type="button" class="close popover-close fs20" data-dismiss="popover" aria-hidden="true" onclick="$(\'.'
										+ popoverId
										+ '\').click()">×</button>&nbsp;');
					} else {
						util.tips.err(util.getJsonErrorMsg(json));
					}
				}, function() {
					popoverObj.popover('destroy');
					$this.removeClass("clicking");
				});
	});
	// 弹出评论的处理详情-end

	// 弹出作品标签的处理详情-start
	$(".showDrawingLabelHistory").bind("click", function() {
		var module = "admin_history";
		var $this = $(this);
		if ($this.hasClass("clicking")) {
			return;
		}
		var labelId = $this.attr("data-label-id");
		var dataId = $this.attr("data-id");
		if (dataId == null) {
			dataId = labelId;
		}
		var popoverObj = $this;
		if ($this.attr("data-popover-target") != null) {
			var $popoverTarget = $this.parents($this
					.attr("data-popover-target"));
			if (util.isJqHasDom($popoverTarget)) {
				popoverObj = $popoverTarget;
			}
		}
		var me = popoverObj[0];
		$(".drawing-label-history-popovered").each(function() {
			if (this !== me) {
				var $th = $(this);
				$th.removeClass("drawing-label-history-popovered")
						.popover("destroy");
			}
		})
		if (popoverObj.hasClass("drawing-label-history-popovered")) {
			popoverObj.removeClass("drawing-label-history-popovered")
					.popover("destroy");
			return;
		}
		$this.addClass("clicking");
		var op = {
			title : r.msg.findModule(module, "history.title"),
			animation : false,
			placement : "right",
			trigger : "manual",
			container : 'body',
			template : '<div class="popover" role="tooltip"><div class="arrow"></div><div class="popover-content w50"></div></div>',
			html : true,
			content : util.tips.loadingMsgInner
		};
		popoverObj.popover(op).popover('show');
		util.ajax("/a/history/drawingLabel-find", "labelId=" + labelId,
				function(json) {
					$this.removeClass("clicking");
					popoverObj.popover('destroy');
					if (json.success) {
						var content = [];
						var array = json.array;
						content.push('<div class="historys-box fs13">');
						for (var i = 0; i < array.length; i++) {
							var bean = array[i];
							content.push('<div class="history-info">');
							content.push('<dl class="dl-horizontal">');
							content.push('<dt class="history-label">');
							content.push(r.msg.findModule(module,
									"history.admin." + bean.isUserAdmin));
							content.push('</dt>');
							content.push('<dd>');
							if (bean.isSystem == 1) {
								content
										.push('<span class="label label-danger">');
								content.push((bean.operatorName
										? bean.operatorName
										: "&nbsp;"));
								content.push('</span>');
							} else {
								content.push((bean.operatorName
										? bean.operatorName
										: "&nbsp;"));
							}

							content.push('</dd>');
							content.push('</dl>');
							// 处理时间
							content.push('<dl class="dl-horizontal">');
							content.push('<dt class="history-label">');
							content.push(r.msg.findModule(module,
									"history.operateTime"));
							content.push('</dt>');
							content.push('<dd>');
							content.push(util.date.format(
									new Date(bean.operateTime),
									util.cons.date.minuteFormat));
							content.push('</dd>');
							content.push('</dl>');
							// 处理方式
							content.push('<dl class="dl-horizontal">');
							content.push('<dt class="history-label">');
							content.push(r.msg.findModule(module,
									"history.operateDesc"));
							content.push('</dt>');
							content.push('<dd>');
							content.push((bean.operateDesc
									? bean.operateDesc
									: "&nbsp;"));
							content.push('</dd>');
							content.push('</dl>');
							if (bean.operateReason != null
									&& bean.operateReason != "") {
								// 处理原因
								content.push('<dl class="dl-horizontal">');
								content.push('<dt class="history-label">');
								content.push(r.msg.findModule(module,
										"history.operateReason"));
								content.push('</dt>');
								content.push('<dd>');
								content.push(bean.operateReason);
								content.push('</dd>');
								content.push('</dl>');
							}
							content.push('</div>');
						}
						content.push('</div>');
						var popoverId = "drawing-label-history-popovered-"
								+ dataId;
						var popoverId4Btn = "btn-" + popoverId;
						var op2 = {
							title : r.msg.findModule(module, "history.title"),
							placement : "right",
							trigger : "manual",
							container : 'body',
							html : true,
							content : content.join("")
						};
						popoverObj.addClass("drawing-label-history-popovered");
						popoverObj.popover(op2).popover('show')
								.addClass(popoverId);
						$this.addClass(popoverId4Btn);
						var $popoverBox = popoverObj.data('bs.popover').$tip;
						$popoverBox
								.find(".popover-title")
								.prepend('<button type="button" class="close popover-close fs20" data-dismiss="popover" aria-hidden="true" onclick="$(\'.'
										+ popoverId
										+ '\').click()">×</button>&nbsp;');
					} else {
						util.tips.err(util.getJsonErrorMsg(json));
					}
				}, function() {
					popoverObj.popover('destroy');
					$this.removeClass("clicking");
				});
	});
	// 弹出作品标签的处理详情-end

	// 弹出用户的信息-start
	$(".showUserInfo").bind("click", function() {
		var module = "admin_user";
		var $this = $(this);
		var me = this;
		if ($this.hasClass("clicking")) {
			return;
		}
		var userId = $this.attr("data-userManager-id");
		var userIdForPopover = $this.attr("data-id");
		if (userIdForPopover == null) {
			userIdForPopover = userId;
		}
		var popoverObj = $this;
		$(".userManager-popovered").each(function() {
					if (this !== me) {
						var $th = $(this);
						$th.removeClass("userManager-popovered").popover("destroy");
					}
				})
		if ($this.hasClass("userManager-popovered")) {
			popoverObj.removeClass("userManager-popovered").popover("destroy");
			popoverObj.trigger("hy_popoverHidden");
			// var $popoverBox = popoverObj.data('bs.popover').$tip;
			// if (util.isJqHasDom($popoverBox)
			// && (!util.isJqHasDom($popoverBox.find(".popover-close")))) {
			// $popoverBox
			// .find(".popover-title")
			// .prepend('<button type="button" class="close popover-close fs20"
			// data-dismiss="popover" aria-hidden="true"
			// onclick="$(\'.userManager-info-popovered-'
			// + userIdForPopover
			// + '\').popover(\'hide\')">×</button>&nbsp;');
			// }
			return;
		}
		$this.addClass("clicking");
		var op = {
			animation : false,
			placement : "right",
			trigger : "manual",
			container : 'body',
			template : '<div class="popover" role="tooltip"><div class="arrow"></div><div class="popover-content w50"></div></div>',
			html : true,
			content : util.tips.loadingMsgInner
		};
		popoverObj.popover(op).popover('show');
		util.ajax("/a/userManager/info", "userId=" + userId, function(json) {
			$this.removeClass("clicking");
			popoverObj.popover('destroy');
			if (json.success) {
				var content = [];
				var bean = json.bean;
				content.push('<div class="userManager-box show-form" role="form">');
				content.push('<div class="userManager-info">');
				content.push('<div class="userManager-portrait tc pb10">');
				content.push('<img class="border-radius-3" width="80" src="');
				content.push(bean.userHeaderPortrait);
				content.push('">');
				content.push('</div>');
				content.push('<dl class="dl-horizontal">');
				content.push('<dt class="userManager-label">');
				content.push(r.msg.findModule(module, "info.id"));
				content.push('</dt>');
				content.push('<dd>');
				content.push(bean.userId);
				content.push('</dd>');
				content.push('</dl>');

				content.push('<dl class="dl-horizontal">');
				content.push('<dt class="userManager-label">');
				content.push(r.msg.findModule(module, "l.hyId"));
				content.push('</dt>');
				content.push('<dd>');
				content.push(bean.hyId);
				content.push('</dd>');
				content.push('</dl>');

				content.push('<dl class="dl-horizontal">');
				content.push('<dt class="userManager-label">');
				content.push(r.msg.findModule(module, "info.logname"));
				content.push('</dt>');
				content.push('<dd>');
				content.push(bean.logname);
				content.push('</dd>');
				content.push('</dl>');

				content.push('<dl class="dl-horizontal">');
				content.push('<dt class="userManager-label">');
				content.push(r.msg.findModule(module, "info.telephone"));
				content.push('</dt>');
				content.push('<dd>');
				content.push((bean.telephone ? bean.telephone : "&nbsp;"));
				content.push('</dd>');
				content.push('</dl>');

				content.push('<dl class="dl-horizontal">');
				content.push('<dt class="userManager-label">');
				content.push(r.msg.findModule(module, "info.blockStatus"));
				content.push('</dt>');
				content.push('<dd>');
				var blockStatusText = r.msg.findModule(module,
						"blockStatus.active");
				var blockStatusClass = "";
				if (bean.blockStatus == null || bean.blockStatus < 2) {
					blockStatusClass = "blockStatus-active";
				} else {
					if (pg.REPORT_STATUS_MAP[bean.blockStatus] != null) {
						blockStatusText = pg.REPORT_STATUS_MAP[bean.blockStatus].reportStatusText;
					}
					blockStatusClass = "userManager-reportStatus-" + bean.blockStatus;
				}
				content.push('<span class="label ');
				content.push(blockStatusClass);
				content.push('">');
				content.push(blockStatusText);
				content.push('</span>');
				content.push('</dd>');
				content.push('</dl>');
				if (bean.recoveryTime != null && bean.recoveryTime > 0) {
					content.push('<dl class="dl-horizontal">');
					content.push('<dt class="userManager-label">');
					content.push(r.msg.findModule(module, "info.recoveryTime"));
					content.push('</dt>');
					content.push('<dd>');
					content.push('<span class="label label-success">');
					content.push(util.date.format(new Date(bean.recoveryTime),
							util.cons.date.minuteFormat));
					content.push('</span>');
					content.push('</dd>');
					content.push('</dl>');
				}

				content.push('<dl class="dl-horizontal">');
				content.push('<dt class="userManager-label">');
				content.push(r.msg.findModule(module, "info.location"));
				content.push('</dt>');
				content.push('<dd>');
				content.push((bean.location ? bean.location : "&nbsp;"));
				content.push('</dd>');
				content.push('</dl>');
				if (bean.excellent != null && bean.excellent === true) {
					content.push('<dl class="dl-horizontal">');
					content.push('<dt class="userManager-label">');
					content.push(r.msg.findModule(module, "info.excellent"));
					content.push('</dt>');
					content.push('<dd>');
					content.push((bean.excellent
							? '<span class="label label-success">'
									+ r.msg.find("msg.noun.shi") + "</span>"
							: r.msg.find("msg.noun.fou")));
					content.push('</dd>');
					content.push('</dl>');
				}

				content.push('<dl class="dl-horizontal">');
				content.push('<dt class="userManager-label">');
				content.push(r.msg.findModule(module, "info.createTime"));
				content.push('</dt>');
				content.push('<dd>');
				content.push(util.date.format(new Date(bean.createTime),
						util.cons.date.minuteFormat));
				content.push('</dd>');
				content.push('</dl>');

				content.push('<dl class="dl-horizontal">');
				content.push('<dt class="userManager-label">');
				content.push(r.msg.findModule(module, "info.platform"));
				content.push('</dt>');
				content.push('<dd>');
				content.push(bean.platform ? r.msg.findModule(module,
						"combo.platform." + bean.platform) : " - ");
				content.push('</dd>');
				content.push('</dl>');

				content.push('<dl class="dl-horizontal">');
				content.push('<dt class="userManager-label">');
				content.push(r.msg.findModule(module, "info.appVersion"));
				content.push('</dt>');
				content.push('<dd>');
				content.push(bean.appVersion ? bean.appVersion : " - ");
				content.push('</dd>');
				content.push('</dl>');

				content.push('<dl class="dl-horizontal">');
				content.push('<dt class="userManager-label">');
				content.push(r.msg.findModule(module,
						"info.appVersionUpdateTime"));
				content.push('</dt>');
				content.push('<dd>');
				content
						.push((bean.appVersionUpdateTime != null && bean.appVersionUpdateTime > 0)
								? util.date.format(
										new Date(bean.appVersionUpdateTime),
										util.cons.date.minuteFormat)
								: " - ");
				content.push('</dd>');
				content.push('</dl>');

				content.push('<dl class="dl-horizontal">');
				content.push('<dt class="userManager-label">');
				content.push(r.msg.findModule(module, "info.lastVisitTime"));
				content.push('</dt>');
				content.push('<dd>');
				content
						.push((bean.lastVisitTime != null && bean.lastVisitTime > 0)
								? util.date.format(
										new Date(bean.lastVisitTime),
										util.cons.date.minuteFormat)
								: " - ");
				content.push('</dd>');
				content.push('</dl>');

				content.push('</div>');

				content.push('<div class="count-info">');
				content.push('<dl class="dl-horizontal">');
				content.push('<dt class="userManager-label">');
				content.push(r.msg.findModule(module, "info.drawingCount"));
				content.push('</dt>');
				content.push('<dd>');
				content.push(bean.drawingCount);
				content.push('</dd>');
				content.push('</dl>');

				/*
				 * content.push('<dl class="dl-horizontal">'); content.push('<dt class="userManager-label">');
				 * content.push(r.msg.findModule(module, "info.commentsCount"));
				 * content.push('</dt>'); content.push('<dd>');
				 * content.push(bean.commentsCount); content.push('</dd>');
				 * content.push('</dl>'); content.push('</div>');
				 */

				content.push('<div class="form-group">');
				content.push('<label class="userManager-label">');
				content.push(r.msg.findModule(module, "info.descr"))
				content.push('</label>');
				content
						.push('<textarea style="resize: none;" class="form-control" readonly rows="2">');
				content.push((bean.descr ? bean.descr : ""));
				content.push('</textarea>');
				content.push('</div>');

				content.push('</div>');
				var popoverId = "userManager-info-popovered-" + userIdForPopover;
				var popoverId4Btn = "btn-" + popoverId;
				var op2 = {
					title : r.msg.findModule(module, "info.userlInfo"),
					placement : "right",
					trigger : "manual",
					container : 'body',
					html : true,
					content : content.join("")
				};
				$this.addClass("userManager-popovered");
				popoverObj.popover(op2).popover('show').addClass(popoverId);
				$this.addClass(popoverId4Btn);
				var $popoverBox = popoverObj.data('bs.popover').$tip;
				$popoverBox
						.find(".popover-title")
						.prepend('<button type="button" class="close popover-close fs20" data-dismiss="popover" aria-hidden="true" onclick="$(\'.'
								+ popoverId + '\').click()">×</button>&nbsp;');
			} else {
				util.tips.err(util.getJsonErrorMsg(json));
			}
		}, function() {
			popoverObj.popover('destroy');
			$this.removeClass("clicking");
		});
	});
	// 弹出用户的信息-end
	// 弹出用户作品的信息-beg
	$(".showUserDrawing").bind("click", function() {
				// 点击关闭其他用户作品页面
				var $this = $(this);
				var $tr = $this.parents("tr:eq(0)");
				var userId = $tr.attr("data-userManager-id");
				util.dialog.open("/a/review/drawing-userDrawings?userId="
						+ userId);
			});
	// 弹出用户作品的信息-end
	// 弹出用户详细信息（包括作品/评论）-beg
	var $showUserDetail = $(".showUserDetail");
	$showUserDetail.attr("href", "javascript:void(0);");
	$showUserDetail.bind("click", function() {
				// 点击关闭其他用户作品页面
				var $this = $(this);
				var userId = $this.attr("data-userManager-id");
				util.dialog.open("/a/userManager/detail?userId=" + userId, {
							showHeader : false
						});
			});
		// 弹出用户详细信息（包括作品/评论）-end
});