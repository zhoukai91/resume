(function(root,factory,plug){
	factory(root.jQuery,plug);
})(window,function($,plug){
	var __PROTOTYPE__ = {
		//初始化架构层面的dom的样式，初始化一些属性
		_init : function(){
			this.$sectionWrap = this.addClass("section-wrapper")
			.find("ul:first")
			.addClass("section-wrap section-animate")
			.children("li").addClass("section").parent();
			this.$sections = this.$sectionWrap.find("li.section");
			this.index = 0;//当前页码
			this.last = this.$sections.length-1;
			this.lock = true;//用来作为锁标识

			
		},
		//生成旁边的序列按钮
		_serials : function(){
			if(!this.showSerial)return;
			this.$serials = $("<ul></ul>");
			for(var i=0;i<this.$sections.length;i++){
				this.$serials.append("<li class='"+(!i?"curr":"")+"'><a href='#'></a></li>");
			}
			this.$serials.addClass("serial");
			this.append(this.$serials);
		},
		//封装了自定义事件的触发机制
		_attachEvent : function(event,args){
			this.trigger(event,args);
		},
		_bind : function(){
			var $links = $('#tosection a'),
				$self = this,//
				startX = null,
				startY = null,
				moveEndX = null,
				moveEndY = null,
				myCss = function(index){
						return {
							"transform": "translateY(-"+index+"00%)",
							"-moz-transform": "translateY(-"+index+"00%)",
							"-webkit-transform": "translateY(-"+index+"00%)",
							"-o-transform": "translateY(-"+index+"00%)"
						}
					};

			this.on("touchstart",function(e){
				//一个小bug 将会导致click事件失效
				//e.preventDefault();
				startX = e.originalEvent.changedTouches[0].pageX;
				startY = e.originalEvent.changedTouches[0].pageY;
				console.log('点击');
			});
			this.on("touchmove",function(e){
				e.preventDefault();
				moveEndX = e.originalEvent.changedTouches[0].pageX;
				moveEndY = e.originalEvent.changedTouches[0].pageY;

				if($self.lock){
					$self.lock = false;
					var dir = (moveEndY - startY)>0; //dir > 0 ,向上滑动
					var beforeIndex = $self.index;
					dir?$self.index--:$self.index++;
					$self.index = Math.min($self.index,$self.last);
					$self.index = Math.max($self.index,0);
					if(beforeIndex==$self.index){
						$self.lock = true;
						return;
					}
					$self._attachEvent("beforeWheel",{
						before : beforeIndex,
						beforeDOM : $self.$sections.eq(beforeIndex),
						after : $self.index,
						afterDOM : $self.$sections.eq($self.index)
					});
					$self.$sectionWrap.css(myCss($self.index));
					setTimeout(function(){
						$self.lock = true;
						$self._attachEvent("afterWheel",{
							before : beforeIndex,
							beforeDOM : $self.$sections.eq(beforeIndex),
							after : $self.index,
							afterDOM : $self.$sections.eq($self.index)
						});
						this.showSerial&&
								$self.$serials
									.children()
									.eq($self.index)
									.addClass("curr")
									.siblings()
									.removeClass("curr");
					},1000);
				}
			});
			this.on("mousewheel",function(e){
					e.preventDefault();
					if($self.lock){
						$self.lock = false;
						var dir = e.originalEvent.deltaY<0;
						var beforeIndex = $self.index;
						dir?$self.index--:$self.index++;
						$self.index = Math.min($self.index,$self.last);
						$self.index = Math.max($self.index,0);
						if(beforeIndex==$self.index){
							$self.lock = true;
							return;
						}
						$self._attachEvent("beforeWheel",{
							before : beforeIndex,
							beforeDOM : $self.$sections.eq(beforeIndex),
							after : $self.index,
							afterDOM : $self.$sections.eq($self.index)
						});
						$self.$sectionWrap.css(myCss($self.index));
						setTimeout(function(){
							$self.lock = true;
							$self._attachEvent("afterWheel",{
								before : beforeIndex,
								beforeDOM : $self.$sections.eq(beforeIndex),
								after : $self.index,
								afterDOM : $self.$sections.eq($self.index)
							});
							this.showSerial&&
									$self.$serials
										.children()
										.eq($self.index)
										.addClass("curr")
										.siblings()
										.removeClass("curr");
						},1000);
					}
			});
			$links.on('click',function(){
				$self.index = $(this).data('jq-section');
				 var beforeIndex = 0;
				// console.log($self.index);
				////触发翻页前的自定义事件
				$self._attachEvent("beforeWheel",{
					before : beforeIndex,
					beforeDOM : $self.$sections.eq(beforeIndex),
					after : $self.index,
					afterDOM : $self.$sections.eq($self.index)
				});
				$self.$sectionWrap.css(myCss($self.index));
				//触发翻页后的自定义事件
				$self._attachEvent("afterWheel",{
					before : beforeIndex,
					beforeDOM : $self.$sections.eq(beforeIndex),
					after : $self.index,
					afterDOM : $self.$sections.eq($self.index)
				});
				return false;
			});
		}
	};
	var __DEFAULTS__ = {
		showSerial : true//是否显示serial按钮
	}; 
	$.fn[plug] = function(options){
		//扩展功能
		$.extend(this,__PROTOTYPE__,__DEFAULTS__,options);
		this._init();//初始化
		this._serials();//生成序列
		this._bind();//设置功能事件
		return this;
	}
},"sectionWrapper");