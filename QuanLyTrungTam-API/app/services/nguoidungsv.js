function NguoiDungService(){
    // viết trong đây cũng đc, nhưng nhiều dự án sẽ đóng gói tránh viết thẳng vào đây dễ bị lỗi

}
NguoiDungService.prototype.layDSNguoiDung = function(){
    var api = 'http://sv.myclass.vn/api/QuanLyTrungTam/DanhSachNguoiDung';
    return $.ajax({
        type: 'GET',
        url: api,
        dataType: 'json'
    })
}

NguoiDungService.prototype.themNguoiDung = function(nguoiDung){
    var api = 'http://sv.myclass.vn/api/QuanLyTrungTam/ThemNguoiDung';
    return $.ajax({
        type: 'POST',
        url: api,
        dataType: 'json',
        data: nguoiDung
        // Đối tượng gửi lên API để thêm vào server
        
    })

}

NguoiDungService.prototype.xoaNguoiDung = function(taiKhoan){
    var api = `http://sv.myclass.vn/api/QuanLyTrungTam/XoaNguoiDung/${taiKhoan}`;
    // làm giống yêu cầu của backend, dùng string template mới truyền tham số taiKhoan vô được
    return $.ajax({
        type: 'DELETE',
        url: api
    })
}
// return để nó trả giá trị ra, khi bên kia gọi phương thức xoaNguoiDung ra mới xài được 

NguoiDungService.prototype.capNhatNguoiDung = function(nguoiDung){
    var nguoiDungString = JSON.stringify(nguoiDung);
    var api = 'http://sv.myclass.vn/api/QuanLyTrungTam/CapNhatThongTinNguoiDung';
    return $.ajax({
        type: 'PUT',
        url: api,
        dataType: 'json',
        data: nguoiDungString,
        contentType: 'application/json'
        // contentType tuỳ backend yêu cầu, có thì ghi, ko thì thôi
        // data là kiểu chứa Object gửi lên, khi nào có dữ liệu muốn gửi lên thì viết ( vs Thêm người dùng )
    })
}

NguoiDungService.prototype.dangNhap = function(taiKhoan,matKhau){
    var api = `http://sv.myclass.vn/api/QuanLyTrungTam/DangNhap?taikhoan=${taiKhoan}&matKhau=${matKhau}`
    return $.ajax({
        type: 'GET',
        url: api,
        dataType: 'json'
    })
}