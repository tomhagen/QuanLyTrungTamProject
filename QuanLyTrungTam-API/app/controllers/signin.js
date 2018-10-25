$(document).ready(function(){
    var nguoiDungSV = new NguoiDungService();
    // muốn sử dụng phương thức thì phải tạo đối tựogn mới rồi mới gọi xài đc
    function dangNhap(){
        var taiKhoan = $('#taiKhoan').val();
        var matKhau = $('#matKhau').val();
        nguoiDungSV.dangNhap(taiKhoan,matKhau).done(function(kq){
            if(typeof(kq) !== 'string'){
                // dùng if để kiểm tra : nếu nhập đúng tức là ra mảng thì ok chuyển trang, còn sai thì nó ra fail to login tức là chuỗi
                // lưu local để chuyển trang mà không mất dữ liệu
                localStorage.setItem('currentUser',JSON.stringify(kq[0]))
                // chuyển trang khi đăng nhập xong
                window.location.assign('index.html');
                
            }
        }).fail(function(error){
            console.log(error);
        })
    }
    $('#btnDangNhap').click(dangNhap);
})