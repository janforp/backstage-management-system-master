
					//获取今天0点的字符串表达式
					function getTotay() {

						$(this).addClass('addBackColor');
						var now = new Date();
						var con = " 00:00:00";
						
						var year = now.getFullYear();
						var month = now.getMonth()+1;
						var day = now.getDate();
						
						var today = year+"-"+(month<10?('0'+month):month)+"-"+(day<10?('0'+day):day)+con;
						return today;
					}
					
					//获取明天0点的表达式
					function getTommorw(){
						
						var now = new Date();
						var con = " 00:00:00";
						
						var millis = now.getTime();
						var tommorwMillis = millis+24*60*60*1000;
						
						var tommorw = new Date();
						tommorw.setTime(tommorwMillis);
						
						var year = tommorw.getFullYear();
						var month = tommorw.getMonth()+1;
						var day = tommorw.getDate();
						
						return year+"-"+(month<10?('0'+month):month)+"-"+(day<10?('0'+day):day)+con;
						
					}
					
					//n天前的0点表达式
					function getBefore(n) {
						var n = n;
						n = parseInt(n);
						var now = new Date();
						var con = " 00:00:00";
						
						var millis = now.getTime();
						var beforeMillis = millis-n*24*60*60*1000;
						
						var before = new Date();
						before.setTime(beforeMillis);
						
						var year = before.getFullYear();
						var month = before.getMonth()+1;
						var day = before.getDate();
						
						return year+"-"+(month<10?('0'+month):month)+"-"+(day<10?('0'+day):day)+con;
						
					}
				//	console.log(getBefore(1));
//		</script>
//		<script>
					//今天（今天的0点到明天的0点）
					function showToday() {
						
						$("#start").val("");
						$("#end").val("");
						
						//获取今天的0点的表达式
						var start = getTotay();
						//获取明天0点表达式
						var end = getTommorw();
						
						$("#start").val(start);
						$("#end").val(end);
					}
					
					//昨天（昨天的0点到今天的0点）
					function showYesterday() {
						
						$("#start").val("");
						$("#end").val("");
						
						//获取昨天的0点表达式
						var start = getBefore(1);
						//获取今天的0点表达式
						var end = getTotay();
						

						$("#start").val(start);
						$("#end").val(end);
					}
					
					//一周（7天前的0点，到明天的0点）
					function showWeek() {
						
						$("#start").val("");
						$("#end").val("");
						
						//获取7天前的0点表达式
						var start = getBefore(7);
						//获取今天的0点表达式
						var end = getTotay();
						

						$("#start").val(start);
						$("#end").val(end);
						
					}
					
					
					//一个月（30天前的0点，到明天的0点）
					function showMonth() {
						
						$("#start").val("");
						$("#end").val("");
						
						//获取昨天的0点表达式
						var start = getBefore(30);
						//获取今天的0点表达式
						var end = getTotay();
						

						$("#start").val(start);
						$("#end").val(end);
						
					}
