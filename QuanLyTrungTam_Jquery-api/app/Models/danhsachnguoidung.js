function DanhSachNguoiDung(){
    this.MangNguoiDung= [];
    this.ThemNguoiDung = function(user){
        this.MangNguoiDung.push(user);
    };
    this.TimNguoiDungTheoTaiKhoan = function(keyword){
        var danhSachCanTim = this.MangNguoiDung.filter(function(nguoiDung){
            return nguoiDung.TaiKhoan == keyword;
        })
       return danhSachCanTim;
    };
    this.TimNguoiDungTheoTen = function(keyword){
        var danhSachCanTim = this.MangNguoiDung.filter(function(nguoiDung){
            return nguoiDung.HoTen.toLowerCase().indexOf(keyword.toLowerCase().trim()) != -1;
        })
        return danhSachCanTim;
    };
    this.XoaNguoiDung = function(taiKhoan){
        this.MangNguoiDung = this.MangNguoiDung.filter((nguoiDung) => {
            return nguoiDung.TaiKhoan != taiKhoan;
        })
    };
    this.CapNhatNguoiDung = function(){
        
    }
}