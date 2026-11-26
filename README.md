# Điểm Danh Vân Tay ESP32-2432S028 (CYD)

Hệ thống điểm danh học sinh bằng cảm biến vân tay UART (`AS608 / R503 / R307`) trên màn hình cảm ứng **ESP32-2432S028 (CYD 2.8")**, hỗ trợ:
- Đăng ký / xóa tối đa 50 học sinh trực tiếp trên màn hình cảm ứng (LVGL 8).
- Điểm danh 2 buổi **Sáng / Chiều**, giới hạn khung giờ điểm danh chỉnh trực tiếp trên màn hình.
- Phát giọng nói tiếng Việt qua loa mini cắm cổng `SPEAK` (`"Điểm danh thành công"` / `"Không điểm danh thành công"`).
- Đồng bộ danh sách học sinh & lịch sử điểm danh tự động lên **Google Sheets**.
- Khóa chế độ giáo viên bằng mã PIN (mặc định **`1234`**).

---

## 1. Nạp nhanh 1 chạm bằng file `diemanhvantay_full.bin` (không cần cài IDE)

File `diemanhvantay_full.bin` đã gộp sẵn `bootloader.bin (0x1000)` + `partitions.bin (0x8000)` + `boot_app0.bin (0xe000)` + `firmware.bin (0x10000)`.

### Cách nạp qua trình duyệt Chrome / Edge (ESP Tool Web)
1. Tải file **`diemanhvantay_full.bin`** về máy tính.
2. Cắm mạch ESP32-2432S028 vào máy tính qua cáp USB.
3. Mở trang **[https://espressif.github.io/esptool-js/](https://espressif.github.io/esptool-js/)** bằng Chrome/Edge.
4. Bấm **Connect** → chọn cổng COM của ESP32 (baud `460800` hoặc `115200`).
5. Nhập **Flash Address**: `0x0`, chọn file **`diemanhvantay_full.bin`**.
6. Bấm **Program** và chờ nạp xong (khoảng 20 giây), sau đó nhấn nút **RST** trên mạch.

### Hoặc nạp bằng dòng lệnh `esptool`
```bash
esptool.py --chip esp32 --port COM11 --baud 460800 write_flash -z 0x0 diemanhvantay_full.bin
```

---

## 2. Sơ đồ đấu nối phần cứng (ESP32-2432S028 CYD)

### Cảm biến vân tay → giắc 4 chân `CN1` (mặt sau board, gần khe thẻ nhớ)
| Chân trên giắc `CN1` | Nối tới cảm biến vân tay | Ghi chú |
| :--- | :--- | :--- |
| **`3.3V`** | `VCC / V+` (thường dây Đỏ) | AS608/R503 dùng 3.3V, không cắm 5V |
| **`GND`** | `GND` (thường dây Đen) | Mass chung |
| **`IO22`** (`FP_RX`) | `TX / TXD` của cảm biến | Nối chéo TX → RX |
| **`IO27`** (`FP_TX`) | `RX / RXD` của cảm biến | Nối chéo RX → TX |

### Loa phát giọng nói → cổng 2 chân `SPEAK` (GPIO 26)
- Cắm trực tiếp **loa mini 8Ω 1W–2W** *(loa màng, không dùng còi chíp buzzer chủ động)* vào cổng **`SPEAK`** (JST 1.25mm 2 chân) ở mặt sau board.

---

## 3. Hướng dẫn sử dụng nhanh
- **Mã PIN giáo viên mặc định**: `1234` (dùng để mở tab **Hoc sinh** / **He thong** và đổi PIN mới trong **He thong → Doi PIN**).
- **Cài WiFi**: Vào **He thong → WiFi** → chọn mạng 2.4GHz và nhập mật khẩu (cần kết nối WiFi để đồng bộ giờ thực và đẩy Google Sheets).
- **Giới hạn giờ điểm danh**: Vào **He thong → Gio DD** để Bật/Tắt và chỉnh khung giờ Sáng / Chiều (mặc định Sáng `06:30–07:30`, Chiều `13:00–14:00`).
- **Tải file CSV qua WiFi**: Mở trình duyệt truy cập `http://<IP-cua-ESP32>/` (tài khoản `teacher`, mật khẩu là mã PIN).
