/* 
    Người Tạo: đặng trung hiếu
    Ngày tạo : 16/10/2018
    Chức năng : xử lý các chức năng phần quản lý người dùng
         - Thêm người dùng
         - Hiển thị danh sách người dùng
         - Lưu Trữ danh sách người dùng
         - Tìm kiếm người dùng
         - Xóa người dùng
         - Cập nhật thông tin người
  
*/

//Khởi tạo instance từ prototype là danhSachNguoiDung
var userList = new DanhSachNguoiDung();
//Khởi tạo instance từ NguoiDungService
var nguoiDungSV = new NguoiDungService();
//MẢng tiêu đề
var mangTieuDe = ['Thêm Người Dùng', 'Cập Nhật Người Dùng'];
//hàm hiển thị popup
function hienThiPopup(title, btn) {
    //Thay đổi title của popup
    $('.modal-title').html(title);
    //Thêm button tương vào footer
    $('.modal-footer').html(
        `
            ${btn}
            <button class="btn btn-dark" data-dismiss="modal">Đóng</button>
        `
    )
}
//Hàm thêm người dùng từ form
function themNguoiDung() {
    //Lấy dữ liệu người dùng nhập từ form
    var taiKhoan = $('#TaiKhoan').val();
    var matKhau = $('#MatKhau').val();
    var hoTen = $('#HoTen').val();
    var email = $('#Email').val();
    var soDT = $('#SoDienThoai').val();
    var loaiNguoiDung = $('#loaiNguoiDung').val();

    //Tạo Instance từ prototype NguoiDung
    var NguoiDungMoi = new NguoiDung(taiKhoan, matKhau, hoTen, email, soDT, loaiNguoiDung);

    var ajaxThemND = nguoiDungSV.themNguoiDung(NguoiDungMoi);
    ajaxThemND.done(function (kq) {
        //push người dùng mới vào mảng
        userList.ThemNguoiDung(NguoiDungMoi);
        //=> userList.MangNguoiDung.push(NguoiDungMoi)
        //tạo bảng
        taoBang(userList.MangNguoiDung);
    }).fail(function (error) {
        console.log(error)
    })


    //ẩn form thêm
    $('.close').trigger('click');
}
//Tạo bảng
function taoBang(mangDauVao) {
    var contentTable = '';
    for (var i = 0; i < mangDauVao.length; i++) {
        var nguoiDung = mangDauVao[i];
        contentTable += `
            <tr>
                <td>${i + 1}</td>
                <td>${nguoiDung.TaiKhoan}</td>
                <td>${nguoiDung.MatKhau}</td>
                <td>${nguoiDung.HoTen}</td>
                <td>${nguoiDung.Email}</td>
                <td>${nguoiDung.SoDT}</td>
                <td>${nguoiDung.MaLoaiNguoiDung}</td>
                <td>
                    <button data-taikhoan="${nguoiDung.TaiKhoan}" class="btn btn-success btn-xoa">Xóa</button>
                    <button class="btn btn-info btn-sua">Cập Nhật</button>
                </td>
            </tr>
        `
    }
    $('#tblDanhSachNguoiDung').html(contentTable);
}


//Hàm tìm kiếm người dùng theo Tài Khoản
function timNDTheoTaiKhoan() {
    var keyword = $('#txtSearch').val();
    var danhSachCanTim = userList.TimNguoiDungTheoTaiKhoan(keyword);
    taoBang(danhSachCanTim);
    // => duyệt cái mảng userList.MangNguoiDung và trả ra người dùng có tài khoản
    // giống vs cái đang tìm
}

//Hàm tìm kiếm người dùng theo Họ Tên
function timNDTheoTen() {
    var keyword = $('#txtSearch').val();
    var danhSachCanTim = userList.TimNguoiDungTheoTen(keyword);
    taoBang(danhSachCanTim);
}
//Lấy danh sách người dùng từ api
var ajaxLayDSND = nguoiDungSV.layDSNguoiDung()
ajaxLayDSND.done(function (kq) {
    userList.MangNguoiDung = kq;
    taoBang(userList.MangNguoiDung);
}).fail(function (error) {
    console.log(error);

})

//------------------GỌI HÀM---------------------
$('#btnThemNguoiDung').click(function () {
    var btnThem = `<button class="btn btn-success" id="btnThem">Thêm</button>`;
    $('.modal-body input').val('')
    hienThiPopup(mangTieuDe[0], btnThem);
})
$('body').delegate('#btnThem', 'click', themNguoiDung);



$('#btnSearchByAccount').click(timNDTheoTaiKhoan);
$('#btnSearchByName').click(timNDTheoTen);
//Gắn sự kiên cho nút sửa
$('body').delegate('.btn-xoa', 'click', function () {
    var taiKhoanCanXoa = $(this).attr('data-taikhoan');
    userList.XoaNguoiDung(taiKhoanCanXoa);
    taoBang(userList.MangNguoiDung);

})