function DanhSachNguoiDung(){
    // tạo file riêng vầy để tái sử dụng cho dễ, chỉ cần copy file qua là đc
    this.MangNguoiDung = [];
    this.ThemNguoiDung = function(user){
        this.MangNguoiDung.push(user);
    }
    this.TimNguoiDungTheoTaiKhoan = function(keyword){
        // for(var i = 0; i < this.MangNguoiDung.length; i++){
        //     if(this.MangNguoiDung[i].TaiKhoan === keyword)
        // }

        var danhSachCanTim = this.MangNguoiDung.filter(function(nguoiDung){
            return nguoiDung.TaiKhoan == keyword;
        })
        // hàm filter lọc trong danh sách MangNguoiDung theo điểu kiện và trả ra mảng danhSachCanTIm
        return danhSachCanTim;
    };
    this.TimNguoiDungTheoTen = function(keyword){
        var danhSachCanTim = this.MangNguoiDung.filter(function(nguoiDung){
            return nguoiDung.HoTen.toLowerCase().indexOf(keyword.toLowerCase().trim()) != -1
            });
        return danhSachCanTim;
    };
    this.XoaNguoiDung = function(taiKhoan){
        this.MangNguoiDung = this.MangNguoiDung.filter((nguoiDung) => {
            return nguoiDung.TaiKhoan != taiKhoan;
        })
    };
    this.CapNhatNguoiDung = function(){
        
    };
}
