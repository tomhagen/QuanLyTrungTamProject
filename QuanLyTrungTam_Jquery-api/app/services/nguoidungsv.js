function NguoiDungService(){
   
}
NguoiDungService.prototype.layDSNguoiDung = function(){
    var api = 'http://sv.myclass.vn/api/QuanLyTrungTam/DanhSachNguoiDung';
    return $.ajax({
        type:'GET',
        url:api,
        dataType:'json'
    })
}

NguoiDungService.prototype.themNguoiDung = function(nguoiDung){
    var api = 'http://sv.myclass.vn/api/QuanLyTrungTam/ThemNguoiDung';
    return $.ajax({
        type:'POST',
        url:api,
        dataType:'json',
        data: nguoiDung,
    })
}