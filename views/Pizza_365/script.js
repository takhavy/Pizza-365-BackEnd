/*** REGION 1 - Global variables - Vùng khai báo biến, hằng số, tham số TOÀN CỤC */
/*** REGION 2 - Vùng gán / thực thi hàm xử lý sự kiện cho các elements */
/*** REGION 3 - Event handlers - Vùng khai báo các hàm xử lý sự kiện */
/*** REGION 4 - Common funtions - Vùng khai báo hàm dùng chung trong toàn bộ chương trình*/

/*** REGION 1 - Global variables - Vùng khai báo biến, hằng số, tham số TOÀN CỤC */
//Object chứa dữ liệu chọn pizza size
var gPizzaSize = {
  size: "",
  duongKinh: 0,
  suon: 0,
  salad: 0,
  nuocNgot: 0,
  price: 0,
  checked: false //khi user chọn combo sẽ chuyển thành true, để bik là đã chọn combo
};

//Object chứa dữ liệu pizza type
var gPizzaType = {
  type: "",
  checked: false //khi user chọn kiểu pizza sẽ chuyển thành true, để bik là đã chọn kiểu pizza
};

//Object chứa danh sách nước uống
var gDrinkList;

//Object voucher
var gVoucher;

//Final price sau khi giảm giá
var gFinalPrice = 0;

/*** REGION 2 - Vùng gán / thực thi hàm xử lý sự kiện cho các elements */
function getPizzaSize(paramSize) { //Chọn combo pizza và lưu data vào biến global
  if (paramSize == 'small') {
    gPizzaSize.size = "S";
    gPizzaSize.duongKinh = 20;
    gPizzaSize.suon = 2;
    gPizzaSize.salad = 200;
    gPizzaSize.nuocNgot = 2;
    gPizzaSize.price = 150000;
  }
  if (paramSize == 'medium') {
    gPizzaSize.size = "M";
    gPizzaSize.duongKinh = 25;
    gPizzaSize.suon = 4;
    gPizzaSize.salad = 300;
    gPizzaSize.nuocNgot = 3;
    gPizzaSize.price = 200000;
  }
  if (paramSize == 'large') {
    gPizzaSize.size = "L";
    gPizzaSize.duongKinh = 30;
    gPizzaSize.suon = 8;
    gPizzaSize.salad = 500;
    gPizzaSize.nuocNgot = 4;
    gPizzaSize.price = 250000;
  }
  gPizzaSize.checked = true;
  gFinalPrice = gPizzaSize.price;
  console.log("Combo pizza đã chọn là");
  console.log(gPizzaSize);
  changeBtnColorWhenChoosePizzaSize(paramSize);
}

function changeBtnColorWhenChoosePizzaSize(paramComboSize) { // đổi màu nút combo đang được chọn sang màu xanh
  if (paramComboSize == 'small') {
    $("#btn-size-small").css('background-color', 'green');
    $("#btn-size-medium").css('background-color', 'orange');
    $("#btn-size-large").css('background-color', 'orange');
  }
  if (paramComboSize == 'medium') {
    $("#btn-size-small").css('background-color', 'orange');
    $("#btn-size-medium").css('background-color', 'green');
    $("#btn-size-large").css('background-color', 'orange');
  }
  if (paramComboSize == 'large') {
    $("#btn-size-small").css('background-color', 'orange');
    $("#btn-size-medium").css('background-color', 'orange');
    $("#btn-size-large").css('background-color', 'green');
  }
}

function getPizzaType(paramType) {
  gPizzaType.type = paramType;
  gPizzaType.checked = true;
  console.log("Pizza type đã chọn là: " + gPizzaType.type);
  console.log(gPizzaType);
  changeBtnColorWhenChoosePizzaType(paramType);
}

function changeBtnColorWhenChoosePizzaType(paramType) {
  if (paramType == 'ocean') {
    $("#btn-ocean").css('background-color', 'green');
    $("#btn-hawaii").css('background-color', 'orange');
    $("#btn-bacon").css('background-color', 'orange');
  }
  if (paramType == 'hawaii') {
    $("#btn-ocean").css('background-color', 'orange');
    $("#btn-hawaii").css('background-color', 'green');
    $("#btn-bacon").css('background-color', 'orange');
  }
  if (paramType == 'bacon') {
    $("#btn-ocean").css('background-color', 'orange');
    $("#btn-hawaii").css('background-color', 'orange');
    $("#btn-bacon").css('background-color', 'green');
  }
}

function onPageLoading() {
  callAjaxGetDrinkList();
  loadDrinkListToSelect(gDrinkList);
}

function callAjaxGetDrinkList() { //Gọi server lấy danh sách đồ uống về
  $.ajax({
    url: "http://42.115.221.44:8080/devcamp-pizza365/drinks",
    type: "GET",
    dataType: 'json',
    async: false,
    success: function (responseObject) {
      gDrinkList = responseObject;
      console.log(gDrinkList);
    },
    error: function (error) {
      console.assert(error.responseText);
    }
  });
}

function loadDrinkListToSelect(paramDrinkList) {
  $.each(paramDrinkList, function (i, item) { //Sau khi gọi ajax xong thì đổ data vào select drink
    $("#select-drink").append($('<option>', {
      text: item.tenNuocUong,
      value: item.maNuocUong
    }))
  });
}

/*** REGION 3 - Event handlers - Vùng khai báo các hàm xử lý sự kiện */
function onBtnSendOrderClick() {
  //B1 thu thập dữ liệu
  var vName = $("#inp-fullname").val().trim();
  var vEmail = $("#inp-email").val().trim();
  var vPhone = $("#inp-dien-thoai").val().trim();
  var vAddress = $("#inp-dia-chi").val().trim();
  var vVoucherCode = $("#inp-voucher").val().trim();
  var vMessage = $("#inp-message").val().trim();
  var vDrink = $("#select-drink").val();

  var vInputObject = {
    name: vName,
    phone: vPhone,
    address: vAddress,
    message: vMessage,
    voucherCode: vVoucherCode,
    email: vEmail,
    drink: vDrink,
    pizzaCombo: gPizzaSize.checked,
    pizzaType: gPizzaType.checked
  }

  //B2 kiểm tra dữ liệu
  var vCheck = validateInputOrder(vInputObject);
  //B3 Xử lý dữ liệu
  if (vCheck && vInputObject.voucherCode != "") {
    callAjaxCheckVoucherCodeValid(vInputObject.voucherCode);
    if (gVoucher != undefined && gVoucher != false) {
      gFinalPrice = handleDiscount(gPizzaSize.price, gVoucher.phanTramGiamGia);
    } else {
      gFinalPrice = gPizzaSize.price;
    }
    //B4 Hiển thị dữ liệu
    buildModal(vInputObject);
  }
  if(vCheck && vInputObject.voucherCode == "") {
    gFinalPrice = gPizzaSize.price;
    //B4 Hiển thị dữ liệu
    buildModal(vInputObject);
  }
}

function onBtnCreateOrderClick() {
  //B1 thu thập dữ liệu
  var vName = $("#inp-fullname").val().trim();
  var vEmail = $("#inp-email").val().trim();
  var vPhone = $("#inp-dien-thoai").val().trim();
  var vAddress = $("#inp-dia-chi").val().trim();
  var vVoucherCode = $("#inp-voucher").val().trim();
  var vMessage = $("#inp-message").val().trim();
  var vDrink = $("#select-drink").val();

  var vObjectRequest = {
    kichCo: gPizzaSize.size,
    duongKinh: gPizzaSize.duongKinh,
    suon: gPizzaSize.suon,
    salad: gPizzaSize.salad,
    loaiPizza: gPizzaType.type,
    idVourcher: vVoucherCode,
    idLoaiNuocUong: vDrink,
    soLuongNuoc: gPizzaSize.nuocNgot,
    hoTen: vName,
    thanhTien: gFinalPrice,
    email: vEmail,
    soDienThoai: vPhone,
    diaChi: vAddress,
    loiNhan: vMessage
  };

  //B2 bỏ qua, khi đã hiện dc modal thì các dữ liệu đã dc validate

  //B3 Xử lý dữ liệu
  callAjaxCreateNewOrder(vObjectRequest);
}

/*** REGION 4 - Common funtions - Vùng khai báo hàm dùng chung trong toàn bộ chương trình*/
function callAjaxCheckVoucherCodeValid(paramVoucherCode) { // Kiểm tra voucher
  $.ajax({
    url: "http://42.115.221.44:8080/devcamp-voucher-api/voucher_detail/" + paramVoucherCode,
    type: "GET",
    dataType: 'json',
    async: false,
    success: function (responseObject) {
      console.log("Voucher có hiệu lực, giảm giá thành công")
      console.log(responseObject);
      gVoucher = responseObject;
    },
    error: function (error) {
      console.assert(error.responseText);
      gVoucher = false;
    }
  });
}

function callAjaxCreateNewOrder(paramOrderInfo) { // call ajax tạo đơn hàng
  $.ajax({
    url: "http://42.115.221.44:8080/devcamp-pizza365/orders",
    type: "POST",
    dataType: 'json',
    data: JSON.stringify(paramOrderInfo),
    contentType: "application/json;charset=UTF-8",
    async: false,
    success: function (response) {
      console.log(response);
      $("#order-info-modal").modal('hide'); //Ẩn modal sau khi đã create xong
      getUserOrderIdAfterSuccess(response); // đổ order id vào modal
      $("#order-success-modal").modal('show'); // show modal cảm ơn ra
    },
    error: function (error) {
      console.assert(error.responseText);
    }
  });
}

function getUserOrderIdAfterSuccess(paramOrderResponse) {
  $("#order-id").val(paramOrderResponse.orderId);
}

function handleDiscount(paramPizzaPrice, paramDiscountPercent) {
  return paramPizzaPrice - (paramPizzaPrice * paramDiscountPercent / 100);
}

function buildModal(paramInput) { // Build modal order detail
  var vModalBody = $("#order-info-modal-body"); // truy xuất phần tử modal body order info
  // Trước khi build thì clear hết data cũ đi
  vModalBody.empty();
  for (var bI = 0; bI < 5; bI++) { //build thông tin cơ bản của order sắp tạo
    var vLabel = Object.keys(paramInput)[bI];
    var vData = paramInput[Object.keys(paramInput)[bI]];
    vModalBody.append('<label for="' + vLabel + '" class="form-group">' + vLabel + '</label>' +
      '<input type="text" class="form-control" readonly name="' + vLabel + '" id="' + vLabel + '">');
  }

  //Buile thông tin chi tiết phần textarea
  vModalBody.append('<label for="info-detail" class="form-group">Thông tin chi tiết</label>' +
    '<textarea name="info-detail" readonly class="form-control" id="info-detail" cols="30" rows="10"></textarea>');

  fillInputTextModalWithData(paramInput); //đổ dữ liệu vào
}

function fillInputTextModalWithData(paramInput) {
  for (var bI = 0; bI < 5; bI++) {
    var vId = Object.keys(paramInput)[bI];
    var vValue = paramInput[Object.keys(paramInput)[bI]];
    $("#" + vId).val(vValue);
  }
  var vDetailText;
  if (gFinalPrice < gPizzaSize.price) { //Nếu có giảm giá 
    vDetailText = 'Xác nhận: ' + paramInput.name + ', ' + paramInput.phone + ', ' + paramInput.address + '\r\n' +
      'Menu: ' + gPizzaSize.size + ', sườn nướng: ' + gPizzaSize.suon + ', nước: ' + gPizzaSize.nuocNgot + '\r\n' +
      'Loại pizza: ' + gPizzaType.type + ', giá: ' + gPizzaSize.price + ', mã giảm giá: ' + gVoucher.maVoucher + '\r\n' +
      'Phải thanh toán: ' + gFinalPrice + 'vnd (mã giảm giá ' + gVoucher.phanTramGiamGia + '%)';
  } else { // Nếu không giảm giá
    vDetailText = 'Xác nhận: ' + paramInput.name + ', ' + paramInput.phone + ', ' + paramInput.address + '\r\n' +
      'Menu: ' + gPizzaSize.size + ', sườn nướng: ' + gPizzaSize.suon + ', nước: ' + gPizzaSize.nuocNgot + '\r\n' +
      'Loại pizza: ' + gPizzaType.type + ', giá: ' + gPizzaSize.price + '\r\n' +
      'Phải thanh toán: ' + gFinalPrice + 'vnd';
  }
  $("#info-detail").val(vDetailText);
  $("#order-info-modal").modal('show'); //Show modal lên
}

function validateInputOrder(paramInputOrder) {
  var vResult = true;
  if (paramInputOrder.name == "") {
    alert("Chưa nhập name!");
    vResult = false;
  }
  if (paramInputOrder.email == "") {
    alert("Chưa nhập email");
    vResult = false;
  }
  if (!paramInputOrder.email.includes("@")) {
    alert("Email không có ký tự @");
    vResult = false;
  }
  if (paramInputOrder.phone == "") {
    alert("Chưa nhập phone!");
    vResult = false;
  }
  if (paramInputOrder.address == "") {
    alert("Chưa nhập address!");
    vResult = false;
  }
  if (paramInputOrder.drink == "default") {
    alert("Chưa nhập drink!");
    vResult = false;
  }
  if (paramInputOrder.pizzaCombo == false) {
    alert("Chưa nhập combo!");
    vResult = false;
  }
  if (paramInputOrder.pizzaType == false) {
    alert("Chưa nhập pizza type!");
    vResult = false;
  }
  return vResult;
}

$(document).ready(function () {
  onPageLoading(); //đổ dữ liệu đồ uống vào khi load trang

  //Nút chọn size pizza dc nhấn, gán các dữ liệu pizza size vào biến global
  $("#btn-size-small").on('click', function () {
    getPizzaSize('small');
  });
  $("#btn-size-medium").on('click', function () {
    getPizzaSize('medium');
  });
  $("#btn-size-large").on('click', function () {
    getPizzaSize('large');
  });

  //Nút chọn pizza type dc nhấn, gán dữ liệu pizza type vào biến global
  $("#btn-ocean").on('click', function () {
    getPizzaType('ocean');
  });
  $("#btn-hawaii").on('click', function () {
    getPizzaType('hawaii');
  });
  $("#btn-bacon").on('click', function () {
    getPizzaType('bacon');
  });

  //Khi nút gửi đơn hàng dc nhấn
  $(".btn-send-order").on('click', function () {
    onBtnSendOrderClick();
  });

  //Khi nút tạo đơn hàng được nhấn
  $("#btn-modal-confirm-order").on('click', function () {
    onBtnCreateOrderClick();
  });


});