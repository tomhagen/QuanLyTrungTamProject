/* 
    Người tạo: Trần Tuyển
    Ngày tạo: 16/10/2018
    Chức năng: Xử lý các chức năng phần quản lý người dùng
        - Thêm người dùng
        - Hiển thị danh sách người dùng
        - Lưu trữ danh sách người dùng
        - Tìm kiếm người dùng
         - xoá người dùng
         - Cập nhật thông tin người dùng
*/
// Khởi tạo instance từ prototype là danhSachNguoiDung
var userList = new DanhSachNguoiDung();

// Khởi tạo Instance từ NguoiDungService
var nguoiDungSV = new NguoiDungService();
// Mảng tiêu đề
var mangTieuDe = ['Thêm Người Dùng','Cập Nhật Người Dùng'];
// Hàm hiển thị popup
function hienThiPopup(title,btn){
    //thay đổi title của popup
    $('.modal-title').html(title);

    // thêm button tương ứng vào footer
    $('.modal-footer').html(
        `
        ${btn}
        <button class="btn btn-dark" data-dismiss="modal">Đóng</button>
        `
    )

}
// Hàm thêm người dùng từ form
function themNguoiDung(){
    // lấy dữ liệu người dùng nhập từ form
    var taiKhoan = $('#TaiKhoan').val();
    var matKhau = $('#MatKhau').val();
    var hoTen = $('#HoTen').val();
    var email = $('#Email').val();
    var soDT = $('#SoDienThoai').val();
    var loaiNguoiDung = $('#loaiNguoiDung').val();

    var NguoiDungMoi = new NguoiDung(taiKhoan,matKhau,hoTen,email,soDT,loaiNguoiDung);
    
    var ajaxThemND = nguoiDungSV.themNguoiDung(NguoiDungMoi);
    ajaxThemND.done(function(kq){
        // userList.MangNguoiDung.push(NguoiDungMoi); viết vầy ko chuyên nghiệp, viết hàm trong danhsachnguoidung và ở đây gọi ra xài thôi
        userList.ThemNguoiDung(NguoiDungMoi);
        

        taoBang(userList.MangNguoiDung);
 
    }).fail(function(error){
        console.log(error);
    })
   
    
    // ẩn form bằng cách kêu nút x click theo
    $('.close').trigger('click');
    
}

// Tạo bảng 
function taoBang(mangDauVao){
    var contentTable = '';
    for(var i = 0; i < mangDauVao.length; i++){
        var nguoiDung = mangDauVao[i];
        contentTable += `
            <tr>
                <td>${i+1}</td>
                <td>${nguoiDung.TaiKhoan}</td>
                <td>${nguoiDung.MatKhau}</td>
                <td>${nguoiDung.HoTen}</td>
                <td>${nguoiDung.Email}</td>
                <td>${nguoiDung.SoDT}</td>
                <td>${nguoiDung.MaLoaiNguoiDung}</td>
                <td>
                    <button data-taikhoan="${nguoiDung.TaiKhoan}" class="btn btn-success btn-xoa" >Xoá</button>
                    <button
                    data-taikhoan = "${nguoiDung.TaiKhoan}"
                    data-matkhau = "${nguoiDung.MatKhau}"
                    data-hoten = "${nguoiDung.HoTen}"
                    data-email = "${nguoiDung.Email}"
                    data-soDT = "${nguoiDung.SoDT}"
                    data-maloainguoidung = "${nguoiDung.MaLoaiNguoiDung}"
                    data-toggle="modal"
                    data-target="#myModal"
                    class="btn btn-info btn-sua">Cập Nhật</button>
                </td>
            </tr>
        `
    }
    $('#tblDanhSachNguoiDung').html(contentTable);
}



// hàm tìm kiếm người dùng theo tài khoản
function timNDTheoTaiKhoan(){
    var keyword = $('#txtSearch').val();

    var danhSachCanTim = userList.TimNguoiDungTheoTaiKhoan(keyword); 
    taoBang(danhSachCanTim);
    // --> Duyệt mảng userList.MangNguoiDung và trả ra người dùng có tài khoản
    // giống với cái đang tìm

}

function timNDTheoTen(){
    var keyword = $('#txtSearch').val();
    var danhSachCanTim = userList.TimNguoiDungTheoTen(keyword);
    taoBang(danhSachCanTim);
}



// lấy danh sach nguoi dung từ API
var  ajaxLayDSND = nguoiDungSV.layDSNguoiDung()
ajaxLayDSND.done(function(kq){
    userList.MangNguoiDung = kq;
    taoBang(userList.MangNguoiDung);
}).fail(function(error){
    console.log(error);
})


// Hàm cập nhật người dùng

function capNhatNguoiDung(){
    var taiKhoan = $('#TaiKhoan').val();
    var matKhau = $('#MatKhau').val();
    var hoTen = $('#HoTen').val();
    var email = $('#Email').val();
    var soDT = $('#SoDienThoai').val();
    var loaiNguoiDung = $('#loaiNguoiDung').val();

    var NguoiDungEdit = new NguoiDung(taiKhoan,matKhau,hoTen,email,soDT,loaiNguoiDung);
    // gọi phương thức tạo ajax để gửi request lên api
    var ajaxCapNhat = nguoiDungSV.capNhatNguoiDung(NguoiDungEdit);
    ajaxCapNhat.done(function(kq){
        console.log(kq);
        nguoiDungSV.layDSNguoiDung().done(function(result){
            taoBang(result)
        }).fail(function(){
            taoBang(userList.MangNguoiDung);
        });
        
    }).fail(function(error){
        console.log(error);
    })
    
}



// --------- GỌI HÀM --------------
$('#btnThemNguoiDung').click(function(){
    var btnThem = `<button class="btn btn-success" id="btnThem">Thêm</button>`;

    // clear form khi đã nhấn thêm và quay lại
    $('.modal-body input').val('');

    hienThiPopup('Thêm Người Dùng',btnThem);
    // --> khi click vào nút thêm thì sửa lại tiêu đề popup và thêm nút thêm
})
$('body').delegate('#btnThem',"click",themNguoiDung)
// nếu ko có hàm sẵn thì click, function(){ gõ code vào }
// ko cần dùng body cũng đc, chỉ cần ghi thẻ cha chứa nút đó là đc

// Lấy dự liệu từ local lên và hiển thị ra bảng ngay khi load trang

taoBang(userList.MangNguoiDung);
$('#btnSearchByAccount').click(timNDTheoTaiKhoan);
$('#btnSearchByName').click(timNDTheoTen);

$('body').delegate('.btn-xoa','click',function(){
    
    var taiKhoanCanXoa = $(this).attr('data-taikhoan');
    var ajaxXoaND = nguoiDungSV.xoaNguoiDung(taiKhoanCanXoa);
    ajaxXoaND.done(function(result){
        userList.XoaNguoiDung(taiKhoanCanXoa);
        taoBang(userList.MangNguoiDung);
    }).fail(function(error){
        console.log(error);
    })
    // userList.XoaNguoiDung(taiKhoanCanXoa);
    // taoBang(userList.MangNguoiDung);
    
   
})
// dùng delegate khi DOM tới mà nút chưa có trên giao diện
$('body').delegate('.btn-sua','click',function(){
    var taiKhoan = this.getAttribute('data-taikhoan');
    var matKhau = this.getAttribute('data-matkhau');
    var hoTen = this.getAttribute('data-hoten');
    var email = this.getAttribute('data-email');
    var soDT = this.getAttribute('data-sodt');
    var maLoaiNguoiDung = this.getAttribute('data-maloainguoidung');

    var btn = `
        <button class="btn btn-info" id="btnCapNhat">Lưu Thay Đổi</button>
    `
    hienThiPopup(mangTieuDe[1],btn)

    $('#TaiKhoan').val(taiKhoan);
    $('#MatKhau').val(matKhau);
    $('#HoTen').val(hoTen);
    $('#Email').val(email);
    $('#SoDienThoai').val(soDT);
    $('#loaiNguoiDung').val(maLoaiNguoiDung);


})

$('body').delegate('#btnCapNhat','click',capNhatNguoiDung);