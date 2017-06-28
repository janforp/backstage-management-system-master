<!DOCTYPE html>
<html>
<head>
    <title>bootstrap modal 垂直居中测试</title>
    <link href="/plugins/bootstrap-3.1.1/dist/css/bootstrap.min.css" rel="stylesheet">
    <meta charset="utf-8">
</head>
<body>

<button type="button" id="modalBtn" class="btn btn-primary">点击弹出modal</button>
<div class='btn-group'>

    <button class='btn btn-default'>下拉菜单</button>
    <button class='btn btn-default dropdown-toggle' data-toggle='dropdown' href='javascript:;'><span class='caret'></span></button>
    <ul class='dropdown-menu'>
        <li><a href='javascript:;'>item1</a></li>
        <li><a href='javascript:;'>item2</a></li>
        <li><a href='javascript:;'>item3</a></li>
    </ul>

</div>

</div>

<div class="modal fade" id="myModal">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">Modal 标题</h4>
            </div>
            <div class="modal-body">
                <p>内容&hellip;</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                <button type="button" class="btn btn-primary">确定</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->

<script src="/plugins/jquery/jquery-1.9.1.min.js"></script>
<script src="/plugins/bootstrap-3.1.1/dist/js/bootstrap.min.js"></script>

<script type="text/javascript">
    $(function(){
        // dom加载完毕
        var $m_btn = $("#modalBtn");
        var $modal = $("#myModal");
        $m_btn.on("click", function(){
            $modal.modal({backdrop: "static"});
        });
    });
</script>

</body>
</html>