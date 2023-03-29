# API Specifications

# User:
Type | Path | Description |
|--|--|--|
POST | driver/add | Add new driver details. If present log in. |
POST | book/?type="checkin\|checkout\|confirm" | Book, unbook or confirm prebooking |
GET | slot | Get available slot for prebooking |


# Admin:
Type | Path | Description |
|--|--|--|
POST |  user/login | Log in for admin.
POST | slots/num | Generate 'num' amounts of slots.
DEL | slots/code | Delete slot with given code.
GET | /slots | Get all data